import { Link, useNavigate } from 'react-router-dom'
import { useLiveQuery } from 'dexie-react-hooks'
import Page from '../components/Page'
import Img from '../components/Img'
import BottomNav from '../components/BottomNav'
import { Logo, DefaultAvatar, Frog } from '../components/Mascots'
import { db } from '../lib/db'
import { useSettings } from '../lib/settings'
import { useWalletStats } from '../lib/stats'
import { statusLabel } from '../lib/orders'
import { WEEK, daysLeft, yuan } from '../lib/format'

const StatCard = ({ icon, label, value, sub, to }: { icon: React.ReactNode; label: string; value: string | number; sub: string; to: string }) => (
  <Link to={to} className="journal-card p-4.5 flex flex-col items-center justify-center text-center active:scale-[0.98] transition-transform">
    <div className="flex items-center gap-1.5 text-stone-500 text-xs font-medium mb-1">{icon}<span>{label}</span></div>
    <div className="text-3xl font-extrabold text-text-main my-1 font-sans">{value}</div>
    <div className="text-[11px] text-text-muted">{sub}</div>
  </Link>
)

export default function Home() {
  const nav = useNavigate(); const s = useSettings(); const w = useWalletStats()
  const orders = useLiveQuery(() => db.orders.toArray(), []) || []
  const priceCount = useLiveQuery(() => db.prices.count(), []) ?? 0
  const active = orders.filter(o => o.status !== 'done').sort((a, b) => (a.deadline || '9').localeCompare(b.deadline || '9'))
  const done = orders.length - active.length
  const d = new Date(); const name = s.nickname || '画师'
  const urgent = active.find(o => o.deadline)
  const sub = active.length === 0 ? `还没有稿件在手，${name}，来创建第一单吧～`
    : urgent ? `手上有 ${active.length} 单在画，最近截稿：${urgent.client}（${daysLeft(urgent.deadline) >= 0 ? `剩 ${daysLeft(urgent.deadline)} 天` : '已逾期'}）` : `手上有 ${active.length} 单在画，加油～`

  return (
    <Page name="Home">
      <div className="w-full max-w-md min-h-screen flex flex-col justify-between relative pb-24">
        <main className="px-4.5 flex-1 flex flex-col gap-3.5 px-4 pt-1 pt-safe-top">
          <section className="flex justify-between items-center py-2 px-1" data-purpose="top-navigation">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 relative flex items-center justify-center"><Logo /></div>
              <h1 className="text-2xl font-bold tracking-tight text-primary font-sans">妖画集</h1>
            </div>
            <Link to="/me" className="flex items-center gap-2 bg-white/90 backdrop-blur-sm border border-stone-200/80 rounded-full py-1 pl-3.5 pr-1 shadow-sm">
              <span className="text-xs font-bold text-stone-700 tracking-wide">{name}</span>
              <div className="w-8 h-8 rounded-full overflow-hidden bg-amber-100 ring-1 ring-amber-200/60 flex items-center justify-center">
                <Img id={s.avatar} className="w-full h-full object-cover" fallback={<DefaultAvatar />} />
              </div>
            </Link>
          </section>
          <section className="flex items-center gap-1.5 px-1.5 pt-0.5" data-purpose="date-display">
            <span className="inline-block w-2 h-2 rounded-full bg-primary/75" />
            <span className="text-xs font-medium text-stone-600 tracking-tight">{d.getFullYear()}年{d.getMonth() + 1}月{d.getDate()}日 · {WEEK[d.getDay()]}</span>
          </section>
          <section className="banner-bubble p-5 relative" data-purpose="greeting-banner">
            <div className="relative z-10 max-w-[85%]">
              <h2 className="text-lg font-bold text-text-main tracking-tight leading-snug">{name}，{s.motto || '一纸一笔，皆是山河'}</h2>
              <p className="text-xs text-stone-500 mt-2 font-normal leading-relaxed tracking-normal">{sub}</p>
            </div>
            <div className="absolute -right-6 -bottom-6 w-36 h-36 rounded-full bg-emerald-100/40 pointer-events-none" />
            <div className="absolute right-4 bottom-2 w-20 h-20 rounded-full border-[6px] border-amber-300/35 pointer-events-none" />
          </section>
          <section className="grid grid-cols-2 gap-3.5" data-purpose="statistics-grid">
            <StatCard to="/orders" label="总接单" value={orders.length} sub={`累计接下 ${orders.length} 单`} icon={<svg className="w-3.5 h-3.5 stroke-stone-500 stroke-[1.8] fill-none" viewBox="0 0 24 24"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" /><path d="m3.3 7 8.7 5 8.7-5" /><path d="M12 22V12" /></svg>} />
            <StatCard to="/wallet" label="钱包" value={yuan(w.total)} sub={`本月 ${yuan(w.month)}`} icon={<svg className="w-3.5 h-3.5 stroke-stone-500 stroke-[1.8] fill-none" viewBox="0 0 24 24"><rect height="13" rx="2.5" width="18" x="3" y="6" /><path d="M17 12a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" /><path d="M7 6V4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2" /></svg>} />
            <StatCard to="/orders" label="已完成" value={done} sub={`还有 ${active.length} 单在途`} icon={<svg className="w-3.5 h-3.5 stroke-stone-500 stroke-[1.8] fill-none" viewBox="0 0 24 24"><circle cx="12" cy="8" r="6" /><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" /></svg>} />
            <StatCard to="/prices" label="稿条" value={priceCount} sub="我的接单价目" icon={<svg className="w-3.5 h-3.5 stroke-stone-500 stroke-[1.8] fill-none" viewBox="0 0 24 24"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /><line x1="8" x2="16" y1="13" y2="13" /><line x1="8" x2="12" y1="17" y2="17" /></svg>} />
          </section>
          <section className="journal-card p-4" data-purpose="quick-access-strip">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-2 text-stone-800 font-bold text-sm">
                <svg className="w-4 h-4 text-stone-500 stroke-[2] fill-none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" /><path d="m15 5 4 4" /></svg>
                <span>手边的稿子</span>
              </div>
              <Link to="/orders" className="text-xs font-semibold text-primary flex items-center gap-0.5 cursor-pointer hover:opacity-80">
                <span>查看 {active.length} 单</span>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6" /></svg>
              </Link>
            </div>
            {active.length === 0 ? <p className="text-xs text-stone-500 font-normal">手上暂时没有稿件，去稿单页创建一单吧～</p> : (
              <div className="flex flex-col divide-y divide-stone-100">
                {active.slice(0, 3).map(o => {
                  const l = daysLeft(o.deadline)
                  return (
                    <Link key={o.id} to={`/orders/${o.id}`} className="flex items-center gap-3 py-2.5 first:pt-0 last:pb-0">
                      <div className="w-10 h-10 rounded-xl overflow-hidden bg-primary-light shrink-0 flex items-center justify-center">
                        <Img id={o.refImages[0]} className="w-full h-full object-cover" fallback={<span className="text-sm font-bold text-primary">{o.client.slice(0, 1) || '稿'}</span>} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[13px] font-bold text-text-main truncate">{o.client} · {o.types.join('/')}</div>
                        <div className="text-[11px] text-text-muted mt-0.5">{statusLabel(o.status)} · {yuan(o.total)}</div>
                      </div>
                      <span className={`text-[11px] font-bold shrink-0 ${l <= 3 ? 'text-[#dc6e64]' : 'text-text-sub'}`}>{o.deadline ? (l >= 0 ? `剩 ${l} 天` : `逾期 ${-l} 天`) : '—'}</span>
                    </Link>
                  )
                })}
              </div>
            )}
          </section>
          {orders.length === 0 && (
            <section className="flex flex-col items-center justify-center pt-8 pb-4 text-center" data-purpose="empty-state" onClick={() => nav('/orders/new')}>
              <div className="w-24 h-24 relative mb-2 flex items-center justify-center"><Frog /></div>
              <p className="text-sm font-semibold text-stone-600 tracking-wide">还没有稿单哦～</p>
              <p className="text-xs text-stone-400 mt-1.5 flex items-center justify-center gap-1 font-medium">点击右下角<span className="font-bold text-stone-600 text-sm leading-none">+</span>创建第一单吧！</p>
            </section>
          )}
        </main>
        <aside className="fixed right-5 bottom-24 z-30 mb-[var(--sab)]">
          <button aria-label="新建稿单" onClick={() => nav('/orders/new')} className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/30 active:scale-95 transition-transform">
            <svg className="w-7 h-7 stroke-[2.8]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 4.5v15m7.5-7.5h-15" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </aside>
        <BottomNav />
      </div>
    </Page>
  )
}
