<div className="stationery-paper-pattern text-on-surface antialiased min-h-screen pb-12 selection:bg-primary-fixed selection:text-on-primary-fixed">
  <div className="max-w-md mx-auto min-h-screen relative flex flex-col">
    <header className="sticky top-0 z-40 bg-surface/90 backdrop-blur-md px-margin py-3 flex items-center justify-between border-b border-surface-container-high/60 transition-all">
      <button aria-label="返回" className="w-10 h-10 rounded-full bg-surface-container-lowest flex items-center justify-center text-primary shadow-sm stamp-press border border-surface-container-high focus:outline-none">
        <span className="material-symbols-outlined text-[20px]">
          arrow_back_ios_new
        </span>
      </button>
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-primary-container" />
          <h1 className="font-headline-md text-headline-md text-on-surface tracking-tight">
            存储与备份管理
          </h1>
        </div>
        <span className="font-label-md text-label-md text-outline">
          妖画集 · 本地手账离线仓库
        </span>
      </div>
      <button className="w-10 h-10 rounded-full bg-surface-container-lowest flex items-center justify-center text-primary shadow-sm stamp-press border border-surface-container-high focus:outline-none" id="btn-refresh" title="重新计算存储占用">
        <span className="material-symbols-outlined text-[22px]">
          sync
        </span>
      </button>
    </header>
    <main className="flex-1 px-margin py-space-lg space-y-space-lg">
      <section className="bg-surface-container-lowest rounded-3xl p-5 paper-shadow border border-surface-container relative overflow-hidden">
        <div className="absolute -top-1.5 right-8 w-16 h-5 bg-tertiary-container/30 rotate-2 rounded-sm pointer-events-none border border-tertiary/20" />
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-primary mb-1">
              <span className="material-symbols-outlined text-[18px]">
                inventory_2
              </span>
              <span className="font-label-lg text-label-lg">
                存储概况
              </span>
            </div>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="font-stat-counter text-stat-counter text-primary tracking-tight" id="stat-total-val">
                38.6
              </span>
              <span className="font-headline-md text-headline-md text-primary">
                MB
              </span>
            </div>
            <p className="font-body-md text-body-md text-outline mt-0.5">
              本地已用空间 · 离线纯净存储
            </p>
          </div>
          <div className="w-14 h-14 rounded-full bg-surface-container-low border border-surface-container-high flex flex-col items-center justify-center p-1 text-center rotate-3">
            <span className="material-symbols-outlined text-primary-container text-[18px]">
              eco
            </span>
            <span className="font-label-md text-[10px] text-on-surface-variant leading-tight">
              安全无云
            </span>
          </div>
        </div>
        <div className="mt-5">
          <div className="h-3.5 w-full bg-surface-container-high rounded-full overflow-hidden flex p-0.5 gap-0.5">
            <div className="h-full rounded-l-full bg-primary-container transition-all duration-500" style={{"width": "84%"}} title="画库原图与作品" />
            <div className="h-full bg-secondary-container transition-all duration-500" style={{"width": "12%"}} title="设子档案与约稿数据" />
            <div className="h-full rounded-r-full bg-tertiary-fixed-dim transition-all duration-500" style={{"width": "4%"}} title="自定义配置与主题" />
          </div>
        </div>
        <div className="mt-4 pt-3 border-t border-surface-container-high/60 space-y-2.5">
          <div className="flex items-center justify-between font-body-md text-body-md">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-primary-container" />
              <span className="text-on-surface font-label-lg text-label-lg">
                画库原图与作品
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-outline">
                84%
              </span>
              <span className="font-label-lg text-label-lg text-on-surface">
                32.4 MB
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between font-body-md text-body-md">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-secondary-container" />
              <span className="text-on-surface font-label-lg text-label-lg">
                设子档案与约稿数据
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-outline">
                12%
              </span>
              <span className="font-label-lg text-label-lg text-on-surface">
                4.8 MB
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between font-body-md text-body-md">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-tertiary-fixed-dim" />
              <span className="text-on-surface font-label-lg text-label-lg">
                自定义配置与主题手账贴
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-outline">
                4%
              </span>
              <span className="font-label-lg text-label-lg text-on-surface">
                1.4 MB
              </span>
            </div>
          </div>
        </div>
        <div className="mt-3.5 bg-surface-container-low/70 rounded-2xl px-3 py-2 flex items-center justify-between text-outline">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px] text-primary">
              verified_user
            </span>
            <span className="font-label-md text-label-md">
              沙盒独立存储，卸载前请务必备份
            </span>
          </div>
          <span className="font-label-md text-label-md bg-surface-container-highest px-2 py-0.5 rounded-full text-on-surface-variant">
            SQLite + IndexedDB
          </span>
        </div>
      </section>
      <section className="bg-surface-container-lowest rounded-3xl p-5 paper-shadow border border-surface-container relative">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center text-primary-container">
              <span className="material-symbols-outlined text-[20px]">
                folder_zip
              </span>
            </div>
            <h2 className="font-headline-md text-headline-md text-on-surface">
              ZIP 离线完整打包备份
            </h2>
          </div>
          <span className="font-label-md text-label-md text-primary bg-primary-fixed/40 px-2.5 py-0.5 rounded-full border border-primary/20">
            无损导出
          </span>
        </div>
        <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-4">
          分块流式写入防崩溃，一键将所有画作、设子档案及账目打包导出至手机本地目录或随心分享。
        </p>
        <div className="space-y-3">
          <button className="w-full h-12 bg-primary-container hover:bg-primary text-on-primary rounded-2xl font-label-lg text-label-lg flex items-center justify-center gap-2 stamp-press shadow-sm transition-all focus:outline-none" id="btn-export">
            <span className="material-symbols-outlined text-[20px]">
              download
            </span>
            <span>
              打包导出备份 ZIP
            </span>
          </button>
          <button className="w-full h-12 bg-surface-container-lowest sticker-dashed-border text-primary hover:bg-surface-container-low rounded-2xl font-label-lg text-label-lg flex items-center justify-center gap-2 stamp-press transition-all focus:outline-none" id="btn-import">
            <span className="material-symbols-outlined text-[20px]">
              drive_folder_upload
            </span>
            <span>
              导入 ZIP 备份合并 (不覆盖已有数据)
            </span>
          </button>
        </div>
        <div className="mt-4 flex items-center justify-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-surface-container-low rounded-full border border-surface-container">
            <span className="material-symbols-outlined text-[15px] text-primary">
              schedule
            </span>
            <span className="font-label-md text-label-md text-outline" id="timestamp-text">
              上次备份时间：2026-09-28 14:30
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
          </div>
        </div>
      </section>
      <section className="bg-surface-container-lowest rounded-3xl p-5 paper-shadow border border-surface-container">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-full bg-tertiary-fixed flex items-center justify-center text-on-tertiary-container">
            <span className="material-symbols-outlined text-[20px]">
              mop
            </span>
          </div>
          <h2 className="font-headline-md text-headline-md text-on-surface">
            临时缓存管理
          </h2>
        </div>
        <div className="bg-surface-container-low/60 rounded-2xl p-3.5 flex items-center justify-between border border-surface-container">
          <div className="pr-2">
            <div className="font-label-lg text-label-lg text-on-surface">
              清理临时缩略图缓存
            </div>
            <div className="font-body-md text-body-md text-outline mt-0.5">
              释放约
              <span className="text-secondary font-bold">
                4.2 MB
              </span>
              ，不影响原图画作及稿单
            </div>
          </div>
          <button className="shrink-0 px-3.5 py-1.5 rounded-full bg-surface-container-lowest hover:bg-surface-container text-primary font-label-lg text-label-lg border border-primary/20 stamp-press shadow-sm transition-all" id="btn-clean-cache">
            立即清理
          </button>
        </div>
      </section>
      <section className="bg-secondary-fixed/40 danger-dashed-border rounded-3xl p-5 relative overflow-hidden">
        <div className="flex items-center gap-2 mb-2 text-on-secondary-container">
          <span className="material-symbols-outlined text-[22px] text-secondary">
            warning
          </span>
          <h2 className="font-headline-md text-headline-md">
            危险操作 · 重置数据
          </h2>
        </div>
        <p className="font-body-md text-body-md text-on-secondary-fixed-variant leading-relaxed mb-4">
          重置后将清除当前设备上的所有设子档案、稿单记录及本地图片缓存，此操作不可逆，请提前确认已完成 ZIP 打包。
        </p>
        <button className="w-full h-11 rounded-2xl border border-secondary text-secondary hover:bg-secondary/10 bg-surface-container-lowest/80 font-label-lg text-label-lg flex items-center justify-center gap-2 stamp-press transition-all focus:outline-none" id="btn-reset">
          <span className="material-symbols-outlined text-[18px]">
            delete_sweep
          </span>
          <span>
            清空本机全部手账数据 (双重防误触确认)
          </span>
        </button>
      </section>
      <section className="pt-2 pb-6 flex flex-col items-center justify-center text-center">
        <div className="relative p-4 rounded-full border-2 border-dashed border-outline-variant/80 bg-surface-container-lowest/70 w-32 h-32 flex flex-col items-center justify-center mb-3 rotate-[-2deg] shadow-sm">
          <span className="material-symbols-outlined text-[30px] text-primary mb-1">
            shield_lock
          </span>
          <span className="font-label-md text-[11px] font-bold text-primary-container leading-tight">
            妖画集 · 隐私
          </span>
          <span className="font-label-md text-[9px] text-outline leading-tight mt-0.5">
            NO CLOUD LEAK
          </span>
          <div className="absolute inset-1 rounded-full border border-primary/10 pointer-events-none" />
        </div>
        <p className="font-label-lg text-label-lg text-on-surface mb-1">
          纯本地离线存盘 · 零服务器上传
        </p>
        <p className="font-body-md text-body-md text-outline max-w-xs">
          手账与约稿数据百分之百保存在手机内部沙盒中，未获得你手动授权绝不传输。
        </p>
      </section>
    </main>
  </div>
  <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-inverse-surface text-inverse-on-surface px-4 py-2 rounded-full font-label-lg text-label-lg shadow-lg flex items-center gap-2 opacity-0 pointer-events-none transition-all duration-300 z-50" id="toast">
    <span className="material-symbols-outlined text-[18px] text-primary-fixed" id="toast-icon">
      check_circle
    </span>
    <span id="toast-msg">
      已成功刷新存储统计
    </span>
  </div>
</div>
