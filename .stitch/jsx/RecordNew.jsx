<div className="min-h-screen text-text-main flex flex-col justify-between selection:bg-sage-primary selection:text-white pb-6">
  <header className="w-full px-5 pt-12 pb-3 flex items-center justify-between sticky top-0 bg-[#fbf9f2]/90 backdrop-blur-xs z-20">
    <button aria-label="返回" className="w-10 h-10 rounded-full bg-[#edf1ec] text-[#556b5e] flex items-center justify-center active:scale-95 transition-transform duration-150" type="button">
      <svg className="w-5 h-5 -ml-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.5 6.5 C12 9.5 9 11.5 8 12 C9.2 12.5 12.2 15 14.5 17.5" />
        <path d="M8.5 12 C11 11.7 15 11.8 17.5 12" strokeDasharray="1 0.5" opacity="0.6" />
      </svg>
    </button>
    <div className="flex items-center gap-1.5 text-[19px] font-bold tracking-wide text-text-main">
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3.5 19.5 C4.5 18 6.5 17 8 16 L17.5 6.5 C18.8 5.2 20.3 6.7 19 8 L9.5 17.5 C8.2 18.8 6 19.5 3.5 19.5Z" fill="#e9f0ea" stroke="#556b5e" strokeWidth="1.8" />
        <path d="M14 6 L18 10" stroke="#89a997" strokeWidth="1.8" />
        <path d="M3.5 19.5 L5 16 L8 19 Z" fill="#678978" stroke="#374136" strokeWidth="1.5" />
        <circle cx="4" cy="20" r="0.8" fill="#374136" />
        <path d="M10 13 L12.5 10.5" stroke="#89a997" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
      <span className="">
        添加约稿
      </span>
    </div>
    <div className="w-10 h-10" />
  </header>
  <main className="flex-1 px-5 pt-3 pb-8 max-w-md mx-auto w-full">
    <form className="space-y-6" id="artwork-form">
      <section data-purpose="image-upload-section">
        <label className="flex items-center gap-1.5 text-[15px] font-medium text-text-main mb-3">
          <span className="inline-flex items-center justify-center">
            <svg className="w-[19px] h-[19px]" viewBox="0 0 24 24" fill="none">
              <rect x="3.5" y="3" width="17" height="18" rx="3" fill="#fffaf0" stroke="#678978" strokeWidth="1.8" transform="rotate(-3 12 12)" />
              <rect x="5.5" y="5" width="13" height="10.5" rx="1.5" fill="#dbe8e0" stroke="#89a997" strokeWidth="1.2" transform="rotate(-3 12 12)" />
              <path d="M7 13.5 C9 11 11.5 13 13 11 C14.5 9.5 16.5 12.5 17.5 12.5" stroke="#597969" strokeWidth="1.5" strokeLinecap="round" transform="rotate(-3 12 12)" />
              <circle cx="8.5" cy="8" r="1.2" fill="#f5c563" />
            </svg>
          </span>
          <span className="">
            约稿图片（必填）
          </span>
        </label>
        <div className="mb-3.5">
          <label className="w-24 h-24 rounded-2xl border-2 border-dashed border-[#89a997]/80 bg-[#f2f6f3]/60 flex flex-col items-center justify-center gap-1.5 cursor-pointer active:bg-[#e6eee8] transition-colors" htmlFor="image-file-input">
            <svg className="w-8 h-8 text-[#597969]" viewBox="0 0 32 32" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 11 C5 9 6.5 8 8.5 8 H11 L12.5 5.5 C13 4.5 14.5 4.5 15.5 4.5 H18.5 C19.5 4.5 20.5 5 21 6 L22.5 8 H24.5 C26.5 8 28 9.5 28 11.5 V23.5 C28 25.5 26.5 27 24.5 27 H7.5 C5.5 27 5 25.5 5 23.5 Z" fill="#e3ece5" stroke="currentColor" strokeWidth="2" />
              <circle cx="16.5" cy="17.5" r="5.5" fill="#faf7ef" stroke="currentColor" strokeWidth="1.8" />
              <circle cx="16.5" cy="17.5" r="2.5" fill="#678978" />
              <circle cx="24" cy="12" r="1.2" fill="#e49c86" />
              <path d="M8 12 H10.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            <span className="text-xs font-semibold text-[#5a7667]">
              添加图片
            </span>
            <input accept="image/*" className="hidden" id="image-file-input" type="file" />
          </label>
        </div>
        <button className="w-full py-3.5 px-4 rounded-xl border-2 border-dashed border-[#89a997]/80 bg-[#f2f6f3]/40 flex items-center justify-center gap-2 text-[#537363] font-medium text-[14px] active:bg-[#e4ece6] transition-colors" type="button">
          <svg className="w-[18px] h-[18px] text-[#537363]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3.5 15 C3.8 17.5 5 19.5 7.5 19.8 C10.5 20.1 14.5 20.1 17 19.8 C19.2 19.5 20.2 17.5 20.5 15" fill="#edf4ef" />
            <path d="M12 3.5 V15.5" />
            <path d="M7.8 11.5 C9.2 12.8 11 14.8 12 15.5 C13 14.8 14.8 12.8 16.2 11.5" />
            <circle cx="18" cy="6.5" r="0.8" fill="currentColor" />
            <circle cx="6" cy="7.5" r="0.8" fill="currentColor" />
          </svg>
          <span className="">
            批量导入约稿（多图逐张编辑价格）
          </span>
        </button>
      </section>
      <section className="grid grid-cols-2 gap-3.5" data-purpose="meta-details">
        <div>
          <label className="flex items-center gap-1.5 text-[14px] font-medium text-text-main mb-2" htmlFor="price-input">
            <span className="inline-flex items-center justify-center">
              <svg className="w-4 h-4" viewBox="0 0 20 20" fill="none">
                <ellipse cx="10" cy="10" rx="8" ry="8" fill="#fef3c7" stroke="#b48332" strokeWidth="1.7" strokeLinecap="round" />
                <ellipse cx="10" cy="10" rx="5.5" ry="5.5" stroke="#dfad42" strokeWidth="1" strokeDasharray="2 1" fill="#fffbeb" />
                <text x="10" y="13" fontSize="8.5" fontFamily="Nunito Sans, PingFang SC, sans-serif" fontWeight="bold" fill="#b48332" textAnchor="middle">
                  ¥
                </text>
              </svg>
            </span>
            <span className="">
              金额（必填 ¥）
            </span>
          </label>
          <div className="relative">
            <input className="w-full h-12 bg-white/95 border border-[#e4ded0] rounded-xl px-4 text-base font-normal text-text-main shadow-soft focus:bg-white" id="price-input" inputMode="decimal" placeholder="0" type="number" defaultValue="0" />
          </div>
        </div>
        <div>
          <label className="flex items-center gap-1.5 text-[14px] font-medium text-text-main mb-2" htmlFor="date-select">
            <span className="inline-flex items-center justify-center">
              <svg className="w-4 h-4" viewBox="0 0 20 20" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2.5" y="4" width="15" height="14" rx="3" fill="#ffffff" stroke="#678978" strokeWidth="1.6" />
                <path d="M2.5 8.5 H17.5" stroke="#d3ded6" strokeWidth="1.4" />
                <path d="M6 2 V5" stroke="#e08272" strokeWidth="2" strokeLinecap="round" />
                <path d="M14 2 V5" stroke="#e08272" strokeWidth="2" strokeLinecap="round" />
                <circle cx="6.5" cy="12" r="1" fill="#678978" />
                <circle cx="10" cy="12" r="1" fill="#678978" />
                <circle cx="13.5" cy="12" r="1" fill="#e08272" />
                <circle cx="6.5" cy="15" r="1" fill="#678978" />
                <circle cx="10" cy="15" r="1" fill="#678978" />
              </svg>
            </span>
            <span className="">
              时间
            </span>
          </label>
          <div className="relative">
            <input className="w-full h-12 bg-white/95 border border-[#e4ded0] rounded-xl pl-3.5 pr-8 text-[15px] font-normal text-text-main shadow-soft cursor-pointer focus:bg-white" id="date-select" readOnly="" type="text" defaultValue="2026/09/26" />
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-[#9ba69d]">
              <svg className="w-4 h-4 text-[#89a997]" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5.5 7.5 C8 10 9.2 12.2 10 12.5 C10.8 12.2 12 10 14.5 7.5" />
              </svg>
            </div>
          </div>
        </div>
      </section>
      <section data-purpose="group-selection">
        <label className="flex items-center gap-1.5 text-[14px] font-medium text-text-main mb-2" htmlFor="group-select">
          <span className="inline-flex items-center justify-center">
            <svg className="w-4 h-4" viewBox="0 0 20 20" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2.5 5.5 C2.5 4.5 3.5 3.5 4.5 3.5 H7.5 C8.5 3.5 9 4.2 9.8 5 L10.5 5.8 H15.5 C16.5 5.8 17.5 6.8 17.5 7.8 V14.5 C17.5 15.5 16.5 16.5 15.5 16.5 H4.5 C3.5 16.5 2.5 15.5 2.5 14.5 Z" fill="#fceecb" stroke="#ca9b45" strokeWidth="1.6" />
              <path d="M2.5 8 C4.5 7.5 15.5 7.5 17.5 8" stroke="#dfb664" strokeWidth="1.4" />
              <path d="M6 11.5 H10" stroke="#a57625" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
            </svg>
          </span>
          <span className="">
            分组
          </span>
        </label>
        <div className="relative">
          <button className="w-full h-12 bg-white/95 border border-[#e4ded0] rounded-xl px-4 flex items-center justify-between text-[15px] text-text-main shadow-soft active:bg-stone-50" id="group-select" type="button">
            <span id="group-name-display" className="">
              未分组
            </span>
            <svg className="w-4 h-4 text-[#89a997]" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5.5 7.5 C8 10 9.2 12.2 10 12.5 C10.8 12.2 12 10 14.5 7.5" />
            </svg>
          </button>
        </div>
      </section>
      <section data-purpose="notes-input">
        <label className="flex items-center gap-1.5 text-[14px] font-medium text-text-main mb-2" htmlFor="notes-textarea">
          <span className="inline-flex items-center justify-center">
            <svg className="w-4 h-4" viewBox="0 0 20 20" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4 C4 3 5 2.5 6 2.5 H14 C15 2.5 16 3 16 4 V13 C16 13.5 15.5 14 15 14.5 L12.5 17 C12 17.5 11.5 17.5 11 17.5 H6 C5 17.5 4 16.5 4 15.5 Z" fill="#eaf4f0" stroke="#678978" strokeWidth="1.6" />
              <path d="M12 14 V17 L15.5 14 Z" fill="#cde2d7" stroke="#678978" strokeWidth="1.3" />
              <line x1="7" y1="6.5" x2="13" y2="6.5" stroke="#8ba89a" strokeWidth="1.4" strokeLinecap="round" />
              <line x1="7" y1="9.5" x2="11.5" y2="9.5" stroke="#8ba89a" strokeWidth="1.4" strokeLinecap="round" />
              <circle cx="14.5" cy="4" r="1.2" fill="#e08272" />
            </svg>
          </span>
          <span className="">
            备注
          </span>
        </label>
        <textarea className="w-full bg-white/95 border border-[#e4ded0] rounded-2xl p-4 text-[15px] text-text-main placeholder-[#a1aaa2] shadow-soft resize-none focus:bg-white leading-relaxed" id="notes-textarea" placeholder="补充说明..." rows="3" />
      </section>
      <div className="pt-4">
        <button className="w-full h-[52px] bg-sage-primary hover:bg-sage-hover text-white text-[16px] font-medium tracking-wide rounded-2xl shadow-btn flex items-center justify-center gap-2 active:scale-[0.985] transition-all duration-150" type="submit">
          <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 5 C4 4 5 3 6.5 3 H17.5 L20 6.5 V19 C20 20 19 21 17.5 21 H6.5 C5 21 4 20 4 19 Z" fill="rgba(255,255,255,0.15)" />
            <rect x="7.5" y="3" width="8" height="6" rx="1" stroke="currentColor" strokeWidth="1.6" fill="rgba(255,255,255,0.25)" />
            <circle cx="12" cy="15" r="3" stroke="currentColor" strokeWidth="1.7" fill="rgba(255,255,255,0.2)" />
            <circle cx="12" cy="15" r="1" fill="currentColor" />
            <path d="M7 19.5 H17" stroke="currentColor" strokeWidth="1.5" strokeDasharray="1 1" opacity="0.6" />
          </svg>
          <span className="">
            保存约稿
          </span>
        </button>
      </div>
    </form>
  </main>
  <footer className="w-full flex justify-center pb-2 pt-1 pointer-events-none">
    <div className="w-36 h-1 bg-[#28322b] rounded-full opacity-60" />
  </footer>
  <div id="group-modal" className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs transition-opacity duration-200 hidden" role="dialog" aria-modal="true">
    <div id="modal-backdrop-dismiss" className="absolute inset-0" />
    <div className="relative bg-white rounded-2xl shadow-xl w-[86%] max-w-xs p-5 z-10 border border-[#e4ded0] flex flex-col gap-4 transform transition-transform duration-200">
      <div className="flex items-center gap-2">
        <span className="w-8 h-8 rounded-full bg-[#edf1ec] flex items-center justify-center text-[#556b5e]">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
            <line x1="7" y1="7" x2="7.01" y2="7" />
          </svg>
        </span>
        <h3 className="text-[17px] font-bold text-text-main">
          新建分组
        </h3>
      </div>
      <div>
        <label className="block text-xs font-medium text-[#6b7a6e] mb-1.5" htmlFor="modal-group-input">
          分组名称
        </label>
        <input id="modal-group-input" type="text" placeholder="请输入分组名称（如：立绘/插画/头像）" className="w-full h-11 bg-[#fbf9f2] border border-[#e4ded0] rounded-xl px-3.5 text-[14px] text-text-main placeholder-[#a1aaa2] focus:bg-white transition-all" />
      </div>
      <div className="flex items-center gap-2.5 pt-1">
        <button id="btn-cancel-group" type="button" className="flex-1 h-10 rounded-xl bg-[#edf1ec] text-[#556b5e] font-medium text-[14px] active:bg-[#e4ece6] transition-colors">
          取消
        </button>
        <button id="btn-confirm-group" type="button" className="flex-1 h-10 rounded-xl bg-sage-primary hover:bg-sage-hover active:scale-[0.98] text-white font-medium text-[14px] shadow-sm transition-all">
          确认
        </button>
      </div>
    </div>
  </div>
</div>
