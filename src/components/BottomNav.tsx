import { Link, useLocation } from 'react-router-dom'
const TABS = [
  { to: '/', label: '首页', match: (p: string) => p === '/', icon: <><path d="m3 9.5 9-7 9 7v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" strokeLinecap="round" strokeLinejoin="round" /><path d="M9 22V12h6v10" strokeLinecap="round" strokeLinejoin="round" /></> },
  { to: '/orders', label: '稿单', match: (p: string) => p.startsWith('/orders') || p.startsWith('/prices'), icon: <><rect height="18" rx="2.5" width="15" x="4.5" y="3.5" /><path d="M9 3.5V2.5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1" strokeLinecap="round" strokeLinejoin="round" /><path d="M8.5 9h7" strokeLinecap="round" strokeLinejoin="round" /><path d="M8.5 13h7" strokeLinecap="round" strokeLinejoin="round" /><path d="M8.5 17h4" strokeLinecap="round" strokeLinejoin="round" /></> },
  { to: '/gallery', label: '画库', match: (p: string) => /^\/(gallery|characters|folders)/.test(p), icon: <><circle cx="12" cy="13" r="7.5" /><circle cx="6.5" cy="6.5" r="2.2" /><circle cx="17.5" cy="6.5" r="2.2" /><path d="M10 12.5a0.8 0.8 0 1 0 0-1.6 0.8 0.8 0 0 0 0 1.6z" fill="currentColor" /><path d="M14 12.5a0.8 0.8 0 1 0 0-1.6 0.8 0.8 0 0 0 0 1.6z" fill="currentColor" /><circle cx="12" cy="14.5" r="0.8" fill="currentColor" /></> },
  { to: '/me', label: '我的', match: (p: string) => /^\/(me|wallet|theme|storage)/.test(p), icon: <><circle cx="12" cy="8" r="4.2" /><path d="M6 20.5v-1.8a4.8 4.8 0 0 1 4.8-4.8h2.4a4.8 4.8 0 0 1 4.8 4.8v1.8" strokeLinecap="round" strokeLinejoin="round" /></> },
]
export default function BottomNav() {
  const { pathname } = useLocation()
  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/95 backdrop-blur-md border-t border-stone-200/70 pt-2 pb-[calc(var(--sab)+12px)] px-4 flex justify-around items-center z-50" data-purpose="tab-bar">
      {TABS.map(t => {
        const on = t.match(pathname)
        return (
          <Link key={t.to} to={t.to} replace className={`flex-1 flex flex-col items-center justify-center gap-1 ${on ? '' : 'text-stone-500 transition-colors'}`}>
            <div className={`px-5 py-1 rounded-full transition-all flex items-center justify-center ${on ? 'bg-[rgb(var(--yh-primary-light,225_233_223))] text-[rgb(var(--yh-primary,59_104_82))]' : ''}`}>
              <svg className={`w-5 h-5 fill-none ${on ? 'stroke-[2.2]' : 'stroke-[1.8]'}`} stroke="currentColor" viewBox="0 0 24 24">{t.icon}</svg>
            </div>
            <span className={`text-[11px] tracking-tight ${on ? 'font-bold text-[rgb(var(--yh-primary,59_104_82))]' : 'font-medium'}`}>{t.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
