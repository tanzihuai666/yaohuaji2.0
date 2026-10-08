import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLiveQuery } from 'dexie-react-hooks'
import Page from '../components/Page'
import Img from '../components/Img'
import BottomNav from '../components/BottomNav'
import { Sheet, useUI } from '../components/ui'
import { db, uid, type Folder } from '../lib/db'
import { pickImagesSafe, takePhoto } from '../lib/images'
import { pad, today, yuan } from '../lib/format'

export const Paw = ({ className, eye = 0.8 }: { className: string; eye?: number }) => (
  <svg className={className} viewBox="0 0 24 24"><circle cx="12" cy="13" r="7" /><circle cx="6.5" cy="7.5" r="2.5" /><circle cx="17.5" cy="7.5" r="2.5" /><circle cx="9.5" cy="12" fill="currentColor" r={eye} /><circle cx="14.5" cy="12" fill="currentColor" r={eye} /><ellipse cx="12" cy="14.5" rx="1.6" ry="1" /></svg>
)
const Chevron = () => <svg className="w-4 h-4 stroke-[2.2]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
const EMO = [['👱‍♀️', 'bg-[#FFEED4] border-[#EED7B8]', 'bg-[#FBF8EF]', 'text-[#A69B88]', 'Artwork'], ['🧝‍♀️', 'bg-[#E5F0E6] border-[#CDE0CF]', 'bg-[#F8F9F3]', 'text-[#869E8A]', 'Sample']]

/** Ensure an "未分类" inbox folder exists for quick photo / import actions. */
async function inbox(): Promise<Folder> {
  const all = await db.folders.toArray(); const f = all.find(x => x.name === '未分类')
  if (f) return f
  const n: Folder = { id: uid(), name: '未分类', desc: '快速导入的图片会先放在这里', color: '#3C6A58', scope: '全部', isPrivate: false, pinned: false, sort: 'new', createdAt: Date.now(), updatedAt: Date.now() }
  await db.folders.add(n); return n
}

