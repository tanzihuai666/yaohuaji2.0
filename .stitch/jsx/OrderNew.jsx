<div className="bg-surface font-body-lg text-body-lg text-on-surface antialiased flex flex-col min-h-screen">
  <header className="fixed top-0 w-full z-50 pt-safe bg-surface/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(74,90,80,0.04)]">
    <div className="h-14 px-margin flex items-center justify-between">
      <div className="flex items-center gap-space-sm">
        <button aria-label="取消或返回" className="w-11 h-11 -ml-space-sm flex items-center justify-center rounded-full hover:bg-surface-container active:scale-95 text-on-surface transition-all">
          <span className="material-symbols-outlined text-[24px]">
            arrow_back_ios_new
          </span>
        </button>
        <h1 className="font-headline-md text-headline-md text-on-surface font-bold tracking-tight">
          新建稿单
        </h1>
      </div>
      <div className="flex items-center gap-space-sm">
        <button aria-label="保存提交" className="h-9 px-space-lg rounded-full bg-primary text-on-primary font-label-lg text-label-lg shadow-[0_4px_12px_rgba(35,82,65,0.25)] active:scale-95 transition-all flex items-center gap-space-xs">
          <span className="material-symbols-outlined text-[16px]">
            check
          </span>
          <span className="">
            保存
          </span>
        </button>
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-[0_2px_8px_rgba(35,82,65,0.2)]">
          <span className="material-symbols-outlined text-on-primary text-[18px]">
            person
          </span>
        </div>
      </div>
    </div>
  </header>
  <main className="flex-1 flex flex-col relative w-full pt-14 bg-surface">
    <div className="flex flex-col w-full pb-28">
      <div className="px-margin pt-space-md pb-space-sm flex items-center justify-between">
        <div className="flex items-center gap-space-xs text-on-surface-variant">
          <span className="material-symbols-outlined text-[18px] text-primary" style={{"fontVariationSettings": "\"FILL\" 1"}}>
            auto_stories
          </span>
          <span className="font-label-lg text-label-lg text-on-surface-variant tracking-wide">
            约稿手账 · 专属档簿
          </span>
        </div>
        <span className="px-space-sm py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label-md text-label-md">
          No. YHJ-2026
        </span>
      </div>
      <div className="px-margin flex flex-col gap-space-lg">
        <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-[0_4px_18px_rgba(74,90,80,0.05),0_1px_3px_rgba(74,90,80,0.03)] flex flex-col gap-space-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-space-xs">
              <span className="w-2 h-4 rounded-full bg-primary" />
              <h2 className="font-title-md text-title-md text-on-surface">
                参考图 / 设子橱窗
              </h2>
              <span className="text-tertiary font-label-md text-label-md ml-1 bg-tertiary-fixed/60 px-space-xs py-0.5 rounded-full">
                最多9张
              </span>
            </div>
            <span className="font-label-md text-label-md text-on-surface-variant flex items-center gap-0.5">
              <span className="material-symbols-outlined text-[14px] text-primary">
                auto_fix_high
              </span>
              支持多选智能压缩
            </span>
          </div>
          <div className="grid grid-cols-3 gap-space-md">
            <div className="relative group aspect-square rounded-xl overflow-hidden shadow-sm bg-surface-container-high">
              <img alt="Uploaded Character Reference" className="w-full h-full object-cover" src={IMG} />
              <div className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-on-surface/60 backdrop-blur-sm text-surface flex items-center justify-center cursor-pointer active:scale-90 transition-transform">
                <span className="material-symbols-outlined text-[14px]">
                  close
                </span>
              </div>
              <span className="absolute bottom-1.5 left-1.5 px-space-xs py-0.5 rounded-md bg-inverse-surface/75 text-inverse-on-surface font-label-md text-label-md scale-90 origin-bottom-left">
                主设
              </span>
            </div>
            <div className="relative aspect-square rounded-xl overflow-hidden shadow-sm bg-surface-container-high">
              <img className="w-full h-full object-cover" src={IMG} />
              <div className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-on-surface/60 backdrop-blur-sm text-surface flex items-center justify-center cursor-pointer active:scale-90 transition-transform">
                <span className="material-symbols-outlined text-[14px]">
                  close
                </span>
              </div>
              <span className="absolute bottom-1.5 left-1.5 px-space-xs py-0.5 rounded-md bg-inverse-surface/75 text-inverse-on-surface font-label-md text-label-md scale-90 origin-bottom-left">
                服设
              </span>
            </div>
            <div className="aspect-square rounded-xl bg-surface-container-low flex flex-col items-center justify-center gap-space-xs cursor-pointer active:scale-95 transition-all text-primary hover:bg-surface-container shadow-inner">
              <div className="w-10 h-10 rounded-full bg-surface-container-lowest flex items-center justify-center shadow-[0_2px_8px_rgba(74,90,80,0.08)]">
                <span className="material-symbols-outlined text-[24px]">
                  add_photo_alternate
                </span>
              </div>
              <span className="font-label-md text-label-md text-primary font-bold">
                添加设子
              </span>
            </div>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px] text-tertiary">
              tips_and_updates
            </span>
            提示：上传正面高清设定图、配色色板与服装细节，画师更不易翻车哦
          </p>
        </div>
        <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-[0_4px_18px_rgba(74,90,80,0.05),0_1px_3px_rgba(74,90,80,0.03)] flex flex-col gap-space-lg">
          <div className="flex items-center gap-space-xs">
            <span className="w-2 h-4 rounded-full bg-primary" />
            <h2 className="font-title-md text-title-md text-on-surface">
              约稿基础信息
            </h2>
          </div>
          <div className="flex flex-col gap-space-xs">
            <label className="font-label-lg text-label-lg text-on-surface flex items-center justify-between">
              <span className="">
                客户昵称 / 约稿方
              </span>
              <span className="font-label-md text-label-md text-on-surface-variant font-normal">
                来源平台
              </span>
            </label>
            <div className="flex items-center gap-space-sm bg-surface-container-low rounded-xl px-space-md py-space-sm">
              <span className="material-symbols-outlined text-[20px] text-outline">
                badge
              </span>
              <input className="flex-1 bg-transparent font-body-lg text-body-lg text-on-surface focus:outline-none" placeholder="输入客户名称或备注名" type="text" defaultValue="桃桃气泡水 (金主妈咪)" />
              <button className="text-outline hover:text-on-surface flex items-center">
                <span className="material-symbols-outlined text-[18px]">
                  cancel
                </span>
              </button>
            </div>
            <div className="flex items-center gap-space-xs flex-wrap pt-space-xs">
              <button className="px-space-md py-1 rounded-full bg-primary text-on-primary font-label-md text-label-md flex items-center gap-1 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-fixed" />
                米画师
              </button>
              <button className="px-space-md py-1 rounded-full bg-surface-container text-on-surface-variant font-label-md text-label-md active:bg-surface-container-high transition-colors">
                QQ
              </button>
              <button className="px-space-md py-1 rounded-full bg-surface-container text-on-surface-variant font-label-md text-label-md active:bg-surface-container-high transition-colors">
                微信
              </button>
              <button className="px-space-md py-1 rounded-full bg-surface-container text-on-surface-variant font-label-md text-label-md active:bg-surface-container-high transition-colors">
                小红书
              </button>
              <button className="px-space-md py-1 rounded-full bg-surface-container text-on-surface-variant font-label-md text-label-md active:bg-surface-container-high transition-colors">
                B站
              </button>
              <button className="px-space-md py-1 rounded-full bg-surface-container text-on-surface-variant font-label-md text-label-md active:bg-surface-container-high transition-colors">
                + 平台
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-space-xs">
            <div className="flex items-center justify-between">
              <label className="font-label-lg text-label-lg text-on-surface">
                稿件类型
              </label>
              <span className="font-label-md text-label-md text-tertiary">
                长按自定义类型可删除
              </span>
            </div>
            <div className="flex flex-wrap gap-space-xs">
              <button className="px-space-md py-space-xs rounded-full bg-primary text-on-primary font-label-lg text-label-lg shadow-[0_4px_12px_rgba(35,82,65,0.2)]">
                头像
              </button>
              <button className="px-space-md py-space-xs rounded-full bg-surface-container text-on-surface font-label-lg text-label-lg">
                插画
              </button>
              <button className="px-space-md py-space-xs rounded-full bg-surface-container text-on-surface font-label-lg text-label-lg">
                立绘
              </button>
              <button className="px-space-md py-space-xs rounded-full bg-surface-container text-on-surface font-label-lg text-label-lg">
                设定集
              </button>
              <button className="px-space-md py-space-xs rounded-full bg-surface-container text-on-surface font-label-lg text-label-lg">
                表情包
              </button>
              <button className="px-space-md py-space-xs rounded-full bg-surface-container text-on-surface font-label-lg text-label-lg">
                Q版
              </button>
              <button className="px-space-md py-space-xs rounded-full bg-surface-container-low text-primary font-label-lg text-label-lg flex items-center gap-0.5">
                <span className="material-symbols-outlined text-[16px]">
                  add
                </span>
                自定义
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-space-xs">
            <label className="font-label-lg text-label-lg text-on-surface">
              当前工序状态
            </label>
            <div className="grid grid-cols-4 gap-space-xs">
              <div className="py-space-sm px-space-xs rounded-xl bg-primary text-on-primary font-label-md text-label-md flex flex-col items-center justify-center gap-1 shadow-[0_4px_10px_rgba(35,82,65,0.18)] cursor-pointer">
                <span className="material-symbols-outlined text-[18px]">
                  inbox
                </span>
                <span className="">
                  待接单
                </span>
              </div>
              <div className="py-space-sm px-space-xs rounded-xl bg-surface-container text-on-surface font-label-md text-label-md flex flex-col items-center justify-center gap-1 cursor-pointer">
                <span className="material-symbols-outlined text-[18px] text-tertiary">
                  draw
                </span>
                <span className="">
                  进行中
                </span>
              </div>
              <div className="py-space-sm px-space-xs rounded-xl bg-surface-container text-on-surface font-label-md text-label-md flex flex-col items-center justify-center gap-1 cursor-pointer">
                <span className="material-symbols-outlined text-[18px] text-outline">
                  fact_check
                </span>
                <span className="">
                  待验收
                </span>
              </div>
              <div className="py-space-sm px-space-xs rounded-xl bg-surface-container text-on-surface font-label-md text-label-md flex flex-col items-center justify-center gap-1 cursor-pointer">
                <span className="material-symbols-outlined text-[18px] text-primary">
                  task_alt
                </span>
                <span className="">
                  已完成
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-[0_4px_18px_rgba(74,90,80,0.05),0_1px_3px_rgba(74,90,80,0.03)] flex flex-col gap-space-lg">
          <div className="flex items-center gap-space-xs">
            <span className="w-2 h-4 rounded-full bg-primary" />
            <h2 className="font-title-md text-title-md text-on-surface">
              价格与画面规格
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-space-md">
            <div className="flex flex-col gap-space-xs">
              <label className="font-label-lg text-label-lg text-on-surface">
                稿酬总额
              </label>
              <div className="flex items-center bg-surface-container-low rounded-xl px-space-md py-space-sm">
                <span className="font-title-md text-title-md text-primary font-bold mr-1">
                  ¥
                </span>
                <input className="w-full bg-transparent font-stat-counter text-stat-counter text-on-surface focus:outline-none" type="number" defaultValue="800" />
              </div>
            </div>
            <div className="flex flex-col gap-space-xs">
              <label className="font-label-lg text-label-lg text-on-surface flex items-center justify-between">
                <span className="">
                  定金款项
                </span>
                <span className="text-tertiary font-label-md text-label-md">
                  50%
                </span>
              </label>
              <div className="flex items-center bg-surface-container-low rounded-xl px-space-md py-space-sm">
                <span className="font-title-md text-title-md text-tertiary font-bold mr-1">
                  ¥
                </span>
                <input className="w-full bg-transparent font-stat-counter text-stat-counter text-on-surface focus:outline-none" type="number" defaultValue="400" />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-space-xs">
            <label className="font-label-lg text-label-lg text-on-surface">
              画布规格
            </label>
            <div className="flex flex-wrap gap-space-xs">
              <button className="px-space-md py-1 rounded-full bg-surface-container text-on-surface font-label-md text-label-md">
                A4 (300DPI)
              </button>
              <button className="px-space-md py-1 rounded-full bg-primary text-on-primary font-label-md text-label-md shadow-sm">
                1:1 正方形头像
              </button>
              <button className="px-space-md py-1 rounded-full bg-surface-container text-on-surface font-label-md text-label-md">
                16:9 横版壁纸
              </button>
              <button className="px-space-md py-1 rounded-full bg-surface-container-low text-on-surface-variant font-label-md text-label-md">
                自定义尺寸
              </button>
            </div>
            <div className="grid grid-cols-2 gap-space-md mt-space-xs">
              <div className="flex items-center bg-surface-container-low rounded-xl px-space-md py-space-xs text-on-surface-variant">
                <span className="font-label-md text-label-md mr-2">
                  宽
                </span>
                <input className="w-full bg-transparent font-body-lg text-body-lg text-on-surface focus:outline-none" type="text" defaultValue="3000" />
                <span className="font-label-md text-label-md text-outline">
                  px
                </span>
              </div>
              <div className="flex items-center bg-surface-container-low rounded-xl px-space-md py-space-xs text-on-surface-variant">
                <span className="font-label-md text-label-md mr-2">
                  高
                </span>
                <input className="w-full bg-transparent font-body-lg text-body-lg text-on-surface focus:outline-none" type="text" defaultValue="3000" />
                <span className="font-label-md text-label-md text-outline">
                  px
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-space-xs">
            <label className="font-label-lg text-label-lg text-on-surface">
              授权用途及范围
            </label>
            <div className="flex flex-wrap gap-space-xs">
              <button className="px-space-md py-1 rounded-full bg-primary text-on-primary font-label-md text-label-md shadow-sm">
                个人收藏 / 社交头像
              </button>
              <button className="px-space-md py-1 rounded-full bg-surface-container text-on-surface font-label-md text-label-md">
                商业商用 (x2倍)
              </button>
              <button className="px-space-md py-1 rounded-full bg-surface-container text-on-surface font-label-md text-label-md">
                无料周边印制
              </button>
              <button className="px-space-md py-1 rounded-full bg-surface-container text-on-surface font-label-md text-label-md">
                独家买断
              </button>
            </div>
          </div>
        </div>
        <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-[0_4px_18px_rgba(74,90,80,0.05),0_1px_3px_rgba(74,90,80,0.03)] flex flex-col gap-space-lg">
          <div className="flex items-center gap-space-xs">
            <span className="w-2 h-4 rounded-full bg-primary" />
            <h2 className="font-title-md text-title-md text-on-surface">
              排期排单与提醒
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-space-md">
            <div className="flex flex-col gap-space-xs bg-surface-container-low p-space-md rounded-xl cursor-pointer active:scale-98 transition-transform">
              <div className="flex items-center justify-between">
                <span className="font-label-md text-label-md text-on-surface-variant flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  起稿接单日
                </span>
                <span className="material-symbols-outlined text-[16px] text-outline">
                  calendar_month
                </span>
              </div>
              <p className="font-title-md text-title-md text-on-surface font-bold mt-1">
                2026年9月26日
              </p>
              <span className="font-label-md text-label-md text-primary">
                已排档期 · 今天
              </span>
            </div>
            <div className="flex flex-col gap-space-xs bg-secondary-fixed/30 p-space-md rounded-xl cursor-pointer active:scale-98 transition-transform">
              <div className="flex items-center justify-between">
                <span className="font-label-md text-label-md text-secondary flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-secondary" />
                  最终截稿日
                </span>
                <span className="material-symbols-outlined text-[16px] text-secondary">
                  event_busy
                </span>
              </div>
              <p className="font-title-md text-title-md text-on-secondary-fixed font-bold mt-1">
                2026年10月15日
              </p>
              <span className="font-label-md text-label-md text-secondary">
                剩余 19 天
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-space-sm pt-space-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-[20px] text-primary">
                  notifications_active
                </span>
                <span className="font-label-lg text-label-lg text-on-surface">
                  截稿节点智能推送提醒
                </span>
              </div>
              <div className="w-12 h-6 rounded-full bg-primary p-0.5 flex items-center justify-end cursor-pointer shadow-inner">
                <div className="w-5 h-5 rounded-full bg-on-primary shadow-md" />
              </div>
            </div>
            <div className="flex items-center gap-space-xs pt-1">
              <button className="px-space-md py-1 rounded-full bg-primary-fixed text-on-primary-fixed font-label-md text-label-md">
                提前3天提醒
              </button>
              <button className="px-space-md py-1 rounded-full bg-surface-container text-on-surface font-label-md text-label-md">
                提前1天催画
              </button>
              <button className="px-space-md py-1 rounded-full bg-surface-container text-on-surface font-label-md text-label-md">
                当天10:00截稿
              </button>
            </div>
          </div>
        </div>
        <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-[0_4px_18px_rgba(74,90,80,0.05),0_1px_3px_rgba(74,90,80,0.03)] flex flex-col gap-space-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-space-xs">
              <span className="w-2 h-4 rounded-full bg-primary" />
              <h2 className="font-title-md text-title-md text-on-surface">
                约稿具体要求 / 细节备忘
              </h2>
            </div>
            <span className="font-label-md text-label-md text-outline">
              已输入 48 字
            </span>
          </div>
          <div className="bg-surface-container-low rounded-xl p-space-md mt-space-xs">
            <textarea className="w-full bg-transparent font-body-md text-body-md text-on-surface placeholder-outline focus:outline-none resize-none leading-relaxed" placeholder="记录约稿要求、设定细节、修改意见等..." rows="4" defaultValue="金发双马尾天使设定，神态要求微醺慵懒，背景需要浅杏色花卉与羽翼光晕点缀。草稿期确认动作后请勿大改骨骼走向，感谢画师老师！" />
          </div>
          <div className="flex items-center gap-space-xs flex-wrap pt-space-xs">
            <span className="font-label-md text-label-md text-outline flex items-center gap-0.5">
              <span className="material-symbols-outlined text-[14px]">
                sell
              </span>
              常用标签:
            </span>
            <span className="px-space-sm py-0.5 rounded-md bg-surface-container text-on-surface-variant font-label-md text-label-md cursor-pointer hover:bg-surface-container-high">
              #允许公开展示
            </span>
            <span className="px-space-sm py-0.5 rounded-md bg-surface-container text-on-surface-variant font-label-md text-label-md cursor-pointer hover:bg-surface-container-high">
              #加急单
            </span>
            <span className="px-space-sm py-0.5 rounded-md bg-surface-container text-on-surface-variant font-label-md text-label-md cursor-pointer hover:bg-surface-container-high">
              #需分层PSD
            </span>
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-surface/90 backdrop-blur-xl px-margin py-space-md shadow-[0_-4px_16px_rgba(74,90,80,0.06)]">
        <div className="max-w-md mx-auto flex items-center gap-space-md">
          <button className="h-12 px-space-xl rounded-full bg-surface-container-high text-on-surface font-label-lg text-label-lg active:scale-95 transition-all flex items-center justify-center gap-space-xs shadow-sm">
            <span className="material-symbols-outlined text-[18px]">
              restart_alt
            </span>
            <span className="">
              重置
            </span>
          </button>
          <button className="flex-1 h-12 rounded-full bg-primary text-on-primary font-title-md text-title-md shadow-[0_6px_16px_rgba(60,106,88,0.25)] active:scale-98 transition-all flex items-center justify-center gap-space-xs">
            <span className="material-symbols-outlined text-[20px]" style={{"fontVariationSettings": "\"FILL\" 1"}}>
              draw
            </span>
            <span className="">
              立即创建稿单
            </span>
          </button>
        </div>
      </div>
    </div>
  </main>
</div>
