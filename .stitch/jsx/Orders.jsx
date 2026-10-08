<div className="min-h-screen text-theme-text-dark flex flex-col justify-between selection:bg-theme-primary selection:text-white pb-28">
  <header className="w-full pt-1.5 px-5 select-none bg-transparent">
    <div className="flex items-center justify-center pt-3 pb-2 text-[#303d36]">
      <div className="flex items-center space-x-1.5 text-lg font-bold">
        <span className="text-xl">
          📋
        </span>
        <span className="tracking-wide text-[19px]">
          稿单
        </span>
      </div>
    </div>
  </header>
  <main className="w-full px-4 max-w-md mx-auto space-y-4">
    <section className="w-full pt-1" data-purpose="schedule-calendar">
      <div className="flex items-center justify-between px-2 mb-4">
        <button aria-label="上个月" className="w-8 h-8 rounded-full bg-[#e3ebe5] flex items-center justify-center text-[#4b5b52] hover:bg-[#d6e2d9] transition-colors" type="button">
          <svg className="w-4 h-4 -translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className="bg-[#e4ede6] px-4 py-1.5 rounded-full flex items-center space-x-1.5 text-[#304138] font-bold text-base shadow-sm">
          <span className="">
            2026年 9月
          </span>
          <svg className="w-3.5 h-3.5 text-[#516359] fill-current" viewBox="0 0 20 20">
            <path clipRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" fillRule="evenodd" />
          </svg>
        </div>
        <button aria-label="下个月" className="w-8 h-8 rounded-full bg-[#e3ebe5] flex items-center justify-center text-[#4b5b52] hover:bg-[#d6e2d9] transition-colors" type="button">
          <svg className="w-4 h-4 translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
      <div className="grid grid-cols-7 text-center text-xs font-semibold text-[#5a7b6b] mb-2">
        <div className="">
          日
        </div>
        <div className="">
          一
        </div>
        <div className="">
          二
        </div>
        <div className="">
          三
        </div>
        <div className="">
          四
        </div>
        <div className="">
          五
        </div>
        <div className="">
          六
        </div>
      </div>
      <div className="grid grid-cols-7 gap-y-3.5 text-center text-sm font-semibold text-[#33423a] items-center">
        <div className="text-[#c1ccc4] text-[15px]">
          30
        </div>
        <div className="text-[#c1ccc4] text-[15px]">
          31
        </div>
        <div className="text-[15px]">
          1
        </div>
        <div className="text-[15px]">
          2
        </div>
        <div className="text-[15px]">
          3
        </div>
        <div className="text-[15px]">
          4
        </div>
        <div className="text-[15px]">
          5
        </div>
        <div className="text-[15px]">
          6
        </div>
        <div className="text-[15px]">
          7
        </div>
        <div className="text-[15px]">
          8
        </div>
        <div className="text-[15px]">
          9
        </div>
        <div className="text-[15px]">
          10
        </div>
        <div className="text-[15px]">
          11
        </div>
        <div className="text-[15px]">
          12
        </div>
        <div className="text-[15px]">
          13
        </div>
        <div className="text-[15px]">
          14
        </div>
        <div className="text-[15px]">
          15
        </div>
        <div className="text-[15px]">
          16
        </div>
        <div className="text-[15px]">
          17
        </div>
        <div className="text-[15px]">
          18
        </div>
        <div className="text-[15px]">
          19
        </div>
        <div className="text-[15px]">
          20
        </div>
        <div className="text-[15px]">
          21
        </div>
        <div className="text-[15px]">
          22
        </div>
        <div className="text-[15px]">
          23
        </div>
        <div className="text-[15px]">
          24
        </div>
        <div className="text-[15px]">
          25
        </div>
        <div className="flex justify-center items-center">
          <div className="w-10 h-10 bg-theme-primary text-white rounded-[13px] flex items-center justify-center font-bold text-base shadow-sm">
            26
          </div>
        </div>
        <div className="text-[15px]">
          27
        </div>
        <div className="text-[15px]">
          28
        </div>
        <div className="text-[15px]">
          29
        </div>
        <div className="text-[15px]">
          30
        </div>
        <div className="text-[#cbd4cd] text-[15px]">
          1
        </div>
        <div className="text-[#cbd4cd] text-[15px]">
          2
        </div>
        <div className="text-[#cbd4cd] text-[15px]">
          3
        </div>
      </div>
      <div className="flex items-center justify-center space-x-6 mt-4 text-xs font-medium text-[#4a5851]">
        <div className="flex items-center space-x-1.5">
          <span className="w-2 h-2 rounded-full bg-theme-dot-order" />
          <span className="">
            接稿日
          </span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="w-2 h-2 rounded-full bg-theme-dot-deadline" />
          <span className="">
            截稿日
          </span>
        </div>
      </div>
    </section>
    <section className="grid grid-cols-4 gap-2 pt-1.5" data-purpose="status-summary-cards">
      <div className="bg-white rounded-xl py-2.5 px-2 flex flex-col items-center justify-center shadow-[0_1px_3px_rgba(0,0,0,0.03)] border border-[#eff3ee]">
        <span className="text-xl font-bold text-[#355b4e] leading-tight">
          0
        </span>
        <div className="flex items-center space-x-1 mt-1 text-[11px] text-[#4d5c55] font-medium">
          <svg className="w-3 h-3 text-[#7b8a82]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
            <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="whitespace-nowrap">
            待接单
          </span>
        </div>
      </div>
      <div className="bg-white rounded-xl py-2.5 px-2 flex flex-col items-center justify-center shadow-[0_1px_3px_rgba(0,0,0,0.03)] border border-[#eff3ee]">
        <span className="text-xl font-bold text-[#b58145] leading-tight">
          0
        </span>
        <div className="flex items-center space-x-1 mt-1 text-[11px] text-[#4d5c55] font-medium">
          <svg className="w-3 h-3 text-[#7b8a82]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
            <path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="whitespace-nowrap">
            进行中
          </span>
        </div>
      </div>
      <div className="bg-white rounded-xl py-2.5 px-2 flex flex-col items-center justify-center shadow-[0_1px_3px_rgba(0,0,0,0.03)] border border-[#eff3ee]">
        <span className="text-xl font-bold text-[#4c7c9b] leading-tight">
          0
        </span>
        <div className="flex items-center space-x-1 mt-1 text-[11px] text-[#4d5c55] font-medium">
          <svg className="w-3 h-3 text-[#7b8a82]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="whitespace-nowrap">
            待验收
          </span>
        </div>
      </div>
      <div className="bg-white rounded-xl py-2.5 px-2 flex flex-col items-center justify-center shadow-[0_1px_3px_rgba(0,0,0,0.03)] border border-[#eff3ee]">
        <span className="text-xl font-bold text-[#4d7f57] leading-tight">
          0
        </span>
        <div className="flex items-center space-x-1 mt-1 text-[11px] text-[#4d5c55] font-medium">
          <svg className="w-3 h-3 text-[#7b8a82]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
            <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="whitespace-nowrap">
            已完成
          </span>
        </div>
      </div>
    </section>
    <section className="pt-0.5" data-purpose="search-box">
      <div className="relative flex items-center">
        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8e9d96]">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M21 21l-4.35-4.35m1.35-5.65a7 7 0 11-14 0 7 7 0 0114 0z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <input className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#d9e2db] rounded-xl text-xs placeholder-[#91a098] focus:outline-none focus:ring-1 focus:ring-theme-primary focus:border-theme-primary shadow-sm tracking-wide" placeholder="搜索客户、类型、状态、备注、日期..." type="text" />
      </div>
    </section>
    <section className="space-y-3" data-purpose="filters-and-sort">
      <div className="flex items-center space-x-2 overflow-x-auto pb-0.5 no-scrollbar">
        <button className="px-4 py-1.5 bg-[#426a5a] text-white text-xs font-semibold rounded-full shrink-0 shadow-sm">
          全部
        </button>
        <button className="px-3.5 py-1.5 bg-white border border-[#dce3de] text-[#4d5c55] text-xs font-medium rounded-full shrink-0 shadow-xs">
          待接单
        </button>
        <button className="px-3.5 py-1.5 bg-white border border-[#dce3de] text-[#4d5c55] text-xs font-medium rounded-full shrink-0 shadow-xs">
          进行中
        </button>
        <button className="px-3.5 py-1.5 bg-white border border-[#dce3de] text-[#4d5c55] text-xs font-medium rounded-full shrink-0 shadow-xs">
          待验收
        </button>
        <button className="px-3.5 py-1.5 bg-white border border-[#dce3de] text-[#4d5c55] text-xs font-medium rounded-full shrink-0 shadow-xs">
          已完成
        </button>
      </div>
      <div className="flex items-center space-x-2 text-xs text-[#5f6f67]">
        <div className="flex items-center space-x-1 pl-0.5">
          <svg className="w-3.5 h-3.5 text-[#6c7d74]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="font-medium">
            排序
          </span>
        </div>
        <div className="bg-white border border-[#dce3de] rounded-full px-3 py-1 flex items-center space-x-2 shadow-xs cursor-pointer">
          <span className="text-[#3b4943] font-medium text-xs">
            按创建时间
          </span>
          <svg className="w-3 h-3 text-[#798881] fill-current" viewBox="0 0 20 20">
            <path clipRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" fillRule="evenodd" />
          </svg>
        </div>
      </div>
    </section>
    <section className="pt-1 px-1" data-purpose="list-content-empty-state">
      <div className="text-xs font-medium text-[#798a81] tracking-wide">
        共 0 单稿件
      </div>
    </section>
  </main>
  <aside className="fixed right-5 bottom-24 z-30">
    <button aria-label="新建稿单" className="w-14 h-14 rounded-full bg-[#4e7968] hover:bg-[#436a5b] text-white flex items-center justify-center shadow-lg shadow-[#3c6a58]/35 transition-transform active:scale-95" type="button">
      <svg className="w-7 h-7 stroke-[2.8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M12 4.5v15m7.5-7.5h-15" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  </aside>
  <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#edf2ec] pt-2 pb-1.5 px-4">
    <div className="max-w-md mx-auto grid grid-cols-4 items-center gap-1">
      <a className="flex flex-col items-center justify-center py-1.5 px-1 text-[#717974] hover:text-[#3c6a58] transition-colors" href="#home">
        <span className="material-symbols-outlined text-[22px] leading-none">
          home
        </span>
        <span className="text-[11px] mt-1 font-medium">
          首页
        </span>
      </a>
      <a className="flex flex-col items-center justify-center py-1.5 px-2 rounded-full bg-[#e1e9df] text-[#3c6a58] font-bold transition-all shadow-xs" href="#orders">
        <span className="material-symbols-outlined text-[22px] leading-none">
          assignment
        </span>
        <span className="text-[11px] mt-0.5 tracking-tight font-bold">
          稿单
        </span>
      </a>
      <a className="flex flex-col items-center justify-center py-1.5 px-1 text-[#717974] hover:text-[#3c6a58] transition-colors" href="#gallery">
        <span className="material-symbols-outlined text-[22px] leading-none">
          pets
        </span>
        <span className="text-[11px] mt-1 font-medium">
          画库
        </span>
      </a>
      <a className="flex flex-col items-center justify-center py-1.5 px-1 text-[#717974] hover:text-[#3c6a58] transition-colors" href="#profile">
        <span className="material-symbols-outlined text-[22px] leading-none">
          person
        </span>
        <span className="text-[11px] mt-1 font-medium">
          我的
        </span>
      </a>
    </div>
    <div className="w-full flex justify-center pt-2 pb-0.5">
      <div className="w-32 h-1 bg-[#2c3831] rounded-full opacity-80" />
    </div>
  </nav>
</div>
