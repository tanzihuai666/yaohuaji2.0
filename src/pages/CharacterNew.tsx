import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useLiveQuery } from 'dexie-react-hooks'
import Page from '../components/Page'
import Img from '../components/Img'
import { Sheet, useUI } from '../components/ui'
import { db, uid, type Character } from '../lib/db'
import { pickImages, deleteImages } from '../lib/images'
import { pad } from '../lib/format'

const SPECIES = ['人类女巫', '精灵族', '古风修仙', '毛茸茸/福瑞', '机甲/赛博']
const SEEDS = ['出身阵营', '核心经历', '羁绊关系', '隐藏秘密']
const FILL = { fontVariationSettings: '"FILL" 1' }
const blank = (): Character => ({ id: uid(), name: '', no: '', refImages: [], species: [], gender: '', height: '', birthday: '', quote: '', background: '', hair: '', eyes: '', warnings: '', pinned: false, publicView: false, createdAt: Date.now(), updatedAt: Date.now() })
const Toggle = ({ on, onClick, label }: { on: boolean; onClick: () => void; label: string }) => (
  <button aria-label={label} onClick={onClick} className={`w-12 h-7 rounded-full relative p-0.5 flex items-center transition-colors ${on ? 'bg-primary' : 'bg-surface-container-highest'}`} type="button">
    <div className={`w-6 h-6 rounded-full bg-surface shadow-sm transition-transform ${on ? 'translate-x-5' : ''}`} />
  </button>
)

