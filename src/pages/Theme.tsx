import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLiveQuery } from 'dexie-react-hooks'
import Page from '../components/Page'
import Img from '../components/Img'
import { useUI } from '../components/ui'
import { useImageUrl } from '../hooks/useImage'
import { db } from '../lib/db'
import { DEFAULT_SETTINGS, getSettings, saveSettings, useSettings } from '../lib/settings'
import { pickImagesSafe, deleteImages } from '../lib/images'
import { daysLeft } from '../lib/format'
import { PALETTES } from '../theme/palettes'
import { applyTheme } from '../theme/apply'

type Draft = { theme: string; bgImage?: string; dotGrid: boolean; bgOpacity: number }

export default function Theme() {
  const nav = useNavigate(); const ui = useUI(); const s = useSettings()
  const [d, setD] = useState<Draft | null>(null)
  const saved = useRef(false); const savedTheme = useRef('paper'); const created = useRef<Set<string>>(new Set())
  const orders = useLiveQuery(() => db.orders.toArray(), []) || []
  useEffect(() => { getSettings().then(x => { savedTheme.current = x.theme; setD({ theme: x.theme, bgImage: x.bgImage, dotGrid: x.dotGrid, bgOpacity: x.bgOpacity }) }) }, [])
  // revert live preview when leaving without saving
  useEffect(() => () => { if (!saved.current) { applyTheme(savedTheme.current); deleteImages([...created.current]) } }, [])
  const bgUrl = useImageUrl(d?.bgImage, true)
  if (!d) return <Page name="Theme" />
  const set = (p: Partial<Draft>) => setD(x => ({ ...x!, ...p }))
  const pal = PALETTES.find(p => p.id === d.theme) || PALETTES[0]
  const choose = (id: string) => { set({ theme: id }); applyTheme(id) }
  const pickBg = async () => { const [i] = await pickImagesSafe(false, ui.toast); if (!i) return; created.current.add(i); set({ bgImage: i }) }
  const reset = async () => {
    if (!(await ui.confirm({ title: '重置为默认主题？', message: '将恢复「纸间手账」配色、移除自定义背景并开启点阵纸纹。' }))) return
    choose(DEFAULT_SETTINGS.theme); set({ bgImage: undefined, dotGrid: true, bgOpacity: 70 })
  }
  const save = async () => {
    const old = s.bgImage
    await saveSettings({ theme: d.theme, bgImage: d.bgImage, dotGrid: d.dotGrid, bgOpacity: d.bgOpacity })
    if (old && old !== d.bgImage) await deleteImages([old])
    created.current.delete(d.bgImage || ''); await deleteImages([...created.current].filter(i => i !== d.bgImage)); created.current.clear()
    saved.current = true; savedTheme.current = d.theme; ui.toast(`已应用「${pal.name}」主题 🎨`); nav(-1)
  }
  const active = orders.filter(o => o.status !== 'done')
  const soon = active.filter(o => o.deadline && daysLeft(o.deadline) <= 2).length
  const next = [...active].sort((a, b) => (a.deadline || '9').localeCompare(b.deadline || '9'))[0]
  const now = new Date()

  return (
    <Page name="Theme">
      <div className="w-full max-w-md mx-auto flex flex-col min-h-screen relative shadow-2xl bg-dotted-journal pb-36">
        <header className="sticky top-0 z-40 bg-surface/90 backdrop-blur-md px-margin py-3 pt-[calc(var(--sat)+12px)] flex items-center justify-between border-b border-surface-container shadow-sm transition-all">
          <button aria-label="返回设置" onClick={() => nav(-1)} className="w-10 h-10 rounded-full bg-surface-container-lowest border border-outline-variant/40 flex items-center justify-center text-primary active:scale-95 transition-transform shadow-sm hover:bg-surface-container-high" type="button"><span className="material-symbols-outlined text-[20px]">arrow_back_ios_new</span></button>
          <div className="flex items-center gap-1.5"><span className="material-symbols-outlined fill-icon text-primary text-[22px]">palette</span><h1 className="text-headline-md font-headline-md text-on-surface tracking-tight font-extrabold">主题配色与背景</h1></div>
          <button onClick={reset} className="px-3 py-1.5 rounded-full bg-surface-container border border-outline-variant/60 text-on-surface-variant font-label-lg text-label-lg active:scale-95 transition-transform hover:bg-surface-container-high" type="button">重置默认</button>
        </header>
        <main className="flex-1 px-margin pt-4 space-y-6">
          <section className="relative">
            <div className="flex items-center justify-between mb-2 px-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary-fixed rounded-full text-on-primary-fixed font-label-lg text-label-lg shadow-sm border border-primary/10"><span className="w-2 h-2 rounded-full bg-primary animate-pulse" /><span>实时手账预览 · {pal.name}</span></div>
              <span className="text-outline text-label-md font-label-md flex items-center gap-0.5"><span className="material-symbols-outlined text-[14px]">auto_awesome</span>所见即所得</span>
            </div>
            <div className="relative bg-surface-container-lowest rounded-[1.25rem] p-4 border border-outline-variant/50 shadow-md overflow-hidden">
              {bgUrl && <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${bgUrl})`, opacity: d.bgOpacity / 100 }} />}
              {d.dotGrid && <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#d3dbd1 1.2px, transparent 1.2px)', backgroundSize: '14px 14px' }} />}
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-24 h-4 washi-tape opacity-90 rounded-b" />
              <div className={`${bgUrl ? 'bg-surface/80 backdrop-blur-[1px]' : 'bg-surface'} rounded-2xl p-3.5 border border-surface-container-high relative overflow-hidden`}>
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-surface-container">
                  <div className="flex items-center gap-1.5">
                    <div className="w-6 h-6 rounded-full bg-primary-container text-on-primary flex items-center justify-center text-xs font-bold shadow-sm overflow-hidden"><Img id={s.avatar} className="w-full h-full object-cover" fallback={<>{(s.nickname || '妖')[0]}</>} /></div>
                    <div>
                      <div className="text-[11px] font-bold text-on-surface leading-tight">妖画集 · 今日画帐</div>
                      <div className="text-[9px] text-outline leading-tight">{now.getFullYear()}年{now.getMonth() + 1}月{now.getDate()}日 · {s.nickname}</div>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold">营业中</span>
                </div>
                <div className="grid grid-cols-2 gap-2 mb-2.5">
                  <div className="bg-surface-container-lowest p-2 rounded-xl border border-surface-container-high/60 shadow-xs flex flex-col justify-between">
                    <div className="flex items-center justify-between text-outline"><span className="text-[10px]">进行中稿件</span><span className="material-symbols-outlined text-[13px] text-primary">draw</span></div>
                    <div className="text-base font-extrabold text-primary mt-1">{active.length} <span className="text-[9px] font-normal text-outline">件</span></div>
                  </div>
                  <div className="bg-surface-container-lowest p-2 rounded-xl border border-surface-container-high/60 shadow-xs flex flex-col justify-between">
                    <div className="flex items-center justify-between text-outline"><span className="text-[10px]">待交期提醒</span><span className="material-symbols-outlined text-[13px] text-secondary">alarm</span></div>
                    <div className="text-base font-extrabold text-secondary mt-1">{soon} <span className="text-[9px] font-normal text-outline">单 · 2天内</span></div>
                  </div>
                </div>
                <div className="bg-surface-container-lowest rounded-xl p-2.5 border border-dashed border-primary-container/40 flex items-center justify-between">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-7 h-7 rounded-lg bg-surface-container flex items-center justify-center text-primary flex-shrink-0"><span className="material-symbols-outlined text-[15px]">image</span></div>
                    <div className="min-w-0">
                      <div className="text-[11px] font-bold text-on-surface truncate">{next ? `《${next.client} · ${next.types[0] || '稿件'}》` : '《森林精灵立绘》'}</div>
                      <div className="text-[9px] text-outline truncate">{next ? `${({ pending: '待开始', progress: '绘制中', review: '待验收', done: '已完成' } as Record<string, string>)[next.status]}阶段 · ${next.no}` : '线稿确认阶段 · 示例稿件'}</div>
                    </div>
                  </div>
                  <button className="px-2.5 py-1 rounded-full bg-primary-container text-on-primary text-[10px] font-bold shadow-xs flex-shrink-0" type="button">查看手账</button>
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <div className="flex items-baseline justify-between px-1">
              <div>
                <h2 className="text-title-md font-title-md text-on-surface flex items-center gap-1.5"><span>预设配色风格</span><span className="text-xs px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-medium">{PALETTES.length}款</span></h2>
                <p className="text-outline text-label-md font-label-md mt-0.5">9套马卡龙与纸间特调色板，轻触即切换</p>
              </div>
              <span className="text-primary text-label-md font-label-md font-bold flex items-center gap-0.5"><span className="material-symbols-outlined text-[15px]">touch_app</span>点选试色</span>
            </div>
            <div className="grid grid-cols-3 gap-2.5">
              {PALETTES.map(p => { const on = p.id === d.theme; return (
                <div key={p.id} onClick={() => choose(p.id)} className={`relative bg-surface-container-lowest rounded-2xl p-2.5 shadow-sm flex flex-col items-center text-center cursor-pointer active:scale-95 transition-all ${on ? 'border-2 border-primary-container' : 'border border-outline-variant/40 hover:border-outline'}`}>
                  {on && <div className="absolute -top-1.5 -right-1.5 bg-primary-container text-on-primary w-5 h-5 rounded-full flex items-center justify-center shadow-xs"><span className="material-symbols-outlined text-[13px] font-bold">check</span></div>}
                  <div className="flex items-center -space-x-1.5 my-1.5">{p.colors.map(c => <span key={c} className="w-6 h-6 rounded-full border-2 border-white shadow-xs" style={{ backgroundColor: c }} />)}</div>
                  <div className="text-label-lg font-label-lg text-on-surface font-bold mt-1">{p.name}</div>
                  {on ? <span className="mt-1 text-[10px] leading-tight px-1.5 py-0.5 bg-primary/10 text-primary rounded-full font-bold">{p.id === s.theme ? '当前生效' : '试色中'}</span> : <span className="mt-1 text-[10px] leading-tight text-outline">{p.sub}</span>}
                </div>
              ) })}
            </div>
          </section>

          <section className="space-y-3">
            <div className="px-1">
              <h2 className="text-title-md font-title-md text-on-surface flex items-center gap-1.5"><span>自定义壁纸与纸张质感</span><span className="material-symbols-outlined text-[18px] text-primary">auto_fix_high</span></h2>
              <p className="text-outline text-label-md font-label-md mt-0.5">调配属于你的手账纸张触感与私藏插画底图</p>
            </div>
            <div className="bg-surface-container-lowest rounded-[1.25rem] p-4 border border-outline-variant/50 shadow-sm space-y-4">
              <div onClick={pickBg} className="relative rounded-2xl border-2 border-dashed border-primary-container/60 bg-surface-container-low/40 p-3.5 flex items-center gap-3.5 hover:bg-surface-container-low transition-colors cursor-pointer">
                <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-outline-variant/50 relative shadow-xs bg-surface-container">
                  <Img id={d.bgImage} className="w-full h-full object-cover" fallback={<div className="w-full h-full flex items-center justify-center text-outline"><span className="material-symbols-outlined">wallpaper</span></div>} />
                  <div className="absolute bottom-0 inset-x-0 bg-on-surface/50 text-white text-[8px] text-center py-0.5 font-bold">{d.bgImage ? '当前底图' : '默认纸张'}</div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-body-lg font-body-lg text-on-surface font-bold flex items-center gap-1"><span>更换自定义背景图</span><span className="material-symbols-outlined text-[16px] text-primary">add_photo_alternate</span></span>
                    <span className="text-[11px] text-primary font-bold px-2 py-0.5 rounded-full bg-primary/10 flex-shrink-0">选择相册</span>
                  </div>
                  <p className="text-label-md font-label-md text-outline mt-1 truncate">支持JPG/PNG高精相片或手绘插画壁纸</p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="inline-flex items-center gap-0.5 text-[10px] text-outline"><span className="material-symbols-outlined text-[12px]">crop_free</span>推荐 9:16</span>
                    <span className="text-[10px] text-outline">·</span>
                    {d.bgImage ? <button type="button" onClick={e => { e.stopPropagation(); set({ bgImage: undefined }) }} className="inline-flex items-center gap-0.5 text-[10px] text-secondary font-bold"><span className="material-symbols-outlined text-[12px]">delete</span>移除底图</button>
                      : <span className="inline-flex items-center gap-0.5 text-[10px] text-outline"><span className="material-symbols-outlined text-[12px]">lock_reset</span>仅本地存储</span>}
                  </div>
                </div>
              </div>
              <div className="border-t border-dashed border-outline-variant/60 my-1" />
              <div className="flex items-center justify-between py-0.5">
                <div className="pr-2">
                  <div className="text-body-lg font-body-lg text-on-surface font-bold flex items-center gap-1.5"><span>启用手账点阵纸纹 (Dot Grid)</span><span className="text-[10px] px-1.5 py-0.2 rounded bg-tertiary-fixed text-on-tertiary-fixed font-bold">推荐</span></div>
                  <p className="text-label-md font-label-md text-outline mt-0.5">在界面底色上叠加温暖的手账点阵，减轻视觉疲劳</p>
                </div>
                <button aria-label="切换点阵纸纹" onClick={() => set({ dotGrid: !d.dotGrid })} className={`w-12 h-7 rounded-full p-1 transition-colors duration-200 ease-in-out relative flex items-center shrink-0 shadow-xs ${d.dotGrid ? 'bg-primary-container justify-end' : 'bg-surface-container-highest justify-start'}`} type="button">
                  <span className="w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200" />
                </button>
              </div>
              <div className="border-t border-dashed border-outline-variant/60 my-1" />
              <div className={`space-y-2 pt-0.5 ${d.bgImage ? '' : 'opacity-50'}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-body-lg font-body-lg text-on-surface font-bold flex items-center gap-1"><span>背景图片不透明度 (Opacity)</span></div>
                    <p className="text-label-md font-label-md text-outline mt-0.5">{d.bgImage ? '保持手账文字的可读性与通透感' : '设置自定义背景图后生效'}</p>
                  </div>
                  <span className="px-2.5 py-0.5 bg-primary/10 text-primary font-bold font-stat-counter text-[13px] rounded-full border border-primary/20">{d.bgOpacity}%</span>
                </div>
                <div className="pt-1 px-1">
                  <input disabled={!d.bgImage} className="w-full bg-surface-container rounded-lg appearance-none cursor-pointer" max={100} min={10} type="range" value={d.bgOpacity} onChange={e => set({ bgOpacity: Number(e.target.value) })} />
                  <div className="flex justify-between text-[11px] text-outline mt-1 font-medium"><span>柔和淡雅 (10%)</span><span>清晰鲜明 (100%)</span></div>
                </div>
              </div>
            </div>
          </section>
          <div className="bg-surface-container/60 rounded-2xl p-3 border border-outline-variant/30 flex items-start gap-2.5">
            <span className="material-symbols-outlined text-[18px] text-primary shrink-0 mt-0.5">tips_and_updates</span>
            <p className="text-label-md font-label-md text-on-surface-variant leading-relaxed">贴纸手账小贴士：所选主题不仅装扮当前页面，还会自动改变“稿单日历印章”、“画库胶带标签”以及“财务收支卡片”的装饰主色调哦。</p>
          </div>
        </main>
        <footer className="fixed bottom-0 inset-x-0 z-40 bg-surface/95 backdrop-blur-md max-w-md mx-auto px-margin pt-3 pb-safe border-t border-surface-container shadow-[0_-4px_20px_rgba(35,82,65,0.08)]">
          <div className="flex flex-col items-center gap-2">
            <button onClick={save} className="w-full py-3.5 px-6 rounded-2xl bg-primary-container text-on-primary font-bold text-title-md font-title-md shadow-md hover:bg-primary active:scale-[0.98] transition-all flex items-center justify-center gap-2" type="button">
              <span className="material-symbols-outlined text-[20px] font-bold">check_circle</span><span>保存并应用主题</span>
            </button>
            <p className="text-[11px] text-outline font-medium text-center pb-2">修改后将同步应用至首页、稿单、画库及个人中心</p>
          </div>
        </footer>
      </div>
    </Page>
  )
}
