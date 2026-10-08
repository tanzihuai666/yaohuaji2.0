import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLiveQuery } from 'dexie-react-hooks'
import Page from '../components/Page'
import BottomNav from '../components/BottomNav'
import FormSheet from '../components/FormSheet'
import { useUI } from '../components/ui'
import { db, uid, type Txn } from '../lib/db'
import { statusLabel } from '../lib/orders'
import { mdDate, today, yuan } from '../lib/format'
import { shareBlob } from '../lib/share'
import pkg from '../../package.json'

const KINDS_IN = ['全款', '定金', '尾款', '加急费', '周边分成', '其他收入']
const KINDS_OUT = ['画材软件', '平台手续费', '约稿支出', '设备', '其他支出']
const MIX_C = ['bg-primary-container', 'bg-tertiary-fixed-dim', 'bg-secondary-fixed-dim', 'bg-outline-variant']
const k = (n: number) => (n >= 1000 ? `¥${(n / 1000).toFixed(n >= 10000 ? 0 : 1)}k` : `¥${Math.round(n)}`)
type Filter = '全部' | '已结清' | '定金到账' | '待结尾款' | '支出'

export default function Wallet() {
  const nav = useNavigate(); const ui = useUI()
  const txns = useLiveQuery(() => db.txns.toArray(), []) || []
  const orders = useLiveQuery(() => db.orders.toArray(), []) || []
  const goal = (useLiveQuery(() => db.kv.get('walletGoal'), [])?.value as number) || 0
  const now = new Date(); const ym = today().slice(0, 7); const curY = now.getFullYear()
  const [year, setYear] = useState(curY); const [pick, setPick] = useState<number | null>(null)
  const [filter, setFilter] = useState<Filter>('全部'); const [all, setAll] = useState(false)
  const [form, setForm] = useState<Txn | 'new' | null>(null); const [ftype, setFtype] = useState<'income' | 'expense'>('income')
  const om = useMemo(() => new Map(orders.map(o => [o.id, o])), [orders])

  const inc = txns.filter(t => t.type === 'income'), out = txns.filter(t => t.type === 'expense')
  const sum = (a: Txn[]) => a.reduce((s, t) => s + t.amount, 0)
  const total = sum(inc) - sum(out)
  const prevYm = (() => { const d = new Date(curY, now.getMonth() - 1, 1); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}` })()
  const monthInc = inc.filter(t => t.date.startsWith(ym)); const lastInc = sum(inc.filter(t => t.date.startsWith(prevYm)))
  const growth = lastInc ? ((sum(monthInc) - lastInc) / lastInc) * 100 : null
  const active = orders.filter(o => o.status !== 'done')
  const pending = active.reduce((s, o) => s + Math.max(0, o.total - (o.depositPaid ? Math.min(o.deposit, o.total) : 0)), 0)
  const yearInc = sum(inc.filter(t => t.date.startsWith(String(curY))))
  const doneCount = orders.filter(o => o.status === 'done').length

  const years = [...new Set([curY, ...txns.map(t => Number(t.date.slice(0, 4)))])].filter(Boolean).sort()
  const months = Array.from({ length: 12 }, (_, i) => { const key = `${year}-${String(i + 1).padStart(2, '0')}`; return sum(inc.filter(t => t.date.startsWith(key))) - sum(out.filter(t => t.date.startsWith(key))) })
  const top = Math.max(1000, ...months.map(m => Math.abs(m)))
  const step = Math.ceil(top / 4 / 500) * 500 || 1000; const axis = step * 4
  const curM = year === curY ? now.getMonth() : year < curY ? 11 : -1
  const sel = pick ?? (curM >= 0 ? curM : 0)

  // income mix by order type (first type of each order)
  const mix = (() => {
    const m = new Map<string, { v: number; n: Set<string> }>()
    inc.forEach(t => { const o = t.orderId ? om.get(t.orderId) : undefined; const key = o ? o.types[0] || '其他' : t.kind === '周边分成' ? '周边分成' : '其他'; const e = m.get(key) || { v: 0, n: new Set() }; e.v += t.amount; e.n.add(t.orderId || t.id); m.set(key, e) })
    const arr = [...m.entries()].map(([name, e]) => ({ name, v: e.v, n: e.n.size })).sort((a, b) => b.v - a.v)
    if (arr.length > 3) { const rest = arr.splice(2); arr.push({ name: '其他', v: rest.reduce((s, x) => s + x.v, 0), n: rest.reduce((s, x) => s + x.n, 0) }) }
    const t = arr.reduce((s, x) => s + x.v, 0) || 1
    return arr.map(x => ({ ...x, pct: Math.round((x.v / t) * 100) }))
  })()
  const works = new Set(inc.map(t => t.orderId || t.id)).size

  const isPendingDep = (t: Txn) => { const o = t.orderId && om.get(t.orderId); return !!o && t.kind === '定金' && !o.balancePaid && o.total > o.deposit }
  const groups: Record<Filter, Txn[]> = {
    全部: txns, 已结清: inc.filter(t => !isPendingDep(t)), 定金到账: inc.filter(t => t.kind === '定金'), 待结尾款: inc.filter(isPendingDep), 支出: out,
  }
  const list = [...groups[filter]].sort((a, b) => b.date.localeCompare(a.date) || b.createdAt - a.createdAt)
  const shown = all ? list : list.slice(0, 8)

  const exportCsv = async () => {
    if (!txns.length) return ui.toast('还没有账目可导出')
    const esc = (s: string | number) => `"${String(s).replace(/"/g, '""')}"`
    const rows = [['日期', '类型', '分类', '金额', '标题', '备注', '关联稿单'], ...[...txns].sort((a, b) => a.date.localeCompare(b.date)).map(t => [t.date, t.type === 'income' ? '收入' : '支出', t.kind, (t.type === 'income' ? '' : '-') + t.amount, t.title, t.note, t.orderId ? om.get(t.orderId)?.no || '' : ''])]
    const csv = '\ufeff' + rows.map(r => r.map(esc).join(',')).join('\r\n')
    await shareBlob(new Blob([csv], { type: 'text/csv;charset=utf-8' }), `妖画集账本_${today()}.csv`, '妖画集账本'); ui.toast('账本已导出')
  }
  const setGoal = async () => { const v = await ui.prompt({ title: '年度稿费目标 (¥)', defaultValue: goal ? String(goal) : '', inputType: 'number', icon: 'flag' }); if (v !== null) await db.kv.put({ key: 'walletGoal', value: Number(v) || 0 }) }
  const openForm = (t: Txn | 'new') => { if (t !== 'new' && t.orderId) return nav(`/orders/${t.orderId}`); setFtype(t === 'new' ? 'income' : t.type); setForm(t) }
  const submit = async (v: Record<string, string>) => {
    const amount = Number(v.amount); if (!amount || amount <= 0) return ui.toast('请填写正确的金额')
    const kinds = ftype === 'income' ? KINDS_IN : KINDS_OUT
    const base = form === 'new' ? { id: uid(), createdAt: Date.now() } : form!
    await db.txns.put({ ...(base as Txn), type: ftype, kind: kinds.includes(v.kind) ? v.kind : kinds[0], amount, date: v.date || today(), title: v.title?.trim() || (ftype === 'income' ? '收入' : '支出'), note: v.note?.trim() || '' })
    setForm(null); ui.toast('已记一笔 ✍️')
  }

  return (
    <Page name="Wallet">
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-margin h-14 header-safe bg-surface/95 backdrop-blur-md border-b border-surface-container-highest max-w-md mx-auto transition-all">
        <button aria-label="返回" onClick={() => nav(-1)} className="flex items-center justify-center w-9 h-9 rounded-full bg-surface-container-lowest border border-outline-variant/40 text-primary active:scale-95 transition-transform duration-150 hover:bg-surface-container" type="button"><span className="material-symbols-outlined text-[18px]">arrow_back_ios_new</span></button>
        <div className="flex items-center space-x-1.5">
          <div className="w-6 h-6 rounded-full bg-primary-fixed flex items-center justify-center text-primary rotate-3 shadow-xs"><span className="material-symbols-outlined text-[16px]">account_balance_wallet</span></div>
          <h1 className="font-headline-md text-headline-md tracking-tight text-on-surface">记账钱包</h1>
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-secondary align-top -mt-2 animate-pulse" />
        </div>
        <button onClick={exportCsv} className="flex items-center space-x-1 px-3 py-1.5 rounded-full bg-surface-container-lowest border border-primary-container/40 text-primary-container font-label-md text-label-md active:scale-95 transition-transform duration-150 hover:bg-surface-container-low shadow-xs" type="button">
          <span className="material-symbols-outlined text-[15px]">receipt_long</span><span>导出账本</span>
        </button>
      </header>
      <main className="max-w-md mx-auto px-margin pt-20 pt-safe-header space-y-4">
        <div className="h-1" />
        <section className="relative bg-surface-container-lowest rounded-2xl p-5 border border-surface-container-highest sticker-shadow overflow-hidden">
          <div className="absolute -top-1.5 right-6 washi-tape-strip px-4 py-0.5 rounded-sm text-[9px] font-bold text-on-surface-variant tracking-wider uppercase opacity-90 pointer-events-none z-10 border border-white/40">✦ YAO WALLET</div>
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-xl bg-surface-container-low flex items-center justify-center text-primary-container border border-surface-container"><span className="material-symbols-outlined text-[20px]">savings</span></div>
              <div>
                <div className="flex items-center space-x-1.5"><span className="font-title-md text-title-md text-on-surface">累计创作稿费</span><span className="w-2 h-2 rounded-full bg-primary inline-block" /></div>
                <p className="font-label-md text-label-md text-outline">共完成 {doneCount} 笔商业/私稿委托</p>
              </div>
            </div>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-label-md font-label-md bg-surface-container text-outline"><span className="material-symbols-outlined text-[12px] mr-0.5 text-primary">check_circle</span>已校对</span>
          </div>
          <div className="mt-4 flex items-baseline justify-between gap-2">
            <div className="flex items-baseline space-x-1 min-w-0">
              <span className="font-headline-lg text-headline-lg text-primary tracking-tight font-extrabold">{total < 0 ? '-¥' : '¥'}</span>
              <span className="font-display-lg text-display-lg text-primary font-black tracking-tight truncate">{Math.abs(total).toLocaleString('en-US', { maximumFractionDigits: 2 })}</span>
            </div>
            <div className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-full font-label-md text-label-md flex-shrink-0 ${growth !== null && growth < 0 ? 'bg-secondary-fixed/60 text-on-secondary-fixed' : 'bg-primary-fixed/60 text-on-primary-fixed'}`}>
              <span className="material-symbols-outlined text-[14px]">{growth !== null && growth < 0 ? 'trending_down' : 'trending_up'}</span>
              <span>{growth === null ? '本月开张' : `${growth >= 0 ? '+' : ''}${growth.toFixed(1)}% 较上月`}</span>
            </div>
          </div>
          <div className="mt-5 bg-surface-container-low/80 rounded-xl p-3 grid grid-cols-3 gap-2 text-center border border-surface-container">
            <div className="flex flex-col items-center">
              <span className="font-label-md text-label-md text-outline">本月入账</span>
              <span className="font-title-md text-title-md text-primary-container font-extrabold mt-0.5">{yuan(sum(monthInc))}</span>
              <span className="text-[10px] text-primary font-semibold">{monthInc.length}笔入账</span>
            </div>
            <button onClick={() => nav('/orders')} className="flex flex-col items-center border-x border-outline-variant/30 px-1">
              <div className="flex items-center space-x-1"><span className="font-label-md text-label-md text-secondary">待结尾款</span><span className="w-1.5 h-1.5 rounded-full bg-secondary" /></div>
              <span className="font-title-md text-title-md text-secondary font-extrabold mt-0.5">{yuan(pending)}</span>
              <span className="text-[10px] text-secondary font-semibold">{active.length}笔在画中</span>
            </button>
            <button onClick={setGoal} className="flex flex-col items-center">
              <span className="font-label-md text-label-md text-outline">年度累计</span>
              <span className="font-title-md text-title-md text-on-surface font-extrabold mt-0.5">{yuan(yearInc)}</span>
              <span className="text-[10px] text-outline font-semibold">{goal ? `目标 ${Math.round((yearInc / goal) * 100)}%` : '点此设目标'}</span>
            </button>
          </div>
        </section>

        <section className="bg-surface-container-lowest rounded-2xl p-4 border border-surface-container-highest sticker-shadow relative">
          <div className="flex items-center justify-between pb-3 border-b border-surface-container/60">
            <div className="flex items-center space-x-2"><span className="material-symbols-outlined text-primary-container text-[20px]">bar_chart</span><h2 className="font-title-md text-title-md text-on-surface">{year}年 逐月稿费趋势</h2></div>
            <button onClick={() => { const i = years.indexOf(year); setYear(years[(i + 1) % years.length]); setPick(null) }} className="inline-flex items-center space-x-1 rounded-full bg-surface-container px-3 py-1 text-label-md font-label-md text-primary-container hover:bg-surface-container-high transition" type="button">
              <span>{year} 年度</span><span className="material-symbols-outlined text-[14px]">expand_more</span>
            </button>
          </div>
          <div className="pt-5 pb-2">
            <div className="relative h-40 flex flex-col justify-between pointer-events-none">
              {[4, 3, 2, 1, 0].map(i => <div key={i} className={`border-b ${i ? 'border-dashed border-outline-variant/30' : 'border-outline-variant/40'} flex justify-between text-[10px] text-outline`}><span>{k(step * i)}</span></div>)}
              <div className="absolute inset-0 flex items-end justify-between px-1 pointer-events-auto">
                {months.map((m, i) => {
                  const h = Math.max(m > 0 ? 3 : 0, Math.min(100, (Math.max(0, m) / axis) * 100)); const future = i > curM
                  return (
                    <div key={i} onClick={() => setPick(i)} className="flex flex-col items-center flex-1 relative cursor-pointer h-full justify-end">
                      {i === sel && !future && <div className="absolute whitespace-nowrap bg-primary-container text-on-primary text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-sm animate-bounce z-10" style={{ bottom: `calc(${h}% + 6px)` }}>{k(m)}</div>}
                      {future ? <div className="w-3.5 bg-surface-container-highest/60 rounded-t-full border border-dashed border-outline-variant/60" style={{ height: '8%' }} />
                        : i === sel ? <div className="w-4 bg-primary-container rounded-t-full ring-2 ring-primary-fixed" style={{ height: `${Math.max(h, 2)}%` }} />
                        : <div className="w-3.5 bg-primary-fixed-dim/70 rounded-t-full transition-all hover:bg-primary-container" style={{ height: `${h}%` }} />}
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="flex justify-between items-center px-1 mt-2 text-[10px] font-medium text-outline">
              {months.map((_, i) => <span key={i} className={`flex-1 text-center ${i === sel ? 'font-bold text-primary bg-primary-fixed/40 rounded-full' : i > curM ? 'opacity-60' : ''}`}>{i === sel ? `${i + 1}月` : i + 1}</span>)}
            </div>
          </div>
        </section>

        <section className="bg-surface-container-lowest rounded-2xl p-4 border border-surface-container-highest sticker-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2"><span className="material-symbols-outlined text-tertiary text-[20px]">palette</span><h2 className="font-title-md text-title-md text-on-surface">稿件类型收入构成</h2></div>
            <span className="font-label-md text-label-md text-outline">合计 {works} 幅作品</span>
          </div>
          {mix.length ? <>
            <div className="w-full h-3 rounded-full bg-surface-container overflow-hidden flex gap-0.5 p-0.5">
              {mix.map((x, i) => <div key={x.name} className={`h-full ${MIX_C[i]} ${i === 0 ? 'rounded-l-full' : ''} ${i === mix.length - 1 ? 'rounded-r-full' : ''}`} style={{ width: `${Math.max(x.pct, 2)}%` }} title={`${x.name} ${x.pct}%`} />)}
            </div>
            <div className={`mt-3.5 grid ${mix.length > 3 ? 'grid-cols-4' : 'grid-cols-3'} gap-2 pt-2 border-t border-surface-container/60`}>
              {mix.map((x, i) => (
                <div key={x.name} className="flex flex-col min-w-0">
                  <div className="flex items-center space-x-1.5"><span className={`w-2.5 h-2.5 rounded-full ${MIX_C[i]} flex-shrink-0`} /><span className="font-label-md text-label-md text-on-surface truncate">{x.name}</span></div>
                  <span className="font-title-md text-title-md text-on-surface font-bold mt-1 truncate">{yuan(x.v)}</span>
                  <span className="text-[10px] text-outline">占比 {x.pct}% · {x.n}单</span>
                </div>
              ))}
            </div>
          </> : <p className="text-center text-outline font-label-md text-label-md py-3">完成稿单或记一笔收入后，这里会显示收入构成</p>}
        </section>

        <section className="space-y-3">
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center space-x-2"><span className="material-symbols-outlined text-primary text-[20px]">edit_note</span><h2 className="font-title-md text-title-md text-on-surface">收支明细账目</h2></div>
            {list.length > 8 && <button onClick={() => setAll(!all)} className="font-label-md text-label-md text-primary-container font-semibold cursor-pointer flex items-center">{all ? '收起明细' : '查看全部明细'}<span className="material-symbols-outlined text-[14px]">{all ? 'expand_less' : 'arrow_forward_ios'}</span></button>}
          </div>
          <div className="flex space-x-2 overflow-x-auto no-scrollbar py-1">
            {(Object.keys(groups) as Filter[]).map(f => (
              <button key={f} onClick={() => setFilter(f)} className={`px-3.5 py-1 rounded-full font-label-md text-label-md shrink-0 active:scale-95 transition-transform ${filter === f ? 'bg-primary-container text-on-primary shadow-xs' : 'bg-surface-container-lowest border border-outline-variant/60 text-outline hover:bg-surface-container'}`} type="button">{f} ({groups[f].length})</button>
            ))}
          </div>
          <div className="space-y-2.5">
            {shown.map(t => {
              const o = t.orderId ? om.get(t.orderId) : undefined; const pend = isPendingDep(t); const isOut = t.type === 'expense'
              const tagC = isOut ? 'bg-surface-container-high text-on-surface-variant' : t.kind === '定金' ? 'bg-secondary-fixed text-on-secondary-fixed' : t.kind === '加急费' ? 'bg-tertiary-fixed text-on-tertiary-fixed' : 'bg-primary-fixed text-on-primary-fixed'
              return (
                <article key={t.id} onClick={() => openForm(t)} className="bg-surface-container-lowest rounded-xl p-3.5 border border-surface-container-highest sticker-shadow relative overflow-hidden transition-all active:scale-[0.99]">
                  <div className={`absolute left-0 top-0 bottom-0 w-1 ${pend ? 'bg-secondary' : isOut ? 'bg-outline' : 'bg-primary'}`} />
                  <div className="flex justify-between items-start pl-1 gap-2">
                    <div className="space-y-0.5 min-w-0">
                      <div className="flex items-center space-x-1.5"><span className="font-body-lg text-body-lg text-on-surface font-bold truncate">{t.title}</span><span className={`px-1.5 py-0.2 rounded text-[10px] font-bold flex-shrink-0 ${tagC}`}>{t.kind}</span></div>
                      <p className="font-label-md text-label-md text-outline truncate">{mdDate(t.date)} · {o ? `${o.platform}委托 · ${o.no}` : t.note || (isOut ? '手动支出' : '手动记账')}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className={`font-title-md text-title-md font-black ${isOut ? 'text-secondary' : 'text-primary'}`}>{isOut ? '-' : '+'}{yuan(t.amount)}</span>
                      <span className="block text-[10px] text-outline">{o ? o.platform : isOut ? '支出' : '收入'}</span>
                    </div>
                  </div>
                  <div className="mt-2 pl-1 pt-2 border-t border-surface-container/60 flex items-center justify-between">
                    {pend && o ? <>
                      <div className="flex items-center space-x-1 text-secondary text-[11px] font-semibold"><span className="material-symbols-outlined text-[13px]">hourglass_top</span><span>待收尾款 {yuan(o.total - o.deposit)} ({statusLabel(o.status)}阶段)</span></div>
                      <button onClick={e => { e.stopPropagation(); nav(`/orders/${o.id}`) }} className="px-2 py-0.5 rounded-full bg-secondary-fixed-dim/40 text-on-secondary-fixed-variant text-[11px] font-bold hover:bg-secondary-fixed" type="button">催验收</button>
                    </> : <>
                      <div className={`flex items-center space-x-1 text-[11px] font-medium ${isOut ? 'text-outline' : 'text-primary-container'}`}><span className="material-symbols-outlined text-[13px]">{isOut ? 'shopping_bag' : o ? 'verified' : 'check_circle'}</span><span>{isOut ? '已记支出' : o ? `已结清 100% · ${statusLabel(o.status)}` : '已入账'}</span></div>
                      <span className="text-[10px] text-outline">{o ? '点击查看稿单' : '点击编辑'}</span>
                    </>}
                  </div>
                </article>
              )
            })}
            {!list.length && <div className="rounded-xl border-2 border-dashed border-outline-variant/50 py-8 text-center text-outline font-label-md text-label-md">暂无账目，推进稿单收款或点「记一笔」吧</div>}
          </div>
        </section>

        <section className="mt-6 mb-2">
          <div className="rounded-xl border-2 border-dashed border-primary-container/40 bg-surface-container-lowest/60 p-4 text-center relative overflow-hidden">
            <div className="w-10 h-10 rounded-full bg-surface-container-high mx-auto flex items-center justify-center text-primary-container mb-2 shadow-xs"><span className="material-symbols-outlined text-[20px]">shield</span></div>
            <h3 className="font-title-md text-title-md text-on-surface font-bold">本地离线存盘 · 零网络上传</h3>
            <p className="font-label-md text-label-md text-outline mt-1">财务与稿酬明细均存储于本地沙盒数据库，保护创作者商业隐私</p>
            <div className="mt-2 pt-2 border-t border-dashed border-outline-variant/40 inline-flex items-center space-x-1 text-[10px] text-outline-variant font-mono"><span>妖画集 v{pkg.version}</span><span>•</span><span>IndexedDB 本地沙盒存储</span></div>
          </div>
        </section>
        <div className="h-8" />
      </main>
      <div className="fixed bottom-[calc(var(--sab)+88px)] right-4 z-40 max-w-md">
        <button onClick={() => openForm('new')} className="flex items-center space-x-1.5 px-4 py-3 rounded-full bg-primary-container text-on-primary font-label-lg text-label-lg shadow-lg active:scale-95 transition-transform duration-150 border-2 border-surface-container-lowest" style={{ boxShadow: '0 6px 18px rgba(60, 106, 88, 0.35)' }} type="button">
          <span className="material-symbols-outlined text-[20px]">add</span><span className="tracking-wide">记一笔</span>
        </button>
      </div>
      <BottomNav />
      <FormSheet open={!!form} title={form === 'new' ? '记一笔' : '编辑账目'} icon="edit_note" onClose={() => setForm(null)} onSubmit={submit}
        onDelete={form && form !== 'new' ? async () => { if (await ui.confirm({ title: '删除这笔账目？', danger: true, okText: '删除' })) { await db.txns.delete((form as Txn).id); setForm(null) } } : undefined}
        initial={form && form !== 'new' ? { kind: form.kind, amount: String(form.amount), date: form.date, title: form.title, note: form.note } : { kind: (ftype === 'income' ? KINDS_IN : KINDS_OUT)[0], date: today() }}
        fields={[{ key: 'kind', label: '分类', type: 'chips', options: ftype === 'income' ? KINDS_IN : KINDS_OUT }, { key: 'amount', label: '金额 (¥)', type: 'number', half: true, placeholder: '0' }, { key: 'date', label: '日期', type: 'date', half: true }, { key: 'title', label: '标题', placeholder: ftype === 'income' ? '如：桃桃气泡水 · 头像' : '如：Procreate 笔刷包' }, { key: 'note', label: '备注', placeholder: '结算方式、说明等' }]}>
        <div className="grid grid-cols-2 gap-2 mt-4 p-1 rounded-xl bg-[#efeee6]">
          {(['income', 'expense'] as const).map(x => <button key={x} type="button" onClick={() => setFtype(x)} className={`h-9 rounded-lg text-[13px] font-bold ${ftype === x ? (x === 'income' ? 'bg-[#3c6a58] text-white' : 'bg-[#e06d63] text-white') : 'text-[#656e67]'}`}>{x === 'income' ? '收入' : '支出'}</button>)}
        </div>
      </FormSheet>
    </Page>
  )
}
