import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useLiveQuery } from 'dexie-react-hooks'
import Page from '../components/Page'
import Img from '../components/Img'
import Viewer from '../components/Viewer'
import FormSheet from '../components/FormSheet'
import { Sheet, useUI } from '../components/ui'
import { db, uid, type Artwork } from '../lib/db'
import { pickImagesSafe, takePhoto, deleteImages } from '../lib/images'
import { shareBlob } from '../lib/share'
import { bytes, mdDate, today } from '../lib/format'
import { FOLDER_COLORS } from './FolderNew'

const BASE_TAGS = ['成稿', '草稿', '色卡']
const TAG_C = ['bg-[#e3e9f5] text-[#364968]', 'bg-[#ffe8e3] text-[#9e3a2b]', 'bg-[#e3efe8] text-[#235241]', 'bg-[#fcf2d9] text-[#785918]']
const tagC = (t: string) => TAG_C[[...t].reduce((s, ch) => s + ch.charCodeAt(0), 0) % TAG_C.length]
const TAPE = ['right-6 w-10 rotate-[4deg]', 'left-5 w-10 rotate-[-5deg]', 'right-5 w-9 rotate-[3deg]', 'left-7 w-11 rotate-[-3deg]']

export default function Folder() {
  const { id } = useParams(); const nav = useNavigate(); const ui = useUI()
  const f = useLiveQuery(() => db.folders.get(id!), [id])
  const arts = useLiveQuery(() => db.artworks.where('folderId').equals(id!).toArray(), [id]) || []
  const meta = useLiveQuery(async () => {
    const recs = await db.images.bulkGet(arts.map(a => a.image)); const m: Record<string, { w: number; h: number; size: number }> = {}
    recs.forEach(r => { if (r) m[r.id] = { w: r.w, h: r.h, size: r.size + (r.thumb?.size || 0) } }); return m
  }, [arts.map(a => a.image).join()]) || {}
  const chars = useLiveQuery(() => db.characters.where('folderId').equals(id!).count(), [id]) ?? 0
  const [q, setQ] = useState(''); const [tag, setTag] = useState('全部')
  const [sel, setSel] = useState<Set<string> | null>(null)
  const [view, setView] = useState<{ ids: string[]; i: number } | null>(null)
  const [edit, setEdit] = useState<Artwork | null>(null)
  const [move, setMove] = useState(false)
  const folders = useLiveQuery(() => db.folders.toArray(), []) || []
  const [unlocked, setUnlocked] = useState(false)
  useEffect(() => { (async () => {
    if (!f || !f.isPrivate || unlocked || sessionStorage.getItem('pv:' + f.id)) return setUnlocked(true)
    if (await ui.confirm({ title: '私密画库', message: `「${f.name}」已设为私密，确认现在查看吗？`, okText: '查看' })) { sessionStorage.setItem('pv:' + f.id, '1'); setUnlocked(true) } else nav(-1)
  })() }, [f?.id]) // eslint-disable-line react-hooks/exhaustive-deps

  if (f === undefined) return <Page name="Folder" />
  if (!f) return <Page name="Folder"><div className="pt-40 text-center text-outline">文件夹不存在或已删除</div></Page>
  if (f.isPrivate && !unlocked) return <Page name="Folder" />
  const tags = [...new Set([...BASE_TAGS, ...arts.map(a => a.tag).filter(Boolean)])]
  const kw = q.trim().toLowerCase()
  const list = arts.filter(a => (tag === '全部' || (tag === '收藏' ? a.liked : a.tag === tag)) && (!kw || a.title.toLowerCase().includes(kw) || a.tag.toLowerCase().includes(kw)))
    .sort((a, b) => f.sort === 'old' ? a.createdAt - b.createdAt : f.sort === 'date' ? b.date.localeCompare(a.date) : f.sort === 'title' ? a.title.localeCompare(b.title, 'zh') : b.createdAt - a.createdAt)
  const cols: Artwork[][] = [[], []]; const hts = [0, 0]
  list.forEach(a => { const m = meta[a.image]; const r = m ? Math.min(1.6, Math.max(0.6, m.h / m.w)) : 1; const k = hts[0] <= hts[1] ? 0 : 1; cols[k].push(a); hts[k] += r + 0.45 })
  const size = arts.reduce((s, a) => s + (meta[a.image]?.size || 0), 0)
  const color = FOLDER_COLORS.find(c => c.v === f.color)
  const cover = f.cover || [...arts].sort((a, b) => b.createdAt - a.createdAt)[0]?.image

  const add = async (ids: string[]) => {
    if (!ids.length) return; const t = Date.now()
    await db.artworks.bulkAdd(ids.map((image, i) => ({ id: uid(), folderId: f.id, image, title: '', tag: tag !== '全部' && tag !== '收藏' ? tag : '', date: today(), liked: false, createdAt: t + i })))
    await db.folders.update(f.id, { updatedAt: t }); ui.toast(`已导入 ${ids.length} 张画作`)
  }
  const removeArts = async (as: Artwork[]) => {
    const keep = new Set([f.cover]); await deleteImages(as.map(a => a.image).filter(i => !keep.has(i)))
    await db.artworks.bulkDelete(as.map(a => a.id))
  }
  const download = async (a: Artwork) => { const r = await db.images.get(a.image); if (r) await shareBlob(r.blob, r.name || `${a.title || '画作'}.jpg`) }
  const toggleSel = (aid: string) => setSel(s => { const n = new Set(s); if (n.has(aid)) n.delete(aid); else n.add(aid); return n })
  const selected = arts.filter(a => sel?.has(a.id))
  const batchDel = async () => {
    if (!selected.length) return
    if (!(await ui.confirm({ title: `删除 ${selected.length} 张画作？`, message: '原图将从本地永久删除。', danger: true, okText: '删除' }))) return
    await removeArts(selected); setSel(new Set()); ui.toast('已删除')
  }
  const batchTag = async () => {
    if (!selected.length) return
    const v = await ui.prompt({ title: '批量设置标签', placeholder: '如：成稿 / 草稿 / 色卡', icon: 'sell' }); if (v === null) return
    await db.artworks.bulkUpdate(selected.map(a => ({ key: a.id, changes: { tag: v } }))); ui.toast('标签已更新')
  }
  const batchMove = async (to: string) => {
    await db.artworks.bulkUpdate(selected.map(a => ({ key: a.id, changes: { folderId: to } }))); setMove(false); setSel(new Set()); ui.toast('已移动')
  }
  const delFolder = async () => {
    if (!(await ui.confirm({ title: `删除文件夹「${f.name}」？`, message: `其中 ${arts.length} 张画作将一并永久删除。`, danger: true, okText: '删除' }))) return
    await removeArts(arts); await deleteImages([f.cover]); await db.characters.where('folderId').equals(f.id).modify({ folderId: undefined }); await db.folders.delete(f.id)
    ui.toast('文件夹已删除'); nav('/gallery', { replace: true })
  }

  return (
    <Page name="Folder">
      <div className="relative mx-auto min-h-screen max-w-md pb-28 pt-2">
        <header className="sticky top-0 z-40 bg-surface/90 px-margin py-space-sm pt-safe backdrop-blur-md">
          <div className="flex items-center justify-between">
            <button aria-label="返回上一级" onClick={() => (sel ? setSel(null) : nav(-1))} className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-container-lowest text-primary shadow-sm transition-transform active:scale-95" type="button">
              <span className="material-symbols-outlined text-[20px]">{sel ? 'close' : 'arrow_back_ios_new'}</span>
            </button>
            <div className="flex flex-col items-center min-w-0 px-2">
              <div className="flex items-center gap-1 font-label-md text-label-md text-outline"><span>画库</span><span className="text-[10px]">/</span><span>{f.scope || '自设集卷'}</span></div>
              <div className="flex items-center gap-1.5 font-title-md text-title-md text-on-surface max-w-[180px]"><span className="truncate">{sel ? `已选 ${sel.size} 张` : f.name}</span>{!sel && <span className="text-sm">📁</span>}</div>
            </div>
            <button onClick={() => setSel(s => (s ? null : new Set()))} className="flex items-center gap-1 rounded-full bg-surface-container-low px-3 py-1.5 font-label-md text-label-md text-primary transition-all hover:bg-surface-container active:scale-95" type="button">
              <span className="material-symbols-outlined text-[15px]">{sel ? 'done' : 'checklist'}</span><span>{sel ? '完成' : '批量管理'}</span>
            </button>
          </div>
        </header>
        <main className="space-y-space-lg px-margin pt-space-xs">
          <section className="relative overflow-hidden rounded-2xl bg-surface-container-lowest p-space-md paper-shadow">
            <div className="washi-tape-strip absolute -top-2 left-10 h-4 w-20 rotate-[-2deg] rounded-sm opacity-90" />
            <div className="flex items-start gap-space-md pt-1">
              <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl border border-surface-container-highest bg-surface-container shadow-inner">
                <Img id={cover} className="h-full w-full object-cover" fallback={<div className="h-full w-full flex items-center justify-center text-3xl">📁</div>} />
                <div className="absolute bottom-1 right-1 rounded-md bg-inverse-surface/75 px-1 py-0.5 font-label-md text-[9px] text-inverse-on-surface">封面</div>
              </div>
              <div className="flex flex-1 flex-col justify-between space-y-1.5 min-w-0">
                <div className="flex items-start justify-between gap-1">
                  <h1 className="font-headline-md text-headline-md text-on-surface break-all">{f.name}</h1>
                  <div className="flex -mr-1 -mt-1 flex-shrink-0">
                    <button aria-label="编辑文件夹" onClick={() => nav(`/folders/${f.id}/edit`)} className="w-7 h-7 rounded-full text-outline flex items-center justify-center"><span className="material-symbols-outlined text-[17px]">edit</span></button>
                    <button aria-label="删除文件夹" onClick={delFolder} className="w-7 h-7 rounded-full text-outline flex items-center justify-center"><span className="material-symbols-outlined text-[17px]">delete</span></button>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary-fixed px-2 py-0.5 font-label-md text-label-md text-on-primary-fixed"><span className="h-1.5 w-1.5 rounded-full" style={{ background: f.color }} />{color?.name || '自定义'}</span>
                  <span className="inline-flex items-center rounded-full bg-surface-container px-2 py-0.5 font-label-md text-label-md text-on-surface-variant">{arts.length}张画作 · {chars}个关联设子</span>
                  {f.isPrivate && <span className="inline-flex items-center gap-0.5 rounded-full bg-surface-container px-2 py-0.5 font-label-md text-label-md text-on-surface-variant"><span className="material-symbols-outlined text-[12px]">lock</span>私密</span>}
                </div>
              </div>
            </div>
            {f.desc && <div className="relative mt-space-md rounded-xl bg-surface-container-low p-space-sm pl-7 text-on-surface-variant">
              <span className="material-symbols-outlined absolute left-2 top-2 text-[16px] text-tertiary">push_pin</span>
              <p className="font-body-md text-body-md leading-relaxed whitespace-pre-line">{f.desc}</p>
            </div>}
          </section>
          <section className="space-y-space-md">
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-3.5 text-[18px] text-outline">search</span>
              <input value={q} onChange={e => setQ(e.target.value)} className="h-11 w-full rounded-full border border-surface-container-highest bg-surface-container-lowest pl-10 pr-9 font-body-md text-body-md text-on-surface placeholder:text-outline-variant focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" placeholder="搜索本文件夹画作/标签..." type="text" />
              {q && <button aria-label="清空输入" onClick={() => setQ('')} className="absolute right-3 flex h-5 w-5 items-center justify-center rounded-full bg-surface-container text-outline hover:text-on-surface" type="button"><span className="material-symbols-outlined text-[13px]">close</span></button>}
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
              {['全部', ...tags, '收藏'].map(t => {
                const n = t === '全部' ? arts.length : t === '收藏' ? arts.filter(a => a.liked).length : arts.filter(a => a.tag === t).length
                return <button key={t} onClick={() => setTag(t)} className={`inline-flex flex-shrink-0 items-center rounded-full px-3.5 py-1.5 font-label-md text-label-md active:scale-95 transition-colors ${tag === t ? 'bg-primary-container text-on-primary shadow-sm craft-stamp-shadow' : 'border border-surface-container-highest bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container'}`} type="button">{t} ({n})</button>
              })}
            </div>
            <div className="grid grid-cols-2 gap-space-sm pt-0.5">
              <button onClick={async () => add(await pickImagesSafe(true, ui.toast))} className="dashed-craft-border flex h-11 items-center justify-center gap-1.5 rounded-full bg-surface-container-lowest font-label-lg text-label-lg text-primary transition-all hover:bg-surface-container-low active:scale-95" type="button">
                <span className="material-symbols-outlined text-[18px]">add_photo_alternate</span><span>+ 导入画作</span>
              </button>
              <button onClick={async () => { const i = await takePhoto(); if (i) add([i]) }} className="dashed-craft-border flex h-11 items-center justify-center gap-1.5 rounded-full bg-surface-container-lowest font-label-lg text-label-lg text-primary transition-all hover:bg-surface-container-low active:scale-95" type="button">
                <span className="material-symbols-outlined text-[18px]">photo_camera</span><span>拍照录入</span>
              </button>
            </div>
          </section>
          {list.length ? <section className="grid grid-cols-2 gap-space-md pt-space-xs items-start">
            {cols.map((col, ci) => <div key={ci} className="flex flex-col gap-space-md">
              {col.map((a, k) => {
                const m = meta[a.image]; const ratio = m ? Math.min(1.6, Math.max(0.6, m.h / m.w)) : 1; const on = sel?.has(a.id)
                return (
                  <article key={a.id} className={`relative flex flex-col overflow-hidden rounded-2xl bg-surface-container-lowest p-2 paper-shadow transition-transform active:scale-[0.98] ${on ? 'ring-2 ring-primary' : ''}`} onClick={() => sel && toggleSel(a.id)}>
                    <div className={`washi-tape-strip absolute -top-1.5 z-10 h-3.5 rounded-xs opacity-80 ${TAPE[(ci + k * 2) % 4]}`} />
                    <div className="relative w-full overflow-hidden rounded-xl bg-surface-container-low" style={{ aspectRatio: `1 / ${ratio}` }} onClick={() => !sel && setView({ ids: list.map(x => x.image), i: list.indexOf(a) })}>
                      <Img id={a.image} className="h-full w-full object-cover transition-transform duration-300 hover:scale-105" />
                      {m && <span className="absolute bottom-1.5 left-1.5 rounded-md bg-inverse-surface/70 px-1.5 py-0.5 font-label-md text-[10px] text-inverse-on-surface">{m.w}x{m.h}</span>}
                      {sel && <span className={`absolute top-1.5 right-1.5 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center ${on ? 'bg-primary' : 'bg-black/25'}`}>{on && <span className="material-symbols-outlined text-white text-[15px]">check</span>}</span>}
                    </div>
                    <div className="flex flex-col pt-2" onClick={() => !sel && setEdit(a)}>
                      <div className="flex items-center justify-between">
                        {a.tag ? <span className={`inline-flex items-center rounded-md px-1.5 py-0.5 font-label-md text-label-md ${tagC(a.tag)}`}>{a.tag}</span> : <span className="font-label-md text-label-md text-outline-variant">+ 标签</span>}
                        <span className="font-label-md text-label-md text-outline">{mdDate(a.date)}</span>
                      </div>
                      <h2 className="mt-1 line-clamp-1 font-body-lg text-body-lg text-on-surface">{a.title || <span className="text-outline-variant">未命名画作</span>}</h2>
                    </div>
                    <div className="mt-2 flex items-center justify-end gap-1.5 border-t border-surface-container-high pt-1.5">
                      <button aria-label="收藏" onClick={e => { e.stopPropagation(); db.artworks.update(a.id, { liked: !a.liked }) }} className={`flex h-7 w-7 items-center justify-center rounded-full transition-colors hover:bg-error-container active:scale-90 ${a.liked ? 'text-secondary' : 'text-outline'}`} type="button">
                        <span className="material-symbols-outlined text-[17px]" style={a.liked ? { fontVariationSettings: "'FILL' 1" } : undefined}>favorite</span>
                      </button>
                      <button aria-label="下载原图" onClick={e => { e.stopPropagation(); download(a) }} className="flex h-7 w-7 items-center justify-center rounded-full text-outline transition-colors hover:bg-surface-container active:scale-90" type="button"><span className="material-symbols-outlined text-[17px]">download</span></button>
                    </div>
                  </article>
                )
              })}
            </div>)}
          </section> : <div className="rounded-2xl border-2 border-dashed border-surface-container-highest bg-surface-container-lowest/70 py-10 text-center text-outline font-body-md text-body-md">{arts.length ? '没有符合条件的画作' : '这里还空空的，导入第一张画作吧 ✨'}</div>}
        </main>
        {sel ? (
          <div className="fixed bottom-0 left-0 right-0 z-40 max-w-md mx-auto px-margin pb-safe pt-3 bg-surface/95 backdrop-blur-md border-t border-surface-container-highest">
            <div className="grid grid-cols-4 gap-2">
              {[
                { i: 'select_all', l: sel.size === list.length && list.length ? '取消全选' : '全选', fn: () => setSel(sel.size === list.length ? new Set() : new Set(list.map(a => a.id))) },
                { i: 'sell', l: '设标签', fn: batchTag },
                { i: 'drive_file_move', l: '移动', fn: () => selected.length && setMove(true) },
                { i: 'delete', l: '删除', fn: batchDel, danger: true },
              ].map(b => (
                <button key={b.l} onClick={b.fn} className={`flex flex-col items-center gap-0.5 py-1.5 rounded-xl font-label-md text-label-md ${b.danger ? 'text-error' : 'text-primary'} ${!selected.length && b.i !== 'select_all' ? 'opacity-40' : ''}`}><span className="material-symbols-outlined text-[20px]">{b.i}</span>{b.l}</button>
              ))}
            </div>
          </div>
        ) : (
          <div className="fixed bottom-4 left-0 z-30 flex w-full justify-center px-margin pointer-events-none mb-[var(--sab)]">
            <div className="pointer-events-auto flex items-center gap-2 rounded-full border border-surface-container-highest/70 bg-surface-container-lowest/90 px-4 py-2 paper-shadow backdrop-blur-md">
              <span className="material-symbols-outlined text-[16px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
              <span className="font-label-md text-label-md text-on-surface-variant">共 {arts.length} 张高质画作 · 本地离线 {bytes(size)}</span>
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            </div>
          </div>
        )}
      </div>
      {view && <Viewer ids={view.ids} index={view.i} onClose={() => setView(null)} onDelete={async img => { const a = arts.find(x => x.image === img); if (a && await ui.confirm({ title: '删除这张画作？', danger: true, okText: '删除' })) await removeArts([a]) }} />}
      <FormSheet open={!!edit} title="编辑画作信息" icon="brush" onClose={() => setEdit(null)}
        initial={edit ? { title: edit.title, tag: edit.tag, date: edit.date } : {}}
        fields={[{ key: 'title', label: '画作标题', placeholder: '如：小令民 · 晨曦微光' }, { key: 'tag', label: '标签', type: 'chips', options: [...tags, '无'] }, { key: 'date', label: '创作日期', type: 'date' }]}
        onDelete={edit ? async () => { if (await ui.confirm({ title: '删除这张画作？', danger: true, okText: '删除' })) { await removeArts([edit]); setEdit(null) } } : undefined}
        onSubmit={async v => { if (!edit) return; await db.artworks.update(edit.id, { title: v.title?.trim() || '', tag: v.tag === '无' ? '' : v.tag || '', date: v.date || edit.date }); setEdit(null) }}>
        <button type="button" onClick={async () => { const t = await ui.prompt({ title: '自定义标签', icon: 'sell' }); if (t && edit) { await db.artworks.update(edit.id, { tag: t }); setEdit(null) } }} className="mt-3 text-[12px] font-bold text-[#3c6a58] flex items-center gap-0.5"><span className="material-symbols-outlined text-[15px]">add</span>自定义标签</button>
        {edit && <button type="button" onClick={async () => { await db.folders.update(f.id, { cover: edit.image }); ui.toast('已设为封面'); setEdit(null) }} className="mt-3 ml-4 text-[12px] font-bold text-[#3c6a58] inline-flex items-center gap-0.5"><span className="material-symbols-outlined text-[15px]">wallpaper</span>设为文件夹封面</button>}
      </FormSheet>
      <Sheet open={move} onClose={() => setMove(false)}>
        <div className="bg-surface rounded-t-[28px] p-5 pb-[calc(var(--sab)+20px)] max-h-[70vh] overflow-y-auto">
          <div className="w-10 h-1.5 rounded-full bg-outline-variant mx-auto mb-4" />
          <h3 className="font-title-md text-title-md text-on-surface mb-3">移动 {selected.length} 张到…</h3>
          <div className="space-y-2">{folders.filter(x => x.id !== f.id).map(x => (
            <button key={x.id} onClick={() => batchMove(x.id)} className="w-full text-left px-4 py-3 rounded-xl bg-surface-container-low text-on-surface flex items-center gap-2"><span className="material-symbols-outlined text-[18px]" style={{ color: x.color }}>folder</span>{x.name}</button>
          ))}{folders.length <= 1 && <p className="text-center text-outline text-body-md py-4">还没有其他文件夹</p>}</div>
        </div>
      </Sheet>
    </Page>
  )
}
