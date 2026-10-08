<div className="min-h-screen text-darkCharcoal flex justify-center items-start antialiased font-sans">
  <main className="w-full max-w-[420px] min-h-screen flex flex-col justify-between relative px-4 pb-28 pt-2 overflow-x-hidden">
    <header className="w-full flex flex-col">
      <div className="w-full py-2.5 flex justify-center items-center" data-purpose="nav-title">
        <div className="flex items-center space-x-2 text-darkCharcoal">
          <svg className="w-4 h-4 stroke-[#484E49] fill-none stroke-[2] stroke-linecap-round stroke-linejoin-round" viewBox="0 0 24 24">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          <h1 className="text-[17px] font-bold tracking-wide text-[#2F3430]">
            我的
          </h1>
        </div>
      </div>
    </header>
    <div className="flex-1 flex flex-col pt-3 space-y-4">
      <section className="bg-cardBg rounded-[22px] p-4 soft-shadow border border-[#E9EBE8] flex items-center justify-between transition-transform active:scale-[0.99] cursor-pointer" data-purpose="user-profile-card">
        <div className="flex items-center space-x-3.5">
          <div className="relative w-16 h-16 rounded-full p-[2px] bg-gradient-to-tr from-[#98B8A6] via-[#B8D1C3] to-[#8FAFA0] flex-shrink-0 shadow-sm">
            <div className="w-full h-full rounded-full overflow-hidden border-2 border-white bg-amber-50">
              <img alt="妖芝" className="w-full h-full object-cover object-center scale-[1.03]" src={IMG} />
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-[20px] font-extrabold text-[#282C29] leading-tight tracking-tight">
              妖芝
            </h2>
            <p className="text-[13px] text-[#868C87] mt-1 font-normal tracking-tight">
              点击设置你的昵称和标语
            </p>
          </div>
        </div>
        <button aria-label="编辑个人信息" className="p-2 text-[#7F8681] hover:text-accentGreen focus:outline-none">
          <svg className="w-5 h-5 stroke-current fill-none stroke-[1.8] stroke-linecap-round stroke-linejoin-round" viewBox="0 0 24 24">
            <path d="M12 20h9" />
            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
          </svg>
        </button>
      </section>
      <section className="grid grid-cols-2 gap-3.5 pt-1" data-purpose="feature-grid">
        <article className="bg-cardBg rounded-[22px] p-4 soft-shadow border border-[#E9EBE8] flex flex-col items-start min-h-[148px] justify-between cursor-pointer transition-all active:scale-95 hover:border-[#CCD8D0]">
          <div className="w-11 h-11 rounded-2xl bg-dimGreenBg flex items-center justify-center text-accentGreen">
            <svg className="w-5 h-5 stroke-[#4D7162] fill-none stroke-[2] stroke-linecap-round stroke-linejoin-round" viewBox="0 0 24 24">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <div className="mt-4 w-full">
            <h3 className="text-[17px] font-bold text-[#2A2E2B] tracking-tight">
              个人资料
            </h3>
            <p className="text-[12px] text-[#939A94] mt-0.5 font-medium tracking-normal">
              头像 · 昵称 · 标语
            </p>
          </div>
        </article>
        <article className="bg-cardBg rounded-[22px] p-4 soft-shadow border border-[#E9EBE8] flex flex-col items-start min-h-[148px] justify-between cursor-pointer transition-all active:scale-95 hover:border-[#CCD8D0]">
          <div className="w-11 h-11 rounded-2xl bg-dimGreenBg flex items-center justify-center text-accentGreen">
            <svg className="w-5 h-5 stroke-[#4D7162] fill-none stroke-[2] stroke-linecap-round stroke-linejoin-round" viewBox="0 0 24 24">
              <circle cx="13.5" cy="6.5" fill="#4D7162" r=".5" />
              <circle cx="17.5" cy="10.5" fill="#4D7162" r=".5" />
              <circle cx="8.5" cy="7.5" fill="#4D7162" r=".5" />
              <circle cx="6.5" cy="12.5" fill="#4D7162" r=".5" />
              <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
            </svg>
          </div>
          <div className="mt-4 w-full">
            <h3 className="text-[17px] font-bold text-[#2A2E2B] tracking-tight">
              主题背景
            </h3>
            <p className="text-[12px] text-[#939A94] mt-0.5 font-medium tracking-normal">
              配色 · 自定义背景
            </p>
          </div>
        </article>
        <article className="bg-cardBg rounded-[22px] p-4 soft-shadow border border-[#E9EBE8] flex flex-col items-start min-h-[148px] justify-between cursor-pointer transition-all active:scale-95 hover:border-[#CCD8D0]">
          <div className="w-11 h-11 rounded-2xl bg-dimGreenBg flex items-center justify-center text-accentGreen">
            <svg className="w-5 h-5 stroke-[#4D7162] fill-none stroke-[2] stroke-linecap-round stroke-linejoin-round" viewBox="0 0 24 24">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
              <line x1="12" x2="12" y1="22.08" y2="12" />
            </svg>
          </div>
          <div className="mt-4 w-full">
            <h3 className="text-[17px] font-bold text-[#2A2E2B] tracking-tight">
              存储备份
            </h3>
            <p className="text-[12px] text-[#939A94] mt-0.5 font-medium tracking-normal">
              空间 · 导出 · 导入
            </p>
          </div>
        </article>
        <article className="bg-cardBg rounded-[22px] p-4 soft-shadow border border-[#E9EBE8] flex flex-col items-start min-h-[148px] justify-between cursor-pointer transition-all active:scale-95 hover:border-[#CCD8D0]">
          <div className="w-11 h-11 rounded-2xl bg-dimGreenBg flex items-center justify-center text-accentGreen">
            <svg className="w-5 h-5 stroke-[#4D7162] fill-none stroke-[2] stroke-linecap-round stroke-linejoin-round" viewBox="0 0 24 24">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </div>
          <div className="mt-4 w-full">
            <h3 className="text-[17px] font-bold text-[#2A2E2B] tracking-tight">
              关于妖画集
            </h3>
            <p className="text-[12px] text-[#939A94] mt-0.5 font-medium tracking-normal">
              版本 · 说明
            </p>
          </div>
        </article>
      </section>
      <footer className="w-full pt-4 pb-2 text-center" data-purpose="app-version-footer">
        <p className="text-[12px] text-[#9DA39E] tracking-wider font-normal">
          妖画集 2.9.5 · 本地存档 · 无广告
        </p>
      </footer>
    </div>
    <nav className="fixed bottom-4 inset-x-4 max-w-[390px] mx-auto z-50 bg-white/95 backdrop-blur-md border border-[#3c6a58]/15 shadow-[0_8px_30px_rgba(44,74,60,0.08)] rounded-full py-1.5 px-2.5 flex items-center justify-between" data-purpose="bottom-tab-bar">
      <a className="flex-1 py-1.5 flex flex-col items-center justify-center text-[#727973] hover:text-[#3C6A58] transition-colors" href="#">
        <svg className="w-5 h-5 stroke-current fill-none stroke-[1.9] stroke-linecap-round stroke-linejoin-round" viewBox="0 0 24 24">
          <path d="M3 10.5 12 3l9 7.5V20a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
        <span className="text-[11px] font-semibold mt-1 leading-none">
          首页
        </span>
      </a>
      <a className="flex-1 py-1.5 flex flex-col items-center justify-center text-[#727973] hover:text-[#3C6A58] transition-colors" href="#">
        <svg className="w-5 h-5 stroke-current fill-none stroke-[1.9] stroke-linecap-round stroke-linejoin-round" viewBox="0 0 24 24">
          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
          <rect height="4" rx="1" ry="1" width="8" x="8" y="2" />
          <line x1="9" x2="15" y1="11" y2="11" />
          <line x1="9" x2="15" y1="15" y2="15" />
        </svg>
        <span className="text-[11px] font-semibold mt-1 leading-none">
          稿单
        </span>
      </a>
      <a className="flex-1 py-1.5 flex flex-col items-center justify-center text-[#727973] hover:text-[#3C6A58] transition-colors" href="#">
        <svg className="w-5 h-5 stroke-current fill-none stroke-[1.9] stroke-linecap-round stroke-linejoin-round" viewBox="0 0 24 24">
          <circle cx="12" cy="13" r="7" />
          <circle cx="6.5" cy="7.5" r="2.5" />
          <circle cx="17.5" cy="7.5" r="2.5" />
          <circle cx="10" cy="12" fill="currentColor" r=".75" />
          <circle cx="14" cy="12" fill="currentColor" r=".75" />
          <path d="M11 15c.5.5 1.5.5 2 0" />
        </svg>
        <span className="text-[11px] font-semibold mt-1 leading-none">
          画库
        </span>
      </a>
      <a className="flex-1 bg-[#E2ECE5] text-[#3C6A58] py-1.5 rounded-full flex flex-col items-center justify-center transition-all shadow-sm" href="#">
        <svg className="w-5 h-5 stroke-current fill-none stroke-[2] stroke-linecap-round stroke-linejoin-round" viewBox="0 0 24 24">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
        <span className="text-[11px] font-bold mt-1 leading-none">
          我的
        </span>
      </a>
    </nav>
  </main>
</div>