export default function CharacterNew() {
  const { id } = useParams(); const nav = useNavigate(); const ui = useUI()
  const [c, setC] = useState<Character | null>(null); const [orig, setOrig] = useState<string[]>([])
  const [folderSheet, setFolderSheet] = useState(false)
  const folders = useLiveQuery(() => db.folders.toArray(), []) || []
  const customSpecies = useLiveQuery(async () => ((await db.kv.get('customSpecies'))?.value as string[]) || [], []) || []
  useEffect(() => { (async () => {
    if (id) { const x = await db.characters.get(id); if (!x) { ui.toast('角色不存在'); nav(-1); return } setC(x); setOrig([x.avatar, ...x.refImages].filter(Boolean) as string[]); return }
    const d = (await db.kv.get('draft:character'))?.value as Character | undefined
    const n = { ...(d || blank()) }
    if (!d) n.no = '#' + pad((await db.characters.count()) + 1)
    if (d) ui.toast('已恢复上次的草稿')
    setC(n)
  })() }, [id]) // eslint-disable-line react-hooks/exhaustive-deps
  if (!c) return <Page name="CharacterNew" />
  const set = (p: Partial<Character>) => setC(x => ({ ...x!, ...p }))
  const allSpecies = [...SPECIES, ...customSpecies, ...c.species.filter(s => !SPECIES.includes(s) && !customSpecies.includes(s))]
  const folder = folders.find(f => f.id === c.folderId)

  const pickAvatar = async () => { const [i] = await pickImages(false); if (i) set({ avatar: i }) }
  const addRefs = async () => {
    const left = 6 - c.refImages.length; if (left <= 0) return ui.toast('最多支持 6 张')
    const ids = await pickImages(true); if (ids.length > left) { await deleteImages(ids.slice(left)); ui.toast(`最多 6 张，已添加前 ${left} 张`) }
    set({ refImages: [...c.refImages, ...ids.slice(0, left)] })
  }
  const addSpecies = async () => {
    const v = await ui.prompt({ title: '添加种族 / 身份', placeholder: '如：吸血鬼贵族', icon: 'add' }); if (!v) return
    if (!allSpecies.includes(v)) await db.kv.put({ key: 'customSpecies', value: [...customSpecies, v] })
    if (!c.species.includes(v)) set({ species: [...c.species, v] })
  }
  const cleanup = async (keep: Character) => {
    const now = new Set([keep.avatar, ...keep.refImages].filter(Boolean)); await deleteImages(orig.filter(i => !now.has(i)))
  }
  const save = async () => {
    if (!c.name.trim()) return ui.toast('请填写角色名字')
    const x = { ...c, name: c.name.trim(), updatedAt: Date.now() }
    await db.characters.put(x); await cleanup(x)
    if (!id) await db.kv.delete('draft:character')
    ui.toast(id ? '档案已更新' : '角色卡已生成 ✨'); if (id) nav(-1); else nav(`/characters/${x.id}`, { replace: true })
  }
  const draft = async () => {
    if (id) return save()
    await db.kv.put({ key: 'draft:character', value: c }); ui.toast('已存为草稿，下次新建时自动恢复'); nav(-1)
  }
  const back = async () => {
    if (!id && (c.name || c.avatar || c.refImages.length) && !(await ui.confirm({ title: '放弃编辑？', message: '未保存的内容将丢失，可选择「存为草稿」保留。', okText: '放弃', danger: true }))) return
    if (!id) { const d = await db.kv.get('draft:character'); const keep = new Set(d ? [(d.value as Character).avatar, ...(d.value as Character).refImages] : []); await deleteImages([c.avatar, ...c.refImages].filter(i => i && !keep.has(i))) }
    nav(-1)
  }

  return (
    <Page name="CharacterNew">
      <header className="fixed top-0 w-full max-w-md left-1/2 -translate-x-1/2 z-50 pt-safe bg-surface/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(60,106,88,0.06)]">
        <div className="h-14 px-margin flex items-center justify-between">
          <button aria-label="返回" onClick={back} className="w-11 h-11 rounded-full flex items-center justify-center text-primary hover:bg-surface-container active:scale-95 transition-transform">
            <span className="material-symbols-outlined text-[24px]">arrow_back</span>
          </button>
          <h1 className="font-headline-md text-headline-md text-primary tracking-tight text-center truncate flex-1 px-space-sm">{id ? '编辑角色' : '新建角色'}</h1>
          <div className="flex items-center justify-end gap-space-xs">
            <button onClick={save} className="min-h-[44px] px-space-md py-space-xs rounded-full bg-primary hover:bg-primary-container text-on-primary font-label-lg text-label-lg shadow-[0_4px_12px_rgba(60,106,88,0.18)] active:scale-95 transition-all flex items-center gap-space-xs" type="button">
              <span className="material-symbols-outlined text-[18px]">check</span><span>保存</span>
            </button>
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center ml-space-xs overflow-hidden">
              <Img id={c.avatar} className="w-full h-full object-cover" fallback={<span className="material-symbols-outlined text-on-primary text-[18px]">person</span>} />
            </div>
          </div>
        </div>
      </header>
      <main className="flex flex-col relative w-full pt-14 pt-safe-header pb-safe bg-transparent min-h-screen max-w-md mx-auto">
        <div className="flex flex-col w-full px-margin pb-space-xl space-y-space-lg pt-space-md">
          <div className="bg-surface-container rounded-xl p-space-md shadow-sm relative overflow-hidden flex items-center justify-between">
            <div className="flex items-center gap-space-sm z-10">
              <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-primary shadow-sm"><span className="material-symbols-outlined text-[22px]" style={FILL}>auto_stories</span></div>
              <div>
                <div className="font-title-md text-title-md text-primary flex items-center gap-space-xs"><span>设子档案录入</span><span className="text-label-md font-label-md bg-secondary text-on-secondary px-space-xs py-0.5 rounded-full">{id ? 'Edit' : 'New OC'}</span></div>
                <p className="font-body-md text-body-md text-on-surface-variant">{id ? '更新崽崽的手账画库档案~' : '给新崽崽建立专属的手账画库档案吧~'}</p>
              </div>
            </div>
            <div className="w-12 h-12 rounded-full bg-surface-container-highest/60 flex items-center justify-center text-primary/30 -mr-2"><span className="material-symbols-outlined text-[36px]">pets</span></div>
          </div>

          <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-[0_4px_18px_rgba(74,90,80,0.05)] space-y-space-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-space-xs text-primary font-title-md text-title-md"><span className="material-symbols-outlined text-[20px]" style={FILL}>palette</span><span>设子橱窗与色卡</span></div>
              <span className="font-label-md text-label-md text-on-surface-variant bg-surface-container-low px-space-xs py-0.5 rounded-full">最多支持6张</span>
            </div>
            <div className="flex items-center gap-space-md bg-surface-container-low p-space-md rounded-xl">
              <button type="button" onClick={pickAvatar} className="relative group cursor-pointer">
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-surface-container-highest flex flex-col items-center justify-center relative shadow-sm">
                  <Img id={c.avatar} className="w-full h-full object-cover" fallback={<span className="material-symbols-outlined text-primary/60 text-[28px]">add_a_photo</span>} />
                </div>
                <div className="absolute -bottom-1.5 -right-1.5 w-6 h-6 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-md"><span className="material-symbols-outlined text-[14px]">edit</span></div>
              </button>
              <div className="flex-1 min-w-0">
                <div className="font-title-md text-title-md text-on-surface truncate">主设封面头像</div>
                <p className="font-body-md text-body-md text-on-surface-variant mt-0.5 line-clamp-1">将在角色列表中以手账贴纸形式优先展示</p>
                <div className="mt-space-xs flex items-center gap-space-xs">
                  <span className="font-label-md text-label-md px-space-xs py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed">主设定</span>
                  {c.avatar && <button type="button" onClick={() => set({ avatar: undefined })} className="font-label-md text-label-md px-space-xs py-0.5 rounded-full bg-surface-container text-on-surface-variant">移除</button>}
                </div>
              </div>
            </div>
            <div>
              <div className="font-label-lg text-label-lg text-on-surface mb-space-xs flex items-center justify-between"><span>立绘 / 细节参考 / 色卡</span><span className="font-label-md text-label-md text-primary font-bold">{c.refImages.length}/6 已添加</span></div>
              <div className="grid grid-cols-3 gap-space-sm">
                {c.refImages.map((im, i) => (
                  <div key={im} className="relative aspect-square rounded-lg overflow-hidden bg-surface-container-high group">
                    <Img id={im} className="w-full h-full object-cover" />
                    <div className="absolute top-1 left-1 bg-on-surface/60 backdrop-blur-sm text-surface-container-lowest text-label-md font-label-md px-1.5 py-0.5 rounded">{i === 0 ? '立绘' : '参考'} {pad(i + 1)}</div>
                    <button aria-label="删除图片" onClick={() => set({ refImages: c.refImages.filter(x => x !== im) })} className="absolute top-1 right-1 w-5 h-5 rounded-full bg-secondary text-on-secondary flex items-center justify-center opacity-80 active:scale-90" type="button"><span className="material-symbols-outlined text-[12px]">close</span></button>
                  </div>
                ))}
                {c.refImages.length < 6 && <button onClick={addRefs} className="aspect-square rounded-lg bg-surface-container flex flex-col items-center justify-center text-primary hover:bg-surface-container-high active:scale-95 transition-all" type="button">
                  <div className="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center mb-1"><span className="material-symbols-outlined text-primary text-[20px]">add</span></div>
                  <span className="font-label-md text-label-md font-bold">添加画稿</span>
                  <span className="font-label-md text-label-md text-on-surface-variant text-[10px]">立绘/色卡</span>
                </button>}
              </div>
            </div>
          </div>

          <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-[0_4px_18px_rgba(74,90,80,0.05)] space-y-space-md">
            <div className="flex items-center gap-space-xs text-primary font-title-md text-title-md"><span className="material-symbols-outlined text-[20px]" style={FILL}>badge</span><span>基础档案</span></div>
            <div className="space-y-space-xs">
              <div className="flex items-center justify-between">
                <label className="font-label-lg text-label-lg text-on-surface" htmlFor="char-name">角色名字 / 昵称<span className="text-secondary">*</span></label>
                <span className="font-label-md text-label-md text-on-surface-variant">手账卡片标题</span>
              </div>
              <div className="flex items-center gap-space-sm">
                <div className="flex-1 bg-surface-container-low rounded-lg px-space-md py-space-xs flex items-center">
                  <input value={c.name} onChange={e => set({ name: e.target.value })} className="w-full bg-transparent font-title-md text-title-md text-on-surface outline-none placeholder:text-outline-variant" id="char-name" placeholder="给你的设子起个名字吧..." type="text" />
                </div>
                <button type="button" onClick={async () => { const v = await ui.prompt({ title: '角色编号', defaultValue: c.no }); if (v !== null) set({ no: v }) }} className="bg-primary-fixed px-space-md py-space-xs rounded-lg flex items-center gap-1 shadow-sm shrink-0">
                  <span className="font-label-md text-label-md text-on-primary-fixed">编号</span>
                  <span className="font-title-md text-title-md text-primary font-extrabold">{c.no || '#--'}</span>
                </button>
              </div>
            </div>
            <div className="space-y-space-xs">
              <label className="font-label-lg text-label-lg text-on-surface">种族 / 身份属性</label>
              <div className="flex flex-wrap gap-space-xs">
                {allSpecies.map(s => { const on = c.species.includes(s); return (
                  <button key={s} onClick={() => set({ species: on ? c.species.filter(x => x !== s) : [...c.species, s] })} className={`px-space-md py-1 rounded-full font-label-md text-label-md active:scale-95 transition-all ${on ? 'bg-primary text-on-primary shadow-sm' : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'}`} type="button">{s}</button>
                ) })}
                <button onClick={addSpecies} className="w-7 h-7 rounded-full bg-surface-container text-primary flex items-center justify-center active:scale-95 transition-all" type="button"><span className="material-symbols-outlined text-[16px]">add</span></button>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-space-sm">
              {([['gender', '性别', '例: 女 / 少女'], ['height', '身高', '例: 162 cm'], ['birthday', '生日', '例: 04月18日']] as const).map(([k, l, p]) => (
                <div key={k} className="bg-surface-container-low p-space-sm rounded-lg flex flex-col justify-center">
                  <label className="font-label-md text-label-md text-on-surface-variant" htmlFor={`char-${k}`}>{l}</label>
                  <input value={c[k]} onChange={e => set({ [k]: e.target.value })} className="w-full bg-transparent font-title-md text-title-md text-on-surface outline-none mt-0.5 placeholder:text-outline-variant placeholder:text-[12px]" id={`char-${k}`} placeholder={p} type="text" />
                </div>
              ))}
            </div>
            <div className="space-y-space-xs">
              <label className="font-label-lg text-label-lg text-on-surface" htmlFor="char-motto">一句话台词 / 性格特征</label>
              <div className="bg-surface-container-low rounded-lg p-space-sm flex items-start gap-space-xs">
                <span className="material-symbols-outlined text-primary text-[18px] mt-0.5">format_quote</span>
                <textarea value={c.quote} onChange={e => set({ quote: e.target.value })} className="w-full bg-transparent font-body-md text-body-md text-on-surface outline-none resize-none placeholder:text-outline-variant" id="char-motto" placeholder="如：'今天也是元气满满的见习炼金术士！' / 傲娇温和、天然呆..." rows={2} />
              </div>
            </div>
          </div>

          <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-[0_4px_18px_rgba(74,90,80,0.05)] space-y-space-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-space-xs text-primary font-title-md text-title-md"><span className="material-symbols-outlined text-[20px]" style={FILL}>menu_book</span><span>角色背景</span></div>
              <span className="font-label-md text-label-md text-on-surface-variant bg-surface-container-low px-space-xs py-0.5 rounded-full">世界观 / 生平故事</span>
            </div>
            <div className="space-y-space-xs">
              <div className="bg-surface-container-low rounded-xl p-space-md space-y-space-xs">
                <textarea value={c.background} maxLength={800} onChange={e => set({ background: e.target.value })} className="w-full bg-transparent font-body-md text-body-md text-on-surface outline-none resize-none leading-relaxed placeholder:text-outline-variant" id="char-background" placeholder="写一写 Ta 的出身背景、世界观设定、经历、与他人的羁绊或日常趣事...（支持自由分段与排版）" rows={4} />
                <div className="flex items-center justify-between text-on-surface-variant pt-space-xs border-t border-surface-container">
                  <span className="font-label-md text-label-md text-[10px] flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">ink_pen</span>支持手账风图文排版</span>
                  <span className="font-label-md text-label-md text-[10px]">{c.background.length} / 800 字</span>
                </div>
              </div>
              <div className="pt-space-xs">
                <div className="font-label-md text-label-md text-on-surface-variant mb-space-xs">灵感速添词条：</div>
                <div className="flex flex-wrap gap-space-xs">
                  {SEEDS.map(s => (
                    <button key={s} onClick={() => set({ background: (c.background ? c.background.replace(/\s*$/, '') + '\n' : '') + `【${s}】` })} className="px-space-xs py-1 rounded-lg font-label-md text-label-md bg-surface-container text-on-surface-variant hover:bg-surface-container-high active:scale-95 transition-all flex items-center gap-0.5" type="button">
                      <span className="material-symbols-outlined text-[14px] text-primary">add</span>{s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-[0_4px_18px_rgba(74,90,80,0.05)] space-y-space-md">
            <div className="flex items-center gap-space-xs text-primary font-title-md text-title-md"><span className="material-symbols-outlined text-[20px]" style={FILL}>sticky_note_2</span><span>设子特征备忘与雷点</span></div>
            <div className="grid grid-cols-2 gap-space-sm">
              <div className="bg-surface-container-low p-space-sm rounded-lg">
                <span className="font-label-md text-label-md text-on-surface-variant">发型发色</span>
                <input value={c.hair} onChange={e => set({ hair: e.target.value })} placeholder="如：浅金色双马尾" className="w-full bg-transparent font-body-md text-body-md text-on-surface outline-none mt-0.5 font-bold placeholder:font-normal placeholder:text-outline-variant" type="text" />
              </div>
              <div className="bg-surface-container-low p-space-sm rounded-lg">
                <span className="font-label-md text-label-md text-on-surface-variant">瞳色/瞳孔细节</span>
                <input value={c.eyes} onChange={e => set({ eyes: e.target.value })} placeholder="如：青金石蓝" className="w-full bg-transparent font-body-md text-body-md text-on-surface outline-none mt-0.5 font-bold placeholder:font-normal placeholder:text-outline-variant" type="text" />
              </div>
            </div>
            <div className="bg-error-container/40 p-space-md rounded-xl space-y-space-xs">
              <div className="flex items-center gap-space-xs text-error font-label-lg text-label-lg"><span className="material-symbols-outlined text-[18px]">warning</span><span>画师注意事项 / 作画雷点 (给太太看的Tips)</span></div>
              <textarea value={c.warnings} onChange={e => set({ warnings: e.target.value })} className="w-full bg-transparent font-body-md text-body-md text-on-error-container outline-none resize-none leading-relaxed placeholder:text-on-error-container/50" placeholder="如：左右手手环不对称、请勿画错呆毛方向、不要画过于阴暗的表情..." rows={3} />
            </div>
          </div>

          <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-[0_4px_18px_rgba(74,90,80,0.05)] space-y-space-md">
            <div className="flex items-center gap-space-xs text-primary font-title-md text-title-md"><span className="material-symbols-outlined text-[20px]" style={FILL}>folder_shared</span><span>归档与展示设置</span></div>
            <button type="button" onClick={() => setFolderSheet(true)} className="w-full text-left flex items-center justify-between bg-surface-container-low p-space-md rounded-xl">
              <div className="flex items-center gap-space-sm">
                <div className="w-8 h-8 rounded-full bg-tertiary-fixed flex items-center justify-center text-tertiary"><span className="material-symbols-outlined text-[18px]">folder</span></div>
                <div>
                  <div className="font-title-md text-title-md text-on-surface">归档文件夹</div>
                  <div className="font-body-md text-body-md text-on-surface-variant">{folder ? folder.name : '默认画库 / 不归档'}</div>
                </div>
              </div>
              <span className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant"><span className="material-symbols-outlined text-[18px]">keyboard_arrow_right</span></span>
            </button>
            <div className="space-y-space-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-space-xs"><span className="material-symbols-outlined text-primary text-[20px]">push_pin</span><span className="font-body-lg text-body-lg text-on-surface">设子置顶展示</span></div>
                <Toggle label="切换置顶" on={c.pinned} onClick={() => set({ pinned: !c.pinned })} />
              </div>
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-on-surface-variant text-[20px]">visibility</span>
                  <div><span className="font-body-lg text-body-lg text-on-surface">橱窗公开给约稿画师</span><p className="font-label-md text-label-md text-on-surface-variant">开启后可在档案页一键分享设定卡长图</p></div>
                </div>
                <Toggle label="切换公开" on={c.publicView} onClick={() => set({ publicView: !c.publicView })} />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-space-sm pt-space-xs">
            <button onClick={draft} className="flex-1 min-h-[48px] rounded-full bg-surface-container font-label-lg text-label-lg text-on-surface-variant hover:bg-surface-container-high active:scale-95 transition-all flex items-center justify-center gap-space-xs" type="button">
              <span className="material-symbols-outlined text-[20px]">{id ? 'save' : 'archive'}</span><span>{id ? '保存修改' : '存为草稿'}</span>
            </button>
            <button onClick={save} className="flex-[2] min-h-[48px] rounded-full bg-primary font-label-lg text-label-lg text-on-primary shadow-[0_6px_16px_rgba(60,106,88,0.22)] active:scale-95 transition-all flex items-center justify-center gap-space-xs" type="button">
              <span className="material-symbols-outlined text-[20px]">verified</span><span>{id ? '更新手账角色卡' : '生成手账角色卡'}</span>
            </button>
          </div>
        </div>
      </main>
      <Sheet open={folderSheet} onClose={() => setFolderSheet(false)}>
        <div className="bg-surface rounded-t-[28px] p-5 pb-[calc(var(--sab)+20px)] max-h-[70vh] overflow-y-auto">
          <div className="w-10 h-1.5 rounded-full bg-outline-variant mx-auto mb-4" />
          <h3 className="font-title-md text-title-md text-on-surface mb-3 flex items-center gap-1.5"><span className="material-symbols-outlined text-primary text-[20px]">folder_shared</span>选择归档文件夹</h3>
          <div className="space-y-2">
            {[{ id: undefined as string | undefined, name: '默认画库 / 不归档' }, ...folders].map(f => (
              <button key={f.id || 'none'} onClick={() => { set({ folderId: f.id }); setFolderSheet(false) }} className={`w-full text-left px-4 py-3 rounded-xl flex items-center justify-between ${c.folderId === f.id ? 'bg-primary-fixed text-primary font-bold' : 'bg-surface-container-low text-on-surface'}`}>
                <span className="flex items-center gap-2"><span className="material-symbols-outlined text-[18px]">{f.id ? 'folder' : 'inventory_2'}</span>{f.name}</span>
                {c.folderId === f.id && <span className="material-symbols-outlined text-[18px]">check</span>}
              </button>
            ))}
            <button onClick={() => { setFolderSheet(false); nav('/folders/new') }} className="w-full px-4 py-3 rounded-xl border border-dashed border-primary/40 text-primary flex items-center justify-center gap-1 font-label-lg text-label-lg"><span className="material-symbols-outlined text-[18px]">create_new_folder</span>新建文件夹</button>
          </div>
        </div>
      </Sheet>
    </Page>
  )
}
