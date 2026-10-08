import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Page from '../components/Page'
import Img from '../components/Img'
import { useUI } from '../components/ui'
import { db, type Order } from '../lib/db'
import { blankOrder, saveOrder, PLATFORMS, ORDER_TYPES, CANVAS, LICENSES, REMIND_RULES, COMMON_TAGS, STATUS, nextOrderNo } from '../lib/orders'
import { cnDate, daysLeft, today } from '../lib/format'
import { pickImages } from '../lib/images'

const card = 'bg-surface-container-lowest rounded-xl p-space-lg shadow-[0_4px_18px_rgba(74,90,80,0.05),0_1px_3px_rgba(74,90,80,0.03)] flex flex-col'
const Title = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center gap-space-xs"><span className="w-2 h-4 rounded-full bg-primary" /><h2 className="font-title-md text-title-md text-on-surface">{children}</h2></div>
)
const STATUS_ICON_CLS = ['', 'text-tertiary', 'text-outline', 'text-primary']

export default function OrderNew() {
  const { id } = useParams(); const nav = useNavigate(); const ui = useUI()
  const [o, setO] = useState<Order | null>(null)
  const [platforms, setPlatforms] = useState<string[]>(PLATFORMS)
  const [types, setTypes] = useState<string[]>(ORDER_TYPES)
  const [no, setNo] = useState('')
  useEffect(() => {
    (async () => {
      const cp = (await db.kv.get('customPlatforms'))?.value as string[] | undefined
      const ct = (await db.kv.get('customTypes'))?.value as string[] | undefined
      if (cp) setPlatforms([...PLATFORMS, ...cp]); if (ct) setTypes([...ORDER_TYPES, ...ct])
      if (id) { const x = await db.orders.get(id); if (x) { setO(x); setNo(x.no); return } }
      const sp = new URLSearchParams(location.hash.split('?')[1] || ''); const b = blankOrder()
      if (sp.get('date')) b.startDate = sp.get('date')!
      setO(b); setNo(await nextOrderNo())
    })()
  }, [id])
  const set = <K extends keyof Order>(k: K, v: Order[K]) => setO(p => (p ? { ...p, [k]: v } : p))
  const depPct = useMemo(() => (o && o.total > 0 ? Math.round((o.deposit / o.total) * 100) : 0), [o])
  if (!o) return <Page name="OrderNew" className="min-h-screen bg-surface" />
  const left = daysLeft(o.deadline)

  const addImgs = async () => {
    if (o.refImages.length >= 9) return ui.toast('最多上传 9 张参考图')
    const ids = await pickImages(true); set('refImages', [...o.refImages, ...ids].slice(0, 9))
  }
  const addPlatform = async () => {
    const v = await ui.prompt({ title: '添加来源平台', placeholder: '如：画加、微博、闲鱼', icon: 'add_link' }); if (!v) return
    const cp = [...platforms.slice(PLATFORMS.length), v]; await db.kv.put({ key: 'customPlatforms', value: cp }); setPlatforms([...PLATFORMS, ...cp]); set('platform', v)
  }
  const addType = async () => {
    const v = await ui.prompt({ title: '自定义稿件类型', placeholder: '如：半身、全身、场景', icon: 'add' }); if (!v) return
    const ct = [...types.slice(ORDER_TYPES.length), v]; await db.kv.put({ key: 'customTypes', value: ct }); setTypes([...ORDER_TYPES, ...ct]); set('types', [...o.types, v])
  }
  const removeType = async (t: string) => {
    if (ORDER_TYPES.includes(t)) return
    if (!(await ui.confirm({ title: '删除自定义类型', message: `确定删除「${t}」吗？`, danger: true, okText: '删除' }))) return
    const ct = types.slice(ORDER_TYPES.length).filter(x => x !== t); await db.kv.put({ key: 'customTypes', value: ct }); setTypes([...ORDER_TYPES, ...ct]); set('types', o.types.filter(x => x !== t))
  }
  let pressTimer: ReturnType<typeof setTimeout> | undefined
  const submit = async () => {
    if (!o.client.trim()) return ui.toast('请填写客户昵称 / 约稿方')
    if (!o.types.length) return ui.toast('请至少选择一个稿件类型')
    if (o.deposit > o.total) return ui.toast('定金不能大于稿酬总额')
    if (o.deadline && o.startDate && o.deadline < o.startDate) return ui.toast('截稿日不能早于起稿日')
    const saved = await saveOrder({ ...o, no: o.no || no, depositPaid: o.depositPaid || o.status !== 'pending' })
    ui.toast(id ? '稿单已更新' : '稿单已创建'); nav(`/orders/${saved.id}`, { replace: true })
  }
  const reset = async () => { if (await ui.confirm({ title: '重置表单', message: '清空当前填写的所有内容？' })) setO({ ...blankOrder(), id: o.id, createdAt: o.createdAt, no: o.no }) }
  const chip = (on: boolean, extra = '') => `px-space-md py-1 rounded-full font-label-md text-label-md ${on ? 'bg-primary text-on-primary shadow-sm' : 'bg-surface-container text-on-surface'} ${extra}`

  return (
    <Page name="OrderNew" className="bg-surface font-body-lg text-body-lg text-on-surface antialiased flex flex-col min-h-screen">
      <header className="fixed top-0 w-full max-w-md left-1/2 -translate-x-1/2 z-50 pt-safe bg-surface/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(74,90,80,0.04)]">
        <div className="h-14 px-margin flex items-center justify-between">
          <div className="flex items-center gap-space-sm">
            <button aria-label="取消或返回" onClick={() => nav(-1)} className="w-11 h-11 -ml-space-sm flex items-center justify-center rounded-full hover:bg-surface-container active:scale-95 text-on-surface transition-all">
              <span className="material-symbols-outlined text-[24px]">arrow_back_ios_new</span>
            </button>
            <h1 className="font-headline-md text-headline-md text-on-surface font-bold tracking-tight">{id ? '编辑稿单' : '新建稿单'}</h1>
          </div>
          <div className="flex items-center gap-space-sm">
            <button aria-label="保存提交" onClick={submit} className="h-9 px-space-lg rounded-full bg-primary text-on-primary font-label-lg text-label-lg shadow-[0_4px_12px_rgba(35,82,65,0.25)] active:scale-95 transition-all flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-[16px]">check</span><span>保存</span>
            </button>
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-[0_2px_8px_rgba(35,82,65,0.2)]">
              <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-1 flex flex-col relative w-full max-w-md mx-auto pt-14 bg-surface">
        <div className="flex flex-col w-full pb-28">
          <div className="px-margin pt-space-md pb-space-sm flex items-center justify-between">
            <div className="flex items-center gap-space-xs text-on-surface-variant">
              <span className="material-symbols-outlined text-[18px] text-primary" style={{ fontVariationSettings: '"FILL" 1' }}>auto_stories</span>
              <span className="font-label-lg text-label-lg text-on-surface-variant tracking-wide">约稿手账 · 专属档簿</span>
            </div>
            <span className="px-space-sm py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label-md text-label-md">No. {o.no || no}</span>
          </div>
          <div className="px-margin flex flex-col gap-space-lg">
            {/* 参考图 */}
            <div className={`${card} gap-space-md`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-space-xs">
                  <span className="w-2 h-4 rounded-full bg-primary" />
                  <h2 className="font-title-md text-title-md text-on-surface">参考图 / 设子橱窗</h2>
                  <span className="text-tertiary font-label-md text-label-md ml-1 bg-tertiary-fixed/60 px-space-xs py-0.5 rounded-full">最多9张</span>
                </div>
                <span className="font-label-md text-label-md text-on-surface-variant flex items-center gap-0.5">
                  <span className="material-symbols-outlined text-[14px] text-primary">auto_fix_high</span>支持多选智能压缩
                </span>
              </div>
              <div className="grid grid-cols-3 gap-space-md">
                {o.refImages.map((im, i) => (
                  <div key={im} className="relative group aspect-square rounded-xl overflow-hidden shadow-sm bg-surface-container-high">
                    <Img id={im} className="w-full h-full object-cover" />
                    <div onClick={() => set('refImages', o.refImages.filter(x => x !== im))} className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-on-surface/60 backdrop-blur-sm text-surface flex items-center justify-center cursor-pointer active:scale-90 transition-transform">
                      <span className="material-symbols-outlined text-[14px]">close</span>
                    </div>
                    <span className="absolute bottom-1.5 left-1.5 px-space-xs py-0.5 rounded-md bg-inverse-surface/75 text-inverse-on-surface font-label-md text-label-md scale-90 origin-bottom-left">{i === 0 ? '主设' : i === 1 ? '服设' : `参考${i + 1}`}</span>
                  </div>
                ))}
                {o.refImages.length < 9 && (
                  <div onClick={addImgs} className="aspect-square rounded-xl bg-surface-container-low flex flex-col items-center justify-center gap-space-xs cursor-pointer active:scale-95 transition-all text-primary hover:bg-surface-container shadow-inner">
                    <div className="w-10 h-10 rounded-full bg-surface-container-lowest flex items-center justify-center shadow-[0_2px_8px_rgba(74,90,80,0.08)]">
                      <span className="material-symbols-outlined text-[24px]">add_photo_alternate</span>
                    </div>
                    <span className="font-label-md text-label-md text-primary font-bold">添加设子</span>
                  </div>
                )}
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-tertiary">tips_and_updates</span>
                提示：上传正面高清设定图、配色色板与服装细节，画师更不易翻车哦
              </p>
            </div>
            {/* 基础信息 */}
            <div className={`${card} gap-space-lg`}>
              <Title>约稿基础信息</Title>
              <div className="flex flex-col gap-space-xs">
                <label className="font-label-lg text-label-lg text-on-surface flex items-center justify-between">
                  <span>客户昵称 / 约稿方</span><span className="font-label-md text-label-md text-on-surface-variant font-normal">来源平台</span>
                </label>
                <div className="flex items-center gap-space-sm bg-surface-container-low rounded-xl px-space-md py-space-sm">
                  <span className="material-symbols-outlined text-[20px] text-outline">badge</span>
                  <input className="flex-1 min-w-0 bg-transparent font-body-lg text-body-lg text-on-surface focus:outline-none" placeholder="输入客户名称或备注名" type="text" value={o.client} onChange={e => set('client', e.target.value)} />
                  {o.client && <button onClick={() => set('client', '')} className="text-outline hover:text-on-surface flex items-center"><span className="material-symbols-outlined text-[18px]">cancel</span></button>}
                </div>
                <div className="flex items-center gap-space-xs flex-wrap pt-space-xs">
                  {platforms.map(p => p === o.platform ? (
                    <button key={p} className="px-space-md py-1 rounded-full bg-primary text-on-primary font-label-md text-label-md flex items-center gap-1 shadow-sm"><span className="w-1.5 h-1.5 rounded-full bg-primary-fixed" />{p}</button>
                  ) : (
                    <button key={p} onClick={() => set('platform', p)} className="px-space-md py-1 rounded-full bg-surface-container text-on-surface-variant font-label-md text-label-md active:bg-surface-container-high transition-colors">{p}</button>
                  ))}
                  <button onClick={addPlatform} className="px-space-md py-1 rounded-full bg-surface-container text-on-surface-variant font-label-md text-label-md active:bg-surface-container-high transition-colors">+ 平台</button>
                </div>
              </div>
              <div className="flex flex-col gap-space-xs">
                <div className="flex items-center justify-between">
                  <label className="font-label-lg text-label-lg text-on-surface">稿件类型</label>
                  <span className="font-label-md text-label-md text-tertiary">长按自定义类型可删除</span>
                </div>
                <div className="flex flex-wrap gap-space-xs">
                  {types.map(t => {
                    const on = o.types.includes(t)
                    return <button key={t} onClick={() => set('types', on ? o.types.filter(x => x !== t) : [...o.types, t])}
                      onTouchStart={() => { pressTimer = setTimeout(() => removeType(t), 600) }} onTouchEnd={() => clearTimeout(pressTimer)} onContextMenu={e => { e.preventDefault(); removeType(t) }}
                      className={`px-space-md py-space-xs rounded-full font-label-lg text-label-lg ${on ? 'bg-primary text-on-primary shadow-[0_4px_12px_rgba(35,82,65,0.2)]' : 'bg-surface-container text-on-surface'}`}>{t}</button>
                  })}
                  <button onClick={addType} className="px-space-md py-space-xs rounded-full bg-surface-container-low text-primary font-label-lg text-label-lg flex items-center gap-0.5">
                    <span className="material-symbols-outlined text-[16px]">add</span>自定义
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-space-xs">
                <label className="font-label-lg text-label-lg text-on-surface">当前工序状态</label>
                <div className="grid grid-cols-4 gap-space-xs">
                  {STATUS.map((s, i) => (
                    <div key={s.key} onClick={() => setO({ ...o, status: s.key, depositPaid: s.key !== 'pending' ? true : o.depositPaid, balancePaid: s.key === 'done' })}
                      className={`py-space-sm px-space-xs rounded-xl font-label-md text-label-md flex flex-col items-center justify-center gap-1 cursor-pointer ${o.status === s.key ? 'bg-primary text-on-primary shadow-[0_4px_10px_rgba(35,82,65,0.18)]' : 'bg-surface-container text-on-surface'}`}>
                      <span className={`material-symbols-outlined text-[18px] ${o.status === s.key ? '' : STATUS_ICON_CLS[i]}`}>{s.icon}</span><span>{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* 价格与规格 */}
            <div className={`${card} gap-space-lg`}>
              <Title>价格与画面规格</Title>
              <div className="grid grid-cols-2 gap-space-md">
                <div className="flex flex-col gap-space-xs">
                  <label className="font-label-lg text-label-lg text-on-surface">稿酬总额</label>
                  <div className="flex items-center bg-surface-container-low rounded-xl px-space-md py-space-sm">
                    <span className="font-title-md text-title-md text-primary font-bold mr-1">¥</span>
                    <input className="w-full bg-transparent font-stat-counter text-stat-counter text-on-surface focus:outline-none" type="number" inputMode="decimal" placeholder="0" value={o.total || ''} onChange={e => { const t = Number(e.target.value) || 0; setO({ ...o, total: t, deposit: o.deposit && o.total ? o.deposit : Math.round(t / 2) }) }} />
                  </div>
                </div>
                <div className="flex flex-col gap-space-xs">
                  <label className="font-label-lg text-label-lg text-on-surface flex items-center justify-between">
                    <span>定金款项</span><span className="text-tertiary font-label-md text-label-md">{depPct}%</span>
                  </label>
                  <div className="flex items-center bg-surface-container-low rounded-xl px-space-md py-space-sm">
                    <span className="font-title-md text-title-md text-tertiary font-bold mr-1">¥</span>
                    <input className="w-full bg-transparent font-stat-counter text-stat-counter text-on-surface focus:outline-none" type="number" inputMode="decimal" placeholder="0" value={o.deposit || ''} onChange={e => set('deposit', Number(e.target.value) || 0)} />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-space-xs">
                <label className="font-label-lg text-label-lg text-on-surface">画布规格</label>
                <div className="flex flex-wrap gap-space-xs">
                  {CANVAS.map(c => (
                    <button key={c.label} onClick={() => setO({ ...o, canvas: c.label, canvasW: c.w || o.canvasW, canvasH: c.h || o.canvasH })}
                      className={o.canvas === c.label ? 'px-space-md py-1 rounded-full bg-primary text-on-primary font-label-md text-label-md shadow-sm' : c.w ? 'px-space-md py-1 rounded-full bg-surface-container text-on-surface font-label-md text-label-md' : 'px-space-md py-1 rounded-full bg-surface-container-low text-on-surface-variant font-label-md text-label-md'}>{c.label}</button>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-space-md mt-space-xs">
                  {(['canvasW', 'canvasH'] as const).map(k => (
                    <div key={k} className="flex items-center bg-surface-container-low rounded-xl px-space-md py-space-xs text-on-surface-variant">
                      <span className="font-label-md text-label-md mr-2">{k === 'canvasW' ? '宽' : '高'}</span>
                      <input className="w-full bg-transparent font-body-lg text-body-lg text-on-surface focus:outline-none" type="number" inputMode="numeric" value={o[k] || ''} onChange={e => setO({ ...o, [k]: Number(e.target.value) || 0, canvas: '自定义尺寸' })} />
                      <span className="font-label-md text-label-md text-outline">px</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-space-xs">
                <label className="font-label-lg text-label-lg text-on-surface">授权用途及范围</label>
                <div className="flex flex-wrap gap-space-xs">
                  {LICENSES.map(l => <button key={l} onClick={() => set('license', l)} className={chip(o.license === l)}>{l}</button>)}
                </div>
              </div>
            </div>
            {/* 排期 */}
            <div className={`${card} gap-space-lg`}>
              <Title>排期排单与提醒</Title>
              <div className="grid grid-cols-2 gap-space-md">
                <label className="relative flex flex-col gap-space-xs bg-surface-container-low p-space-md rounded-xl cursor-pointer active:scale-98 transition-transform">
                  <div className="flex items-center justify-between">
                    <span className="font-label-md text-label-md text-on-surface-variant flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-primary" />起稿接单日</span>
                    <span className="material-symbols-outlined text-[16px] text-outline">calendar_month</span>
                  </div>
                  <p className="font-title-md text-title-md text-on-surface font-bold mt-1">{cnDate(o.startDate)}</p>
                  <span className="font-label-md text-label-md text-primary">已排档期 · {o.startDate === today() ? '今天' : daysLeft(o.startDate) > 0 ? `${daysLeft(o.startDate)} 天后` : `${-daysLeft(o.startDate)} 天前`}</span>
                  <input type="date" className="absolute inset-0 opacity-0" value={o.startDate} onChange={e => set('startDate', e.target.value)} />
                </label>
                <label className="relative flex flex-col gap-space-xs bg-secondary-fixed/30 p-space-md rounded-xl cursor-pointer active:scale-98 transition-transform">
                  <div className="flex items-center justify-between">
                    <span className="font-label-md text-label-md text-secondary flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-secondary" />最终截稿日</span>
                    <span className="material-symbols-outlined text-[16px] text-secondary">event_busy</span>
                  </div>
                  <p className="font-title-md text-title-md text-on-secondary-fixed font-bold mt-1">{cnDate(o.deadline)}</p>
                  <span className="font-label-md text-label-md text-secondary">{!o.deadline ? '未设置' : left >= 0 ? `剩余 ${left} 天` : `已逾期 ${-left} 天`}</span>
                  <input type="date" className="absolute inset-0 opacity-0" value={o.deadline} onChange={e => set('deadline', e.target.value)} />
                </label>
              </div>
              <div className="flex flex-col gap-space-sm pt-space-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-space-xs">
                    <span className="material-symbols-outlined text-[20px] text-primary">notifications_active</span>
                    <span className="font-label-lg text-label-lg text-on-surface">截稿节点智能推送提醒</span>
                  </div>
                  <div onClick={() => set('remind', !o.remind)} className={`w-12 h-6 rounded-full p-0.5 flex items-center cursor-pointer shadow-inner transition-colors ${o.remind ? 'bg-primary justify-end' : 'bg-surface-container-highest justify-start'}`}>
                    <div className="w-5 h-5 rounded-full bg-on-primary shadow-md" />
                  </div>
                </div>
                {o.remind && <div className="flex items-center gap-space-xs pt-1 flex-wrap">
                  {REMIND_RULES.map(r => {
                    const on = o.remindRules.includes(r)
                    return <button key={r} onClick={() => set('remindRules', on ? o.remindRules.filter(x => x !== r) : [...o.remindRules, r])} className={`px-space-md py-1 rounded-full font-label-md text-label-md ${on ? 'bg-primary-fixed text-on-primary-fixed' : 'bg-surface-container text-on-surface'}`}>{r}</button>
                  })}
                </div>}
              </div>
            </div>
            {/* 要求 */}
            <div className={`${card} gap-space-sm`}>
              <div className="flex items-center justify-between">
                <Title>约稿具体要求 / 细节备忘</Title>
                <span className="font-label-md text-label-md text-outline">已输入 {o.requirement.length} 字</span>
              </div>
              <div className="bg-surface-container-low rounded-xl p-space-md mt-space-xs">
                <textarea className="w-full bg-transparent font-body-md text-body-md text-on-surface placeholder-outline focus:outline-none resize-none leading-relaxed" placeholder="记录约稿要求、设定细节、修改意见等..." rows={4} value={o.requirement} onChange={e => set('requirement', e.target.value)} />
              </div>
              <div className="flex items-center gap-space-xs flex-wrap pt-space-xs">
                <span className="font-label-md text-label-md text-outline flex items-center gap-0.5"><span className="material-symbols-outlined text-[14px]">sell</span>常用标签:</span>
                {COMMON_TAGS.map(t => {
                  const on = o.tags.includes(t)
                  return <span key={t} onClick={() => set('tags', on ? o.tags.filter(x => x !== t) : [...o.tags, t])} className={`px-space-sm py-0.5 rounded-md font-label-md text-label-md cursor-pointer ${on ? 'bg-primary text-on-primary' : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'}`}>{t}</span>
                })}
              </div>
            </div>
          </div>
          <div className="fixed bottom-0 left-0 right-0 z-40 bg-surface/90 backdrop-blur-xl px-margin py-space-md pb-[calc(var(--sab)+12px)] shadow-[0_-4px_16px_rgba(74,90,80,0.06)]">
            <div className="max-w-md mx-auto flex items-center gap-space-md">
              <button onClick={reset} className="h-12 px-space-xl rounded-full bg-surface-container-high text-on-surface font-label-lg text-label-lg active:scale-95 transition-all flex items-center justify-center gap-space-xs shadow-sm">
                <span className="material-symbols-outlined text-[18px]">restart_alt</span><span>重置</span>
              </button>
              <button onClick={submit} className="flex-1 h-12 rounded-full bg-primary text-on-primary font-title-md text-title-md shadow-[0_6px_16px_rgba(60,106,88,0.25)] active:scale-98 transition-all flex items-center justify-center gap-space-xs">
                <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: '"FILL" 1' }}>draw</span>
                <span>{id ? '保存修改' : '立即创建稿单'}</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </Page>
  )
}