export default function Gallery() {
  const nav = useNavigate(); const ui = useUI()
  const [q, setQ] = useState(''); const [tab, setTab] = useState<'all' | 'chars' | 'folders'>('all'); const [sheet, setSheet] = useState(false)
  const data = useLiveQuery(async () => {
    const [chars, records, groups, folders, arts, imgCount] = await Promise.all([db.characters.toArray(), db.records.toArray(), db.groups.toArray(), db.folders.toArray(), db.artworks.toArray(), db.images.count()])
    return { chars, records, groups, folders, arts, imgCount }
  }, [])
  const addImages = async (ids: string[]) => {
    if (!ids.length) return
    const f = await inbox(); const t = Date.now()
    await db.artworks.bulkAdd(ids.map((image, i) => ({ id: uid(), folderId: f.id, image, title: '', tag: '', date: today(), liked: false, createdAt: t + i })))
    await db.folders.update(f.id, { updatedAt: t, cover: f.cover || ids[0] })
    ui.toast(`已导入 ${ids.length} 张到「未分类」`); nav(`/folders/${f.id}`)
  }
  if (!data) return <Page name="Gallery" />
  const kw = q.trim().toLowerCase()
  const hit = (...s: (string | undefined)[]) => !kw || s.some(x => x?.toLowerCase().includes(kw))
  const chars = data.chars.filter(c => hit(c.name, c.no, c.quote, c.background, c.hair, c.eyes, c.species.join(' '))).sort((a, b) => Number(b.pinned) - Number(a.pinned) || a.createdAt - b.createdAt)
  const folders = data.folders.filter(f => hit(f.name, f.desc)).sort((a, b) => Number(b.pinned) - Number(a.pinned) || b.updatedAt - a.updatedAt)
  const showC = tab !== 'folders', showF = tab !== 'chars'

  return (
    <Page name="Gallery">
      <div className="w-full max-w-md mx-auto flex-1 flex flex-col pb-28 pt-safe">
        <div className="w-full py-2.5 flex items-center justify-center text-center relative" data-purpose="top-nav-title">
          <div className="flex items-center space-x-1.5 text-base font-bold text-charcoal-title">
            <Paw className="w-5 h-5 text-muted-sage fill-none stroke-current stroke-[2]" eye={0.75} /><span className="tracking-wide">画库</span>
          </div>
        </div>
        <main className="px-5 pt-3 space-y-4">
          <section className="space-y-1" data-purpose="gallery-summary">
            <div className="flex items-center space-x-2">
              <Paw className="w-6 h-6 text-charcoal-title fill-none stroke-current stroke-[2]" />
              <h1 className="text-2xl font-bold tracking-tight text-charcoal-title">画库</h1>
            </div>
            <p className="text-xs text-muted-sage font-medium tracking-normal pl-0.5">{data.chars.length} 个角色 · {data.folders.length} 个文件夹 · {data.imgCount} 张图片</p>
          </section>
          <section data-purpose="search-box">
            <div className="relative flex items-center bg-white/95 rounded-2xl border border-[#DFE7DD] px-4 py-3.5 shadow-sm shadow-[#DFE7DD]/30">
              <svg className="w-4 h-4 text-[#8D998F] mr-3 stroke-[2.2]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.35-4.35" strokeLinecap="round" /></svg>
              <input value={q} onChange={e => setQ(e.target.value)} className="w-full bg-transparent border-none p-0 text-sm text-charcoal-title placeholder-[#9DAAA0] focus:ring-0 focus:outline-none" placeholder="搜索角色名、特征、故事..." type="text" />
              {q && <button onClick={() => setQ('')} className="text-[#8D998F] ml-2"><span className="material-symbols-outlined text-[18px]">cancel</span></button>}
            </div>
          </section>
          <section className="pt-1 flex gap-2">
            {([['all', '画库'], ['chars', '角色'], ['folders', '文件夹']] as const).map(([k, l]) => (
              <button key={k} onClick={() => setTab(k)} className={`inline-flex items-center space-x-1.5 px-3 py-1.5 text-xs font-medium rounded-full shadow-xs transition-colors ${tab === k ? 'bg-[#4F725F] text-white' : 'bg-white/80 text-[#4F725F] border border-[#DFE7DD]'}`}>
                {k === 'all' && <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>}
                <span>{l}</span>
              </button>
            ))}
          </section>
          <section className="grid grid-cols-3 gap-2.5 pt-1" data-purpose="quick-actions">
            <button onClick={() => setSheet(true)} className="flex items-center justify-center space-x-1.5 py-3 px-3 bg-[#4F725F] hover:bg-sage-hover text-white rounded-xl shadow-xs transition-transform active:scale-98">
              <svg className="w-4 h-4 text-[#D8E6DC] fill-current" viewBox="0 0 20 20"><path clipRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" fillRule="evenodd" /></svg>
              <span className="text-sm font-bold">新建</span>
            </button>
            <button onClick={async () => { const id = await takePhoto(); if (id) addImages([id]) }} className="flex items-center justify-center space-x-1.5 py-3 px-2 bg-white/70 hover:bg-white border-2 border-dashed border-[#7AA189] text-[#4F725F] rounded-xl transition-colors active:scale-98">
              <svg className="w-4 h-4 stroke-[2]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" strokeLinecap="round" strokeLinejoin="round" /><path d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" /></svg>
              <span className="text-sm font-bold">拍照</span>
            </button>
            <button onClick={async () => addImages(await pickImagesSafe(true, ui.toast))} className="flex items-center justify-center space-x-1.5 py-3 px-2 bg-white/70 hover:bg-white border-2 border-dashed border-[#7AA189] text-[#4F725F] rounded-xl transition-colors active:scale-98">
              <svg className="w-4 h-4 stroke-[2]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect height="18" rx="2" ry="2" width="18" x="3" y="3" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
              <span className="text-sm font-bold">导入图片</span>
            </button>
          </section>

          {showC && <section className="pt-4 space-y-3" data-purpose="character-list">
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1.5 text-xs text-charcoal-title font-bold">
                <svg className="w-4 h-4 text-muted-sage fill-none stroke-current stroke-[2]" viewBox="0 0 24 24"><circle cx="12" cy="13" r="6" /><circle cx="7" cy="8" r="2" /><circle cx="17" cy="8" r="2" /></svg><span>角色</span>
              </div>
              <div className="flex-1 h-[1px] bg-[#E3E8DF]" />
            </div>
            {chars.length ? <div className="grid grid-cols-2 gap-3.5">
              {chars.map((c, i) => {
                const rs = data.records.filter(r => r.characterId === c.id); const sum = rs.reduce((s, r) => s + (r.amount || 0), 0)
                const imgs = [...rs.sort((a, b) => b.date.localeCompare(a.date)).flatMap(r => r.images), ...c.refImages, c.avatar].filter(Boolean) as string[]
                const gs = data.groups.filter(g => g.characterId === c.id).length
                return (
                  <article key={c.id} onClick={() => nav(`/characters/${c.id}`)} className="bg-white rounded-2xl p-2.5 shadow-sm border border-[#E9EFE6] flex flex-col justify-between active:scale-[0.98] transition-transform" data-purpose="character-card">
                    <div className="bg-[#F8FAF7] rounded-xl p-2 border border-[#E3ECE1]">
                      <div className="flex items-center justify-between text-[9px] text-[#55695C] font-semibold mb-1.5">
                        <div className="flex items-center space-x-1 min-w-0">
                          <span className="text-[8px] bg-[#DFECE2] text-[#42604F] px-1 rounded font-bold">{pad(i + 1)}</span>
                          <span className="truncate">{c.name}</span>
                          {c.pinned && <span className="material-symbols-outlined text-[10px] text-[#4B6F5A]" style={{ fontVariationSettings: "'FILL' 1" }}>push_pin</span>}
                        </div>
                        <span className="font-bold text-[#4B6F5A]">{yuan(sum)}</span>
                      </div>
                      <div className="text-[8px] text-gray-400 -mt-1 mb-1 font-mono truncate">{c.no || 'OC-' + pad(i + 1)}</div>
                      <div className="grid grid-cols-2 gap-1.5 bg-white p-1 rounded-lg border border-[#E8EDE4]">
                        {[0, 1].map(k => (
                          <div key={k} className={`aspect-[3/4] rounded overflow-hidden ${EMO[k][2]} flex items-center justify-center relative`}>
                            <Img id={imgs[k]} className="w-full h-full object-cover" fallback={
                              <div className="w-full h-full flex flex-col items-center justify-center p-1 text-center">
                                <div className={`w-7 h-7 rounded-full ${EMO[k][1]} border mb-1 flex items-center justify-center text-[10px]`}>{EMO[k][0]}</div>
                                <span className={`text-[7px] ${EMO[k][3]} font-mono leading-none`}>{EMO[k][4]}</span>
                              </div>} />
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center space-x-1 mt-1.5 text-[8px] font-semibold text-[#8C9B8E]">
                        <span className="text-[#4E7660]">{pad(gs)}</span><span>分组</span><span>·</span><span>{imgs.length} 图</span>
                      </div>
                    </div>
                    <div className="pt-2 px-1">
                      <h2 className="text-sm font-bold text-charcoal-title leading-tight truncate">{c.quote || c.name}</h2>
                      <p className="text-[11px] text-muted-sage mt-0.5 font-medium">{rs.length} 条约稿 · {yuan(sum)}</p>
                    </div>
                  </article>
                )
              })}
            </div> : <Empty text={kw ? '没有匹配的角色' : '还没有角色，点「新建」建立第一份设子档案'} />}
          </section>}

          {showF && <section className="pt-4 space-y-3" data-purpose="folder-list">
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1.5 text-xs text-charcoal-title font-bold"><span className="material-symbols-outlined text-[16px] text-muted-sage">folder</span><span>文件夹</span></div>
              <div className="flex-1 h-[1px] bg-[#E3E8DF]" />
            </div>
            {folders.length ? <div className="grid grid-cols-2 gap-3.5">
              {folders.map(f => {
                const arts = data.arts.filter(a => a.folderId === f.id).sort((a, b) => b.createdAt - a.createdAt)
                const cover = f.cover && arts.some(a => a.image === f.cover) ? f.cover : arts[0]?.image
                return (
                  <article key={f.id} onClick={() => nav(`/folders/${f.id}`)} className="bg-white rounded-2xl p-2.5 shadow-sm border border-[#E9EFE6] active:scale-[0.98] transition-transform" data-purpose="folder-card">
                    <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-[#E3ECE1] bg-[#F8FAF7]">
                      <div className="absolute top-0 left-3 w-10 h-2 rounded-b-md z-10" style={{ background: f.color }} />
                      <Img id={cover} className="w-full h-full object-cover" fallback={<div className="w-full h-full flex items-center justify-center text-3xl">📁</div>} />
                      {f.isPrivate && <span className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-white/90 flex items-center justify-center"><span className="material-symbols-outlined text-[12px] text-[#4F725F]">lock</span></span>}
                    </div>
                    <div className="pt-2 px-1">
                      <h2 className="text-sm font-bold text-charcoal-title leading-tight truncate flex items-center gap-1">{f.pinned && <span className="material-symbols-outlined text-[13px] text-[#4B6F5A]" style={{ fontVariationSettings: "'FILL' 1" }}>push_pin</span>}{f.name}</h2>
                      <p className="text-[11px] text-muted-sage mt-0.5 font-medium truncate">{arts.length} 张 · {f.desc || f.scope || '绘卷档案'}</p>
                    </div>
                  </article>
                )
              })}
            </div> : <Empty text={kw ? '没有匹配的文件夹' : '还没有文件夹，按企划或商稿分类整理画作吧'} />}
          </section>}
        </main>
      </div>
      <BottomNav />
      <Sheet open={sheet} onClose={() => setSheet(false)}>
        <div className="relative w-full max-w-md mx-auto bg-[#F7FAF5] rounded-t-[28px] border-t border-[#DFE7DD] shadow-[0_-8px_30px_rgba(40,65,52,0.14)] p-5 pb-[calc(var(--sab)+32px)] space-y-4 z-10" style={{ backgroundImage: 'radial-gradient(#D6DDD2 0.8px, transparent 0.8px)', backgroundSize: '16px 16px' }}>
          <div className="flex justify-center pt-0.5 -mt-1 mb-1"><div className="w-10 h-1.5 bg-[#CBD8CB] rounded-full" /></div>
          <div className="flex items-center justify-between pb-1 border-b border-[#E3ECE1]">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded-full bg-[#E5EFE7] flex items-center justify-center text-[#3C6A58]"><Paw className="w-4 h-4 fill-none stroke-current stroke-[2]" /></div>
              <div>
                <h3 className="text-base font-bold text-charcoal-title leading-tight">新建内容</h3>
                <p className="text-[11px] text-[#78887B]">选择要添加的手账企划或资料分类</p>
              </div>
            </div>
            <button aria-label="关闭" onClick={() => setSheet(false)} className="w-8 h-8 rounded-full bg-white/80 hover:bg-[#E9F0E8] border border-[#DCE4DA] flex items-center justify-center text-[#6A7B6E] transition-colors active:scale-95">
              <svg className="w-4 h-4 stroke-[2.2]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          </div>
          <div className="space-y-3 pt-1">
            {[
              { to: '/characters/new', emo: '🎨', box: 'bg-[#E8F1EA] border-[#CDE0D2] group-hover:bg-[#DFECE2]', t: '新建角色', tag: '设子档案', tagC: 'bg-[#EBF2EC] text-[#3C6A58] border-[#D5E4D8]', d: '建立专属手账画库、外观设定、约稿预算与排期', h: 'group-hover:text-[#235241]' },
              { to: '/folders/new', emo: '📁', box: 'bg-[#FFF6DE] border-[#F1E2B2] group-hover:bg-[#FCEEC5]', t: '新建文件夹', tag: '绘卷档案', tagC: 'bg-[#FAF5E6] text-[#7A6B39] border-[#EDE0BE]', d: '按企划、商稿、OC 世界观分类整理画作与设子', h: 'group-hover:text-[#685E38]' },
            ].map(x => (
              <button key={x.to} onClick={() => { setSheet(false); nav(x.to) }} className="w-full text-left bg-white/95 hover:bg-white rounded-2xl p-3.5 border border-[#DFE7DD] shadow-sm shadow-[#3C6A58]/5 flex items-center justify-between transition-all duration-150 active:scale-[0.98] group cursor-pointer">
                <div className="flex items-center space-x-3.5">
                  <div className={`w-12 h-12 rounded-2xl ${x.box} border flex items-center justify-center text-xl shrink-0 transition-colors shadow-xs`}><span>{x.emo}</span></div>
                  <div className="space-y-0.5">
                    <div className="flex items-center space-x-1.5">
                      <span className={`text-sm font-bold text-charcoal-title ${x.h} transition-colors`}>{x.t}</span>
                      <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${x.tagC} border`}>{x.tag}</span>
                    </div>
                    <p className="text-xs text-[#717974] leading-relaxed">{x.d}</p>
                  </div>
                </div>
                <div className="w-7 h-7 rounded-full bg-[#FAFBF9] border border-[#E2E8E0] flex items-center justify-center text-[#8B9B8E] group-hover:translate-x-0.5 transition-all shrink-0 ml-2"><Chevron /></div>
              </button>
            ))}
          </div>
          <div className="pt-1.5">
            <button onClick={() => setSheet(false)} className="w-full py-3 rounded-xl bg-white/85 hover:bg-white text-xs font-bold text-[#657367] border border-[#DFE7DD] shadow-xs transition-all active:scale-98">取消</button>
          </div>
        </div>
      </Sheet>
    </Page>
  )
}
const Empty = ({ text }: { text: string }) => (
  <div className="bg-white/70 rounded-2xl border-2 border-dashed border-[#DFE7DD] py-8 px-4 text-center">
    <div className="text-2xl mb-1.5">🐾</div><p className="text-xs text-muted-sage font-medium">{text}</p>
  </div>
)
