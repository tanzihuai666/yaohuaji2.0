import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Page from '../components/Page'
import Img from '../components/Img'
import { useUI } from '../components/ui'
import { db, uid, type Folder } from '../lib/db'
import { pickImages, deleteImages } from '../lib/images'

export const FOLDER_COLORS = [
  { name: '鼠尾草绿', cls: 'bg-primary-container', check: 'text-white', v: 'rgb(var(--c-primary-container))' },
  { name: '樱花水粉', cls: 'bg-secondary-container', check: 'text-white', v: 'rgb(var(--c-secondary-container))' },
  { name: '暖阳油黄', cls: 'bg-tertiary-fixed', check: 'text-on-tertiary-fixed', v: 'rgb(var(--c-tertiary-fixed))' },
  { name: '初晨青雾', cls: 'bg-inverse-primary', check: 'text-primary', v: 'rgb(var(--c-inverse-primary))' },
  { name: '暮色焦茶', cls: 'bg-tertiary', check: 'text-white', v: 'rgb(var(--c-tertiary))' },
  { name: '落日海棠', cls: 'bg-secondary', check: 'text-white', v: 'rgb(var(--c-secondary))' },
]
export const SCOPES = ['全部设子', '未分类角色', '专属企划', '商稿委托']
export const SORTS: { k: string; l: string }[] = [{ k: 'new', l: '按最新添加' }, { k: 'old', l: '按最早添加' }, { k: 'date', l: '按创作日期' }, { k: 'title', l: '按标题名称' }]
const blank = (): Folder => ({ id: uid(), name: '', desc: '', color: FOLDER_COLORS[0].v, scope: SCOPES[0], isPrivate: false, pinned: false, sort: 'new', createdAt: Date.now(), updatedAt: Date.now() })
const Switch = ({ on, onClick }: { on: boolean; onClick: () => void }) => (
  <button aria-checked={on} onClick={onClick} className={`relative inline-flex h-7 w-12 flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${on ? 'bg-primary' : 'bg-surface-container-highest'}`} role="switch" type="button">
    <span className={`pointer-events-none inline-block h-5 w-5 transform translate-y-1 rounded-full bg-surface-container-lowest shadow-sm ring-0 transition duration-200 ease-in-out ${on ? 'translate-x-6' : 'translate-x-1'}`} />
  </button>
)

