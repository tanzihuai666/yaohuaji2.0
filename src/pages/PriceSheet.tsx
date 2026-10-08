import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLiveQuery } from 'dexie-react-hooks'
import { toBlob } from 'html-to-image'
import Page from '../components/Page'
import Img from '../components/Img'
import FormSheet from '../components/FormSheet'
import { DefaultAvatar } from '../components/Mascots'
import { useUI } from '../components/ui'
import { db, uid, type PriceItem } from '../lib/db'
import { useSettings } from '../lib/settings'
import { pickImagesSafe, deleteImages } from '../lib/images'
import { saveToDocuments, shareBlob } from '../lib/share'
import { pad, today } from '../lib/format'

interface Conf { role: string; open: boolean; rating: string; notes: { strong: string; rest: string }[]; stamp: string }
const DEF_CONF: Conf = {
  role: '独立画师', open: true, rating: '100%', stamp: '',
  notes: [
    { strong: '草稿阶段免费修改2次', rest: '，进入色稿阶段仅支持微调明暗色调。' },
    { strong: '确认线稿后不支持推倒重画', rest: '，如遇重大设定变更需补付30%定金。' },
    { strong: '默认个人非商用', rest: '，商用授权、Vup出道或周边实体印刷按基准价2.0倍结算。' },
  ],
}
const SEED: Omit<PriceItem, 'id'>[] = [
  { title: 'Q版与精致头像', subtitle: 'Chibi & Avatar Commission', min: 150, max: 300, spec: '1-3天出草稿 • 2000×2000px 300DPI', samples: [], sampleLabels: ['头像', 'Q版贴纸', '表情包'], sort: 1 },
  { title: '正比立绘与插画', subtitle: 'Illustration & Full Body', min: 600, max: 1200, spec: '含分层PSD • 300DPI高清无损 • 附赠透明底PNG', samples: [], sampleLabels: ['正比半身', '厚涂立绘', '氛围插画'], sort: 2, popular: true },
  { title: '角色设定集与商用', subtitle: 'Character Sheet & Commercial', min: 1500, max: 0, spec: '商业独家授权 • 专属排期通道 • 包含拆分源文件', samples: [], sampleLabels: ['三视图设子', '拆分图', '服饰细部'], sort: 3 },
]
const ICONS = ['schedule', 'layers', 'verified_user', 'brush', 'palette', 'auto_awesome']
const priceText = (p: PriceItem) => (p.max > p.min ? `¥${p.min} - ¥${p.max}` : `¥${p.min}+`)
const SEASON = ['SPRING', 'SPRING', 'SPRING', 'SUMMER', 'SUMMER', 'SUMMER', 'AUTUMN', 'AUTUMN', 'AUTUMN', 'WINTER', 'WINTER', 'WINTER']
// Highlight multipliers like "2.0倍" in secondary color, as in the design.
const Rest = ({ t }: { t: string }) => <>{t.split(/(\d+(?:\.\d+)?倍)/).map((s, i) => (i % 2 ? <span key={i} className="text-secondary font-bold">{s}</span> : s))}</>

