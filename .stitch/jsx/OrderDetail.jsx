<div className="bg-background text-on-surface notebook-dots min-h-screen antialiased flex flex-col justify-between selection:bg-primary-fixed">
  <div className="w-full max-w-md mx-auto min-h-screen flex flex-col relative pb-32">
    <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-margin max-w-md mx-auto bg-surface shadow-sm h-14">
      <button aria-label="返回" className="w-10 h-10 rounded-full flex items-center justify-center bg-surface-container-low text-primary active:scale-95 transition-transform duration-150">
        <span className="material-symbols-outlined text-[20px]">
          arrow_back_ios_new
        </span>
      </button>
      <h1 className="text-headline-md font-headline-md font-bold text-on-surface tracking-tight">
        稿单详情
      </h1>
      <button className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-surface-container-high text-primary hover:bg-surface-container active:scale-95 transition-transform duration-150">
        <span className="material-symbols-outlined text-[18px]">
          edit_note
        </span>
        <span className="text-label-lg font-label-lg">
          编辑
        </span>
      </button>
    </header>
    <div className="h-14" />
    <main className="px-margin pt-space-lg flex flex-col gap-space-lg">
      <section className="bg-surface-container-lowest rounded-xl p-space-lg card-shadow relative overflow-hidden">
        <div className="absolute -top-3 right-6 w-16 h-7 bg-primary-fixed/60 -rotate-3 rounded-sm pointer-events-none backdrop-blur-sm border-b border-surface-variant" />
        <div className="flex items-center justify-between mb-space-md">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse" />
            <span className="text-title-md font-title-md text-on-surface">
              制作流程节点
            </span>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-primary-fixed text-primary text-label-md font-label-md">
            工序进行中 · 色块已定
          </span>
        </div>
        <div className="py-space-md relative">
          <div className="absolute top-7 left-7 right-7 h-[2px] border-t-2 border-dashed border-outline-variant -z-0" />
          <div className="grid grid-cols-4 gap-1 relative z-10 text-center">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-surface-container-high text-primary flex items-center justify-center text-label-md font-label-md border-2 border-primary-container/20">
                <span className="material-symbols-outlined text-[16px]" style={{"fontVariationSettings": "'FILL' 1"}}>
                  check
                </span>
              </div>
              <span className="text-label-md font-label-md mt-1.5 text-on-surface-variant">
                待接单
              </span>
              <span className="text-[10px] text-outline mt-0.5">
                09/24已接
              </span>
            </div>
            <div className="flex flex-col items-center scale-105">
              <div className="w-9 h-9 rounded-full bg-primary-container text-on-primary flex items-center justify-center text-label-md font-label-md stamp-badge ring-4 ring-primary-fixed/50">
                <span className="material-symbols-outlined text-[18px]">
                  brush
                </span>
              </div>
              <span className="text-label-lg font-label-lg mt-1 text-primary font-bold">
                进行中
              </span>
              <span className="text-[10px] font-bold text-primary-container mt-0.5 bg-primary-fixed/60 px-1.5 rounded-full">
                铺色中
              </span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-surface-container-lowest border-2 border-outline-variant text-outline flex items-center justify-center text-label-md font-label-md">
                3
              </div>
              <span className="text-label-md font-label-md mt-1.5 text-outline">
                待验收
              </span>
              <span className="text-[10px] text-outline mt-0.5">
                线稿/色块
              </span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-surface-container-lowest border-2 border-outline-variant text-outline flex items-center justify-center text-label-md font-label-md">
                4
              </div>
              <span className="text-label-md font-label-md mt-1.5 text-outline">
                已完成
              </span>
              <span className="text-[10px] text-outline mt-0.5">
                终稿交付
              </span>
            </div>
          </div>
        </div>
        <button className="mt-space-sm w-full py-2.5 px-space-md bg-primary-container hover:bg-primary text-on-primary rounded-full flex items-center justify-center gap-2 active:scale-95 transition-transform duration-150 shadow-sm">
          <span className="text-label-lg font-label-lg">
            推进工序：待验收
          </span>
          <span className="material-symbols-outlined text-[18px]">
            arrow_forward
          </span>
        </button>
      </section>
      <section className="bg-surface-container-lowest rounded-xl p-space-lg card-shadow flex flex-col gap-space-md">
        <div className="p-space-md rounded-xl bg-surface-container-low border border-primary-fixed flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[22px]">
                calendar_clock
              </span>
            </div>
            <div>
              <p className="text-label-lg font-label-lg text-primary">
                截稿日：2026年10月15日
              </p>
              <p className="text-body-md font-body-md text-on-surface-variant">
                剩余周期充足 · 准时交稿印章
              </p>
            </div>
          </div>
          <div className="px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed text-label-lg font-label-lg font-bold">
            剩 19 天
          </div>
        </div>
        <div>
          <h2 className="text-label-lg font-label-lg text-outline mb-2">
            规格与授权
          </h2>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-full bg-surface-container text-on-surface-variant text-label-md font-label-md flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">
                face
              </span>
              头像 · 正比半身
            </span>
            <span className="px-3 py-1 rounded-full bg-surface-container text-on-surface-variant text-label-md font-label-md flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">
                aspect_ratio
              </span>
              3000 x 3000 px · 300DPI
            </span>
            <span className="px-3 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed text-label-md font-label-md flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">
                verified_user
              </span>
              个人收藏 / 社交头像
            </span>
          </div>
        </div>
      </section>
      <section className="bg-surface-container-lowest rounded-xl p-space-lg card-shadow">
        <div className="flex items-center justify-between mb-space-md pb-2 border-b border-surface-container-high">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-primary text-[20px]">
              payments
            </span>
            <h2 className="text-title-md font-title-md text-on-surface">
              稿费结算清单
            </h2>
          </div>
          <div className="text-right">
            <span className="text-label-md font-label-md text-outline">
              总计酬劳
            </span>
            <span className="text-stat-counter font-stat-counter text-primary ml-1 font-bold">
              ¥800
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-gutter">
          <div className="p-3 bg-surface-container-low rounded-xl border border-primary-fixed flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-label-md font-label-md text-primary font-bold">
                已收定金
              </span>
              <span className="material-symbols-outlined text-primary text-[18px]" style={{"fontVariationSettings": "'FILL' 1"}}>
                task_alt
              </span>
            </div>
            <div className="mt-2">
              <p className="text-headline-md font-headline-md text-primary font-bold">
                ¥400
              </p>
              <p className="text-[11px] text-on-surface-variant mt-0.5">
                50% 定金已到账 (09/24)
              </p>
            </div>
          </div>
          <div className="p-3 bg-surface-container-low rounded-xl border border-outline-variant flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-label-md font-label-md text-on-surface-variant font-bold">
                待收尾款
              </span>
              <span className="material-symbols-outlined text-outline text-[18px]">
                pending
              </span>
            </div>
            <div className="mt-2">
              <p className="text-headline-md font-headline-md text-on-surface font-bold">
                ¥400
              </p>
              <p className="text-[11px] text-outline mt-0.5">
                待最终验收后付清
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-surface-container-lowest rounded-xl p-space-lg card-shadow">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full ring-2 ring-primary-fixed bg-surface-container flex items-center justify-center overflow-hidden">
              <img className="w-full h-full object-cover" src={IMG} />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-title-md font-title-md text-on-surface">
                  桃桃气泡水
                </span>
                <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed text-[10px] font-bold">
                  金主妈咪
                </span>
              </div>
              <p className="text-body-md font-body-md text-outline mt-0.5">
                合作次数：第 2 次合作 · 信用极佳
              </p>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface text-label-md font-label-md flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">
              storefront
            </span>
            米画师
          </span>
        </div>
        <div className="mt-space-md p-3 rounded-xl bg-surface-container-low text-body-md font-body-md text-on-surface-variant flex items-center justify-between">
          <p className="truncate pr-2">
            通过米画师企划合作，沟通顺畅，已确认草图。
          </p>
          <button className="text-primary hover:text-primary-container flex items-center shrink-0" title="复制备注">
            <span className="material-symbols-outlined text-[18px]">
              content_copy
            </span>
          </button>
        </div>
      </section>
      <section className="bg-surface-container-lowest rounded-xl p-space-lg card-shadow">
        <div className="flex items-center justify-between mb-space-md">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-primary text-[20px]">
              palette
            </span>
            <h2 className="text-title-md font-title-md text-on-surface">
              参考图与交付画作
            </h2>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-surface-container text-outline text-label-md font-label-md">
            2张参考图 · 1张草稿
          </span>
        </div>
        <div className="grid grid-cols-3 gap-2.5">
          <div className="flex flex-col">
            <div className="aspect-[3/4] rounded-lg overflow-hidden border border-outline-variant relative group">
              <img alt="设子主参考图" className="w-full h-full object-cover" src={IMG} />
              <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-on-surface/70 text-on-primary text-[10px] backdrop-blur-sm">
                设定原画
              </span>
            </div>
            <span className="text-[11px] text-center text-outline mt-1 truncate">
              设定全图.jpg
            </span>
          </div>
          <div className="flex flex-col">
            <div className="aspect-[3/4] rounded-lg overflow-hidden border border-outline-variant relative group bg-surface-container-low">
              <img className="w-full h-full object-cover" src={IMG} />
              <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-on-surface/70 text-on-primary text-[10px] backdrop-blur-sm">
                表情参考
              </span>
            </div>
            <span className="text-[11px] text-center text-outline mt-1 truncate">
              药水手势.png
            </span>
          </div>
          <div className="flex flex-col">
            <div className="aspect-[3/4] rounded-lg overflow-hidden border-2 border-primary-container relative group bg-surface-container-low">
              <img className="w-full h-full object-cover opacity-90" src={IMG} />
              <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-primary text-on-primary text-[10px]">
                阶段色草
              </span>
            </div>
            <span className="text-[11px] text-center text-primary font-bold mt-1 truncate">
              色块稿_v2.clip
            </span>
          </div>
        </div>
        <button className="mt-space-md w-full py-3 dashed-craft-border rounded-xl bg-surface-container-lowest text-primary hover:bg-surface-container-low flex items-center justify-center gap-1.5 active:scale-95 transition-transform duration-150">
          <span className="material-symbols-outlined text-[20px]">
            add_photo_alternate
          </span>
          <span className="text-label-lg font-label-lg">
            + 上传阶段草稿 / 终稿
          </span>
        </button>
      </section>
      <section className="bg-surface-container-lowest rounded-xl p-space-lg card-shadow relative">
        <div className="absolute -top-3 left-6 flex items-center text-outline pointer-events-none">
          <span className="material-symbols-outlined text-[24px] rotate-45 text-primary-container">
            attach_file
          </span>
        </div>
        <div className="flex items-center justify-between mb-space-sm pl-4">
          <h2 className="text-title-md font-title-md text-on-surface">
            企划详细要求与备忘
          </h2>
          <span className="material-symbols-outlined text-outline text-[18px]">
            push_pin
          </span>
        </div>
        <div className="p-3.5 bg-surface-container-low/80 rounded-xl border border-surface-variant font-body-lg text-body-lg text-on-surface leading-relaxed">
          要求浅金色双马尾，青金石蓝宝石大眼睛，微笑着拿魔法药水瓶。眼神要清透有高光，配饰请参考设子设定。
        </div>
        <div className="mt-space-md flex flex-wrap gap-2">
          <span className="px-2.5 py-1 rounded-md bg-surface-container-high text-primary text-label-md font-label-md border border-outline-variant/60">
            #允许公开展示
          </span>
          <span className="px-2.5 py-1 rounded-md bg-surface-container-high text-primary text-label-md font-label-md border border-outline-variant/60">
            #需分层PSD
          </span>
          <span className="px-2.5 py-1 rounded-md bg-secondary-fixed text-on-secondary-fixed text-label-md font-label-md border border-secondary-container/40">
            #商用加急
          </span>
        </div>
      </section>
      <section className="flex flex-col gap-space-sm pt-space-sm mb-4">
        <button className="w-full py-3 rounded-full bg-primary-fixed text-on-primary-fixed font-title-md text-title-md flex items-center justify-center gap-2 hover:bg-primary-fixed-dim active:scale-95 transition-transform duration-150 shadow-sm">
          <span className="material-symbols-outlined text-[20px]" style={{"fontVariationSettings": "'FILL' 1"}}>
            chat_bubble
          </span>
          联系客户
        </button>
        <button className="w-full py-2.5 rounded-full text-error hover:bg-error-container/30 flex items-center justify-center gap-1.5 active:scale-95 transition-transform duration-150 text-label-lg font-label-lg">
          <span className="material-symbols-outlined text-[18px]">
            delete
          </span>
          删除此稿单
        </button>
      </section>
    </main>
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-space-sm pb-safe max-w-md mx-auto bg-surface-container-lowest shadow-md h-16">
      <a className="flex flex-col items-center justify-center text-outline px-3 py-1 hover:bg-surface-container-low transition-colors duration-150" href="#">
        <span className="material-symbols-outlined text-[22px]">
          home
        </span>
        <span className="text-label-md font-label-md mt-0.5">
          首页
        </span>
      </a>
      <a className="flex flex-col items-center justify-center bg-surface-container-high text-primary rounded-full px-3 py-1" href="#">
        <span className="material-symbols-outlined text-[22px]" style={{"fontVariationSettings": "'FILL' 1"}}>
          assignment
        </span>
        <span className="text-label-md font-label-md mt-0.5 font-bold">
          稿单
        </span>
      </a>
      <a className="flex flex-col items-center justify-center text-outline px-3 py-1 hover:bg-surface-container-low transition-colors duration-150" href="#">
        <span className="material-symbols-outlined text-[22px]">
          palette
        </span>
        <span className="text-label-md font-label-md mt-0.5">
          画库
        </span>
      </a>
      <a className="flex flex-col items-center justify-center text-outline px-3 py-1 hover:bg-surface-container-low transition-colors duration-150" href="#">
        <span className="material-symbols-outlined text-[22px]">
          person
        </span>
        <span className="text-label-md font-label-md mt-0.5">
          我的
        </span>
      </a>
    </nav>
  </div>
</div>
