<div className="min-h-screen text-charcoal-title antialiased flex flex-col justify-between selection:bg-sage-light relative">
  <div className="w-full max-w-md mx-auto flex-1 flex flex-col pb-28">
    <div className="w-full py-2.5 flex items-center justify-center text-center relative" data-purpose="top-nav-title">
      <div className="flex items-center space-x-1.5 text-base font-bold text-charcoal-title">
        <svg className="w-5 h-5 text-muted-sage fill-none stroke-current stroke-[2]" viewBox="0 0 24 24">
          <circle cx="12" cy="13" r="7" />
          <circle cx="6.5" cy="7.5" r="2.5" />
          <circle cx="17.5" cy="7.5" r="2.5" />
          <circle cx="10" cy="12" fill="currentColor" r="0.75" />
          <circle cx="14" cy="12" fill="currentColor" r="0.75" />
          <ellipse cx="12" cy="14.5" rx="1.5" ry="1" />
        </svg>
        <span className="tracking-wide">
          画库
        </span>
      </div>
    </div>
    <main className="px-5 pt-3 space-y-4">
      <section className="space-y-1" data-purpose="gallery-summary">
        <div className="flex items-center space-x-2">
          <svg className="w-6 h-6 text-charcoal-title fill-none stroke-current stroke-[2]" viewBox="0 0 24 24">
            <circle cx="12" cy="13" r="7" />
            <circle cx="6.5" cy="7.5" r="2.5" />
            <circle cx="17.5" cy="7.5" r="2.5" />
            <circle cx="9.5" cy="12" fill="currentColor" r="0.8" />
            <circle cx="14.5" cy="12" fill="currentColor" r="0.8" />
            <ellipse cx="12" cy="14.5" rx="1.6" ry="1" />
          </svg>
          <h1 className="text-2xl font-bold tracking-tight text-charcoal-title">
            画库
          </h1>
        </div>
        <p className="text-xs text-muted-sage font-medium tracking-normal pl-0.5">
          1 个角色 · 0 个文件夹 · 0 张图片
        </p>
      </section>
      <section data-purpose="search-box">
        <div className="relative flex items-center bg-white/95 rounded-2xl border border-[#DFE7DD] px-4 py-3.5 shadow-sm shadow-[#DFE7DD]/30">
          <svg className="w-4 h-4 text-[#8D998F] mr-3 stroke-[2.2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
          </svg>
          <input className="w-full bg-transparent border-none p-0 text-sm text-charcoal-title placeholder-[#9DAAA0] focus:ring-0 focus:outline-none" placeholder="搜索角色名、特征、故事..." type="text" />
        </div>
      </section>
      <section className="pt-1">
        <button className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-[#4F725F] text-white text-xs font-medium rounded-full shadow-xs">
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
          <span className="">
            画库
          </span>
        </button>
      </section>
      <section className="grid grid-cols-3 gap-2.5 pt-1" data-purpose="quick-actions">
        <button className="flex items-center justify-center space-x-1.5 py-3 px-3 bg-[#4F725F] hover:bg-sage-hover text-white rounded-xl shadow-xs transition-transform active:scale-98 cursor-pointer" id="openNewSheetBtn">
          <svg className="w-4 h-4 text-[#D8E6DC] fill-current" viewBox="0 0 20 20">
            <path clipRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" fillRule="evenodd" />
          </svg>
          <span className="text-sm font-bold">
            新建
          </span>
        </button>
        <button className="flex items-center justify-center space-x-1.5 py-3 px-2 bg-white/70 hover:bg-white border-2 border-dashed border-[#7AA189] text-[#4F725F] rounded-xl transition-colors active:scale-98">
          <svg className="w-4 h-4 stroke-[2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-sm font-bold">
            拍照
          </span>
        </button>
        <button className="flex items-center justify-center space-x-1.5 py-3 px-2 bg-white/70 hover:bg-white border-2 border-dashed border-[#7AA189] text-[#4F725F] rounded-xl transition-colors active:scale-98">
          <svg className="w-4 h-4 stroke-[2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <rect height="18" rx="2" ry="2" width="18" x="3" y="3" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
          <span className="text-sm font-bold">
            导入图片
          </span>
        </button>
      </section>
      <section className="pt-4 space-y-3" data-purpose="character-list">
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1.5 text-xs text-charcoal-title font-bold">
            <svg className="w-4 h-4 text-muted-sage fill-none stroke-current stroke-[2]" viewBox="0 0 24 24">
              <circle cx="12" cy="13" r="6" />
              <circle cx="7" cy="8" r="2" />
              <circle cx="17" cy="8" r="2" />
            </svg>
            <span className="">
              角色
            </span>
          </div>
          <div className="flex-1 h-[1px] bg-[#E3E8DF]" />
        </div>
        <div className="grid grid-cols-2 gap-3.5">
          <article className="bg-white rounded-2xl p-2.5 shadow-sm border border-[#E9EFE6] flex flex-col justify-between" data-purpose="character-card">
            <div className="bg-[#F8FAF7] rounded-xl p-2 border border-[#E3ECE1]">
              <div className="flex items-center justify-between text-[9px] text-[#55695C] font-semibold mb-1.5">
                <div className="flex items-center space-x-1">
                  <span className="text-[8px] bg-[#DFECE2] text-[#42604F] px-1 rounded font-bold">
                    01
                  </span>
                  <span className="">
                    小令艮
                  </span>
                </div>
                <span className="font-bold text-[#4B6F5A]">
                  ¥5
                </span>
              </div>
              <div className="text-[8px] text-gray-400 -mt-1 mb-1 font-mono">
                11111
              </div>
              <div className="grid grid-cols-2 gap-1.5 bg-white p-1 rounded-lg border border-[#E8EDE4]">
                <div className="aspect-[3/4] rounded overflow-hidden bg-[#FBF8EF] flex items-center justify-center relative">
                  <div className="w-full h-full flex flex-col items-center justify-center p-1 text-center">
                    <div className="w-7 h-7 rounded-full bg-[#FFEED4] border border-[#EED7B8] mb-1 flex items-center justify-center text-[10px]">
                      👱‍♀️
                    </div>
                    <span className="text-[7px] text-[#A69B88] font-mono leading-none">
                      Artwork
                    </span>
                  </div>
                </div>
                <div className="aspect-[3/4] rounded overflow-hidden bg-[#F8F9F3] flex items-center justify-center relative">
                  <div className="w-full h-full flex flex-col items-center justify-center p-1 text-center">
                    <div className="w-7 h-7 rounded-full bg-[#E5F0E6] border border-[#CDE0CF] mb-1 flex items-center justify-center text-[10px]">
                      🧝‍♀️
                    </div>
                    <span className="text-[7px] text-[#869E8A] font-mono leading-none">
                      Sample
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-1 mt-1.5 text-[8px] font-semibold text-[#8C9B8E]">
                <span className="text-[#4E7660]">
                  02
                </span>
                <span className="">
                  2
                </span>
              </div>
            </div>
            <div className="pt-2 px-1">
              <h2 className="text-sm font-bold text-charcoal-title leading-tight">
                &gt;_&lt;
              </h2>
              <p className="text-[11px] text-muted-sage mt-0.5 font-medium">
                5 条约约 · ¥9
              </p>
            </div>
          </article>
        </div>
      </section>
    </main>
  </div>
  <nav className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-[#E6EDE3] px-4 pt-2 pb-6 z-40" data-purpose="bottom-navigation-bar">
    <div className="max-w-md mx-auto grid grid-cols-4 items-center">
      <a className="flex flex-col items-center justify-center text-[#8D968F] hover:text-[#4F725F] transition-colors py-1" href="#">
        <svg className="w-6 h-6 stroke-[1.8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="text-[10px] font-medium mt-1">
          首页
        </span>
      </a>
      <a className="flex flex-col items-center justify-center text-[#8D968F] hover:text-[#4F725F] transition-colors py-1" href="#">
        <svg className="w-6 h-6 stroke-[1.8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <rect height="16" rx="2" width="16" x="4" y="4" />
          <path d="M9 4v3a1 1 0 001 1h4a1 1 0 001-1V4" />
          <path d="M8 12h8M8 16h5" />
        </svg>
        <span className="text-[10px] font-medium mt-1">
          稿单
        </span>
      </a>
      <a className="flex flex-col items-center justify-center py-1" href="#">
        <div className="w-16 py-1 bg-[#E8F1EA] rounded-2xl flex flex-col items-center justify-center">
          <svg className="w-6 h-6 text-[#4F725F] fill-none stroke-current stroke-[2]" viewBox="0 0 24 24">
            <circle cx="12" cy="13" r="7" />
            <circle cx="6.5" cy="7.5" r="2.5" />
            <circle cx="17.5" cy="7.5" r="2.5" />
            <circle cx="9.5" cy="12" fill="currentColor" r="0.8" />
            <circle cx="14.5" cy="12" fill="currentColor" r="0.8" />
            <ellipse cx="12" cy="14.5" rx="1.6" ry="1" />
          </svg>
          <span className="text-[10px] font-bold text-[#4F725F] mt-0.5">
            画库
          </span>
        </div>
      </a>
      <a className="flex flex-col items-center justify-center text-[#8D968F] hover:text-[#4F725F] transition-colors py-1" href="#">
        <svg className="w-6 h-6 stroke-[1.8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="text-[10px] font-medium mt-1">
          我的
        </span>
      </a>
    </div>
    <div className="w-32 h-1 bg-gray-600 rounded-full mx-auto mt-2" />
  </nav>
  <div className="fixed inset-0 z-50 flex flex-col justify-end" data-purpose="new-creation-action-sheet" id="bottomSheetModal">
    <div className="absolute inset-0 bg-[#212E27]/40 backdrop-blur-[2px] transition-opacity modal-enter" id="modalBackdrop" />
    <div className="relative w-full max-w-md mx-auto bg-[#F7FAF5] rounded-t-[28px] border-t border-[#DFE7DD] shadow-[0_-8px_30px_rgba(40,65,52,0.14)] p-5 pb-8 space-y-4 sheet-enter z-10" id="modalSheet" style={{"backgroundImage": "radial-gradient(#D6DDD2 0.8px, transparent 0.8px)", "backgroundSize": "16px 16px"}}>
      <div className="flex justify-center pt-0.5 -mt-1 mb-1">
        <div className="w-10 h-1.5 bg-[#CBD8CB] rounded-full" />
      </div>
      <div className="flex items-center justify-between pb-1 border-b border-[#E3ECE1]">
        <div className="flex items-center space-x-2">
          <div className="w-7 h-7 rounded-full bg-[#E5EFE7] flex items-center justify-center text-[#3C6A58]">
            <svg className="w-4 h-4 fill-none stroke-current stroke-[2]" viewBox="0 0 24 24">
              <circle cx="12" cy="13" r="7" />
              <circle cx="6.5" cy="7.5" r="2.5" />
              <circle cx="17.5" cy="7.5" r="2.5" />
              <circle cx="9.5" cy="12" fill="currentColor" r="0.8" />
              <circle cx="14.5" cy="12" fill="currentColor" r="0.8" />
              <ellipse cx="12" cy="14.5" rx="1.5" ry="0.9" />
            </svg>
          </div>
          <div>
            <h3 className="text-base font-bold text-charcoal-title leading-tight">
              新建内容
            </h3>
            <p className="text-[11px] text-[#78887B]">
              选择要添加的手账企划或资料分类
            </p>
          </div>
        </div>
        <button aria-label="关闭" className="w-8 h-8 rounded-full bg-white/80 hover:bg-[#E9F0E8] border border-[#DCE4DA] flex items-center justify-center text-[#6A7B6E] transition-colors active:scale-95" id="closeSheetBtn">
          <svg className="w-4 h-4 stroke-[2.2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
      <div className="space-y-3 pt-1">
        <button className="w-full text-left bg-white/95 hover:bg-white rounded-2xl p-3.5 border border-[#DFE7DD] shadow-sm shadow-[#3C6A58]/5 flex items-center justify-between transition-all duration-150 active:scale-[0.98] group cursor-pointer">
          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[#E8F1EA] border border-[#CDE0D2] flex items-center justify-center text-xl shrink-0 group-hover:bg-[#DFECE2] transition-colors shadow-xs">
              <span className="">
                🎨
              </span>
            </div>
            <div className="space-y-0.5">
              <div className="flex items-center space-x-1.5">
                <span className="text-sm font-bold text-charcoal-title group-hover:text-[#235241] transition-colors">
                  新建角色
                </span>
                <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-[#EBF2EC] text-[#3C6A58] border border-[#D5E4D8]">
                  设子档案
                </span>
              </div>
              <p className="text-xs text-[#717974] leading-relaxed">
                建立专属手账画库、外观设定、约稿预算与排期
              </p>
            </div>
          </div>
          <div className="w-7 h-7 rounded-full bg-[#FAFBF9] border border-[#E2E8E0] flex items-center justify-center text-[#8B9B8E] group-hover:text-[#235241] group-hover:border-[#C3D5C6] group-hover:translate-x-0.5 transition-all shrink-0 ml-2">
            <svg className="w-4 h-4 stroke-[2.2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </button>
        <button className="w-full text-left bg-white/95 hover:bg-white rounded-2xl p-3.5 border border-[#DFE7DD] shadow-sm shadow-[#3C6A58]/5 flex items-center justify-between transition-all duration-150 active:scale-[0.98] group cursor-pointer">
          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[#FFF6DE] border border-[#F1E2B2] flex items-center justify-center text-xl shrink-0 group-hover:bg-[#FCEEC5] transition-colors shadow-xs">
              <span className="">
                📁
              </span>
            </div>
            <div className="space-y-0.5">
              <div className="flex items-center space-x-1.5">
                <span className="text-sm font-bold text-charcoal-title group-hover:text-[#685E38] transition-colors">
                  新建文件夹
                </span>
                <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-[#FAF5E6] text-[#7A6B39] border border-[#EDE0BE]">
                  绘卷档案
                </span>
              </div>
              <p className="text-xs text-[#717974] leading-relaxed">
                按企划、商稿、OC 世界观分类整理画作与设子
              </p>
            </div>
          </div>
          <div className="w-7 h-7 rounded-full bg-[#FAFBF9] border border-[#E2E8E0] flex items-center justify-center text-[#8B9B8E] group-hover:text-[#685E38] group-hover:border-[#E8DEC1] group-hover:translate-x-0.5 transition-all shrink-0 ml-2">
            <svg className="w-4 h-4 stroke-[2.2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </button>
      </div>
      <div className="pt-1.5">
        <button className="w-full py-3 rounded-xl bg-white/85 hover:bg-white text-xs font-bold text-[#657367] border border-[#DFE7DD] shadow-xs transition-all active:scale-98" id="cancelSheetBtn">
          取消
        </button>
      </div>
    </div>
  </div>
</div>