export default function FolderNew() {
  const { id } = useParams(); const nav = useNavigate(); const ui = useUI()
  const [f, setF] = useState<Folder | null>(null); const [origCover, setOrigCover] = useState<string>()
  useEffect(() => { (async () => {
    if (!id) return setF(blank())
    const x = await db.folders.get(id); if (!x) { ui.toast('文件夹不存在'); nav(-1); return } setF(x); setOrigCover(x.cover)
  })() }, [id]) // eslint-disable-line react-hooks/exhaustive-deps
  if (!f) return <Page name="FolderNew" />
  const set = (p: Partial<Folder>) => setF(x => ({ ...x!, ...p }))
  const isArtImage = async (img?: string) => !!img && (await db.artworks.where('folderId').equals(f.id).filter(a => a.image === img).count()) > 0
  const pickCover = async () => {
    const [i] = await pickImages(false); if (!i) return
    if (f.cover && f.cover !== origCover && !(await isArtImage(f.cover))) await deleteImages([f.cover])
    set({ cover: i })
  }
  const save = async () => {
    if (!f.name.trim()) return ui.toast('请填写文件夹名称')
    await db.folders.put({ ...f, name: f.name.trim(), updatedAt: Date.now() })
    if (origCover && origCover !== f.cover && !(await isArtImage(origCover))) await deleteImages([origCover])
    ui.toast(id ? '文件夹已更新' : '文件夹已创建 ✨')
    if (id) nav(-1); else nav(`/folders/${f.id}`, { replace: true })
  }
  const cancel = async () => { if (f.cover && f.cover !== origCover && !(await isArtImage(f.cover))) await deleteImages([f.cover]); nav(-1) }
  const color = FOLDER_COLORS.find(c => c.v === f.color) || FOLDER_COLORS[0]
  const sortIdx = Math.max(0, SORTS.findIndex(s => s.k === f.sort))

  return (
    <Page name="FolderNew">
      <header className="fixed top-0 w-full max-w-md left-1/2 -translate-x-1/2 z-50 pt-safe bg-surface/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(60,106,88,0.06)]">
        <div className="h-14 px-margin flex items-center justify-between">
          <button aria-label="返回" onClick={cancel} className="w-11 h-11 rounded-full flex items-center justify-center text-primary hover:bg-surface-container active:scale-95 transition-transform"><span className="material-symbols-outlined text-[24px]">arrow_back</span></button>
          <h1 className="font-headline-md text-headline-md text-primary tracking-tight text-center truncate flex-1 px-space-sm">{id ? '编辑文件夹' : '新建文件夹'}</h1>
          <div className="flex items-center justify-end gap-space-xs">
            <button onClick={save} className="min-h-[44px] px-space-md py-space-xs rounded-full bg-primary hover:bg-primary-container text-on-primary font-label-lg text-label-lg shadow-[0_4px_12px_rgba(60,106,88,0.18)] active:scale-95 transition-all flex items-center gap-space-xs" type="button">
              <span className="material-symbols-outlined text-[18px]">check</span><span>保存</span>
            </button>
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center ml-space-xs"><span className="material-symbols-outlined text-on-primary text-[18px]">{id ? 'folder' : 'person'}</span></div>
          </div>
        </div>
      </header>
      <main className="flex flex-col relative w-full pt-14 pt-safe-header pb-safe bg-transparent min-h-screen max-w-md mx-auto">
        <div className="flex flex-col w-full pb-10 space-y-space-lg px-margin pt-space-md">
          <div className="relative overflow-hidden rounded-2xl bg-surface-container-low p-space-md shadow-sm">
            <div className="flex items-center gap-space-md relative z-10">
              <div className="w-12 h-12 rounded-xl bg-primary-fixed flex items-center justify-center text-primary shadow-sm flex-shrink-0"><span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: '"FILL" 1' }}>folder_special</span></div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-headline-md text-headline-md text-primary">{id ? '编辑绘卷档案' : '新绘卷档案'}</span>
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-label-md font-label-md bg-tertiary-fixed text-on-tertiary-fixed">手账风</span>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant truncate">创建专属文件夹，给崽崽与画作安一个家 ✨</p>
              </div>
            </div>
            <div className="absolute -right-4 -bottom-4 w-20 h-20 rounded-full bg-primary/5 pointer-events-none" />
            <div className="absolute right-8 top-1 w-6 h-6 rounded-full bg-tertiary-container/10 pointer-events-none" />
          </div>

          <div className="flex flex-col bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm space-y-space-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-space-xs text-primary"><span className="material-symbols-outlined text-[20px]">palette</span><span className="font-title-md text-title-md">封面与标签色</span></div>
              <span className="font-label-md text-label-md text-outline">随时可改</span>
            </div>
            <div onClick={pickCover} className="relative w-full rounded-xl bg-surface-container-low p-space-md flex flex-col items-center justify-center text-center group cursor-pointer overflow-hidden transition-all hover:bg-surface-container">
              <div className="relative w-24 h-24 rounded-2xl bg-surface-container-lowest shadow-sm flex items-center justify-center overflow-hidden mb-space-sm" id="folderPreview">
                <Img id={f.cover} className="w-full h-full object-cover" fallback={<span className="material-symbols-outlined text-[40px]" style={{ color: f.color, fontVariationSettings: '"FILL" 1' }}>folder</span>} />
              </div>
              <button className="inline-flex items-center gap-1 px-space-md py-1 rounded-full bg-primary-fixed text-primary font-label-lg text-label-lg active:scale-95 transition-transform shadow-sm" type="button">
                <span className="material-symbols-outlined text-[16px]">upload_file</span><span>点击更换画作封面</span>
              </button>
              <p className="font-label-md text-label-md text-outline mt-1">推荐比例 1:1 或 4:3 崽崽立绘图{!f.cover && '（留空则用最新画作）'}</p>
            </div>
            <div className="flex flex-col space-y-space-xs pt-space-xs">
              <label className="font-label-lg text-label-lg text-on-surface-variant flex items-center justify-between"><span>手账标签色标</span><span className="text-label-md font-label-md text-primary" id="selectedColorLabel">{color.name}</span></label>
              <div className="flex items-center justify-between pt-1" id="colorPickerGroup">
                {FOLDER_COLORS.map(c => { const on = c.v === color.v; return (
                  <button key={c.name} onClick={() => set({ color: c.v })} className={`color-dot w-9 h-9 rounded-full ${c.cls} flex items-center justify-center shadow-sm transition-all ${on ? 'ring-offset-2 ring-2 ring-primary' : 'hover:scale-105'}`} type="button">
                    <span className={`material-symbols-outlined ${c.check} text-[16px] ${on ? '' : 'hidden'}`}>check</span>
                  </button>
                ) })}
              </div>
            </div>
          </div>

          <div className="flex flex-col bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm space-y-space-md">
            <div className="flex items-center gap-space-xs text-primary"><span className="material-symbols-outlined text-[20px]">edit_note</span><span className="font-title-md text-title-md">档案详情</span></div>
            <div className="flex flex-col space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="font-label-lg text-label-lg text-on-surface" htmlFor="folderNameInput">文件夹名称</label>
                <span className="font-label-md text-label-md text-outline" id="nameCounter">{f.name.length}/20</span>
              </div>
              <div className="relative flex items-center">
                <input value={f.name} onChange={e => set({ name: e.target.value })} className="w-full h-11 px-space-md pr-9 rounded-xl bg-surface-container-low text-on-surface font-body-lg text-body-lg placeholder:text-outline/70 focus:outline-none focus:bg-surface-container transition-all" id="folderNameInput" maxLength={20} placeholder="例如：主设企划、商稿归档、OC世界观..." type="text" />
                {f.name && <button onClick={() => set({ name: '' })} className="absolute right-2.5 w-6 h-6 rounded-full text-outline hover:text-on-surface flex items-center justify-center" type="button"><span className="material-symbols-outlined text-[16px]">cancel</span></button>}
              </div>
            </div>
            <div className="flex flex-col space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="font-label-lg text-label-lg text-on-surface" htmlFor="folderDescInput">便签碎碎念</label>
                <span className="font-label-md text-label-md text-outline">选填</span>
              </div>
              <div className="relative w-full rounded-xl bg-surface-container-low p-space-sm focus-within:bg-surface-container transition-all">
                <textarea value={f.desc} onChange={e => set({ desc: e.target.value })} className="w-full bg-transparent resize-none font-body-md text-body-md text-on-surface placeholder:text-outline/70 focus:outline-none" id="folderDescInput" placeholder="写点关于这个文件夹的记录、OC世界观背景设定，或是约稿注意点..." rows={3} />
                <div className="flex items-center justify-end"><span className="material-symbols-outlined text-outline text-[16px]">draw</span></div>
              </div>
            </div>
          </div>

          <div className="flex flex-col bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm space-y-space-md">
            <div className="flex items-center gap-space-xs text-primary"><span className="material-symbols-outlined text-[20px]">tune</span><span className="font-title-md text-title-md">分类与展示设置</span></div>
            <div className="flex flex-col space-y-space-xs">
              <label className="font-label-lg text-label-lg text-on-surface">角色归属</label>
              <div className="flex flex-wrap gap-space-xs" id="categoryChips">
                {SCOPES.map(s => (
                  <button key={s} onClick={() => set({ scope: s })} className={`category-chip px-space-md py-1.5 rounded-full font-label-lg text-label-lg transition-all ${f.scope === s ? 'bg-primary text-on-primary shadow-sm' : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'}`} type="button">{s}</button>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between py-1">
              <div className="flex flex-col pr-2"><span className="font-body-lg text-body-lg text-on-surface">私密画库</span><span className="font-label-md text-label-md text-outline">仅自己可见，打开相册时需二次确认</span></div>
              <Switch on={f.isPrivate} onClick={() => set({ isPrivate: !f.isPrivate })} />
            </div>
            <div className="flex items-center justify-between py-1">
              <div className="flex flex-col pr-2"><span className="font-body-lg text-body-lg text-on-surface">画库首页置顶</span><span className="font-label-md text-label-md text-outline">常驻画库顶部方便快捷查阅</span></div>
              <Switch on={f.pinned} onClick={() => set({ pinned: !f.pinned })} />
            </div>
            <div className="flex items-center justify-between pt-1">
              <label className="font-label-lg text-label-lg text-on-surface">预设排序</label>
              <button type="button" onClick={() => set({ sort: SORTS[(sortIdx + 1) % SORTS.length].k })} className="flex items-center gap-1 bg-surface-container-low px-space-sm py-1 rounded-xl text-primary font-body-md text-body-md cursor-pointer hover:bg-surface-container transition-colors">
                <span className="material-symbols-outlined text-[18px]">sort</span><span id="sortLabel">{SORTS[sortIdx].l}</span><span className="material-symbols-outlined text-[16px] text-outline">arrow_drop_down</span>
              </button>
            </div>
          </div>
          <div className="pt-space-sm pb-safe flex items-center gap-space-md">
            <button onClick={cancel} className="flex-1 h-12 rounded-full bg-surface-container text-on-surface-variant font-headline-md text-headline-md hover:bg-surface-container-high active:scale-95 transition-all" type="button">取消</button>
            <button onClick={save} className="flex-[2] h-12 rounded-full bg-primary text-on-primary font-headline-md text-headline-md shadow-[0_6px_16px_rgba(60,106,88,0.22)] hover:bg-primary-container active:scale-95 transition-all flex items-center justify-center gap-space-xs" id="createFolderBtn" type="button">
              <span className="material-symbols-outlined text-[20px]">{id ? 'save' : 'add_circle'}</span><span>{id ? '保存修改' : '立即创建文件夹'}</span>
            </button>
          </div>
        </div>
      </main>
    </Page>
  )
}