export default function PriceSheet() {
  const nav = useNavigate(); const ui = useUI(); const s = useSettings()
  const items = useLiveQuery(() => db.prices.orderBy('sort').toArray(), []) || []
  const confRow = useLiveQuery(() => db.kv.get('priceConf'), [])
  const conf: Conf = { ...DEF_CONF, ...(confRow?.value as Partial<Conf> || {}) }
  const stats = useLiveQuery(async () => {
    const done = await db.orders.where('status').equals('done').toArray()
    const onTime = done.filter(o => !o.deadline || !o.stageTimes?.done || o.stageTimes.done <= new Date(o.deadline + 'T23:59:59').getTime()).length
    return { done: done.length, rate: done.length ? Math.round((onTime / done.length) * 100) : 100 }
  }, []) || { done: 0, rate: 100 }
  const [edit, setEdit] = useState(false)
  const [form, setForm] = useState<PriceItem | 'new' | null>(null)
  const [busy, setBusy] = useState(false)
  const sheet = useRef<HTMLElement>(null)
  const saveConf = (p: Partial<Conf>) => db.kv.put({ key: 'priceConf', value: { ...conf, ...p } })

  useEffect(() => { (async () => {
    if (await db.kv.get('priceSeeded')) return
    await db.kv.put({ key: 'priceSeeded', value: 1 })
    if (!(await db.prices.count())) await db.prices.bulkAdd(SEED.map(x => ({ ...x, id: uid() })))
  })() }, [])

  const render = async () => {
    if (!sheet.current) return null
    setBusy(true)
    try {
      const bg = getComputedStyle(document.body).getPropertyValue('--c-background').trim()
      return await toBlob(sheet.current, { pixelRatio: 2, cacheBust: true, backgroundColor: bg ? `rgb(${bg})` : '#FBF9F1', style: { padding: '16px', margin: '0' } })
    } catch { ui.toast('生成失败，请重试'); return null } finally { setBusy(false) }
  }
  const fname = () => { const d = new Date(); return `妖画集价目表_${today()}_${pad(d.getHours())}${pad(d.getMinutes())}.png` }
  const exportShare = async () => { if (edit) setEdit(false); await new Promise(r => setTimeout(r, 60)); const b = await render(); if (b) await shareBlob(b, fname(), '稿条价目表') }
  const exportSave = async () => { if (edit) setEdit(false); await new Promise(r => setTimeout(r, 60)); const b = await render(); if (b) { await saveToDocuments(b, fname()); ui.toast('海报已保存（文档/妖画集）') } }

  const submit = async (v: Record<string, string>) => {
    if (!v.title?.trim()) return ui.toast('请填写稿种名称')
    const base = form === 'new' ? { id: uid(), samples: [], sort: (items.at(-1)?.sort ?? 0) + 1 } : form!
    const labels = (v.labels || '').split(/[,，、\s]+/).filter(Boolean).slice(0, 3)
    await db.prices.put({ ...(base as PriceItem), title: v.title.trim(), subtitle: v.subtitle?.trim() || '', min: Number(v.min) || 0, max: Number(v.max) || 0, spec: v.spec?.trim() || '', sampleLabels: labels, popular: v.popular === '热门推荐' })
    setForm(null); ui.toast('已保存')
  }
  const remove = async (p: PriceItem) => {
    if (!(await ui.confirm({ title: `删除「${p.title}」？`, message: '该稿种及其样图将被移除。', danger: true, okText: '删除' }))) return
    await deleteImages(p.samples); await db.prices.delete(p.id); setForm(null)
  }
  const move = async (i: number, d: number) => {
    const a = items[i], b = items[i + d]; if (!a || !b) return
    await db.transaction('rw', db.prices, async () => { await db.prices.update(a.id, { sort: b.sort }); await db.prices.update(b.id, { sort: a.sort }) })
  }
  const setSample = async (p: PriceItem, k: number) => {
    if (!edit) return
    if (p.samples[k]) {
      const act = await ui.confirm({ title: '样图', message: '替换还是移除这张样图？', okText: '替换', cancelText: '移除' })
      if (!act) { const ns = [...p.samples]; await deleteImages([ns[k]]); ns[k] = ''; await db.prices.update(p.id, { samples: ns }); return }
    }
    const [id] = await pickImagesSafe(false, ui.toast); if (!id) return
    const ns = [...p.samples]; while (ns.length < 3) ns.push(''); if (ns[k]) await deleteImages([ns[k]]); ns[k] = id
    await db.prices.update(p.id, { samples: ns })
  }
  const editNote = async (i: number) => {
    const n = conf.notes[i]
    const v = await ui.prompt({ title: `须知 ${i + 1}`, label: '用“|”分隔加粗重点与补充说明，留空删除', defaultValue: n ? `${n.strong}|${n.rest.replace(/^，/, '')}` : '', icon: 'sticky_note_2' })
    if (v === null) return
    const notes = [...conf.notes]
    if (!v) notes.splice(i, 1); else { const [a, ...b] = v.split('|'); notes[i] = { strong: a.trim(), rest: b.length ? '，' + b.join('|').trim() : '' } }
    await saveConf({ notes })
  }
  const stampName = conf.stamp || `${s.nickname || '画师'}设集`
  const d = new Date()

  return (
    <Page name="PriceSheet">
      <div className="w-full max-w-md mx-auto relative min-h-screen flex flex-col px-margin pt-14 pt-safe-header">
        <header className="fixed top-0 left-0 right-0 w-full z-50 flex justify-between items-center px-margin max-w-md mx-auto h-14 bg-surface shadow-sm transition-transform duration-150 header-safe">
          <button aria-label="返回" onClick={() => nav(-1)} className="w-9 h-9 rounded-full bg-surface-container-lowest flex items-center justify-center text-primary shadow-sm border border-outline-variant/40 active:scale-95 transition-transform" type="button">
            <span className="material-symbols-outlined text-[18px]">arrow_back_ios_new</span>
          </button>
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-primary text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
            <h1 className="text-headline-md font-headline-md text-on-surface tracking-tight">稿条价目表</h1>
          </div>
          <button onClick={exportShare} disabled={busy} className="flex items-center gap-1 bg-primary text-on-primary px-3 py-1.5 rounded-full text-label-md font-label-md stamp-badge-shadow active:scale-95 transition-transform disabled:opacity-60" type="button">
            <span className="material-symbols-outlined text-[15px]">ios_share</span><span>导出长图</span>
          </button>
        </header>
        <main ref={sheet} className="w-full flex flex-col gap-space-lg mt-3 bg-transparent">
          <section className="relative bg-surface-container-lowest rounded-xl p-4 journal-card-shadow border border-outline-variant/50 pt-5">
            <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 washi-tape px-5 py-0.5 rounded-sm text-[10px] text-primary font-bold tracking-widest uppercase whitespace-nowrap">ARTIST PORTFOLIO • {d.getFullYear()}</div>
            <div className="flex items-start gap-3 mt-1">
              <div className="relative flex-shrink-0">
                <div className="w-16 h-16 rounded-full p-0.5 border-2 border-dashed border-primary-container overflow-hidden">
                  <Img id={s.avatar} className="w-full h-full object-cover rounded-full" fallback={<div className="w-full h-full rounded-full overflow-hidden bg-amber-100 flex items-center justify-center"><DefaultAvatar /></div>} />
                </div>
                <div className="absolute -bottom-1 -right-1 bg-primary text-on-primary rounded-full w-5 h-5 flex items-center justify-center text-[12px] shadow-sm">
                  <span className="material-symbols-outlined text-[13px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1 mb-1">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="text-headline-md font-headline-md text-on-surface font-bold truncate">{s.nickname || '画师'}</span>
                    <button type="button" disabled={!edit} onClick={async () => { const v = await ui.prompt({ title: '身份标签', defaultValue: conf.role }); if (v) saveConf({ role: v }) }} className="text-label-md font-label-md bg-surface-container-high text-on-surface-variant px-1.5 py-0.5 rounded text-[10px] whitespace-nowrap">{conf.role}</button>
                  </div>
                  <button type="button" onClick={() => saveConf({ open: !conf.open })} className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-label-md font-label-md border whitespace-nowrap ${conf.open ? 'bg-primary-fixed text-on-primary-fixed-variant border-primary/20' : 'bg-surface-container-high text-outline border-outline-variant/50'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${conf.open ? 'bg-primary animate-pulse' : 'bg-outline'}`} />
                    <span>{conf.open ? '档期开放 · 接单中' : '档期已满 · 暂停接单'}</span>
                  </button>
                </div>
                <p className="text-body-md font-body-md text-on-surface-variant italic mb-2">“ {s.motto || '一纸一笔，皆是山河'} ”</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-dashed border-outline-variant/60">
              <button type="button" disabled={!edit} onClick={async () => { const v = await ui.prompt({ title: '好评率', defaultValue: conf.rating }); if (v) saveConf({ rating: v }) }} className="bg-surface-container-low rounded-lg p-2 text-center border border-outline-variant/30">
                <div className="text-label-md font-label-md text-outline">好评率</div>
                <div className="text-title-md font-title-md text-primary font-bold">{conf.rating}</div>
              </button>
              <div className="bg-surface-container-low rounded-lg p-2 text-center border border-outline-variant/30">
                <div className="text-label-md font-label-md text-outline">已完成作品</div>
                <div className="text-title-md font-title-md text-primary font-bold">{stats.done} 单</div>
              </div>
              <div className="bg-surface-container-low rounded-lg p-2 text-center border border-outline-variant/30">
                <div className="text-label-md font-label-md text-outline">准时交付率</div>
                <div className="text-title-md font-title-md text-primary font-bold">{stats.rate}%</div>
              </div>
            </div>
          </section>

          {items.map((p, i) => (
            <section key={p.id} className="relative bg-surface-container-lowest rounded-xl p-4 journal-card-shadow border border-outline-variant/50">
              {p.popular && <div className="absolute -top-2.5 right-6 washi-tape-sand px-3 py-0.5 rounded-sm text-[10px] text-tertiary font-bold tracking-wider">POPULAR • 热门推荐</div>}
              <div className="flex items-start justify-between mb-3 gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="w-6 h-6 rounded-full bg-primary-fixed text-primary flex items-center justify-center font-bold text-[12px] flex-shrink-0">{pad(i + 1)}</span>
                  <div className="min-w-0">
                    <h2 className="text-title-md font-title-md text-on-surface truncate">{p.title}</h2>
                    {p.subtitle && <p className="text-label-md font-label-md text-outline truncate">{p.subtitle}</p>}
                  </div>
                </div>
                <div className="bg-primary text-on-primary px-3 py-1 rounded-full text-title-md font-title-md tracking-tight stamp-badge-shadow whitespace-nowrap">{priceText(p)}</div>
              </div>
              {p.spec && <div className="flex items-center gap-2 bg-surface-container-low px-2.5 py-1.5 rounded-lg mb-3 border border-outline-variant/40">
                <span className="material-symbols-outlined text-primary text-[16px]">{ICONS[i % ICONS.length]}</span>
                <span className="text-label-md font-label-md text-on-surface-variant">{p.spec}</span>
              </div>}
              {(edit || p.samples.some(Boolean) || p.sampleLabels.length > 0) && <div className="grid grid-cols-3 gap-2">
                {[0, 1, 2].map(k => (p.samples[k] || p.sampleLabels[k] || edit) ? (
                  <button type="button" key={k} onClick={() => setSample(p, k)} className="flex flex-col items-center">
                    <div className="w-full aspect-square rounded-lg p-1 bg-surface-container-high border border-outline-variant/60 shadow-xs relative overflow-hidden">
                      <Img id={p.samples[k]} full className="w-full h-full object-cover rounded-md" fallback={<div className="w-full h-full rounded-md flex items-center justify-center text-outline/70 bg-surface-container-low"><span className="material-symbols-outlined text-[22px]">{edit ? 'add_photo_alternate' : 'image'}</span></div>} />
                    </div>
                    {p.sampleLabels[k] && <span className="mt-1.5 text-label-md font-label-md text-on-surface-variant bg-surface-container-low px-2 py-0.5 rounded-full border border-outline-variant/30">{p.sampleLabels[k]}</span>}
                  </button>
                ) : <div key={k} />)}
              </div>}
              {edit && <div className="flex justify-end gap-2 mt-3 pt-3 border-t border-dashed border-outline-variant/60">
                <button type="button" disabled={i === 0} onClick={() => move(i, -1)} className="w-8 h-8 rounded-full bg-surface-container-low border border-outline-variant/40 text-primary disabled:opacity-30 flex items-center justify-center"><span className="material-symbols-outlined text-[18px]">arrow_upward</span></button>
                <button type="button" disabled={i === items.length - 1} onClick={() => move(i, 1)} className="w-8 h-8 rounded-full bg-surface-container-low border border-outline-variant/40 text-primary disabled:opacity-30 flex items-center justify-center"><span className="material-symbols-outlined text-[18px]">arrow_downward</span></button>
                <button type="button" onClick={() => setForm(p)} className="h-8 px-3 rounded-full bg-primary-fixed text-primary text-label-md font-label-md flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">edit</span>编辑</button>
                <button type="button" onClick={() => remove(p)} className="h-8 px-3 rounded-full bg-error-container text-error text-label-md font-label-md flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">delete</span>删除</button>
              </div>}
            </section>
          ))}
          {edit && <button type="button" onClick={() => setForm('new')} className="h-14 rounded-xl border-2 border-dashed border-primary/40 text-primary flex items-center justify-center gap-1.5 font-label-lg text-label-lg bg-surface-container-lowest/60 active:scale-[0.98]">
            <span className="material-symbols-outlined text-[20px]">add_circle</span>新增稿种
          </button>}
          {!items.length && !edit && <div className="text-center text-outline text-body-md py-6">还没有稿种，点击底部「修改配置」添加</div>}

          <section className="relative bg-surface-container-low rounded-xl p-4.5 journal-card-shadow border border-outline-variant/60 overflow-hidden">
            <div className="absolute -top-1 left-5 flex items-center justify-center"><div className="w-4 h-6 border-2 border-primary rounded-full -rotate-12 bg-surface-container-lowest" /></div>
            <div className="flex items-center gap-2 mb-3 pl-6">
              <span className="material-symbols-outlined text-primary text-[20px]">sticky_note_2</span>
              <h3 className="text-title-md font-title-md text-on-surface">约稿须知 · 合作约定</h3>
            </div>
            <div className="space-y-2.5">
              {conf.notes.map((n, i) => (
                <div key={i} onClick={() => edit && editNote(i)} className="flex items-start gap-2.5 bg-surface-container-lowest p-2.5 rounded-lg border border-outline-variant/30">
                  <div className="w-5 h-5 rounded-full bg-primary-fixed text-primary flex items-center justify-center text-[11px] font-bold mt-0.5 flex-shrink-0">{i + 1}</div>
                  <p className="text-body-md font-body-md text-on-surface flex-1"><strong className="font-bold text-primary">{n.strong}</strong><Rest t={n.rest} /></p>
                  {edit && <span className="material-symbols-outlined text-outline text-[16px] mt-0.5">edit</span>}
                </div>
              ))}
              {edit && <button type="button" onClick={() => editNote(conf.notes.length)} className="w-full p-2.5 rounded-lg border border-dashed border-primary/40 text-primary text-label-md font-label-md flex items-center justify-center gap-1"><span className="material-symbols-outlined text-[16px]">add</span>添加一条须知</button>}
            </div>
          </section>
          <div className="my-3 flex flex-col items-center justify-center text-center">
            <button type="button" disabled={!edit} onClick={async () => { const v = await ui.prompt({ title: '印章文字', defaultValue: stampName }); if (v !== null) saveConf({ stamp: v }) }} className="inline-flex flex-col items-center justify-center w-28 h-28 rounded-full border-2 border-dashed border-primary text-primary p-2 relative bg-surface-container-lowest/60 rotate-[-4deg] stamp-badge-shadow">
              <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>pets</span>
              <span className="text-[12px] font-bold tracking-tight mt-0.5">{stampName}</span>
              <span className="text-[9px] font-semibold text-outline tracking-wider">诚意出品 • 盖印为凭</span>
              <div className="text-[8px] font-bold tracking-widest text-primary/80 mt-0.5 border-t border-primary/30 pt-0.5">{d.getFullYear()} {SEASON[d.getMonth()]}</div>
            </button>
            <p className="text-label-md font-label-md text-outline mt-2 tracking-wide">— 本价目单由画师本人实时维护认证 —</p>
          </div>
        </main>
        <div className="h-24" />
        <aside className="fixed bottom-0 left-0 w-full z-40 bg-surface/90 backdrop-blur-md px-margin py-3 pb-safe border-none flex justify-center">
          <div className="w-full max-w-md flex items-center gap-2.5">
            <button onClick={() => setEdit(e => !e)} className={`flex-1 h-12 rounded-xl flex items-center justify-center gap-1.5 font-label-lg text-label-lg active:scale-95 transition-transform shadow-xs ${edit ? 'bg-primary-fixed text-primary border border-primary/30' : 'bg-surface-container-lowest text-primary perforated-border'}`} type="button">
              <span className="material-symbols-outlined text-[18px]">{edit ? 'check' : 'tune'}</span><span>{edit ? '完成修改' : '修改配置'}</span>
            </button>
            <button onClick={exportSave} disabled={busy} className="flex-[2] h-12 bg-primary text-on-primary rounded-xl flex items-center justify-center gap-2 font-label-lg text-label-lg stamp-badge-shadow active:scale-95 transition-transform disabled:opacity-60" type="button">
              <span className={`material-symbols-outlined text-[20px] ${busy ? 'animate-spin' : ''}`}>{busy ? 'progress_activity' : 'download'}</span><span>{busy ? '正在生成…' : '一键保存海报至相册'}</span>
            </button>
          </div>
        </aside>
      </div>
      <FormSheet open={!!form} title={form === 'new' ? '新增稿种' : '编辑稿种'} icon="sell" onClose={() => setForm(null)} onSubmit={submit} onDelete={form && form !== 'new' ? () => remove(form) : undefined}
        initial={form && form !== 'new' ? { title: form.title, subtitle: form.subtitle, min: String(form.min || ''), max: String(form.max || ''), spec: form.spec, labels: form.sampleLabels.join('，'), popular: form.popular ? '热门推荐' : '普通' } : { popular: '普通' }}
        fields={[
          { key: 'title', label: '稿种名称', placeholder: '如：Q版与精致头像' },
          { key: 'subtitle', label: '英文/副标题', placeholder: 'Chibi & Avatar Commission' },
          { key: 'min', label: '起步价 (¥)', type: 'number', half: true, placeholder: '150' },
          { key: 'max', label: '最高价 (¥，留空显示“+”)', type: 'number', half: true, placeholder: '300' },
          { key: 'spec', label: '规格说明', placeholder: '1-3天出草稿 • 2000×2000px 300DPI' },
          { key: 'labels', label: '样图标签（最多3个，逗号分隔）', placeholder: '头像，Q版贴纸，表情包' },
          { key: 'popular', label: '角标', type: 'chips', options: ['普通', '热门推荐'] },
        ]} />
    </Page>
  )
}
