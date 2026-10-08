<div className="min-h-screen text-[#2d3a34] antialiased select-none pb-12">
  <div className="max-w-[430px] mx-auto min-h-screen px-4 pt-3 flex flex-col justify-between" data-purpose="screen-wrapper">
    <div>
      <nav className="flex items-center justify-between py-2 mb-3" data-purpose="top-navigation">
        <button aria-label="返回" className="w-10 h-10 rounded-full bg-[#ebf2ec] flex items-center justify-center text-[#557566] active:scale-95 transition-transform" type="button">
          <svg className="w-5 h-5 -ml-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className="flex items-center space-x-1.5 font-bold text-lg text-[#2a3c33] tracking-wide">
          <svg className="w-5 h-5 text-[#3e6b57]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
            <circle cx="12" cy="14" r="7" />
            <circle cx="6.5" cy="7.5" r="2.5" />
            <circle cx="17.5" cy="7.5" r="2.5" />
            <ellipse cx="9.5" cy="13" fill="currentColor" rx="0.8" ry="1.2" />
            <ellipse cx="14.5" cy="13" fill="currentColor" rx="0.8" ry="1.2" />
            <path d="M11 16c.6.5 1.4.5 2 0" strokeLinecap="round" />
          </svg>
          <span className="">
            角色档案
          </span>
        </div>
        <button className="px-4 py-1.5 rounded-full bg-[#3e6b57] text-white text-sm font-medium tracking-wide shadow-sm hover:bg-[#345b49] active:scale-95 transition-transform flex items-center space-x-1" type="button">
          <span className="text-base leading-none font-light">
            +
          </span>
          <span className="">
            约稿
          </span>
        </button>
      </nav>
      <section className="bg-white rounded-2xl p-4 card-shadow mb-3 flex items-center justify-between" data-purpose="character-name-card">
        <div className="flex items-center space-x-3.5">
          <div className="w-8 h-8 rounded-full border-[1.5px] border-[#6b8277] flex items-center justify-center text-[#526a60] relative">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
              <circle cx="12" cy="13.5" r="6.5" />
              <circle cx="7" cy="8" r="2.2" />
              <circle cx="17" cy="8" r="2.2" />
              <circle cx="9.5" cy="12.5" fill="currentColor" r="0.75" />
              <circle cx="14.5" cy="12.5" fill="currentColor" r="0.75" />
              <path d="M12 14.2a1.2 1.2 0 0 0-1 0.6c.4.6 1.6.6 2 0a1.2 1.2 0 0 0-1-0.6z" fill="currentColor" />
            </svg>
          </div>
          <span className="text-xl font-bold tracking-tight text-[#213028]">
            &gt;_&lt;
          </span>
        </div>
        <button aria-label="修改角色名称" className="text-[#889d92] hover:text-[#3e6b57] p-1" type="button">
          <svg className="w-4 h-4 transform rotate-12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </section>
      <section className="bg-[#f0f4ea] bg-opacity-70 rounded-2xl p-4 card-shadow mb-6 flex items-center justify-between border border-[#e6ecde]" data-purpose="total-price-summary">
        <div className="flex items-center space-x-3.5">
          <div className="w-10 h-10 rounded-full bg-[#e3ecdc] flex items-center justify-center text-[#557766]">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
              <path d="M19 12a7 7 0 1 1-14 0c0-3.87 3.13-7 7-7s7 3.13 7 7z" strokeLinecap="round" />
              <path d="M8.5 7.5L12 5l3.5 2.5" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="12" cy="13" r="2.2" strokeWidth="1.5" />
            </svg>
          </div>
          <div>
            <h3 className="font-bold text-[#2d3f35] text-[15px] leading-tight">
              该角色稿价总和
            </h3>
            <p className="text-xs text-[#7c9487] mt-1 font-medium">
              5 条约稿 · 自动累加
            </p>
          </div>
        </div>
        <div className="text-right">
          <span className="text-2xl font-black text-[#2e5241] tracking-tight">
            ¥9
          </span>
        </div>
      </section>
      <section className="mb-5" data-purpose="commission-records-section">
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="flex items-center space-x-2">
            <svg className="w-4 h-4 text-[#527062]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <rect height="16" rx="2" width="16" x="4" y="4" />
              <line x1="8" x2="16" y1="9" y2="9" />
              <line x1="8" x2="14" y1="13" y2="13" />
            </svg>
            <span className="font-bold text-[#344b40] text-[15px]">
              约稿记录
            </span>
          </div>
          <span className="w-6 h-6 rounded-full bg-[#e5efe5] text-[#3e6b57] text-xs font-bold flex items-center justify-center">
            5
          </span>
        </div>
        <div className="grid grid-cols-2 gap-3 mb-4">
          <button className="w-full py-2.5 rounded-xl bg-[#3e6b57] text-white font-medium text-sm flex items-center justify-center space-x-1.5 shadow-sm active:scale-[0.98] transition-transform" type="button">
            <span className="w-4 h-4 rounded-full border border-white/80 flex items-center justify-center text-xs font-bold leading-none">
              +
            </span>
            <span className="">
              添加约稿
            </span>
          </button>
          <button className="w-full py-2.5 rounded-xl bg-white border border-[#3e6b57] text-[#3e6b57] font-medium text-sm flex items-center justify-center space-x-1.5 shadow-sm active:scale-[0.98] transition-transform" type="button">
            <svg className="w-4 h-4 text-[#3e6b57]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="">
              添加组
            </span>
          </button>
        </div>
      </section>
      <section className="space-y-3 mt-4" data-purpose="role-actions-area">
        <button className="w-full py-3 rounded-xl bg-white border border-[#f3d3d2] text-[#d96a68] font-medium text-sm flex items-center justify-center space-x-1.5 shadow-sm hover:bg-[#fff9f9] active:scale-[0.98] transition-all" type="button">
          <svg className="w-4 h-4 text-[#d96a68]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="">
            删除角色
          </span>
        </button>
      </section>
    </div>
    <div className="w-32 h-1 bg-[#1a2b22] opacity-20 rounded-full mx-auto my-2" data-purpose="home-indicator" />
  </div>
</div>
