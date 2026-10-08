<div className="stationery-dot-bg min-h-screen text-on-surface antialiased font-body-md selection:bg-primary-fixed selection:text-on-primary-fixed">
  <div className="relative mx-auto min-h-screen max-w-md pb-28 pt-2">
    <header className="sticky top-0 z-40 bg-surface/90 px-margin py-space-sm backdrop-blur-md">
      <div className="flex items-center justify-between">
        <button aria-label="返回上一级" className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-container-lowest text-primary shadow-sm transition-transform active:scale-95" type="button">
          <span className="material-symbols-outlined text-[20px]" data-icon="arrow_back_ios_new">
            arrow_back_ios_new
          </span>
        </button>
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1 font-label-md text-label-md text-outline">
            <span>
              画库
            </span>
            <span className="text-[10px]">
              /
            </span>
            <span>
              自设集卷
            </span>
          </div>
          <div className="flex items-center gap-1.5 font-title-md text-title-md text-on-surface">
            <span>
              主设企划
            </span>
            <span className="text-sm">
              📁
            </span>
          </div>
        </div>
        <button className="flex items-center gap-1 rounded-full bg-surface-container-low px-3 py-1.5 font-label-md text-label-md text-primary transition-all hover:bg-surface-container active:scale-95" type="button">
          <span className="material-symbols-outlined text-[15px]" data-icon="checklist">
            checklist
          </span>
          <span>
            批量管理
          </span>
        </button>
      </div>
    </header>
    <main className="space-y-space-lg px-margin pt-space-xs">
      <section className="relative overflow-hidden rounded-2xl bg-surface-container-lowest p-space-md paper-shadow">
        <div className="washi-tape-strip absolute -top-2 left-10 h-4 w-20 rotate-[-2deg] rounded-sm opacity-90" />
        <div className="flex items-start gap-space-md pt-1">
          <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl border border-surface-container-highest bg-surface-container shadow-inner">
            <img className="h-full w-full object-cover" src={IMG} />
            <div className="absolute bottom-1 right-1 rounded-md bg-inverse-surface/75 px-1 py-0.5 font-label-md text-[9px] text-inverse-on-surface">
              封面
            </div>
          </div>
          <div className="flex flex-1 flex-col justify-between space-y-1.5">
            <div className="flex items-start justify-between">
              <h1 className="font-headline-md text-headline-md text-on-surface">
                主设企划 · 专属绘卷
              </h1>
            </div>
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="inline-flex items-center gap-1 rounded-full bg-primary-fixed px-2 py-0.5 font-label-md text-label-md text-on-primary-fixed">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                鼠尾草绿
              </span>
              <span className="inline-flex items-center rounded-full bg-surface-container px-2 py-0.5 font-label-md text-label-md text-on-surface-variant">
                12张画作 · 2个关联设子
              </span>
            </div>
          </div>
        </div>
        <div className="relative mt-space-md rounded-xl bg-surface-container-low p-space-sm pl-7 text-on-surface-variant">
          <span className="material-symbols-outlined absolute left-2 top-2 text-[16px] text-tertiary" data-icon="push_pin">
            push_pin
          </span>
          <p className="font-body-md text-body-md leading-relaxed">
            收录自设世界观全部高精插画、立绘三视图与色卡 ✨
          </p>
        </div>
      </section>
      <section className="space-y-space-md">
        <div className="relative flex items-center">
          <span className="material-symbols-outlined absolute left-3.5 text-[18px] text-outline" data-icon="search">
            search
          </span>
          <input className="h-11 w-full rounded-full border border-surface-container-highest bg-surface-container-lowest pl-10 pr-9 font-body-md text-body-md text-on-surface placeholder:text-outline-variant focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" placeholder="搜索本文件夹画作/标签..." type="text" />
          <button aria-label="清空输入" className="absolute right-3 flex h-5 w-5 items-center justify-center rounded-full bg-surface-container text-outline hover:text-on-surface" type="button">
            <span className="material-symbols-outlined text-[13px]" data-icon="close">
              close
            </span>
          </button>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button className="inline-flex flex-shrink-0 items-center rounded-full bg-primary-container px-3.5 py-1.5 font-label-md text-label-md text-on-primary shadow-sm craft-stamp-shadow active:scale-95" type="button">
            全部 (12)
          </button>
          <button className="inline-flex flex-shrink-0 items-center rounded-full border border-surface-container-highest bg-surface-container-lowest px-3 py-1.5 font-label-md text-label-md text-on-surface-variant transition-colors hover:bg-surface-container active:scale-95" type="button">
            成稿 (8)
          </button>
          <button className="inline-flex flex-shrink-0 items-center rounded-full border border-surface-container-highest bg-surface-container-lowest px-3 py-1.5 font-label-md text-label-md text-on-surface-variant transition-colors hover:bg-surface-container active:scale-95" type="button">
            草稿 (3)
          </button>
          <button className="inline-flex flex-shrink-0 items-center rounded-full border border-surface-container-highest bg-surface-container-lowest px-3 py-1.5 font-label-md text-label-md text-on-surface-variant transition-colors hover:bg-surface-container active:scale-95" type="button">
            色卡 (1)
          </button>
        </div>
        <div className="grid grid-cols-2 gap-space-sm pt-0.5">
          <button className="dashed-craft-border flex h-11 items-center justify-center gap-1.5 rounded-full bg-surface-container-lowest font-label-lg text-label-lg text-primary transition-all hover:bg-surface-container-low active:scale-95" type="button">
            <span className="material-symbols-outlined text-[18px]" data-icon="add_photo_alternate">
              add_photo_alternate
            </span>
            <span>
              + 导入画作
            </span>
          </button>
          <button className="dashed-craft-border flex h-11 items-center justify-center gap-1.5 rounded-full bg-surface-container-lowest font-label-lg text-label-lg text-primary transition-all hover:bg-surface-container-low active:scale-95" type="button">
            <span className="material-symbols-outlined text-[18px]" data-icon="photo_camera">
              photo_camera
            </span>
            <span>
              拍照录入
            </span>
          </button>
        </div>
      </section>
      <section className="grid grid-cols-2 gap-space-md pt-space-xs">
        <article className="relative flex flex-col overflow-hidden rounded-2xl bg-surface-container-lowest p-2 paper-shadow transition-transform active:scale-[0.98]">
          <div className="washi-tape-strip absolute -top-1.5 right-6 z-10 h-3.5 w-10 rotate-[4deg] rounded-xs opacity-80" />
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-surface-container-low">
            <img className="h-full w-full object-cover transition-transform duration-300 hover:scale-105" src={IMG} />
            <span className="absolute bottom-1.5 left-1.5 rounded-md bg-inverse-surface/70 px-1.5 py-0.5 font-label-md text-[10px] text-inverse-on-surface">
              3000x4000
            </span>
          </div>
          <div className="flex flex-col pt-2">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center rounded-md bg-[#e3e9f5] px-1.5 py-0.5 font-label-md text-label-md text-[#364968]">
                正比立绘
              </span>
              <span className="font-label-md text-label-md text-outline">
                09-24
              </span>
            </div>
            <h2 className="mt-1 line-clamp-1 font-body-lg text-body-lg text-on-surface">
              小令民 · 晨曦微光
            </h2>
            <div className="mt-2 flex items-center justify-end gap-1.5 border-t border-surface-container-high pt-1.5">
              <button aria-label="收藏" className="flex h-7 w-7 items-center justify-center rounded-full text-secondary transition-colors hover:bg-error-container active:scale-90" type="button">
                <span className="material-symbols-outlined text-[17px]" data-icon="favorite" data-weight="fill" style={{"fontVariationSettings": "'FILL' 1"}}>
                  favorite
                </span>
              </button>
              <button aria-label="下载原图" className="flex h-7 w-7 items-center justify-center rounded-full text-outline transition-colors hover:bg-surface-container active:scale-90" type="button">
                <span className="material-symbols-outlined text-[17px]" data-icon="download">
                  download
                </span>
              </button>
            </div>
          </div>
        </article>
        <article className="relative flex flex-col overflow-hidden rounded-2xl bg-surface-container-lowest p-2 paper-shadow transition-transform active:scale-[0.98]">
          <div className="washi-tape-strip absolute -top-1.5 left-5 z-10 h-3.5 w-10 rotate-[-5deg] rounded-xs opacity-80" />
          <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-surface-container-low">
            <img className="h-full w-full object-cover transition-transform duration-300 hover:scale-105" src={IMG} />
            <span className="absolute bottom-1.5 left-1.5 rounded-md bg-inverse-surface/70 px-1.5 py-0.5 font-label-md text-[10px] text-inverse-on-surface">
              2000x2000
            </span>
          </div>
          <div className="flex flex-col pt-2">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center rounded-md bg-[#ffe8e3] px-1.5 py-0.5 font-label-md text-label-md text-[#9e3a2b]">
                Q版
              </span>
              <span className="font-label-md text-label-md text-outline">
                09-20
              </span>
            </div>
            <h2 className="mt-1 line-clamp-1 font-body-lg text-body-lg text-on-surface">
              桃桃气泡水 · 头像
            </h2>
            <div className="mt-2 flex items-center justify-end gap-1.5 border-t border-surface-container-high pt-1.5">
              <button aria-label="收藏" className="flex h-7 w-7 items-center justify-center rounded-full text-outline transition-colors hover:bg-error-container active:scale-90" type="button">
                <span className="material-symbols-outlined text-[17px]" data-icon="favorite">
                  favorite
                </span>
              </button>
              <button aria-label="下载原图" className="flex h-7 w-7 items-center justify-center rounded-full text-outline transition-colors hover:bg-surface-container active:scale-90" type="button">
                <span className="material-symbols-outlined text-[17px]" data-icon="download">
                  download
                </span>
              </button>
            </div>
          </div>
        </article>
        <article className="relative flex flex-col overflow-hidden rounded-2xl bg-surface-container-lowest p-2 paper-shadow transition-transform active:scale-[0.98]">
          <div className="washi-tape-strip absolute -top-1.5 right-5 z-10 h-3.5 w-9 rotate-[3deg] rounded-xs opacity-80" />
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-surface-container-low">
            <img className="h-full w-full object-cover transition-transform duration-300 hover:scale-105" src={IMG} />
            <span className="absolute bottom-1.5 left-1.5 rounded-md bg-inverse-surface/70 px-1.5 py-0.5 font-label-md text-[10px] text-inverse-on-surface">
              1800x2400
            </span>
          </div>
          <div className="flex flex-col pt-2">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center rounded-md bg-[#e3efe8] px-1.5 py-0.5 font-label-md text-label-md text-[#235241]">
                设定集
              </span>
              <span className="font-label-md text-label-md text-outline">
                09-15
              </span>
            </div>
            <h2 className="mt-1 line-clamp-1 font-body-lg text-body-lg text-on-surface">
              三视图与配色色板
            </h2>
            <div className="mt-2 flex items-center justify-end gap-1.5 border-t border-surface-container-high pt-1.5">
              <button aria-label="收藏" className="flex h-7 w-7 items-center justify-center rounded-full text-secondary transition-colors hover:bg-error-container active:scale-90" type="button">
                <span className="material-symbols-outlined text-[17px]" data-icon="favorite" data-weight="fill" style={{"fontVariationSettings": "'FILL' 1"}}>
                  favorite
                </span>
              </button>
              <button aria-label="下载原图" className="flex h-7 w-7 items-center justify-center rounded-full text-outline transition-colors hover:bg-surface-container active:scale-90" type="button">
                <span className="material-symbols-outlined text-[17px]" data-icon="download">
                  download
                </span>
              </button>
            </div>
          </div>
        </article>
        <article className="relative flex flex-col overflow-hidden rounded-2xl bg-surface-container-lowest p-2 paper-shadow transition-transform active:scale-[0.98]">
          <div className="washi-tape-strip absolute -top-1.5 left-7 z-10 h-3.5 w-11 rotate-[-3deg] rounded-xs opacity-80" />
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-surface-container-low">
            <img className="h-full w-full object-cover transition-transform duration-300 hover:scale-105" src={IMG} />
            <span className="absolute bottom-1.5 left-1.5 rounded-md bg-inverse-surface/70 px-1.5 py-0.5 font-label-md text-[10px] text-inverse-on-surface">
              4000x2250
            </span>
          </div>
          <div className="flex flex-col pt-2">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center rounded-md bg-[#fcf2d9] px-1.5 py-0.5 font-label-md text-label-md text-[#785918]">
                商业成稿
              </span>
              <span className="font-label-md text-label-md text-outline">
                09-10
              </span>
            </div>
            <h2 className="mt-1 line-clamp-1 font-body-lg text-body-lg text-on-surface">
              梦幻花嫁 · 最终成品
            </h2>
            <div className="mt-2 flex items-center justify-end gap-1.5 border-t border-surface-container-high pt-1.5">
              <button aria-label="收藏" className="flex h-7 w-7 items-center justify-center rounded-full text-outline transition-colors hover:bg-error-container active:scale-90" type="button">
                <span className="material-symbols-outlined text-[17px]" data-icon="favorite">
                  favorite
                </span>
              </button>
              <button aria-label="下载原图" className="flex h-7 w-7 items-center justify-center rounded-full text-outline transition-colors hover:bg-surface-container active:scale-90" type="button">
                <span className="material-symbols-outlined text-[17px]" data-icon="download">
                  download
                </span>
              </button>
            </div>
          </div>
        </article>
      </section>
    </main>
    <div className="fixed bottom-4 left-0 z-30 flex w-full justify-center px-margin pointer-events-none">
      <div className="pointer-events-auto flex items-center gap-2 rounded-full border border-surface-container-highest/70 bg-surface-container-lowest/90 px-4 py-2 paper-shadow backdrop-blur-md">
        <span className="material-symbols-outlined text-[16px] text-primary" data-icon="verified" data-weight="fill" style={{"fontVariationSettings": "'FILL' 1"}}>
          verified
        </span>
        <span className="font-label-md text-label-md text-on-surface-variant">
          共 12 张高质画作 · 本地离线 24.6 MB
        </span>
        <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
      </div>
    </div>
  </div>
</div>
