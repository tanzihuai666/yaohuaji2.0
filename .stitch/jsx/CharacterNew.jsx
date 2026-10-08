<div className="bg-surface font-body-md text-on-surface flex flex-col min-h-screen">
  <header className="fixed top-0 w-full z-50 pt-safe bg-surface/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(60,106,88,0.06)]">
    <div className="h-14 px-margin flex items-center justify-between">
      <button aria-label="返回" className="w-11 h-11 rounded-full flex items-center justify-center text-primary hover:bg-surface-container active:scale-95 transition-transform">
        <span className="material-symbols-outlined text-[24px]">
          arrow_back
        </span>
      </button>
      <h1 className="font-headline-md text-headline-md text-primary tracking-tight text-center truncate flex-1 px-space-sm">
        新建角色
      </h1>
      <div className="flex items-center justify-end gap-space-xs">
        <button className="min-h-[44px] px-space-md py-space-xs rounded-full bg-primary hover:bg-primary-container text-on-primary font-label-lg text-label-lg shadow-[0_4px_12px_rgba(60,106,88,0.18)] active:scale-95 transition-all flex items-center gap-space-xs" type="button">
          <span className="material-symbols-outlined text-[18px]">
            check
          </span>
          <span className="">
            保存
          </span>
        </button>
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center ml-space-xs">
          <span className="material-symbols-outlined text-on-primary text-[18px]">
            person
          </span>
        </div>
      </div>
    </div>
  </header>
  <main className="flex flex-col relative w-full pt-14 pb-safe bg-transparent min-h-screen">
    <div className="flex flex-col w-full px-margin pb-space-xl space-y-space-lg">
      <div className="bg-surface-container rounded-xl p-space-md shadow-sm relative overflow-hidden flex items-center justify-between">
        <div className="flex items-center gap-space-sm z-10">
          <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-primary shadow-sm">
            <span className="material-symbols-outlined text-[22px]" style={{"fontVariationSettings": "\"FILL\" 1"}}>
              auto_stories
            </span>
          </div>
          <div>
            <div className="font-title-md text-title-md text-primary flex items-center gap-space-xs">
              <span className="">
                设子档案录入
              </span>
              <span className="text-label-md font-label-md bg-secondary text-on-secondary px-space-xs py-0.5 rounded-full">
                New OC
              </span>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant">
              给新崽崽建立专属的手账画库档案吧~
            </p>
          </div>
        </div>
        <div className="w-12 h-12 rounded-full bg-surface-container-highest/60 flex items-center justify-center text-primary/30 -mr-2">
          <span className="material-symbols-outlined text-[36px]">
            pets
          </span>
        </div>
      </div>
      <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-[0_4px_18px_rgba(74,90,80,0.05)] space-y-space-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-space-xs text-primary font-title-md text-title-md">
            <span className="material-symbols-outlined text-[20px]" style={{"fontVariationSettings": "\"FILL\" 1"}}>
              palette
            </span>
            <span className="">
              设子橱窗与色卡
            </span>
          </div>
          <span className="font-label-md text-label-md text-on-surface-variant bg-surface-container-low px-space-xs py-0.5 rounded-full">
            最多支持6张
          </span>
        </div>
        <div className="flex items-center gap-space-md bg-surface-container-low p-space-md rounded-xl">
          <div className="relative group cursor-pointer">
            <div className="w-20 h-20 rounded-xl overflow-hidden bg-surface-container-highest flex flex-col items-center justify-center relative shadow-sm">
              <img className="w-full h-full object-cover" src={IMG} />
              <div className="absolute inset-0 bg-primary/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="material-symbols-outlined text-on-primary text-[20px]">
                  photo_camera
                </span>
              </div>
            </div>
            <div className="absolute -bottom-1.5 -right-1.5 w-6 h-6 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-md">
              <span className="material-symbols-outlined text-[14px]">
                edit
              </span>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-title-md text-title-md text-on-surface truncate">
              主设封面头像
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant mt-0.5 line-clamp-1">
              将在角色列表中以手账贴纸形式优先展示
            </p>
            <div className="mt-space-xs flex items-center gap-space-xs">
              <span className="font-label-md text-label-md px-space-xs py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed">
                主设定
              </span>
              <span className="font-label-md text-label-md px-space-xs py-0.5 rounded-full bg-surface-container text-on-surface-variant">
                正比半身
              </span>
            </div>
          </div>
        </div>
        <div>
          <div className="font-label-lg text-label-lg text-on-surface mb-space-xs flex items-center justify-between">
            <span className="">
              立绘 / 细节参考 / 色卡
            </span>
            <span className="font-label-md text-label-md text-primary font-bold">
              2/6 已添加
            </span>
          </div>
          <div className="grid grid-cols-3 gap-space-sm">
            <div className="relative aspect-square rounded-lg overflow-hidden bg-surface-container-high group">
              <img className="w-full h-full object-cover" src={IMG} />
              <div className="absolute top-1 left-1 bg-on-surface/60 backdrop-blur-sm text-surface-container-lowest text-label-md font-label-md px-1.5 py-0.5 rounded">
                立绘 01
              </div>
              <button aria-label="删除图片" className="absolute top-1 right-1 w-5 h-5 rounded-full bg-secondary text-on-secondary flex items-center justify-center opacity-80 active:scale-90" type="button">
                <span className="material-symbols-outlined text-[12px]">
                  close
                </span>
              </button>
            </div>
            <div className="relative aspect-square rounded-lg overflow-hidden bg-surface-container-high group">
              <img className="w-full h-full object-cover" src={IMG} />
              <div className="absolute top-1 left-1 bg-on-surface/60 backdrop-blur-sm text-surface-container-lowest text-label-md font-label-md px-1.5 py-0.5 rounded">
                色卡 02
              </div>
              <button aria-label="删除图片" className="absolute top-1 right-1 w-5 h-5 rounded-full bg-secondary text-on-secondary flex items-center justify-center opacity-80 active:scale-90" type="button">
                <span className="material-symbols-outlined text-[12px]">
                  close
                </span>
              </button>
            </div>
            <button className="aspect-square rounded-lg bg-surface-container flex flex-col items-center justify-center text-primary hover:bg-surface-container-high active:scale-95 transition-all" type="button">
              <div className="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center mb-1">
                <span className="material-symbols-outlined text-primary text-[20px]">
                  add
                </span>
              </div>
              <span className="font-label-md text-label-md font-bold">
                添加画稿
              </span>
              <span className="font-label-md text-label-md text-on-surface-variant text-[10px]">
                立绘/色卡
              </span>
            </button>
          </div>
        </div>
      </div>
      <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-[0_4px_18px_rgba(74,90,80,0.05)] space-y-space-md">
        <div className="flex items-center gap-space-xs text-primary font-title-md text-title-md">
          <span className="material-symbols-outlined text-[20px]" style={{"fontVariationSettings": "\"FILL\" 1"}}>
            badge
          </span>
          <span className="">
            基础档案
          </span>
        </div>
        <div className="space-y-space-xs">
          <div className="flex items-center justify-between">
            <label className="font-label-lg text-label-lg text-on-surface" htmlFor="char-name">
              角色名字 / 昵称
              <span className="text-secondary">
                *
              </span>
            </label>
            <span className="font-label-md text-label-md text-on-surface-variant">
              手账卡片标题
            </span>
          </div>
          <div className="flex items-center gap-space-sm">
            <div className="flex-1 bg-surface-container-low rounded-lg px-space-md py-space-xs flex items-center">
              <input className="w-full bg-transparent font-title-md text-title-md text-on-surface outline-none placeholder:text-outline-variant" id="char-name" placeholder="给你的设子起个名字吧..." type="text" defaultValue="小令民" />
            </div>
            <div className="bg-primary-fixed px-space-md py-space-xs rounded-lg flex items-center gap-1 shadow-sm shrink-0">
              <span className="font-label-md text-label-md text-on-primary-fixed">
                编号
              </span>
              <span className="font-title-md text-title-md text-primary font-extrabold">
                #02
              </span>
            </div>
          </div>
        </div>
        <div className="space-y-space-xs">
          <label className="font-label-lg text-label-lg text-on-surface">
            种族 / 身份属性
          </label>
          <div className="flex flex-wrap gap-space-xs">
            <button className="px-space-md py-1 rounded-full font-label-md text-label-md bg-primary text-on-primary shadow-sm active:scale-95 transition-all" type="button">
              人类女巫
            </button>
            <button className="px-space-md py-1 rounded-full font-label-md text-label-md bg-surface-container text-on-surface-variant hover:bg-surface-container-high active:scale-95 transition-all" type="button">
              精灵族
            </button>
            <button className="px-space-md py-1 rounded-full font-label-md text-label-md bg-surface-container text-on-surface-variant hover:bg-surface-container-high active:scale-95 transition-all" type="button">
              古风修仙
            </button>
            <button className="px-space-md py-1 rounded-full font-label-md text-label-md bg-surface-container text-on-surface-variant hover:bg-surface-container-high active:scale-95 transition-all" type="button">
              毛茸茸/福瑞
            </button>
            <button className="px-space-md py-1 rounded-full font-label-md text-label-md bg-surface-container text-on-surface-variant hover:bg-surface-container-high active:scale-95 transition-all" type="button">
              机甲/赛博
            </button>
            <button className="w-7 h-7 rounded-full bg-surface-container text-primary flex items-center justify-center active:scale-95 transition-all" type="button">
              <span className="material-symbols-outlined text-[16px]">
                add
              </span>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-space-sm">
          <div className="bg-surface-container-low p-space-sm rounded-lg flex flex-col justify-center">
            <label className="font-label-md text-label-md text-on-surface-variant" htmlFor="char-gender">
              性别
            </label>
            <input className="w-full bg-transparent font-title-md text-title-md text-on-surface outline-none mt-0.5" id="char-gender" placeholder="例: 女 / 少女" type="text" defaultValue="女" />
          </div>
          <div className="bg-surface-container-low p-space-sm rounded-lg flex flex-col justify-center">
            <label className="font-label-md text-label-md text-on-surface-variant" htmlFor="char-height">
              身高
            </label>
            <input className="w-full bg-transparent font-title-md text-title-md text-on-surface outline-none mt-0.5" id="char-height" placeholder="例: 162 cm" type="text" defaultValue="158 cm" />
          </div>
          <div className="bg-surface-container-low p-space-sm rounded-lg flex flex-col justify-center">
            <label className="font-label-md text-label-md text-on-surface-variant" htmlFor="char-birthday">
              生日
            </label>
            <input className="w-full bg-transparent font-title-md text-title-md text-on-surface outline-none mt-0.5" id="char-birthday" placeholder="例: 04月18日" type="text" defaultValue="04月18日" />
          </div>
        </div>
        <div className="space-y-space-xs">
          <label className="font-label-lg text-label-lg text-on-surface" htmlFor="char-motto">
            一句话台词 / 性格特征
          </label>
          <div className="bg-surface-container-low rounded-lg p-space-sm flex items-start gap-space-xs">
            <span className="material-symbols-outlined text-primary text-[18px] mt-0.5">
              format_quote
            </span>
            <textarea className="w-full bg-transparent font-body-md text-body-md text-on-surface outline-none resize-none placeholder:text-outline-variant" id="char-motto" placeholder="如：'今天也是元气满满的见习炼金术士！' / 傲娇温和、天然呆..." rows="2" defaultValue="今天也是努力调配新药水的见习小魔女 (≧∇≦)/" />
          </div>
        </div>
      </div>
      <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-[0_4px_18px_rgba(74,90,80,0.05)] space-y-space-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-space-xs text-primary font-title-md text-title-md">
            <span className="material-symbols-outlined text-[20px]" style={{"fontVariationSettings": "\"FILL\" 1"}}>
              menu_book
            </span>
            <span className="">
              角色背景
            </span>
          </div>
          <span className="font-label-md text-label-md text-on-surface-variant bg-surface-container-low px-space-xs py-0.5 rounded-full">
            世界观 / 生平故事
          </span>
        </div>
        <div className="space-y-space-xs">
          <div className="bg-surface-container-low rounded-xl p-space-md space-y-space-xs">
            <textarea className="w-full bg-transparent font-body-md text-body-md text-on-surface outline-none resize-none leading-relaxed placeholder:text-outline-variant" id="char-background" placeholder="写一写 Ta 的出身背景、世界观设定、经历、与他人的羁绊或日常趣事...（支持自由分段与排版）" rows="4" />
            <div className="flex items-center justify-between text-on-surface-variant pt-space-xs border-t border-surface-container">
              <span className="font-label-md text-label-md text-[10px] flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">
                  ink_pen
                </span>
                支持手账风图文排版
              </span>
              <span className="font-label-md text-label-md text-[10px]">
                0 / 800 字
              </span>
            </div>
          </div>
          <div className="pt-space-xs">
            <div className="font-label-md text-label-md text-on-surface-variant mb-space-xs">
              灵感速添词条：
            </div>
            <div className="flex flex-wrap gap-space-xs">
              <button className="px-space-xs py-1 rounded-lg font-label-md text-label-md bg-surface-container text-on-surface-variant hover:bg-surface-container-high active:scale-95 transition-all flex items-center gap-0.5" type="button">
                <span className="material-symbols-outlined text-[14px] text-primary">
                  add
                </span>
                出身阵营
              </button>
              <button className="px-space-xs py-1 rounded-lg font-label-md text-label-md bg-surface-container text-on-surface-variant hover:bg-surface-container-high active:scale-95 transition-all flex items-center gap-0.5" type="button">
                <span className="material-symbols-outlined text-[14px] text-primary">
                  add
                </span>
                核心经历
              </button>
              <button className="px-space-xs py-1 rounded-lg font-label-md text-label-md bg-surface-container text-on-surface-variant hover:bg-surface-container-high active:scale-95 transition-all flex items-center gap-0.5" type="button">
                <span className="material-symbols-outlined text-[14px] text-primary">
                  add
                </span>
                羁绊关系
              </button>
              <button className="px-space-xs py-1 rounded-lg font-label-md text-label-md bg-surface-container text-on-surface-variant hover:bg-surface-container-high active:scale-95 transition-all flex items-center gap-0.5" type="button">
                <span className="material-symbols-outlined text-[14px] text-primary">
                  add
                </span>
                隐藏秘密
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-[0_4px_18px_rgba(74,90,80,0.05)] space-y-space-md">
        <div className="flex items-center gap-space-xs text-primary font-title-md text-title-md">
          <span className="material-symbols-outlined text-[20px]" style={{"fontVariationSettings": "\"FILL\" 1"}}>
            sticky_note_2
          </span>
          <span className="">
            设子特征备忘与雷点
          </span>
        </div>
        <div className="grid grid-cols-2 gap-space-sm">
          <div className="bg-surface-container-low p-space-sm rounded-lg">
            <span className="font-label-md text-label-md text-on-surface-variant">
              发型发色
            </span>
            <input className="w-full bg-transparent font-body-md text-body-md text-on-surface outline-none mt-0.5 font-bold" type="text" defaultValue="浅金色双马尾 + 蓝色发带" />
          </div>
          <div className="bg-surface-container-low p-space-sm rounded-lg">
            <span className="font-label-md text-label-md text-on-surface-variant">
              瞳色/瞳孔细节
            </span>
            <input className="w-full bg-transparent font-body-md text-body-md text-on-surface outline-none mt-0.5 font-bold" type="text" defaultValue="青金石蓝宝石眼" />
          </div>
        </div>
        <div className="bg-error-container/40 p-space-md rounded-xl space-y-space-xs">
          <div className="flex items-center gap-space-xs text-error font-label-lg text-label-lg">
            <span className="material-symbols-outlined text-[18px]">
              warning
            </span>
            <span className="">
              画师注意事项 / 作画雷点 (给太太看的Tips)
            </span>
          </div>
          <textarea className="w-full bg-transparent font-body-md text-body-md text-on-error-container outline-none resize-none leading-relaxed" placeholder="如：左右手手环不对称、请勿画错呆毛方向、不要画过于阴暗的表情..." rows="3" defaultValue="1. 蓝发带上的金色齿轮饰品一定在左侧；\n2. 眼神要有小高光，整体是阳光治愈路线；\n3. 不接受私自改变服饰配色。" />
        </div>
      </div>
      <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-[0_4px_18px_rgba(74,90,80,0.05)] space-y-space-md">
        <div className="flex items-center gap-space-xs text-primary font-title-md text-title-md">
          <span className="material-symbols-outlined text-[20px]" style={{"fontVariationSettings": "\"FILL\" 1"}}>
            folder_shared
          </span>
          <span className="">
            归档与展示设置
          </span>
        </div>
        <div className="flex items-center justify-between bg-surface-container-low p-space-md rounded-xl">
          <div className="flex items-center gap-space-sm">
            <div className="w-8 h-8 rounded-full bg-tertiary-fixed flex items-center justify-center text-tertiary">
              <span className="material-symbols-outlined text-[18px]">
                folder
              </span>
            </div>
            <div>
              <div className="font-title-md text-title-md text-on-surface">
                归档文件夹
              </div>
              <div className="font-body-md text-body-md text-on-surface-variant">
                默认画库 / 主世界观企划
              </div>
            </div>
          </div>
          <button className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant" type="button">
            <span className="material-symbols-outlined text-[18px]">
              keyboard_arrow_right
            </span>
          </button>
        </div>
        <div className="space-y-space-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-primary text-[20px]">
                push_pin
              </span>
              <span className="font-body-lg text-body-lg text-on-surface">
                设子置顶展示
              </span>
            </div>
            <button aria-label="切换置顶" className="w-12 h-7 bg-primary rounded-full relative p-0.5 flex items-center transition-colors" type="button">
              <div className="w-6 h-6 rounded-full bg-surface shadow-sm translate-x-5 transition-transform" />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-on-surface-variant text-[20px]">
                visibility
              </span>
              <div>
                <span className="font-body-lg text-body-lg text-on-surface">
                  橱窗公开给约稿画师
                </span>
                <p className="font-label-md text-label-md text-on-surface-variant">
                  允许画师通过扫码/直链查看高清三视图
                </p>
              </div>
            </div>
            <button aria-label="切换公开" className="w-12 h-7 bg-primary rounded-full relative p-0.5 flex items-center transition-colors" type="button">
              <div className="w-6 h-6 rounded-full bg-surface shadow-sm translate-x-5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-space-sm pt-space-xs">
        <button className="flex-1 min-h-[48px] rounded-full bg-surface-container font-label-lg text-label-lg text-on-surface-variant hover:bg-surface-container-high active:scale-95 transition-all flex items-center justify-center gap-space-xs" type="button">
          <span className="material-symbols-outlined text-[20px]">
            archive
          </span>
          <span className="">
            存为草稿
          </span>
        </button>
        <button className="flex-[2] min-h-[48px] rounded-full bg-primary font-label-lg text-label-lg text-on-primary shadow-[0_6px_16px_rgba(60,106,88,0.22)] active:scale-95 transition-all flex items-center justify-center gap-space-xs" type="button">
          <span className="material-symbols-outlined text-[20px]">
            verified
          </span>
          <span className="">
            生成手账角色卡
          </span>
        </button>
      </div>
    </div>
  </main>
</div>
