import { useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useLiveQuery } from 'dexie-react-hooks'
import { toBlob } from 'html-to-image'
import Page from '../components/Page'
import Img from '../components/Img'
import Viewer from '../components/Viewer'
import GroupDialog from '../components/GroupDialog'
import { useUI } from '../components/ui'
import { db, type CommissionRecord, type Group } from '../lib/db'
import { deleteImagesIfOrphan } from '../lib/images'
import { shareBlob } from '../lib/share'
import { yuan } from '../lib/format'

const Pen = () => <svg className="w-4 h-4 transform rotate-12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" strokeLinecap="round" strokeLinejoin="round" /></svg>

export default function Character() {
  const { id } = useParams(); const nav = useNavigate(); const ui = useUI()
  const c = useLiveQuery(() => db.characters.get(id!), [id])
  const records = useLiveQuery(() => db.records.where('characterId').equals(id!).toArray(), [id]) || []
  const groups = useLiveQuery(() => db.groups.where('characterId').equals(id!).sortBy('createdAt'), [id]) || []
  const [dlg, setDlg] = useState<null | { g?: Group }>(null)
  const [open, setOpen] = useState<Record<string, boolean>>({})
  const [info, setInfo] = useState(false)
  const [view, setView] = useState<{ ids: string[]; i: number } | null>(null)
  const card = useRef<HTMLDivElement>(null)
  if (c === undefined) return <Page name="Character" />
  if (!c) return <Page name="Character"><div className="pt-40 text-center text-[#7c9487]">角色不存在或已删除</div></Page>
  const total = records.reduce((s, r) => s + (r.amount || 0), 0)
  const sorted = [...records].sort((a, b) => b.date.localeCompare(a.date) || b.createdAt - a.createdAt)
  const sections: { g?: Group; list: CommissionRecord[] }[] = [
    ...groups.map(g => ({ g, list: sorted.filter(r => r.groupId === g.id) })),
    { list: sorted.filter(r => !r.groupId || !groups.some(g => g.id === r.groupId)) },
  ]

  const rename = async () => { const v = await ui.prompt({ title: '修改角色名称', defaultValue: c.name, icon: 'edit' }); if (v) await db.characters.update(c.id, { name: v, updatedAt: Date.now() }) }
  const saveGroup = async (name: string) => {
    if (dlg?.g) await db.groups.update(dlg.g.id, { name }); else await db.groups.add({ id: crypto.randomUUID?.() || String(Date.now()), characterId: c.id, name, createdAt: Date.now() })
    setDlg(null); ui.toast(dlg?.g ? '分组已重命名' : `已添加分组「${name}」`)
  }
  const delGroup = async (g: Group) => {
    if (!(await ui.confirm({ title: `删除分组「${g.name}」？`, message: '组内约稿不会被删除，将移至「未分组」。', okText: '删除', danger: true }))) return
    await db.transaction('rw', db.groups, db.records, async () => { await db.records.where('groupId').equals(g.id).modify({ groupId: undefined }); await db.groups.delete(g.id) })
  }
  const delChar = async () => {
    if (!(await ui.confirm({ title: `删除角色「${c.name}」？`, message: `该角色的 ${records.length} 条约稿记录、分组及所有图片将被永久删除。`, okText: '删除角色', danger: true }))) return
    const imgs = [c.avatar, ...c.refImages, ...records.flatMap(r => r.images)]
    await db.transaction('rw', db.characters, db.records, db.groups, async () => { await db.records.where('characterId').equals(c.id).delete(); await db.groups.where('characterId').equals(c.id).delete(); await db.characters.delete(c.id) })
    await deleteImagesIfOrphan(imgs)
    ui.toast('角色已删除'); nav('/gallery', { replace: true })
  }
  const shareCard = async () => {
    setInfo(true); await new Promise(r => setTimeout(r, 120)); if (!card.current) return
    try { const b = await toBlob(card.current, { pixelRatio: 2, backgroundColor: '#f7faf5' }); if (b) await shareBlob(b, `${c.name}_设定卡.png`, `${c.name} 设定卡`) } catch { ui.toast('生成失败') }
  }
  const facts = [['种族', c.species.join(' / ')], ['性别', c.gender], ['身高', c.height], ['生日', c.birthday], ['发型发色', c.hair], ['瞳色', c.eyes]].filter(x => x[1])
  const hasInfo = !!(c.avatar || c.refImages.length || facts.length || c.quote || c.background || c.warnings)

  return (
    <Page name="Character">
      <div className="max-w-[430px] mx-auto min-h-screen px-4 pt-3 pt-safe flex flex-col justify-between" data-purpose="screen-wrapper">
        <div>
          <nav className="flex items-center justify-between py-2 mb-3 mt-3" data-purpose="top-navigation">
            <button aria-label="返回" onClick={() => nav(-1)} className="w-10 h-10 rounded-full bg-[#ebf2ec] flex items-center justify-center text-[#557566] active:scale-95 transition-transform" type="button">
              <svg className="w-5 h-5 -ml-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <div className="flex items-center space-x-1.5 font-bold text-lg text-[#2a3c33] tracking-wide">
              <svg className="w-5 h-5 text-[#3e6b57]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><circle cx="12" cy="14" r="7" /><circle cx="6.5" cy="7.5" r="2.5" /><circle cx="17.5" cy="7.5" r="2.5" /><ellipse cx="9.5" cy="13" fill="currentColor" rx="0.8" ry="1.2" /><ellipse cx="14.5" cy="13" fill="currentColor" rx="0.8" ry="1.2" /><path d="M11 16c.6.5 1.4.5 2 0" strokeLinecap="round" /></svg>
              <span>角色档案</span>
            </div>
            <button onClick={() => nav(`/characters/${c.id}/records/new`)} className="px-4 py-1.5 rounded-full bg-[#3e6b57] text-white text-sm font-medium tracking-wide shadow-sm hover:bg-[#345b49] active:scale-95 transition-transform flex items-center space-x-1" type="button">
              <span className="text-base leading-none font-light">+</span><span>约稿</span>
            </button>
          </nav>
          <section className="bg-white rounded-2xl p-4 card-shadow mb-3 flex items-center justify-between" data-purpose="character-name-card">
            <button type="button" onClick={() => hasInfo && setInfo(!info)} className="flex items-center space-x-3.5 min-w-0 text-left">
              <div className="w-8 h-8 rounded-full border-[1.5px] border-[#6b8277] flex items-center justify-center text-[#526a60] relative overflow-hidden flex-shrink-0">
                <Img id={c.avatar} className="w-full h-full object-cover" fallback={
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24"><circle cx="12" cy="13.5" r="6.5" /><circle cx="7" cy="8" r="2.2" /><circle cx="17" cy="8" r="2.2" /><circle cx="9.5" cy="12.5" fill="currentColor" r="0.75" /><circle cx="14.5" cy="12.5" fill="currentColor" r="0.75" /><path d="M12 14.2a1.2 1.2 0 0 0-1 0.6c.4.6 1.6.6 2 0a1.2 1.2 0 0 0-1-0.6z" fill="currentColor" /></svg>} />
              </div>
              <span className="text-xl font-bold tracking-tight text-[#213028] truncate">{c.name}</span>
              {hasInfo && <span className={`material-symbols-outlined text-[18px] text-[#889d92] transition-transform ${info ? 'rotate-180' : ''}`}>expand_more</span>}
            </button>
            <div className="flex items-center gap-1 flex-shrink-0">
              {c.publicView && <button aria-label="分享设定卡" onClick={shareCard} className="text-[#889d92] hover:text-[#3e6b57] p-1" type="button"><span className="material-symbols-outlined text-[18px]">ios_share</span></button>}
              <button aria-label="编辑档案" onClick={() => nav(`/characters/${c.id}/edit`)} className="text-[#889d92] hover:text-[#3e6b57] p-1" type="button"><span className="material-symbols-outlined text-[18px]">tune</span></button>
              <button aria-label="修改角色名称" onClick={rename} className="text-[#889d92] hover:text-[#3e6b57] p-1" type="button"><Pen /></button>
            </div>
          </section>
          {info && hasInfo && (
            <div ref={card} className="bg-white rounded-2xl p-4 card-shadow mb-3 space-y-3" style={{ animation: 'yh-fade-in .2s' }}>
              <div className="flex gap-3">
                {c.avatar && <Img id={c.avatar} onClick={() => setView({ ids: [c.avatar!, ...c.refImages], i: 0 })} className="w-20 h-20 rounded-xl object-cover border border-[#e6ecde]" />}
                <div className="flex-1 min-w-0">
                  <div className="text-[15px] font-bold text-[#213028]">{c.name} <span className="text-xs text-[#7c9487] font-mono">{c.no}</span></div>
                  {c.quote && <p className="text-xs text-[#557766] italic mt-1 leading-relaxed">“{c.quote}”</p>}
                  <div className="flex flex-wrap gap-1 mt-1.5">{facts.map(([k, v]) => <span key={k} className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#ebf2ec] text-[#3e6b57]">{k} · {v}</span>)}</div>
                </div>
              </div>
              {c.refImages.length > 0 && <div className="grid grid-cols-3 gap-2">{c.refImages.map((im, i) => <Img key={im} id={im} onClick={() => setView({ ids: c.refImages, i })} className="aspect-square w-full rounded-lg object-cover" />)}</div>}
              {c.background && <p className="text-[13px] text-[#2d3a34] whitespace-pre-line leading-relaxed bg-[#f7faf5] rounded-xl p-3">{c.background}</p>}
              {c.warnings && <div className="text-[12px] text-[#b4493f] whitespace-pre-line leading-relaxed bg-[#fdf0ee] rounded-xl p-3"><b className="flex items-center gap-1 mb-1"><span className="material-symbols-outlined text-[15px]">warning</span>作画雷点</b>{c.warnings}</div>}
            </div>
          )}
          <section className="bg-[#f0f4ea] bg-opacity-70 rounded-2xl p-4 card-shadow mb-6 flex items-center justify-between border border-[#e6ecde]" data-purpose="total-price-summary">
            <div className="flex items-center space-x-3.5">
              <div className="w-10 h-10 rounded-full bg-[#e3ecdc] flex items-center justify-center text-[#557766]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M19 12a7 7 0 1 1-14 0c0-3.87 3.13-7 7-7s7 3.13 7 7z" strokeLinecap="round" /><path d="M8.5 7.5L12 5l3.5 2.5" strokeLinecap="round" strokeLinejoin="round" /><circle cx="12" cy="13" r="2.2" strokeWidth="1.5" /></svg>
              </div>
              <div>
                <h3 className="font-bold text-[#2d3f35] text-[15px] leading-tight">该角色稿价总和</h3>
                <p className="text-xs text-[#7c9487] mt-1 font-medium">{records.length} 条约稿 · 自动累加</p>
              </div>
            </div>
            <div className="text-right"><span className="text-2xl font-black text-[#2e5241] tracking-tight">{yuan(total)}</span></div>
          </section>
          <section className="mb-5" data-purpose="commission-records-section">
            <div className="flex items-center justify-between mb-3 px-1">
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-[#527062]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect height="16" rx="2" width="16" x="4" y="4" /><line x1="8" x2="16" y1="9" y2="9" /><line x1="8" x2="14" y1="13" y2="13" /></svg>
                <span className="font-bold text-[#344b40] text-[15px]">约稿记录</span>
              </div>
              <span className="w-6 h-6 rounded-full bg-[#e5efe5] text-[#3e6b57] text-xs font-bold flex items-center justify-center">{records.length}</span>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <button onClick={() => nav(`/characters/${c.id}/records/new`)} className="w-full py-2.5 rounded-xl bg-[#3e6b57] text-white font-medium text-sm flex items-center justify-center space-x-1.5 shadow-sm active:scale-[0.98] transition-transform" type="button">
                <span className="w-4 h-4 rounded-full border border-white/80 flex items-center justify-center text-xs font-bold leading-none">+</span><span>添加约稿</span>
              </button>
              <button onClick={() => setDlg({})} className="w-full py-2.5 rounded-xl bg-white border border-[#3e6b57] text-[#3e6b57] font-medium text-sm flex items-center justify-center space-x-1.5 shadow-sm active:scale-[0.98] transition-transform" type="button">
                <svg className="w-4 h-4 text-[#3e6b57]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" strokeLinecap="round" strokeLinejoin="round" /></svg>
                <span>添加组</span>
              </button>
            </div>
            <div className="space-y-3">
              {sections.map(({ g, list }) => {
                if (!g && !list.length) return null
                const key = g?.id || 'none'; const collapsed = open[key] === false
                const sum = list.reduce((s, r) => s + (r.amount || 0), 0)
                return (
                  <div key={key} className="bg-white/90 rounded-2xl card-shadow border border-[#e6ecde] overflow-hidden">
                    <div className="flex items-center justify-between px-3.5 py-2.5 bg-[#f7faf5]">
                      <button type="button" onClick={() => setOpen(o => ({ ...o, [key]: collapsed }))} className="flex items-center gap-1.5 min-w-0">
                        <span className={`material-symbols-outlined text-[18px] text-[#557766] transition-transform ${collapsed ? '-rotate-90' : ''}`}>expand_more</span>
                        <span className="material-symbols-outlined text-[16px] text-[#c9a24a]">{g ? 'folder' : 'inbox'}</span>
                        <span className="font-bold text-[14px] text-[#2d3f35] truncate">{g?.name || '未分组'}</span>
                        <span className="text-[11px] text-[#7c9487]">{list.length} 条 · {yuan(sum)}</span>
                      </button>
                      {g && <div className="flex items-center">
                        <button aria-label="在此组添加" onClick={() => nav(`/characters/${c.id}/records/new?group=${g.id}`)} className="p-1 text-[#557766]"><span className="material-symbols-outlined text-[18px]">add</span></button>
                        <button aria-label="重命名" onClick={() => setDlg({ g })} className="p-1 text-[#889d92]"><span className="material-symbols-outlined text-[17px]">edit</span></button>
                        <button aria-label="删除分组" onClick={() => delGroup(g)} className="p-1 text-[#d96a68]"><span className="material-symbols-outlined text-[17px]">delete</span></button>
                      </div>}
                    </div>
                    {!collapsed && (list.length ? <div className="divide-y divide-[#eef2ea]">
                      {list.map(r => (
                        <div key={r.id} className="flex items-center gap-3 px-3.5 py-2.5 active:bg-[#f7faf5]" onClick={() => nav(`/records/${r.id}/edit`)}>
                          <div className="relative w-14 h-14 flex-shrink-0" onClick={e => { if (r.images.length) { e.stopPropagation(); setView({ ids: r.images, i: 0 }) } }}>
                            <Img id={r.images[0]} className="w-14 h-14 rounded-xl object-cover border border-[#e6ecde]" fallback={<div className="w-14 h-14 rounded-xl bg-[#f0f4ea] flex items-center justify-center text-[#9fb2a6]"><span className="material-symbols-outlined">image</span></div>} />
                            {r.images.length > 1 && <span className="absolute bottom-0.5 right-0.5 text-[9px] px-1 rounded bg-black/50 text-white">{r.images.length}</span>}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-[14px] font-bold text-[#213028] truncate">{r.title || '约稿'}</div>
                            <div className="text-[11px] text-[#7c9487] mt-0.5 truncate">{r.date.replace(/-/g, '/')}{r.note ? ` · ${r.note}` : ''}</div>
                          </div>
                          <span className="text-[15px] font-black text-[#2e5241]">{yuan(r.amount || 0)}</span>
                        </div>
                      ))}
                    </div> : <div className="px-4 py-4 text-center text-xs text-[#9fb2a6]">这个分组还没有约稿</div>)}
                  </div>
                )
              })}
              {!records.length && !groups.length && <div className="rounded-2xl border-2 border-dashed border-[#d9e3d6] bg-white/60 py-8 text-center text-xs text-[#7c9487]">还没有约稿记录，点击「添加约稿」记下第一张吧 🐾</div>}
            </div>
          </section>
          <section className="space-y-3 mt-4" data-purpose="role-actions-area">
            <button onClick={delChar} className="w-full py-3 rounded-xl bg-white border border-[#f3d3d2] text-[#d96a68] font-medium text-sm flex items-center justify-center space-x-1.5 shadow-sm hover:bg-[#fff9f9] active:scale-[0.98] transition-all" type="button">
              <svg className="w-4 h-4 text-[#d96a68]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" strokeLinecap="round" strokeLinejoin="round" /></svg>
              <span>删除角色</span>
            </button>
          </section>
        </div>
        <div className="h-[calc(var(--sab)+16px)]" />
      </div>
      <GroupDialog open={!!dlg} title={dlg?.g ? '重命名分组' : '新建分组'} initial={dlg?.g?.name || ''} onClose={() => setDlg(null)} onConfirm={saveGroup} />
      {view && <Viewer ids={view.ids} index={view.i} onClose={() => setView(null)} />}
    </Page>
  )
}
