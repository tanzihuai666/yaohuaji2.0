<div className="min-h-screen flex justify-center items-start text-text-main font-sans antialiased selection:bg-primary-light">
  <div className="w-full max-w-md min-h-screen flex flex-col justify-between relative pb-24">
    <main className="px-4.5 flex-1 flex flex-col gap-3.5 px-4 pt-1">
      <section className="flex justify-between items-center py-2 px-1" data-purpose="top-navigation">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 relative flex items-center justify-center">
            <svg className="w-8 h-8 drop-shadow-sm" fill="none" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
              <rect fill="#a7d89b" height="23" rx="10" stroke="#335943" strokeWidth="1.6" width="26" x="5" y="7" />
              <ellipse cx="10" cy="5" fill="#8ec980" rx="3" ry="3.5" stroke="#335943" strokeWidth="1.4" />
              <ellipse cx="26" cy="5" fill="#8ec980" rx="3" ry="3.5" stroke="#335943" strokeWidth="1.4" />
              <circle cx="10" cy="5" fill="#fff" r="1.2" />
              <circle cx="26" cy="5" fill="#fff" r="1.2" />
              <circle cx="12.5" cy="18" fill="#2d332f" r="2.2" />
              <circle cx="23.5" cy="18" fill="#2d332f" r="2.2" />
              <ellipse cx="9" cy="21" fill="#f8b6b6" rx="2" ry="1.2" />
              <ellipse cx="27" cy="21" fill="#f8b6b6" rx="2" ry="1.2" />
              <path d="M12 12c2 3 5 4 6 4s4-1 6-4" fill="none" stroke="#ffde9e" strokeLinecap="round" strokeWidth="2" />
              <path d="M16 21c1 1.2 3 1.2 4 0" stroke="#335943" strokeLinecap="round" strokeWidth="1.4" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-primary font-sans">
            妖画集
          </h1>
        </div>
        <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm border border-stone-200/80 rounded-full py-1 pl-3.5 pr-1 shadow-sm">
          <span className="text-xs font-bold text-stone-700 tracking-wide">
            妖芝
          </span>
          <div className="w-8 h-8 rounded-full overflow-hidden bg-amber-100 ring-1 ring-amber-200/60 flex items-center justify-center">
            <svg className="w-full h-full" fill="none" viewBox="0 0 40 40">
              <rect fill="#fcedda" height="40" width="40" />
              <circle cx="20" cy="18" fill="#fcd36c" r="11" />
              <path d="M10 20c0 8 3 14 10 14s10-6 10-14c0-4-3-10-10-10s-10 6-10 10z" fill="#f7ba43" />
              <ellipse cx="20" cy="20" fill="#fff5ea" rx="7.5" ry="8" />
              <path d="M14 15c2 4 4 6 6 6s4-2 6-6c-3-2-9-2-12 0z" fill="#fde59b" />
              <path d="M12 21c2 5 1 9 1 12" stroke="#ea9f1a" strokeLinecap="round" strokeWidth="1.5" />
              <path d="M28 21c-2 5-1 9-1 12" stroke="#ea9f1a" strokeLinecap="round" strokeWidth="1.5" />
              <ellipse cx="17.5" cy="20.5" fill="#c0392b" rx="1.3" ry="2" />
              <ellipse cx="22.5" cy="20.5" fill="#c0392b" rx="1.3" ry="2" />
              <circle cx="17" cy="19.8" fill="#ffffff" r="0.6" />
              <circle cx="22" cy="19.8" fill="#ffffff" r="0.6" />
              <rect fill="#e74c3c" height="3" rx="1" transform="rotate(25 25 13)" width="3" x="25" y="13" />
            </svg>
          </div>
        </div>
      </section>
      <section className="flex items-center gap-1.5 px-1.5 pt-0.5" data-purpose="date-display">
        <span className="inline-block w-2 h-2 rounded-full bg-primary/75" />
        <span className="text-xs font-medium text-stone-600 tracking-tight">
          2026年9月26日 · 周六
        </span>
      </section>
      <section className="banner-bubble p-5 relative" data-purpose="greeting-banner">
        <div className="relative z-10 max-w-[85%]">
          <h2 className="text-lg font-bold text-text-main tracking-tight leading-snug">
            妖芝，一纸一笔，皆是山河
          </h2>
          <p className="text-xs text-stone-500 mt-2 font-normal leading-relaxed tracking-normal">
            还没有稿件在手，妖芝，来创建第一单吧～
          </p>
        </div>
        <div className="absolute -right-6 -bottom-6 w-36 h-36 rounded-full bg-emerald-100/40 pointer-events-none" />
        <div className="absolute right-4 bottom-2 w-20 h-20 rounded-full border-[6px] border-amber-300/35 pointer-events-none" />
      </section>
      <section className="grid grid-cols-2 gap-3.5" data-purpose="statistics-grid">
        <div className="journal-card p-4.5 flex flex-col items-center justify-center text-center">
          <div className="flex items-center gap-1.5 text-stone-500 text-xs font-medium mb-1">
            <svg className="w-3.5 h-3.5 stroke-stone-500 stroke-[1.8] fill-none" viewBox="0 0 24 24">
              <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
              <path d="m3.3 7 8.7 5 8.7-5" />
              <path d="M12 22V12" />
            </svg>
            <span className="">
              总接单
            </span>
          </div>
          <div className="text-3xl font-extrabold text-text-main my-1 font-sans">
            0
          </div>
          <div className="text-[11px] text-text-muted">
            累计接下 0 单
          </div>
        </div>
        <div className="journal-card p-4.5 flex flex-col items-center justify-center text-center">
          <div className="flex items-center gap-1.5 text-stone-500 text-xs font-medium mb-1">
            <svg className="w-3.5 h-3.5 stroke-stone-500 stroke-[1.8] fill-none" viewBox="0 0 24 24">
              <rect height="13" rx="2.5" width="18" x="3" y="6" />
              <path d="M17 12a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
              <path d="M7 6V4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2" />
            </svg>
            <span className="">
              钱包
            </span>
          </div>
          <div className="text-3xl font-extrabold text-text-main my-1 font-sans">
            ¥0
          </div>
          <div className="text-[11px] text-text-muted">
            本月 ¥0
          </div>
        </div>
        <div className="journal-card p-4.5 flex flex-col items-center justify-center text-center">
          <div className="flex items-center gap-1.5 text-stone-500 text-xs font-medium mb-1">
            <svg className="w-3.5 h-3.5 stroke-stone-500 stroke-[1.8] fill-none" viewBox="0 0 24 24">
              <circle cx="12" cy="8" r="6" />
              <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
            </svg>
            <span className="">
              已完成
            </span>
          </div>
          <div className="text-3xl font-extrabold text-text-main my-1 font-sans">
            0
          </div>
          <div className="text-[11px] text-text-muted">
            还有 0 单在途
          </div>
        </div>
        <div className="journal-card p-4.5 flex flex-col items-center justify-center text-center">
          <div className="flex items-center gap-1.5 text-stone-500 text-xs font-medium mb-1">
            <svg className="w-3.5 h-3.5 stroke-stone-500 stroke-[1.8] fill-none" viewBox="0 0 24 24">
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="8" x2="16" y1="13" y2="13" />
              <line x1="8" x2="12" y1="17" y2="17" />
            </svg>
            <span className="">
              稿条
            </span>
          </div>
          <div className="text-3xl font-extrabold text-text-main my-1 font-sans">
            1
          </div>
          <div className="text-[11px] text-text-muted">
            我的接单价目
          </div>
        </div>
      </section>
      <section className="journal-card p-4" data-purpose="quick-access-strip">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2 text-stone-800 font-bold text-sm">
            <svg className="w-4 h-4 text-stone-500 stroke-[2] fill-none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
              <path d="m15 5 4 4" />
            </svg>
            <span className="">
              手边的稿子
            </span>
          </div>
          <div className="text-xs font-semibold text-primary flex items-center gap-0.5 cursor-pointer hover:opacity-80">
            <span className="">
              查看 0 单
            </span>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2.5" viewBox="0 0 24 24">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </div>
        </div>
        <p className="text-xs text-stone-500 font-normal">
          手上暂时没有稿件，去稿单页创建一单吧～
        </p>
      </section>
      <section className="flex flex-col items-center justify-center pt-8 pb-4 text-center" data-purpose="empty-state">
        <div className="w-24 h-24 relative mb-2 flex items-center justify-center">
          <svg className="w-20 h-20 filter drop-shadow-sm" fill="none" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
            <circle cx="28" cy="18" fill="#71b764" r="4.5" stroke="#2a4732" strokeWidth="2" />
            <path d="M28 22v6" stroke="#2a4732" strokeWidth="2" />
            <circle cx="52" cy="18" fill="#71b764" r="4.5" stroke="#2a4732" strokeWidth="2" />
            <path d="M52 22v6" stroke="#2a4732" strokeWidth="2" />
            <rect fill="#8ed07c" height="38" rx="18" stroke="#2a4732" strokeWidth="2.2" width="44" x="18" y="24" />
            <rect fill="#fff5ea" height="25" rx="12" width="30" x="25" y="32" />
            <path d="M26 38c3 4 8 4 10 2 2 3 8 3 10-2" fill="#fed289" />
            <circle cx="34" cy="42" fill="#3a251e" r="2.2" />
            <circle cx="46" cy="42" fill="#3a251e" r="2.2" />
            <ellipse cx="29" cy="46" fill="#f8abab" rx="2.5" ry="1.5" />
            <ellipse cx="51" cy="46" fill="#f8abab" rx="2.5" ry="1.5" />
            <path d="M38 46c1 1 3 1 4 0" stroke="#3a251e" strokeLinecap="round" strokeWidth="1.4" />
            <circle cx="31" cy="62" fill="#8ed07c" r="4" stroke="#2a4732" strokeWidth="2" />
            <circle cx="49" cy="62" fill="#8ed07c" r="4" stroke="#2a4732" strokeWidth="2" />
            <path d="M62 48c4 0 6 3 6 7s-3 6-7 6" fill="none" stroke="#2a4732" strokeLinecap="round" strokeWidth="2" />
          </svg>
        </div>
        <p className="text-sm font-semibold text-stone-600 tracking-wide">
          还没有稿单哦～
        </p>
        <p className="text-xs text-stone-400 mt-1.5 flex items-center justify-center gap-1 font-medium">
          点击右下角
          <span className="font-bold text-stone-600 text-sm leading-none">
            +
          </span>
          创建第一单吧！
        </p>
      </section>
    </main>
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/95 backdrop-blur-md border-t border-stone-200/70 pt-2 pb-6 px-4 flex justify-around items-center z-50" data-purpose="tab-bar">
      <a className="flex-1 flex flex-col items-center justify-center gap-1 group" href="#">
        <div className="px-5 py-1 rounded-full bg-[#e1e9df] text-primary transition-all flex items-center justify-center">
          <svg className="w-5 h-5 stroke-[2.2] fill-none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="m3 9.5 9-7 9 7v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M9 22V12h6v10" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <span className="text-[11px] font-bold text-primary tracking-tight">
          首页
        </span>
      </a>
      <a className="flex-1 flex flex-col items-center justify-center gap-1 text-stone-500 hover:text-stone-700 transition-colors" href="#">
        <div className="px-5 py-1 rounded-full transition-all flex items-center justify-center">
          <svg className="w-5 h-5 stroke-[1.8] fill-none" stroke="currentColor" viewBox="0 0 24 24">
            <rect height="18" rx="2.5" width="15" x="4.5" y="3.5" />
            <path d="M9 3.5V2.5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8.5 9h7" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8.5 13h7" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8.5 17h4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <span className="text-[11px] font-medium tracking-tight">
          稿单
        </span>
      </a>
      <a className="flex-1 flex flex-col items-center justify-center gap-1 text-stone-500 hover:text-stone-700 transition-colors" href="#">
        <div className="px-5 py-1 rounded-full transition-all flex items-center justify-center">
          <svg className="w-5 h-5 stroke-[1.8] fill-none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="13" r="7.5" />
            <circle cx="6.5" cy="6.5" r="2.2" />
            <circle cx="17.5" cy="6.5" r="2.2" />
            <path d="M10 12.5a0.8 0.8 0 1 0 0-1.6 0.8 0.8 0 0 0 0 1.6z" fill="currentColor" />
            <path d="M14 12.5a0.8 0.8 0 1 0 0-1.6 0.8 0.8 0 0 0 0 1.6z" fill="currentColor" />
            <circle cx="12" cy="14.5" r="0.8" fill="currentColor" />
          </svg>
        </div>
        <span className="text-[11px] font-medium tracking-tight">
          画库
        </span>
      </a>
      <a className="flex-1 flex flex-col items-center justify-center gap-1 text-stone-500 hover:text-stone-700 transition-colors" href="#">
        <div className="px-5 py-1 rounded-full transition-all flex items-center justify-center">
          <svg className="w-5 h-5 stroke-[1.8] fill-none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="8" r="4.2" />
            <path d="M6 20.5v-1.8a4.8 4.8 0 0 1 4.8-4.8h2.4a4.8 4.8 0 0 1 4.8 4.8v1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <span className="text-[11px] font-medium tracking-tight">
          我的
        </span>
      </a>
    </nav>
    <div className="fixed bottom-1 left-0 right-0 flex justify-center pointer-events-none z-50">
      <div className="w-32 h-1 bg-stone-800/60 rounded-full" />
    </div>
  </div>
</div>
