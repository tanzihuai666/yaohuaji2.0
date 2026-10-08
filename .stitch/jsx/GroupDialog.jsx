<div className="min-h-screen text-text-main flex flex-col justify-between selection:bg-sage-primary selection:text-white pb-6">
  <header className="w-full px-5 pt-12 pb-3 flex items-center justify-between sticky top-0 bg-[#fbf9f2]/90 backdrop-blur-xs z-20">
    <button aria-label="返回" className="w-10 h-10 rounded-full bg-[#edf1ec] text-[#556b5e] flex items-center justify-center active:scale-95 transition-transform duration-150" type="button">
      <svg className="w-5 h-5 -ml-0.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4" viewBox="0 0 24 24">
        <path d="M14.5 6.5 C12 9.5 9 11.5 8 12 C9.2 12.5 12.2 15 14.5 17.5" />
        <path d="M8.5 12 C11 11.7 15 11.8 17.5 12" opacity="0.6" strokeDasharray="1 0.5" />
      </svg>
    </button>
    <div className="flex items-center gap-1.5 text-[19px] font-bold tracking-wide text-text-main">
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M3.5 19.5 C4.5 18 6.5 17 8 16 L17.5 6.5 C18.8 5.2 20.3 6.7 19 8 L9.5 17.5 C8.2 18.8 6 19.5 3.5 19.5Z" fill="#e9f0ea" stroke="#556b5e" strokeWidth="1.8" />
        <path d="M14 6 L18 10" stroke="#89a997" strokeWidth="1.8" />
        <path d="M3.5 19.5 L5 16 L8 19 Z" fill="#678978" stroke="#374136" strokeWidth="1.5" />
        <circle cx="4" cy="20" fill="#374136" r="0.8" />
        <path d="M10 13 L12.5 10.5" stroke="#89a997" strokeLinecap="round" strokeWidth="1.4" />
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
            <svg className="w-[19px] h-[19px]" fill="none" viewBox="0 0 24 24">
              <rect fill="#fffaf0" height="18" rx="3" stroke="#678978" strokeWidth="1.8" transform="rotate(-3 12 12)" width="17" x="3.5" y="3" />
              <rect fill="#dbe8e0" height="10.5" rx="1.5" stroke="#89a997" strokeWidth="1.2" transform="rotate(-3 12 12)" width="13" x="5.5" y="5" />
              <path d="M7 13.5 C9 11 11.5 13 13 11 C14.5 9.5 16.5 12.5 17.5 12.5" stroke="#597969" strokeLinecap="round" strokeWidth="1.5" transform="rotate(-3 12 12)" />
              <circle cx="8.5" cy="8" fill="#f5c563" r="1.2" />
            </svg>
          </span>
          <span className="">
            约稿图片（必填）
          </span>
        </label>
        <div className="mb-3.5">
          <label className="w-24 h-24 rounded-2xl border-2 border-dashed border-[#89a997]/80 bg-[#f2f6f3]/60 flex flex-col items-center justify-center gap-1.5 cursor-pointer active:bg-[#e6eee8] transition-colors" htmlFor="image-file-input">
            <svg className="w-8 h-8 text-[#597969]" fill="none" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 32 32">
              <path d="M5 11 C5 9 6.5 8 8.5 8 H11 L12.5 5.5 C13 4.5 14.5 4.5 15.5 4.5 H18.5 C19.5 4.5 20.5 5 21 6 L22.5 8 H24.5 C26.5 8 28 9.5 28 11.5 V23.5 C28 25.5 26.5 27 24.5 27 H7.5 C5.5 27 5 25.5 5 23.5 Z" fill="#e3ece5" stroke="currentColor" strokeWidth="2" />
              <circle cx="16.5" cy="17.5" fill="#faf7ef" r="5.5" stroke="currentColor" strokeWidth="1.8" />
              <circle cx="16.5" cy="17.5" fill="#678978" r="2.5" />
              <circle cx="24" cy="12" fill="#e49c86" r="1.2" />
              <path d="M8 12 H10.5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
            </svg>
            <span className="text-xs font-semibold text-[#5a7667]">
              添加图片
            </span>
            <input accept="image/*" className="hidden" id="image-file-input" type="file" />
          </label>
        </div>
        <button className="w-full py-3.5 px-4 rounded-xl border-2 border-dashed border-[#89a997]/80 bg-[#f2f6f3]/40 flex items-center justify-center gap-2 text-[#537363] font-medium text-[14px] active:bg-[#e4ece6] transition-colors" type="button">
          <svg className="w-[18px] h-[18px] text-[#537363]" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.9" viewBox="0 0 24 24">
            <path d="M3.5 15 C3.8 17.5 5 19.5 7.5 19.8 C10.5 20.1 14.5 20.1 17 19.8 C19.2 19.5 20.2 17.5 20.5 15" fill="#edf4ef" />
            <path d="M12 3.5 V15.5" />
            <path d="M7.8 11.5 C9.2 12.8 11 14.8 12 15.5 C13 14.8 14.8 12.8 16.2 11.5" />
            <circle cx="18" cy="6.5" fill="currentColor" r="0.8" />
            <circle cx="6" cy="7.5" fill="currentColor" r="0.8" />
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
              <svg className="w-4 h-4" fill="none" viewBox="0 0 20 20">
                <ellipse cx="10" cy="10" fill="#fef3c7" rx="8" ry="8" stroke="#b48332" strokeLinecap="round" strokeWidth="1.7" />
                <ellipse cx="10" cy="10" fill="#fffbeb" rx="5.5" ry="5.5" stroke="#dfad42" strokeDasharray="2 1" strokeWidth="1" />
                <text fill="#b48332" fontFamily="Nunito Sans, PingFang SC, sans-serif" fontSize="8.5" fontWeight="bold" textAnchor="middle" x="10" y="13">
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
              <svg className="w-4 h-4" fill="none" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 20 20">
                <rect fill="#ffffff" height="14" rx="3" stroke="#678978" strokeWidth="1.6" width="15" x="2.5" y="4" />
                <path d="M2.5 8.5 H17.5" stroke="#d3ded6" strokeWidth="1.4" />
                <path d="M6 2 V5" stroke="#e08272" strokeLinecap="round" strokeWidth="2" />
                <path d="M14 2 V5" stroke="#e08272" strokeLinecap="round" strokeWidth="2" />
                <circle cx="6.5" cy="12" fill="#678978" r="1" />
                <circle cx="10" cy="12" fill="#678978" r="1" />
                <circle cx="13.5" cy="12" fill="#e08272" r="1" />
                <circle cx="6.5" cy="15" fill="#678978" r="1" />
                <circle cx="10" cy="15" fill="#678978" r="1" />
              </svg>
            </span>
            <span className="">
              时间
            </span>
          </label>
          <div className="relative">
            <input className="w-full h-12 bg-white/95 border border-[#e4ded0] rounded-xl pl-3.5 pr-8 text-[15px] font-normal text-text-main shadow-soft cursor-pointer focus:bg-white" id="date-select" readOnly="" type="text" defaultValue="2026/09/26" />
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-[#9ba69d]">
              <svg className="w-4 h-4 text-[#89a997]" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" viewBox="0 0 20 20">
                <path d="M5.5 7.5 C8 10 9.2 12.2 10 12.5 C10.8 12.2 12 10 14.5 7.5" />
              </svg>
            </div>
          </div>
        </div>
      </section>
      <section data-purpose="group-selection">
        <label className="flex items-center gap-1.5 text-[14px] font-medium text-text-main mb-2" htmlFor="group-select">
          <span className="inline-flex items-center justify-center">
            <svg className="w-4 h-4" fill="none" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 20 20">
              <path d="M2.5 5.5 C2.5 4.5 3.5 3.5 4.5 3.5 H7.5 C8.5 3.5 9 4.2 9.8 5 L10.5 5.8 H15.5 C16.5 5.8 17.5 6.8 17.5 7.8 V14.5 C17.5 15.5 16.5 16.5 15.5 16.5 H4.5 C3.5 16.5 2.5 15.5 2.5 14.5 Z" fill="#fceecb" stroke="#ca9b45" strokeWidth="1.6" />
              <path d="M2.5 8 C4.5 7.5 15.5 7.5 17.5 8" stroke="#dfb664" strokeWidth="1.4" />
              <path d="M6 11.5 H10" opacity="0.7" stroke="#a57625" strokeLinecap="round" strokeWidth="1.5" />
            </svg>
          </span>
          <span className="">
            分组
          </span>
        </label>
        <div className="relative">
          <button className="w-full h-12 bg-white/95 border border-[#e4ded0] rounded-xl px-4 flex items-center justify-between text-[15px] text-text-main shadow-soft active:bg-stone-50" id="group-select" type="button">
            <span className="" id="group-name-display">
              未分组
            </span>
            <svg className="w-4 h-4 text-[#89a997]" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" viewBox="0 0 20 20">
              <path d="M5.5 7.5 C8 10 9.2 12.2 10 12.5 C10.8 12.2 12 10 14.5 7.5" />
            </svg>
          </button>
        </div>
      </section>
      <section data-purpose="notes-input">
        <label className="flex items-center gap-1.5 text-[14px] font-medium text-text-main mb-2" htmlFor="notes-textarea">
          <span className="inline-flex items-center justify-center">
            <svg className="w-4 h-4" fill="none" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 20 20">
              <path d="M4 4 C4 3 5 2.5 6 2.5 H14 C15 2.5 16 3 16 4 V13 C16 13.5 15.5 14 15 14.5 L12.5 17 C12 17.5 11.5 17.5 11 17.5 H6 C5 17.5 4 16.5 4 15.5 Z" fill="#eaf4f0" stroke="#678978" strokeWidth="1.6" />
              <path d="M12 14 V17 L15.5 14 Z" fill="#cde2d7" stroke="#678978" strokeWidth="1.3" />
              <line stroke="#8ba89a" strokeLinecap="round" strokeWidth="1.4" x1="7" x2="13" y1="6.5" y2="6.5" />
              <line stroke="#8ba89a" strokeLinecap="round" strokeWidth="1.4" x1="7" x2="11.5" y1="9.5" y2="9.5" />
              <circle cx="14.5" cy="4" fill="#e08272" r="1.2" />
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
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M4 5 C4 4 5 3 6.5 3 H17.5 L20 6.5 V19 C20 20 19 21 17.5 21 H6.5 C5 21 4 20 4 19 Z" fill="rgba(255,255,255,0.15)" />
            <rect fill="rgba(255,255,255,0.25)" height="6" rx="1" stroke="currentColor" strokeWidth="1.6" width="8" x="7.5" y="3" />
            <circle cx="12" cy="15" fill="rgba(255,255,255,0.2)" r="3" stroke="currentColor" strokeWidth="1.7" />
            <circle cx="12" cy="15" fill="currentColor" r="1" />
            <path d="M7 19.5 H17" opacity="0.6" stroke="currentColor" strokeDasharray="1 1" strokeWidth="1.5" />
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
  <div aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center bg-[#28322b]/35 backdrop-blur-[2px] transition-opacity duration-200" id="group-modal" role="dialog">
    <div className="absolute inset-0 cursor-pointer" id="modal-backdrop-dismiss" />
    <div className="relative bg-[#fcfbf7] rounded-2xl shadow-xl w-[86%] max-w-xs p-5 z-10 border border-[#e4ded0] flex flex-col gap-4 transform transition-all duration-200">
      <div className="flex items-center justify-between pb-1 border-b border-[#ece6d8]">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-full bg-[#edf4ef] flex items-center justify-center text-[#556b5e] border border-[#d3ded6]">
            <svg className="w-4 h-4" fill="none" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 20 20">
              <path d="M2.5 5.5 C2.5 4.5 3.5 3.5 4.5 3.5 H7.5 C8.5 3.5 9 4.2 9.8 5 L10.5 5.8 H15.5 C16.5 5.8 17.5 6.8 17.5 7.8 V14.5 C17.5 15.5 16.5 16.5 15.5 16.5 H4.5 C3.5 16.5 2.5 15.5 2.5 14.5 Z" fill="#fceecb" stroke="#ca9b45" strokeWidth="1.4" />
              <path d="M2.5 8 C4.5 7.5 15.5 7.5 17.5 8" stroke="#dfb664" strokeWidth="1.2" />
            </svg>
          </span>
          <h3 className="text-[16px] font-bold text-text-main tracking-wide">
            新建分组
          </h3>
        </div>
        <button aria-label="关闭" className="w-7 h-7 rounded-full bg-[#f2ede2] hover:bg-[#e7e1d5] active:scale-95 text-[#6b7a6e] flex items-center justify-center transition-colors" id="btn-close-group-x" type="button">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4" viewBox="0 0 24 24">
            <line x1="18" x2="6" y1="6" y2="18" />
            <line x1="6" x2="18" y1="6" y2="18" />
          </svg>
        </button>
      </div>
      <div>
        <label className="block text-xs font-semibold text-[#5a7667] mb-1.5" htmlFor="modal-group-input">
          分组名称
        </label>
        <div className="relative">
          <input autoFocus className="w-full h-11 bg-white border border-[#d6cfbe] rounded-xl px-3.5 text-[14px] text-text-main placeholder-[#a1aaa2] focus:bg-white focus:border-[#89a997] transition-all shadow-sm" id="modal-group-input" placeholder="请输入分组名称（如：商稿、主设、头像...）" type="text" />
        </div>
      </div>
      <div className="flex items-center gap-2.5 pt-1">
        <button className="flex-1 h-10 rounded-xl bg-[#edf1ec] border border-[#d8e2da] text-[#556b5e] font-medium text-[14px] active:bg-[#e4ece6] transition-colors" id="btn-cancel-group" type="button">
          取消
        </button>
        <button className="flex-1 h-10 rounded-xl bg-[#3c6a58] hover:bg-[#235241] active:scale-[0.98] text-white font-medium text-[14px] shadow-sm transition-all" id="btn-confirm-group" type="button">
          确认
        </button>
      </div>
    </div>
  </div>
</div>
