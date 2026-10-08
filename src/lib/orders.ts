import { Capacitor } from '@capacitor/core'
import { db, uid, type Order, type OrderStatus } from './db'
import { deleteImagesIfOrphan } from './images'
import { today, parseISO } from './format'

export const STATUS: { key: OrderStatus; label: string; icon: string; color: string }[] = [
  { key: 'pending', label: '待接单', icon: 'inbox', color: '#355b4e' },
  { key: 'progress', label: '进行中', icon: 'draw', color: '#b58145' },
  { key: 'review', label: '待验收', icon: 'fact_check', color: '#4c7c9b' },
  { key: 'done', label: '已完成', icon: 'task_alt', color: '#4d7f57' },
]
export const statusLabel = (s: OrderStatus) => STATUS.find(x => x.key === s)!.label
export const nextStatus = (s: OrderStatus): OrderStatus | null => ({ pending: 'progress', progress: 'review', review: 'done', done: null } as const)[s]
export const PLATFORMS = ['米画师', 'QQ', '微信', '小红书', 'B站']
export const ORDER_TYPES = ['头像', '插画', '立绘', '设定集', '表情包', 'Q版']
export const CANVAS = [
  { label: 'A4 (300DPI)', w: 2480, h: 3508 },
  { label: '1:1 正方形头像', w: 3000, h: 3000 },
  { label: '16:9 横版壁纸', w: 3840, h: 2160 },
  { label: '自定义尺寸', w: 0, h: 0 },
]
export const LICENSES = ['个人收藏 / 社交头像', '商业商用 (x2倍)', '无料周边印制', '独家买断']
export const REMIND_RULES = ['提前3天提醒', '提前1天催画', '当天10:00截稿']
export const COMMON_TAGS = ['#允许公开展示', '#加急单', '#需分层PSD']

export function blankOrder(): Order {
  const t = today(); const d = parseISO(t); d.setDate(d.getDate() + 19)
  const dl = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
  return {
    id: uid(), no: '', client: '', platform: '米画师', types: ['头像'], status: 'pending', total: 0, deposit: 0,
    depositPaid: false, balancePaid: false, canvas: '1:1 正方形头像', canvasW: 3000, canvasH: 3000, license: LICENSES[0],
    startDate: t, deadline: dl, remind: true, remindRules: [REMIND_RULES[0]], requirement: '', tags: [], refImages: [], deliverImages: [],
    createdAt: Date.now(), updatedAt: Date.now(),
  }
}
export async function nextOrderNo() {
  const y = new Date().getFullYear(); const prefix = `YHJ-${y}-`
  let max = 0
  for (const o of await db.orders.toArray()) {
    const m = o.no.match(new RegExp(`^${prefix}(\\d+)$`))
    if (m) max = Math.max(max, parseInt(m[1], 10))
  }
  return `${prefix}${String(max + 1).padStart(3, '0')}`
}

/** Keep wallet in sync with an order's payment state: deposit/balance become income records. */
export async function syncOrderTxns(o: Order) {
  await db.txns.where('orderId').equals(o.id).delete()
  const title = `${o.client || '未命名客户'} · ${o.types.join('/') || '稿件'}`
  const dep = Math.min(o.deposit, o.total); const bal = Math.max(0, o.total - dep)
  const at = (k: OrderStatus) => (o.stageTimes?.[k] ? new Date(o.stageTimes[k]!) : new Date())
  const iso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
  const rows = []
  if (o.depositPaid && dep > 0) rows.push({ id: uid(), type: 'income' as const, kind: '定金', amount: dep, date: iso(at('progress')), title, note: `${o.no} 定金`, orderId: o.id, createdAt: Date.now() })
  if (o.balancePaid && bal > 0) rows.push({ id: uid(), type: 'income' as const, kind: '尾款', amount: bal, date: iso(at('done')), title, note: `${o.no} 尾款`, orderId: o.id, createdAt: Date.now() + 1 })
  if (rows.length) await db.txns.bulkPut(rows)
}

export async function saveOrder(o: Order) {
  if (!o.no) o.no = await nextOrderNo()
  o.updatedAt = Date.now(); o.stageTimes = { ...(o.stageTimes || {}), [o.status]: o.stageTimes?.[o.status] || Date.now() }
  await db.orders.put(o); await syncOrderTxns(o); await scheduleReminders(o)
  return o
}
export async function advanceOrder(o: Order) {
  const n = nextStatus(o.status); if (!n) return o
  const u: Order = { ...o, status: n, stageTimes: { ...(o.stageTimes || {}), [n]: Date.now() } }
  if (n === 'progress') u.depositPaid = true
  if (n === 'done') { u.depositPaid = true; u.balancePaid = true }
  return saveOrder(u)
}
export async function deleteOrder(o: Order) {
  await db.txns.where('orderId').equals(o.id).delete(); await cancelReminders(o)
  await db.orders.delete(o.id)
  await deleteImagesIfOrphan([...o.refImages, ...o.deliverImages])
}

// ---- local notifications (截稿节点智能推送提醒) ----
const nid = (id: string, i: number) => { let h = 0; for (const c of id) h = (h * 31 + c.charCodeAt(0)) | 0; return Math.abs(h % 1e8) * 10 + i }
async function ln() { if (!Capacitor.isNativePlatform()) return null; return (await import('@capacitor/local-notifications')).LocalNotifications }
export async function cancelReminders(o: Order) { const L = await ln(); if (!L) return; await L.cancel({ notifications: [0, 1, 2].map(i => ({ id: nid(o.id, i) })) }).catch(() => {}) }
export async function scheduleReminders(o: Order) {
  const L = await ln(); if (!L) return
  await cancelReminders(o)
  if (!o.remind || o.status === 'done' || !o.deadline) return
  const perm = await L.checkPermissions(); if (perm.display !== 'granted') { const r = await L.requestPermissions(); if (r.display !== 'granted') return }
  const dl = parseISO(o.deadline); const name = `${o.client || '稿件'}（${o.types.join('/')}）`
  const plan = [
    { rule: REMIND_RULES[0], at: new Date(dl.getFullYear(), dl.getMonth(), dl.getDate() - 3, 10), body: `距离截稿还有 3 天：${name}` },
    { rule: REMIND_RULES[1], at: new Date(dl.getFullYear(), dl.getMonth(), dl.getDate() - 1, 10), body: `明天就要截稿啦，抓紧画：${name}` },
    { rule: REMIND_RULES[2], at: new Date(dl.getFullYear(), dl.getMonth(), dl.getDate(), 10), body: `今天截稿：${name}` },
  ]
  const list = plan.map((p, i) => ({ ...p, id: nid(o.id, i) })).filter(p => o.remindRules.includes(p.rule) && p.at.getTime() > Date.now())
  if (list.length) await L.schedule({ notifications: list.map(p => ({ id: p.id, title: '妖画集 · 截稿提醒', body: p.body, schedule: { at: p.at, allowWhileIdle: true } })) }).catch(() => {})
}
