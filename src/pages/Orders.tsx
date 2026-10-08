import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLiveQuery } from 'dexie-react-hooks'
import Page from '../components/Page'
import Img from '../components/Img'
import BottomNav from '../components/BottomNav'
import { db, type OrderStatus } from '../lib/db'
import { STATUS, statusLabel } from '../lib/orders'
import { daysLeft, pad, today, toISO, yuan } from '../lib/format'

const SORTS = [{ k: 'created', l: '按创建时间' }, { k: 'deadline', l: '按截稿日' }, { k: 'amount', l: '按稿酬金额' }] as const
const STAT_ICON = [
  'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
  'M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z',
  'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
  'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z',
]
const STAT_COLOR = ['text-[#355b4e]', 'text-[#b58145]', 'text-[#4c7c9b]', 'text-[#4d7f57]']
const BADGE: Record<OrderStatus, string> = { pending: 'bg-[#e4ede6] text-[#355b4e]', progress: 'bg-[#f8ecdc] text-[#b58145]', review: 'bg-[#e3edf4] text-[#4c7c9b]', done: 'bg-[#e6efe6] text-[#4d7f57]' }

export default function Orders() {
  const nav = useNavigate()
  const orders = useLiveQuery(() => db.orders.toArray(), []) || []
  const now = new Date()
  const [ym, setYm] = useState({ y: now.getFullYear(), m: now.getMonth() })
  const [day, setDay] = useState<string | null>(null)
  const [q, setQ] = useState('')
  const [f, setF] = useState<OrderStatus | 'all'>('all')
  const [sort, setSort] = useState(0)

  const marks = useMemo(() => {
    const m: Record<string, { s?: boolean; d?: boolean }> = {}
    orders.forEach(o => { if (o.startDate) (m[o.startDate] ??= {}).s = true; if (o.deadline && o.status !== 'done') (m[o.deadline] ??= {}).d = true })
    return m
  }, [orders])
  const cells = useMemo(() => {
    const first = new Date(ym.y, ym.m, 1); const start = new Date(first); start.setDate(1 - first.getDay())
    const n = Math.ceil((first.getDay() + new Date(ym.y, ym.m + 1, 0).getDate()) / 7) * 7
    return Array.from({ length: n }, (_, i) => { const d = new Date(start); d.setDate(start.getDate() + i); return { d, iso: toISO(d), cur: d.getMonth() === ym.m, before: d < first } })
  }, [ym])
  const counts = STATUS.map(s => orders.filter(o => o.status === s.key).length)
  const list = useMemo(() => {
    const kw = q.trim().toLowerCase()
    let r = orders.filter(o => (f === 'all' || o.status === f) && (!day || o.startDate === day || o.deadline === day))
    if (kw) r = r.filter(o => [o.client, o.platform, o.types.join(' '), statusLabel(o.status), o.requirement, o.tags.join(' '), o.startDate, o.deadline, o.no, o.contact || ''].join(' ').toLowerCase().includes(kw))
    const k = SORTS[sort].k
    return r.sort((a, b) => k === 'deadline' ? (a.deadline || '9').localeCompare(b.deadline || '9') : k === 'amount' ? b.total - a.total : b.createdAt - a.createdAt)
  }, [orders, q, f, day, sort])
  const shift = (d: number) => setYm(({ y, m }) => { const x = new Date(y, m + d, 1); return { y: x.getFullYear(), m: x.getMonth() } })
  const t = today()

  return (
    <Page name="Orders">
      <header className="w-full pt-1.5 px-5 select-none bg-transparent pt-safe-top">
        <div className="flex items-center justify-center pt-3 pb-2 text-[#303d36]">
          <div className="flex items-center space-x-1.5 text-lg font-bold"><span className="text-xl">📋</span><span className="tracking-wide text-[19px]">稿单</span></div>
        </div>
      </header>
      <main className="w-full px-4 max-w-md mx-auto space-y-4">
        <section className="w-full pt-1" data-purpose="schedule-calendar">
          <div className="flex items-center justify-between px-2 mb-4">
            <button aria-label="上个月" onClick={() => shift(-1)} className="w-8 h-8 rounded-full bg-[#e3ebe5] flex items-center justify-center text-[#4b5b52] hover:bg-[#d6e2d9] transition-colors" type="button">
              <svg className="w-4 h-4 -translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <label className="relative bg-[#e4ede6] px-4 py-1.5 rounded-full flex items-center space-x-1.5 text-[#304138] font-bold text-base shadow-sm">
              <span>{ym.y}年 {ym.m + 1}月</span>
              <svg className="w-3.5 h-3.5 text-[#516359] fill-current" viewBox="0 0 20 20"><path clipRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" fillRule="evenodd" /></svg>
              <input type="month" className="absolute inset-0 opacity-0" value={`${ym.y}-${pad(ym.m + 1)}`} onChange={e => { const [y, m] = e.target.value.split('-').map(Number); if (y) setYm({ y, m: m - 1 }) }} />
            </label>
            <button aria-label="下个月" onClick={() => shift(1)} className="w-8 h-8 rounded-full bg-[#e3ebe5] flex items-center justify-center text-[#4b5b52] hover:bg-[#d6e2d9] transition-colors" type="button">
              <svg className="w-4 h-4 translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          </div>
          <div className="grid grid-cols-7 text-center text-xs font-semibold text-[#5a7b6b] mb-2">{'日一二三四五六'.split('').map(w => <div key={w}>{w}</div>)}</div>
          <div className="grid grid-cols-7 gap-y-3.5 text-center text-sm font-semibold text-[#33423a] items-center">
            {cells.map(c => {
              const mk = marks[c.iso]; const sel = day ? c.iso === day : c.iso === t
              const dots = mk && <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 flex gap-0.5">{mk.s && <span className="w-1 h-1 rounded-full bg-theme-dot-order" />}{mk.d && <span className="w-1 h-1 rounded-full bg-theme-dot-deadline" />}</span>
              if (!c.cur) return <div key={c.iso} onClick={() => setYm({ y: c.d.getFullYear(), m: c.d.getMonth() })} className={`relative ${c.before ? 'text-[#c1ccc4]' : 'text-[#cbd4cd]'} text-[15px]`}>{c.d.getDate()}{dots}</div>
              if (sel) return (
                <div key={c.iso} className="flex justify-center items-center" onClick={() => setDay(day === c.iso ? null : c.iso)}>
                  <div className="relative w-10 h-10 bg-theme-primary text-white rounded-[13px] flex items-center justify-center font-bold text-base shadow-sm">{c.d.getDate()}{mk && <span className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-0.5">{mk.s && <span className="w-1 h-1 rounded-full bg-white" />}{mk.d && <span className="w-1 h-1 rounded-full bg-[#ffc1ba]" />}</span>}</div>
                </div>
              )
              return <div key={c.iso} onClick={() => setDay(c.iso)} className={`relative text-[15px] ${c.iso === t ? 'text-theme-primary font-extrabold' : ''}`}>{c.d.getDate()}{dots}</div>
            })}
          </div>
          <div className="flex items-center justify-center space-x-6 mt-4 text-xs font-medium text-[#4a5851]">
            <div className="flex items-center space-x-1.5"><span className="w-2 h-2 rounded-full bg-theme-dot-order" /><span>接稿日</span></div>
            <div className="flex items-center space-x-1.5"><span className="w-2 h-2 rounded-full bg-theme-dot-deadline" /><span>截稿日</span></div>
            {day && <button onClick={() => setDay(null)} className="flex items-center space-x-1 text-theme-primary font-bold"><span>{day.slice(5)} · 清除</span></button>}
          </div>
        </section>
        <section className="grid grid-cols-4 gap-2 pt-1.5" data-purpose="status-summary-cards">
          {STATUS.map((s, i) => (
            <div key={s.key} onClick={() => setF(f === s.key ? 'all' : s.key)} className={`bg-white rounded-xl py-2.5 px-2 flex flex-col items-center justify-center shadow-[0_1px_3px_rgba(0,0,0,0.03)] border ${f === s.key ? 'border-theme-primary' : 'border-[#eff3ee]'}`}>
              <span className={`text-xl font-bold ${STAT_COLOR[i]} leading-tight`}>{counts[i]}</span>
              <div className="flex items-center space-x-1 mt-1 text-[11px] text-[#4d5c55] font-medium">
                <svg className="w-3 h-3 text-[#7b8a82]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d={STAT_ICON[i]} strokeLinecap="round" strokeLinejoin="round" /></svg>
                <span className="whitespace-nowrap">{s.label}</span>
              </div>
            </div>
          ))}
        </section>
        <section className="pt-0.5" data-purpose="search-box">
          <div className="relative flex items-center">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8e9d96]">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 21l-4.35-4.35m1.35-5.65a7 7 0 11-14 0 7 7 0 0114 0z" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </span>
            <input value={q} onChange={e => setQ(e.target.value)} className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#d9e2db] rounded-xl text-xs placeholder-[#91a098] focus:outline-none focus:ring-1 focus:ring-theme-primary focus:border-theme-primary shadow-sm tracking-wide" placeholder="搜索客户、类型、状态、备注、日期..." type="text" />
          </div>
        </section>
        <section className="space-y-3" data-purpose="filters-and-sort">
          <div className="flex items-center space-x-2 overflow-x-auto pb-0.5 no-scrollbar">
            {[{ key: 'all' as const, label: '全部' }, ...STATUS].map(s => f === s.key
              ? <button key={s.key} className="px-4 py-1.5 bg-[#426a5a] text-white text-xs font-semibold rounded-full shrink-0 shadow-sm">{s.label}</button>
              : <button key={s.key} onClick={() => setF(s.key)} className="px-3.5 py-1.5 bg-white border border-[#dce3de] text-[#4d5c55] text-xs font-medium rounded-full shrink-0 shadow-xs">{s.label}</button>)}
          </div>
          <div className="flex items-center space-x-2 text-xs text-[#5f6f67]">
            <div className="flex items-center space-x-1 pl-0.5">
              <svg className="w-3.5 h-3.5 text-[#6c7d74]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" strokeLinecap="round" strokeLinejoin="round" /></svg>
              <span className="font-medium">排序</span>
            </div>
            <div onClick={() => setSort((sort + 1) % SORTS.length)} className="bg-white border border-[#dce3de] rounded-full px-3 py-1 flex items-center space-x-2 shadow-xs cursor-pointer">
              <span className="text-[#3b4943] font-medium text-xs">{SORTS[sort].l}</span>
              <svg className="w-3 h-3 text-[#798881] fill-current" viewBox="0 0 20 20"><path clipRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" fillRule="evenodd" /></svg>
            </div>
            <Link to="/prices" className="ml-auto bg-white border border-[#dce3de] rounded-full px-3 py-1 flex items-center space-x-1 shadow-xs text-[#3b4943] font-medium">
              <span className="material-symbols-outlined text-[14px]">sell</span><span>稿条价目表</span>
            </Link>
          </div>
        </section>
        <section className="pt-1 px-1 space-y-3" data-purpose="list-content">
          <div className="text-xs font-medium text-[#798a81] tracking-wide">共 {list.length} 单稿件</div>
          {list.map(o => {
            const left = daysLeft(o.deadline)
            return (
              <Link key={o.id} to={`/orders/${o.id}`} className="block bg-white rounded-[14px] p-3.5 border border-[#eff3ee] shadow-[0_1px_3px_rgba(0,0,0,0.03)] active:scale-[0.99] transition-transform">
                <div className="flex gap-3">
                  <div className="w-14 h-14 rounded-xl overflow-hidden bg-[#eef3ef] shrink-0 flex items-center justify-center">
                    <Img id={o.refImages[0] || o.deliverImages[0]} className="w-full h-full object-cover" fallback={<span className="text-lg font-bold text-[#426a5a]">{o.client.slice(0, 1) || '稿'}</span>} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-bold text-[#303d36] truncate">{o.client || '未命名客户'}</span>
                      <span className="text-sm font-extrabold text-[#355b4e] shrink-0">{yuan(o.total)}</span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${BADGE[o.status]}`}>{statusLabel(o.status)}</span>
                      <span className="text-[11px] text-[#5f6f67]">{o.types.join(' · ')}</span>
                      <span className="text-[11px] text-[#91a098]">· {o.platform}</span>
                    </div>
                    <div className="flex items-center justify-between mt-1.5 text-[11px]">
                      <span className="text-[#798a81]">{o.startDate.slice(5)} 接稿</span>
                      {o.status === 'done' ? <span className="text-[#4d7f57] font-semibold">已交付</span>
                        : <span className={left < 0 ? 'text-[#dc6e64] font-bold' : left <= 3 ? 'text-[#dc6e64] font-semibold' : 'text-[#798a81]'}>{o.deadline ? (left < 0 ? `逾期 ${-left} 天` : `截稿 ${o.deadline.slice(5)} · 剩 ${left} 天`) : '未设截稿日'}</span>}
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
          {list.length === 0 && orders.length > 0 && <div className="py-10 text-center text-xs text-[#91a098]">没有符合条件的稿单～</div>}
          {orders.length === 0 && <div className="py-10 text-center"><p className="text-sm font-semibold text-[#5f6f67]">还没有稿单哦～</p><p className="text-xs text-[#91a098] mt-1.5">点击右下角 + 创建第一单吧！</p></div>}
        </section>
      </main>
      <aside className="fixed right-5 bottom-24 z-30 mb-[var(--sab)]">
        <button aria-label="新建稿单" onClick={() => nav(day ? `/orders/new?date=${day}` : '/orders/new')} className="w-14 h-14 rounded-full bg-[#4e7968] hover:bg-[#436a5b] text-white flex items-center justify-center shadow-lg shadow-[#3c6a58]/35 transition-transform active:scale-95" type="button">
          <svg className="w-7 h-7 stroke-[2.8]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 4.5v15m7.5-7.5h-15" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
      </aside>
      <BottomNav />
    </Page>
  )
}
