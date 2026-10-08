<div className="bg-journal-pattern text-on-surface antialiased min-h-screen pb-36 font-body-md text-body-md flex justify-center">
  <div className="w-full max-w-md mx-auto relative min-h-screen flex flex-col px-margin pt-14">
    <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-margin max-w-md mx-auto h-14 bg-surface shadow-sm transition-transform duration-150">
      <button aria-label="返回" className="w-9 h-9 rounded-full bg-surface-container-lowest flex items-center justify-center text-primary shadow-sm border border-outline-variant/40 active:scale-95 transition-transform" type="button">
        <span className="material-symbols-outlined text-[18px]">
          arrow_back_ios_new
        </span>
      </button>
      <div className="flex items-center gap-1.5">
        <span className="material-symbols-outlined text-primary text-[20px]" data-weight="fill" style={{"fontVariationSettings": "'FILL' 1"}}>
          auto_awesome
        </span>
        <h1 className="text-headline-md font-headline-md text-on-surface tracking-tight">
          稿条价目表
        </h1>
      </div>
      <button className="flex items-center gap-1 bg-primary text-on-primary px-3 py-1.5 rounded-full text-label-md font-label-md stamp-badge-shadow active:scale-95 transition-transform" type="button">
        <span className="material-symbols-outlined text-[15px]">
          ios_share
        </span>
        <span>
          导出长图
        </span>
      </button>
    </header>
    <main className="w-full flex flex-col gap-space-lg mt-3">
      <section className="relative bg-surface-container-lowest rounded-xl p-4 journal-card-shadow border border-outline-variant/50 pt-5">
        <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 washi-tape px-5 py-0.5 rounded-sm text-[10px] text-primary font-bold tracking-widest uppercase">
          ARTIST PORTFOLIO • 2026
        </div>
        <div className="flex items-start gap-3 mt-1">
          <div className="relative flex-shrink-0">
            <div className="w-16 h-16 rounded-full p-0.5 border-2 border-dashed border-primary-container">
              <img className="w-full h-full object-cover rounded-full" src={IMG} />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-primary text-on-primary rounded-full w-5 h-5 flex items-center justify-center text-[12px] shadow-sm">
              <span className="material-symbols-outlined text-[13px]" data-weight="fill" style={{"fontVariationSettings": "'FILL' 1"}}>
                verified
              </span>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-1 mb-1">
              <div className="flex items-center gap-1.5">
                <span className="text-headline-md font-headline-md text-on-surface font-bold">
                  妖芝
                </span>
                <span className="text-label-md font-label-md bg-surface-container-high text-on-surface-variant px-1.5 py-0.5 rounded text-[10px]">
                  独立画师
                </span>
              </div>
              <span className="inline-flex items-center gap-1 bg-primary-fixed text-on-primary-fixed-variant px-2 py-0.5 rounded-full text-label-md font-label-md border border-primary/20">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span>
                  档期开放 · 接单中
                </span>
              </span>
            </div>
            <p className="text-body-md font-body-md text-on-surface-variant italic mb-2">
              “ 一纸一笔，皆是山河与卿卿 ”
            </p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-dashed border-outline-variant/60">
          <div className="bg-surface-container-low rounded-lg p-2 text-center border border-outline-variant/30">
            <div className="text-label-md font-label-md text-outline">
              好评率
            </div>
            <div className="text-title-md font-title-md text-primary font-bold">
              100%
            </div>
          </div>
          <div className="bg-surface-container-low rounded-lg p-2 text-center border border-outline-variant/30">
            <div className="text-label-md font-label-md text-outline">
              已完成作品
            </div>
            <div className="text-title-md font-title-md text-primary font-bold">
              28 单
            </div>
          </div>
          <div className="bg-surface-container-low rounded-lg p-2 text-center border border-outline-variant/30">
            <div className="text-label-md font-label-md text-outline">
              准时交付率
            </div>
            <div className="text-title-md font-title-md text-primary font-bold">
              99%
            </div>
          </div>
        </div>
      </section>
      <section className="relative bg-surface-container-lowest rounded-xl p-4 journal-card-shadow border border-outline-variant/50">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-primary-fixed text-primary flex items-center justify-center font-bold text-[12px]">
              01
            </span>
            <div>
              <h2 className="text-title-md font-title-md text-on-surface">
                Q版与精致头像
              </h2>
              <p className="text-label-md font-label-md text-outline">
                Chibi & Avatar Commission
              </p>
            </div>
          </div>
          <div className="bg-primary text-on-primary px-3 py-1 rounded-full text-title-md font-title-md tracking-tight stamp-badge-shadow">
            ¥150 - ¥300
          </div>
        </div>
        <div className="flex items-center gap-2 bg-surface-container-low px-2.5 py-1.5 rounded-lg mb-3 border border-outline-variant/40">
          <span className="material-symbols-outlined text-primary text-[16px]">
            schedule
          </span>
          <span className="text-label-md font-label-md text-on-surface-variant">
            1-3天出草稿 • 2000×2000px 300DPI
          </span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <div className="flex flex-col items-center">
            <div className="w-full aspect-square rounded-lg p-1 bg-surface-container-high border border-outline-variant/60 shadow-xs relative overflow-hidden group">
              <img className="w-full h-full object-cover rounded-md" src={IMG} />
            </div>
            <span className="mt-1.5 text-label-md font-label-md text-on-surface-variant bg-surface-container-low px-2 py-0.5 rounded-full border border-outline-variant/30">
              头像
            </span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-full aspect-square rounded-lg p-1 bg-surface-container-high border border-outline-variant/60 shadow-xs relative overflow-hidden group">
              <img className="w-full h-full object-cover rounded-md" src={IMG} />
            </div>
            <span className="mt-1.5 text-label-md font-label-md text-on-surface-variant bg-surface-container-low px-2 py-0.5 rounded-full border border-outline-variant/30">
              Q版贴纸
            </span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-full aspect-square rounded-lg p-1 bg-surface-container-high border border-outline-variant/60 shadow-xs relative overflow-hidden group">
              <img className="w-full h-full object-cover rounded-md" src={IMG} />
            </div>
            <span className="mt-1.5 text-label-md font-label-md text-on-surface-variant bg-surface-container-low px-2 py-0.5 rounded-full border border-outline-variant/30">
              表情包
            </span>
          </div>
        </div>
      </section>
      <section className="relative bg-surface-container-lowest rounded-xl p-4 journal-card-shadow border border-outline-variant/50">
        <div className="absolute -top-2.5 right-6 washi-tape-sand px-3 py-0.5 rounded-sm text-[10px] text-tertiary font-bold tracking-wider">
          POPULAR • 热门推荐
        </div>
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-primary-fixed text-primary flex items-center justify-center font-bold text-[12px]">
              02
            </span>
            <div>
              <h2 className="text-title-md font-title-md text-on-surface">
                正比立绘与插画
              </h2>
              <p className="text-label-md font-label-md text-outline">
                Illustration & Full Body
              </p>
            </div>
          </div>
          <div className="bg-primary text-on-primary px-3 py-1 rounded-full text-title-md font-title-md tracking-tight stamp-badge-shadow">
            ¥600 - ¥1200
          </div>
        </div>
        <div className="flex items-center gap-2 bg-surface-container-low px-2.5 py-1.5 rounded-lg mb-3 border border-outline-variant/40">
          <span className="material-symbols-outlined text-primary text-[16px]">
            layers
          </span>
          <span className="text-label-md font-label-md text-on-surface-variant">
            含分层PSD • 300DPI高清无损 • 附赠透明底PNG
          </span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <div className="flex flex-col items-center">
            <div className="w-full aspect-square rounded-lg p-1 bg-surface-container-high border border-outline-variant/60 shadow-xs relative overflow-hidden">
              <img className="w-full h-full object-cover rounded-md" src={IMG} />
            </div>
            <span className="mt-1.5 text-label-md font-label-md text-on-surface-variant bg-surface-container-low px-2 py-0.5 rounded-full border border-outline-variant/30">
              正比半身
            </span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-full aspect-square rounded-lg p-1 bg-surface-container-high border border-outline-variant/60 shadow-xs relative overflow-hidden">
              <img className="w-full h-full object-cover rounded-md" src={IMG} />
            </div>
            <span className="mt-1.5 text-label-md font-label-md text-on-surface-variant bg-surface-container-low px-2 py-0.5 rounded-full border border-outline-variant/30">
              厚涂立绘
            </span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-full aspect-square rounded-lg p-1 bg-surface-container-high border border-outline-variant/60 shadow-xs relative overflow-hidden">
              <img className="w-full h-full object-cover rounded-md" src={IMG} />
            </div>
            <span className="mt-1.5 text-label-md font-label-md text-on-surface-variant bg-surface-container-low px-2 py-0.5 rounded-full border border-outline-variant/30">
              氛围插画
            </span>
          </div>
        </div>
      </section>
      <section className="relative bg-surface-container-lowest rounded-xl p-4 journal-card-shadow border border-outline-variant/50">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-primary-fixed text-primary flex items-center justify-center font-bold text-[12px]">
              03
            </span>
            <div>
              <h2 className="text-title-md font-title-md text-on-surface">
                角色设定集与商用
              </h2>
              <p className="text-label-md font-label-md text-outline">
                Character Sheet & Commercial
              </p>
            </div>
          </div>
          <div className="bg-primary text-on-primary px-3 py-1 rounded-full text-title-md font-title-md tracking-tight stamp-badge-shadow">
            ¥1500+
          </div>
        </div>
        <div className="flex items-center gap-2 bg-surface-container-low px-2.5 py-1.5 rounded-lg mb-3 border border-outline-variant/40">
          <span className="material-symbols-outlined text-primary text-[16px]">
            verified_user
          </span>
          <span className="text-label-md font-label-md text-on-surface-variant">
            商业独家授权 • 专属排期通道 • 包含拆分源文件
          </span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <div className="flex flex-col items-center">
            <div className="w-full aspect-square rounded-lg p-1 bg-surface-container-high border border-outline-variant/60 shadow-xs relative overflow-hidden">
              <img className="w-full h-full object-cover rounded-md" src={IMG} />
            </div>
            <span className="mt-1.5 text-label-md font-label-md text-on-surface-variant bg-surface-container-low px-2 py-0.5 rounded-full border border-outline-variant/30">
              三视图设子
            </span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-full aspect-square rounded-lg p-1 bg-surface-container-high border border-outline-variant/60 shadow-xs relative overflow-hidden">
              <img className="w-full h-full object-cover rounded-md" src={IMG} />
            </div>
            <span className="mt-1.5 text-label-md font-label-md text-on-surface-variant bg-surface-container-low px-2 py-0.5 rounded-full border border-outline-variant/30">
              拆分图
            </span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-full aspect-square rounded-lg p-1 bg-surface-container-high border border-outline-variant/60 shadow-xs relative overflow-hidden">
              <img className="w-full h-full object-cover rounded-md" src={IMG} />
            </div>
            <span className="mt-1.5 text-label-md font-label-md text-on-surface-variant bg-surface-container-low px-2 py-0.5 rounded-full border border-outline-variant/30">
              服饰细部
            </span>
          </div>
        </div>
      </section>
      <section className="relative bg-surface-container-low rounded-xl p-4.5 journal-card-shadow border border-outline-variant/60 overflow-hidden">
        <div className="absolute -top-1 left-5 flex items-center justify-center">
          <div className="w-4 h-6 border-2 border-primary rounded-full -rotate-12 bg-surface-container-lowest" />
        </div>
        <div className="flex items-center gap-2 mb-3 pl-6">
          <span className="material-symbols-outlined text-primary text-[20px]">
            sticky_note_2
          </span>
          <h3 className="text-title-md font-title-md text-on-surface">
            约稿须知 · 合作约定
          </h3>
        </div>
        <div className="space-y-2.5">
          <div className="flex items-start gap-2.5 bg-surface-container-lowest p-2.5 rounded-lg border border-outline-variant/30">
            <div className="w-5 h-5 rounded-full bg-primary-fixed text-primary flex items-center justify-center text-[11px] font-bold mt-0.5 flex-shrink-0">
              1
            </div>
            <p className="text-body-md font-body-md text-on-surface">
              <strong className="font-bold text-primary">
                草稿阶段免费修改2次
              </strong>
              ，进入色稿阶段仅支持微调明暗色调。
            </p>
          </div>
          <div className="flex items-start gap-2.5 bg-surface-container-lowest p-2.5 rounded-lg border border-outline-variant/30">
            <div className="w-5 h-5 rounded-full bg-primary-fixed text-primary flex items-center justify-center text-[11px] font-bold mt-0.5 flex-shrink-0">
              2
            </div>
            <p className="text-body-md font-body-md text-on-surface">
              <strong className="font-bold text-primary">
                确认线稿后不支持推倒重画
              </strong>
              ，如遇重大设定变更需补付30%定金。
            </p>
          </div>
          <div className="flex items-start gap-2.5 bg-surface-container-lowest p-2.5 rounded-lg border border-outline-variant/30">
            <div className="w-5 h-5 rounded-full bg-primary-fixed text-primary flex items-center justify-center text-[11px] font-bold mt-0.5 flex-shrink-0">
              3
            </div>
            <p className="text-body-md font-body-md text-on-surface">
              <strong className="font-bold text-primary">
                默认个人非商用
              </strong>
              ，商用授权、Vup出道或周边实体印刷按基准价
              <span className="text-secondary font-bold">
                2.0倍
              </span>
              结算。
            </p>
          </div>
        </div>
      </section>
      <div className="my-3 flex flex-col items-center justify-center text-center">
        <div className="inline-flex flex-col items-center justify-center w-28 h-28 rounded-full border-2 border-dashed border-primary text-primary p-2 relative bg-surface-container-lowest/60 rotate-[-4deg] stamp-badge-shadow">
          <span className="material-symbols-outlined text-[24px]" data-weight="fill" style={{"fontVariationSettings": "'FILL' 1"}}>
            pets
          </span>
          <span className="text-[12px] font-bold tracking-tight mt-0.5">
            妖芝设集
          </span>
          <span className="text-[9px] font-semibold text-outline tracking-wider">
            诚意出品 • 盖印为凭
          </span>
          <div className="text-[8px] font-bold tracking-widest text-primary/80 mt-0.5 border-t border-primary/30 pt-0.5">
            2026 AUTUMN
          </div>
        </div>
        <p className="text-label-md font-label-md text-outline mt-2 tracking-wide">
          — 本价目单由画师本人实时维护认证 —
        </p>
      </div>
    </main>
    <aside className="fixed bottom-0 left-0 w-full z-40 bg-surface/90 backdrop-blur-md px-margin py-3 border-none flex justify-center">
      <div className="w-full max-w-md flex items-center gap-2.5">
        <button className="flex-1 h-12 bg-surface-container-lowest text-primary perforated-border rounded-xl flex items-center justify-center gap-1.5 font-label-lg text-label-lg active:scale-95 transition-transform shadow-xs" type="button">
          <span className="material-symbols-outlined text-[18px]">
            tune
          </span>
          <span>
            修改配置
          </span>
        </button>
        <button className="flex-[2] h-12 bg-primary text-on-primary rounded-xl flex items-center justify-center gap-2 font-label-lg text-label-lg stamp-badge-shadow active:scale-95 transition-transform" type="button">
          <span className="material-symbols-outlined text-[20px]">
            download
          </span>
          <span>
            一键保存海报至相册
          </span>
        </button>
      </div>
    </aside>
  </div>
</div>
