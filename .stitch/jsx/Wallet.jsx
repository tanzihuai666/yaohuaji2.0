<div className="bg-surface text-on-surface font-body-md antialiased stationery-paper-grid selection:bg-primary-fixed min-h-screen pb-28">
  <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-margin h-14 bg-surface/95 backdrop-blur-md border-b border-surface-container-highest max-w-md mx-auto transition-all">
    <button aria-label="返回" className="flex items-center justify-center w-9 h-9 rounded-full bg-surface-container-lowest border border-outline-variant/40 text-primary active:scale-95 transition-transform duration-150 hover:bg-surface-container" type="button">
      <span className="material-symbols-outlined text-[18px]">
        arrow_back_ios_new
      </span>
    </button>
    <div className="flex items-center space-x-1.5">
      <div className="w-6 h-6 rounded-full bg-primary-fixed flex items-center justify-center text-primary rotate-3 shadow-xs">
        <span className="material-symbols-outlined text-[16px]">
          account_balance_wallet
        </span>
      </div>
      <h1 className="font-headline-md text-headline-md tracking-tight text-on-surface">
        记账钱包
      </h1>
      <span className="inline-block w-1.5 h-1.5 rounded-full bg-secondary align-top -mt-2 animate-pulse" />
    </div>
    <button className="flex items-center space-x-1 px-3 py-1.5 rounded-full bg-surface-container-lowest border border-primary-container/40 text-primary-container font-label-md text-label-md active:scale-95 transition-transform duration-150 hover:bg-surface-container-low shadow-xs" type="button">
      <span className="material-symbols-outlined text-[15px]">
        receipt_long
      </span>
      <span>
        导出账本
      </span>
    </button>
  </header>
  <main className="max-w-md mx-auto px-margin pt-20 space-y-4">
    <section className="relative bg-surface-container-lowest rounded-2xl p-5 border border-surface-container-highest sticker-shadow overflow-hidden">
      <div className="absolute -top-1.5 right-6 washi-tape-strip px-4 py-0.5 rounded-sm text-[9px] font-bold text-on-surface-variant tracking-wider uppercase opacity-90 pointer-events-none z-10 border border-white/40">
        ✦ YAO WALLET
      </div>
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-xl bg-surface-container-low flex items-center justify-center text-primary-container border border-surface-container">
            <span className="material-symbols-outlined text-[20px]">
              savings
            </span>
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-title-md text-title-md text-on-surface">
                累计创作稿费
              </span>
              <span className="w-2 h-2 rounded-full bg-primary inline-block" />
            </div>
            <p className="font-label-md text-label-md text-outline">
              共完成 28 笔商业/私稿委托
            </p>
          </div>
        </div>
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-label-md font-label-md bg-surface-container text-outline">
          <span className="material-symbols-outlined text-[12px] mr-0.5 text-primary">
            check_circle
          </span>
          已校对
        </span>
      </div>
      <div className="mt-4 flex items-baseline justify-between">
        <div className="flex items-baseline space-x-1">
          <span className="font-headline-lg text-headline-lg text-primary tracking-tight font-extrabold">
            ¥
          </span>
          <span className="font-display-lg text-display-lg text-primary font-black tracking-tight">
            12,480
          </span>
        </div>
        <div className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-primary-fixed/60 text-on-primary-fixed font-label-md text-label-md">
          <span className="material-symbols-outlined text-[14px]">
            trending_up
          </span>
          <span>
            +8.5% 较上月
          </span>
        </div>
      </div>
      <div className="mt-5 bg-surface-container-low/80 rounded-xl p-3 grid grid-cols-3 gap-2 text-center border border-surface-container">
        <div className="flex flex-col items-center">
          <span className="font-label-md text-label-md text-outline">
            本月入账
          </span>
          <span className="font-title-md text-title-md text-primary-container font-extrabold mt-0.5">
            ¥3,200
          </span>
          <span className="text-[10px] text-primary font-semibold">
            4笔完成
          </span>
        </div>
        <div className="flex flex-col items-center border-x border-outline-variant/30 px-1">
          <div className="flex items-center space-x-1">
            <span className="font-label-md text-label-md text-secondary">
              待结尾款
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
          </div>
          <span className="font-title-md text-title-md text-secondary font-extrabold mt-0.5">
            ¥1,200
          </span>
          <span className="text-[10px] text-secondary font-semibold">
            2笔在画中
          </span>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-label-md text-label-md text-outline">
            年度累计
          </span>
          <span className="font-title-md text-title-md text-on-surface font-extrabold mt-0.5">
            ¥11,280
          </span>
          <span className="text-[10px] text-outline font-semibold">
            目标 84%
          </span>
        </div>
      </div>
    </section>
    <section className="bg-surface-container-lowest rounded-2xl p-4 border border-surface-container-highest sticker-shadow relative">
      <div className="flex items-center justify-between pb-3 border-b border-surface-container/60">
        <div className="flex items-center space-x-2">
          <span className="material-symbols-outlined text-primary-container text-[20px]">
            bar_chart
          </span>
          <h2 className="font-title-md text-title-md text-on-surface">
            2026年 逐月稿费趋势
          </h2>
        </div>
        <button className="inline-flex items-center space-x-1 rounded-full bg-surface-container px-3 py-1 text-label-md font-label-md text-primary-container hover:bg-surface-container-high transition" type="button">
          <span>
            2026 年度
          </span>
          <span className="material-symbols-outlined text-[14px]">
            expand_more
          </span>
        </button>
      </div>
      <div className="pt-5 pb-2">
        <div className="relative h-40 flex flex-col justify-between pointer-events-none">
          <div className="border-b border-dashed border-outline-variant/30 flex justify-between text-[10px] text-outline">
            <span>
              ¥4k
            </span>
          </div>
          <div className="border-b border-dashed border-outline-variant/30 flex justify-between text-[10px] text-outline">
            <span>
              ¥3k
            </span>
          </div>
          <div className="border-b border-dashed border-outline-variant/30 flex justify-between text-[10px] text-outline">
            <span>
              ¥2k
            </span>
          </div>
          <div className="border-b border-dashed border-outline-variant/30 flex justify-between text-[10px] text-outline">
            <span>
              ¥1k
            </span>
          </div>
          <div className="border-b border-outline-variant/40 flex justify-between text-[10px] text-outline">
            <span>
              ¥0
            </span>
          </div>
          <div className="absolute inset-0 flex items-end justify-between px-1 pointer-events-auto">
            <div className="flex flex-col items-center flex-1 group cursor-pointer">
              <div className="w-3.5 bg-primary-fixed-dim/70 rounded-t-full transition-all group-hover:bg-primary-container" style={{"height": "30%"}} />
            </div>
            <div className="flex flex-col items-center flex-1 group cursor-pointer">
              <div className="w-3.5 bg-primary-fixed-dim/70 rounded-t-full transition-all group-hover:bg-primary-container" style={{"height": "45%"}} />
            </div>
            <div className="flex flex-col items-center flex-1 group cursor-pointer">
              <div className="w-3.5 bg-primary-fixed-dim/70 rounded-t-full transition-all group-hover:bg-primary-container" style={{"height": "22%"}} />
            </div>
            <div className="flex flex-col items-center flex-1 group cursor-pointer">
              <div className="w-3.5 bg-primary-fixed-dim/70 rounded-t-full transition-all group-hover:bg-primary-container" style={{"height": "52%"}} />
            </div>
            <div className="flex flex-col items-center flex-1 group cursor-pointer">
              <div className="w-3.5 bg-primary-fixed-dim/70 rounded-t-full transition-all group-hover:bg-primary-container" style={{"height": "37%"}} />
            </div>
            <div className="flex flex-col items-center flex-1 group cursor-pointer">
              <div className="w-3.5 bg-primary-fixed-dim/70 rounded-t-full transition-all group-hover:bg-primary-container" style={{"height": "70%"}} />
            </div>
            <div className="flex flex-col items-center flex-1 group cursor-pointer">
              <div className="w-3.5 bg-primary-fixed-dim/70 rounded-t-full transition-all group-hover:bg-primary-container" style={{"height": "60%"}} />
            </div>
            <div className="flex flex-col items-center flex-1 group cursor-pointer">
              <div className="w-3.5 bg-primary-fixed-dim/70 rounded-t-full transition-all group-hover:bg-primary-container" style={{"height": "47%"}} />
            </div>
            <div className="flex flex-col items-center flex-1 relative cursor-pointer">
              <div className="absolute -top-7 whitespace-nowrap bg-primary-container text-on-primary text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-sm animate-bounce">
                ¥3.2k
              </div>
              <div className="w-4 bg-primary-container rounded-t-full ring-2 ring-primary-fixed" style={{"height": "80%"}} />
            </div>
            <div className="flex flex-col items-center flex-1 group cursor-pointer">
              <div className="w-3.5 bg-surface-container-highest/60 rounded-t-full border border-dashed border-outline-variant/60" style={{"height": "12%"}} />
            </div>
            <div className="flex flex-col items-center flex-1 group cursor-pointer">
              <div className="w-3.5 bg-surface-container-highest/60 rounded-t-full border border-dashed border-outline-variant/60" style={{"height": "8%"}} />
            </div>
            <div className="flex flex-col items-center flex-1 group cursor-pointer">
              <div className="w-3.5 bg-surface-container-highest/60 rounded-t-full border border-dashed border-outline-variant/60" style={{"height": "8%"}} />
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center px-1 mt-2 text-[10px] font-medium text-outline">
          <span className="flex-1 text-center">
            1
          </span>
          <span className="flex-1 text-center">
            2
          </span>
          <span className="flex-1 text-center">
            3
          </span>
          <span className="flex-1 text-center">
            4
          </span>
          <span className="flex-1 text-center">
            5
          </span>
          <span className="flex-1 text-center">
            6
          </span>
          <span className="flex-1 text-center">
            7
          </span>
          <span className="flex-1 text-center">
            8
          </span>
          <span className="flex-1 text-center font-bold text-primary bg-primary-fixed/40 rounded-full">
            9月
          </span>
          <span className="flex-1 text-center opacity-60">
            10
          </span>
          <span className="flex-1 text-center opacity-60">
            11
          </span>
          <span className="flex-1 text-center opacity-60">
            12
          </span>
        </div>
      </div>
    </section>
    <section className="bg-surface-container-lowest rounded-2xl p-4 border border-surface-container-highest sticker-shadow">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <span className="material-symbols-outlined text-tertiary text-[20px]">
            palette
          </span>
          <h2 className="font-title-md text-title-md text-on-surface">
            稿件类型收入构成
          </h2>
        </div>
        <span className="font-label-md text-label-md text-outline">
          合计 28 幅作品
        </span>
      </div>
      <div className="w-full h-3 rounded-full bg-surface-container overflow-hidden flex gap-0.5 p-0.5">
        <div className="h-full rounded-l-full bg-primary-container" style={{"width": "52%"}} title="插画立绘 52%" />
        <div className="h-full bg-tertiary-fixed-dim" style={{"width": "28%"}} title="头像Q版 28%" />
        <div className="h-full rounded-r-full bg-secondary-fixed-dim" style={{"width": "20%"}} title="商用企划 20%" />
      </div>
      <div className="mt-3.5 grid grid-cols-3 gap-2 pt-2 border-t border-surface-container/60">
        <div className="flex flex-col">
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-primary-container" />
            <span className="font-label-md text-label-md text-on-surface">
              插画立绘
            </span>
          </div>
          <span className="font-title-md text-title-md text-on-surface font-bold mt-1">
            ¥6,489
          </span>
          <span className="text-[10px] text-outline">
            占比 52% · 11单
          </span>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-tertiary-fixed-dim" />
            <span className="font-label-md text-label-md text-on-surface">
              头像Q版
            </span>
          </div>
          <span className="font-title-md text-title-md text-on-surface font-bold mt-1">
            ¥3,494
          </span>
          <span className="text-[10px] text-outline">
            占比 28% · 13单
          </span>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-secondary-fixed-dim" />
            <span className="font-label-md text-label-md text-on-surface">
              商用企划
            </span>
          </div>
          <span className="font-title-md text-title-md text-on-surface font-bold mt-1">
            ¥2,497
          </span>
          <span className="text-[10px] text-outline">
            占比 20% · 4单
          </span>
        </div>
      </div>
    </section>
    <section className="space-y-3">
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center space-x-2">
          <span className="material-symbols-outlined text-primary text-[20px]">
            edit_note
          </span>
          <h2 className="font-title-md text-title-md text-on-surface">
            收支明细账目
          </h2>
        </div>
        <span className="font-label-md text-label-md text-primary-container font-semibold cursor-pointer flex items-center">
          查看全部明细
          <span className="material-symbols-outlined text-[14px]">
            arrow_forward_ios
          </span>
        </span>
      </div>
      <div className="flex space-x-2 overflow-x-auto no-scrollbar py-1">
        <button className="px-3.5 py-1 rounded-full font-label-md text-label-md bg-primary-container text-on-primary shadow-xs shrink-0 active:scale-95 transition-transform" type="button">
          全部 (28)
        </button>
        <button className="px-3.5 py-1 rounded-full font-label-md text-label-md bg-surface-container-lowest border border-outline-variant/60 text-outline shrink-0 hover:bg-surface-container active:scale-95 transition-transform" type="button">
          已结清 (24)
        </button>
        <button className="px-3.5 py-1 rounded-full font-label-md text-label-md bg-surface-container-lowest border border-outline-variant/60 text-outline shrink-0 hover:bg-surface-container active:scale-95 transition-transform" type="button">
          定金到账 (2)
        </button>
        <button className="px-3.5 py-1 rounded-full font-label-md text-label-md bg-surface-container-lowest border border-outline-variant/60 text-outline shrink-0 hover:bg-surface-container active:scale-95 transition-transform" type="button">
          待结尾款 (2)
        </button>
      </div>
      <div className="space-y-2.5">
        <article className="bg-surface-container-lowest rounded-xl p-3.5 border border-surface-container-highest sticker-shadow relative overflow-hidden transition-all active:scale-[0.99]">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-secondary" />
          <div className="flex justify-between items-start pl-1">
            <div className="space-y-0.5">
              <div className="flex items-center space-x-1.5">
                <span className="font-body-lg text-body-lg text-on-surface font-bold">
                  桃桃气泡水 · 头像正比
                </span>
                <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-secondary-fixed text-on-secondary-fixed">
                  定金
                </span>
              </div>
              <p className="font-label-md text-label-md text-outline">
                09-26 · 米画师委托企划
              </p>
            </div>
            <div className="text-right">
              <span className="font-title-md text-title-md text-primary font-black">
                +¥400
              </span>
              <span className="block text-[10px] text-outline">
                微信结算
              </span>
            </div>
          </div>
          <div className="mt-2 pl-1 pt-2 border-t border-surface-container/60 flex items-center justify-between">
            <div className="flex items-center space-x-1 text-secondary text-[11px] font-semibold">
              <span className="material-symbols-outlined text-[13px]">
                hourglass_top
              </span>
              <span>
                待收尾款 ¥400 (线稿验收阶段)
              </span>
            </div>
            <button className="px-2 py-0.5 rounded-full bg-secondary-fixed-dim/40 text-on-secondary-fixed-variant text-[11px] font-bold hover:bg-secondary-fixed" type="button">
              催验收
            </button>
          </div>
        </article>
        <article className="bg-surface-container-lowest rounded-xl p-3.5 border border-surface-container-highest sticker-shadow relative overflow-hidden transition-all active:scale-[0.99]">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />
          <div className="flex justify-between items-start pl-1">
            <div className="space-y-0.5">
              <div className="flex items-center space-x-1.5">
                <span className="font-body-lg text-body-lg text-on-surface font-bold">
                  星野猫猫 · Q版表情包
                </span>
                <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-primary-fixed text-on-primary-fixed">
                  全款
                </span>
              </div>
              <p className="font-label-md text-label-md text-outline">
                09-20 · QQ微信私稿委托
              </p>
            </div>
            <div className="text-right">
              <span className="font-title-md text-title-md text-primary font-black">
                +¥600
              </span>
              <span className="block text-[10px] text-outline">
                支付宝
              </span>
            </div>
          </div>
          <div className="mt-2 pl-1 pt-2 border-t border-surface-container/60 flex items-center justify-between">
            <div className="flex items-center space-x-1 text-primary-container text-[11px] font-medium">
              <span className="material-symbols-outlined text-[13px]">
                check_circle
              </span>
              <span>
                已结清 100% (已交付源工程PSD)
              </span>
            </div>
            <span className="text-[10px] text-outline">
              评价 5.0 ★
            </span>
          </div>
        </article>
        <article className="bg-surface-container-lowest rounded-xl p-3.5 border border-surface-container-highest sticker-shadow relative overflow-hidden transition-all active:scale-[0.99]">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />
          <div className="flex justify-between items-start pl-1">
            <div className="space-y-0.5">
              <div className="flex items-center space-x-1.5">
                <span className="font-body-lg text-body-lg text-on-surface font-bold">
                  见习魔女企划 · 正比立绘
                </span>
                <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-primary-fixed text-on-primary-fixed">
                  尾款入账
                </span>
              </div>
              <p className="font-label-md text-label-md text-outline">
                09-12 · 米画师主页企划
              </p>
            </div>
            <div className="text-right">
              <span className="font-title-md text-title-md text-primary font-black">
                +¥1,200
              </span>
              <span className="block text-[10px] text-outline">
                平台提现
              </span>
            </div>
          </div>
          <div className="mt-2 pl-1 pt-2 border-t border-surface-container/60 flex items-center justify-between">
            <div className="flex items-center space-x-1 text-primary-container text-[11px] font-medium">
              <span className="material-symbols-outlined text-[13px]">
                verified
              </span>
              <span>
                已结清 100% · 委托方完成确认
              </span>
            </div>
            <span className="text-[10px] text-outline">
              合同归档 #A409
            </span>
          </div>
        </article>
        <article className="bg-surface-container-lowest rounded-xl p-3.5 border border-surface-container-highest sticker-shadow relative overflow-hidden transition-all active:scale-[0.99]">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />
          <div className="flex justify-between items-start pl-1">
            <div className="space-y-0.5">
              <div className="flex items-center space-x-1.5">
                <span className="font-body-lg text-body-lg text-on-surface font-bold">
                  小令民 · 设子三视图拆分
                </span>
                <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-tertiary-fixed text-on-tertiary-fixed">
                  加急件
                </span>
              </div>
              <p className="font-label-md text-label-md text-outline">
                09-02 · 商用授权加急加印
              </p>
            </div>
            <div className="text-right">
              <span className="font-title-md text-title-md text-primary font-black">
                +¥800
              </span>
              <span className="block text-[10px] text-outline">
                对公账户
              </span>
            </div>
          </div>
          <div className="mt-2 pl-1 pt-2 border-t border-surface-container/60 flex items-center justify-between">
            <div className="flex items-center space-x-1 text-primary-container text-[11px] font-medium">
              <span className="material-symbols-outlined text-[13px]">
                check_circle
              </span>
              <span>
                已结清 100% · 商用许可已授权
              </span>
            </div>
            <span className="text-[10px] text-outline">
              开具电子收据
            </span>
          </div>
        </article>
      </div>
    </section>
    <section className="mt-6 mb-2">
      <div className="rounded-xl border-2 border-dashed border-primary-container/40 bg-surface-container-lowest/60 p-4 text-center relative overflow-hidden">
        <div className="w-10 h-10 rounded-full bg-surface-container-high mx-auto flex items-center justify-center text-primary-container mb-2 shadow-xs">
          <span className="material-symbols-outlined text-[20px]">
            shield
          </span>
        </div>
        <h3 className="font-title-md text-title-md text-on-surface font-bold">
          本地离线存盘 · 零网络上传
        </h3>
        <p className="font-label-md text-label-md text-outline mt-1">
          财务与稿酬明细均存储于本地沙盒数据库，保护创作者商业隐私
        </p>
        <div className="mt-2 pt-2 border-t border-dashed border-outline-variant/40 inline-flex items-center space-x-1 text-[10px] text-outline-variant font-mono">
          <span>
            妖画集 v2.9.5
          </span>
          <span>
            •
          </span>
          <span>
            AES-256 本地离线密钥加密
          </span>
        </div>
      </div>
    </section>
  </main>
  <div className="fixed bottom-20 right-4 z-40 max-w-md">
    <button className="flex items-center space-x-1.5 px-4 py-3 rounded-full bg-primary-container text-on-primary font-label-lg text-label-lg shadow-lg active:scale-95 transition-transform duration-150 border-2 border-surface-container-lowest" style={{"boxShadow": "0 6px 18px rgba(60, 106, 88, 0.35)"}} type="button">
      <span className="material-symbols-outlined text-[20px]">
        add
      </span>
      <span className="tracking-wide">
        记一笔
      </span>
    </button>
  </div>
  <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-space-sm pb-safe max-w-md mx-auto bg-surface-container-lowest dark:bg-surface-container shadow-md h-16">
    <a className="flex flex-col items-center justify-center text-outline dark:text-outline-variant px-3 py-1 hover:bg-surface-container-low dark:hover:bg-surface-variant active:scale-95 transition-transform duration-150" href="javascript:void(0)">
      <span className="material-symbols-outlined text-[22px]">
        home
      </span>
      <span className="font-label-md text-label-md">
        首页
      </span>
    </a>
    <a className="flex flex-col items-center justify-center bg-surface-container-high dark:bg-primary-container text-primary dark:text-on-primary-container rounded-full px-3 py-1 active:scale-95 transition-transform duration-150" href="javascript:void(0)">
      <span className="material-symbols-outlined text-[22px]" style={{"fontVariationSettings": "'FILL' 1"}}>
        assignment
      </span>
      <span className="font-label-md text-label-md font-bold">
        稿单
      </span>
    </a>
    <a className="flex flex-col items-center justify-center text-outline dark:text-outline-variant px-3 py-1 hover:bg-surface-container-low dark:hover:bg-surface-variant active:scale-95 transition-transform duration-150" href="javascript:void(0)">
      <span className="material-symbols-outlined text-[22px]">
        palette
      </span>
      <span className="font-label-md text-label-md">
        画库
      </span>
    </a>
    <a className="flex flex-col items-center justify-center text-outline dark:text-outline-variant px-3 py-1 hover:bg-surface-container-low dark:hover:bg-surface-variant active:scale-95 transition-transform duration-150" href="javascript:void(0)">
      <span className="material-symbols-outlined text-[22px]">
        person
      </span>
      <span className="font-label-md text-label-md">
        我的
      </span>
    </a>
  </nav>
</div>
