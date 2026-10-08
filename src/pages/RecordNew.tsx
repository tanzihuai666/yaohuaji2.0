import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useLiveQuery } from 'dexie-react-hooks'
import Page from '../components/Page'
import Img from '../components/Img'
import GroupDialog from '../components/GroupDialog'
import { Sheet, useUI } from '../components/ui'
import { Back, Brush, Picture, Camera, Upload, Coin, Calendar, Chevron, FolderY, Note, Save } from '../components/RecordIcons'
import { db, uid, type CommissionRecord } from '../lib/db'
import { pickImagesSafe, deleteImages, deleteImagesIfOrphan } from '../lib/images'
import { today } from '../lib/format'

const inputCls = 'w-full h-12 bg-white/95 border border-[#e4ded0] rounded-xl px-4 text-base font-normal text-text-main shadow-soft focus:bg-white'
type BatchItem = { image: string; amount: string; title: string }

export default function RecordNew() {
  const { id: charId, rid } = useParams(); const nav = useNavigate(); const ui = useUI()
  const [rec, setRec] = useState<CommissionRecord | null>(null); const [orig, setOrig] = useState<string[]>([])
  const [amount, setAmount] = useState('')
  const [batch, setBatch] = useState<BatchItem[] | null>(null)
  const [groupSheet, setGroupSheet] = useState(false); const [groupDlg, setGroupDlg] = useState(false)
  const cid = rec?.characterId
  const groups = useLiveQuery(() => (cid ? db.groups.where('characterId').equals(cid).sortBy('createdAt') : []), [cid]) || []
  const char = useLiveQuery(() => (cid ? db.characters.get(cid) : undefined), [cid])

  useEffect(() => { (async () => {
    if (rid) { const r = await db.records.get(rid); if (!r) { ui.toast('记录不存在'); nav(-1); return } setRec(r); setOrig(r.images); setAmount(r.amount ? String(r.amount) : ''); return }
    const g = new URLSearchParams(location.hash.split('?')[1] || '').get('group') || undefined
    setRec({ id: uid(), characterId: charId!, groupId: g, images: [], title: '', amount: 0, date: today(), note: '', createdAt: Date.now() })
  })() }, [rid, charId]) // eslint-disable-line react-hooks/exhaustive-deps
  if (!rec) return <Page name="RecordNew" />
  const set = (p: Partial<CommissionRecord>) => setRec(x => ({ ...x!, ...p }))
  const group = groups.find(g => g.id === rec.groupId)

  const addImgs = async () => { const ids = await pickImagesSafe(true, ui.toast); if (ids.length) set({ images: [...rec.images, ...ids] }) }
  const startBatch = async () => {
    const ids = await pickImagesSafe(true, ui.toast); if (!ids.length) return
    setBatch(b => [...(b || []), ...ids.map(image => ({ image, amount: '', title: '' }))]); ui.toast(`已导入 ${ids.length} 张，可逐张填写价格`)
  }
  const createGroup = async (name: string) => {
    const g = { id: uid(), characterId: rec.characterId, name, createdAt: Date.now() }
    await db.groups.add(g); set({ groupId: g.id }); setGroupDlg(false); setGroupSheet(false); ui.toast(`已创建分组「${name}」`)
  }
  const leave = async () => {
    const fresh = [...(batch?.map(b => b.image) || []), ...rec.images.filter(i => !orig.includes(i))]
    if (fresh.length && !(await ui.confirm({ title: '放弃编辑？', message: '已选择的图片不会保存。', okText: '放弃', danger: true }))) return
    await deleteImages(fresh); nav(-1)
  }
  const save = async () => {
    if (batch) {
      if (!batch.length) return ui.toast('请先导入图片')
      if (batch.some(b => b.amount === '' || isNaN(Number(b.amount)))) return ui.toast('请为每张图填写金额')
      const t = Date.now()
      await db.records.bulkAdd(batch.map((b, i) => ({ id: uid(), characterId: rec.characterId, groupId: rec.groupId, images: [b.image], title: b.title.trim(), amount: Number(b.amount) || 0, date: rec.date, note: rec.note, createdAt: t + i })))
      ui.toast(`已保存 ${batch.length} 条约稿`); nav(-1); return
    }
    if (!rec.images.length) return ui.toast('请添加约稿图片')
    if (amount === '' || isNaN(Number(amount))) return ui.toast('请填写金额')
    await db.records.put({ ...rec, amount: Number(amount) || 0 })
    await deleteImages(orig.filter(i => !rec.images.includes(i)))
    ui.toast(rid ? '约稿已更新' : '约稿已保存'); nav(-1)
  }
  const remove = async () => {
    if (!(await ui.confirm({ title: '删除这条约稿？', message: '图片将一并删除，无法恢复。', danger: true, okText: '删除' }))) return
    await db.records.delete(rec.id); await deleteImagesIfOrphan(rec.images); ui.toast('已删除'); nav(-1)
  }
  const batchTotal = batch?.reduce((s, b) => s + (Number(b.amount) || 0), 0) || 0

  return (
    <Page name="RecordNew">
      <header className="w-full px-5 pt-3 pt-safe pb-3 flex items-center justify-between sticky top-0 bg-[#fbf9f2]/90 backdrop-blur-xs z-20 max-w-md mx-auto">
        <button aria-label="返回" onClick={leave} className="w-10 h-10 rounded-full bg-[#edf1ec] text-[#556b5e] flex items-center justify-center active:scale-95 transition-transform duration-150 mt-3" type="button"><Back className="w-5 h-5 -ml-0.5" /></button>
        <div className="flex items-center gap-1.5 text-[19px] font-bold tracking-wide text-text-main mt-3"><Brush className="w-5 h-5" /><span>{rid ? '编辑约稿' : batch ? '批量导入约稿' : '添加约稿'}</span></div>
        {rid ? <button aria-label="删除" onClick={remove} className="w-10 h-10 rounded-full bg-[#fdecea] text-[#d96a68] flex items-center justify-center mt-3"><span className="material-symbols-outlined text-[20px]">delete</span></button> : <div className="w-10 h-10" />}
      </header>
      <main className="flex-1 px-5 pt-3 pb-8 max-w-md mx-auto w-full">
        <form className="space-y-6" id="artwork-form" onSubmit={e => { e.preventDefault(); save() }}>
          {char && <div className="-mb-2 text-xs text-[#6b7a6e] font-medium flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">pets</span>角色：<b className="text-[#3c6a58]">{char.name}</b></div>}
          <section data-purpose="image-upload-section">
            <label className="flex items-center gap-1.5 text-[15px] font-medium text-text-main mb-3"><span className="inline-flex items-center justify-center"><Picture className="w-[19px] h-[19px]" /></span><span>约稿图片（必填）</span></label>
            {!batch ? <>
              <div className="mb-3.5 flex flex-wrap gap-2.5">
                {rec.images.map(im => (
                  <div key={im} className="relative w-24 h-24 rounded-2xl overflow-hidden border border-[#e4ded0] bg-white shadow-soft">
                    <Img id={im} className="w-full h-full object-cover" />
                    <button type="button" aria-label="移除" onClick={() => set({ images: rec.images.filter(x => x !== im) })} className="absolute top-1 right-1 w-5 h-5 rounded-full bg-[#28322b]/60 text-white flex items-center justify-center"><span className="material-symbols-outlined text-[13px]">close</span></button>
                  </div>
                ))}
                <button type="button" onClick={addImgs} className="w-24 h-24 rounded-2xl border-2 border-dashed border-[#89a997]/80 bg-[#f2f6f3]/60 flex flex-col items-center justify-center gap-1.5 cursor-pointer active:bg-[#e6eee8] transition-colors">
                  <Camera className="w-8 h-8 text-[#597969]" /><span className="text-xs font-semibold text-[#5a7667]">添加图片</span>
                </button>
              </div>
              {!rid && <button onClick={startBatch} className="w-full py-3.5 px-4 rounded-xl border-2 border-dashed border-[#89a997]/80 bg-[#f2f6f3]/40 flex items-center justify-center gap-2 text-[#537363] font-medium text-[14px] active:bg-[#e4ece6] transition-colors" type="button">
                <Upload className="w-[18px] h-[18px] text-[#537363]" /><span>批量导入约稿（多图逐张编辑价格）</span>
              </button>}
            </> : <div className="space-y-2.5">
              {batch.map((b, i) => (
                <div key={b.image} className="flex items-center gap-3 bg-white/95 border border-[#e4ded0] rounded-2xl p-2.5 shadow-soft">
                  <Img id={b.image} className="w-16 h-16 rounded-xl object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0 space-y-1.5">
                    <input value={b.title} onChange={e => setBatch(bs => bs!.map((x, k) => k === i ? { ...x, title: e.target.value } : x))} placeholder={`第 ${i + 1} 张 · 标题（可选）`} className="w-full h-8 bg-[#fbf9f2] border border-[#e4ded0] rounded-lg px-2.5 text-[13px]" />
                    <div className="flex items-center gap-1.5"><Coin className="w-4 h-4 flex-shrink-0" />
                      <input value={b.amount} inputMode="decimal" type="number" onChange={e => setBatch(bs => bs!.map((x, k) => k === i ? { ...x, amount: e.target.value } : x))} placeholder="金额 ¥" className="w-full h-8 bg-[#fbf9f2] border border-[#e4ded0] rounded-lg px-2.5 text-[13px]" />
                    </div>
                  </div>
                  <button type="button" aria-label="移除" onClick={async () => { await deleteImages([b.image]); setBatch(bs => bs!.filter((_, k) => k !== i)) }} className="w-7 h-7 rounded-full bg-[#f2ede2] text-[#6b7a6e] flex items-center justify-center flex-shrink-0"><span className="material-symbols-outlined text-[15px]">close</span></button>
                </div>
              ))}
              <div className="grid grid-cols-2 gap-2.5">
                <button type="button" onClick={startBatch} className="py-3 rounded-xl border-2 border-dashed border-[#89a997]/80 bg-[#f2f6f3]/40 text-[#537363] font-medium text-[13px] flex items-center justify-center gap-1"><span className="material-symbols-outlined text-[16px]">add</span>继续添加</button>
                <button type="button" onClick={async () => { await deleteImages(batch.map(b => b.image)); setBatch(null) }} className="py-3 rounded-xl bg-[#edf1ec] text-[#556b5e] font-medium text-[13px]">退出批量</button>
              </div>
              <p className="text-xs text-[#6b7a6e] text-right">共 {batch.length} 张 · 合计 ¥{batchTotal}</p>
            </div>}
          </section>
          <section className="grid grid-cols-2 gap-3.5" data-purpose="meta-details">
            <div className={batch ? 'opacity-50 pointer-events-none' : ''}>
              <label className="flex items-center gap-1.5 text-[14px] font-medium text-text-main mb-2" htmlFor="price-input"><span className="inline-flex items-center justify-center"><Coin className="w-4 h-4" /></span><span>金额（必填 ¥）</span></label>
              <div className="relative"><input value={batch ? '' : amount} onChange={e => setAmount(e.target.value)} className={inputCls} id="price-input" inputMode="decimal" placeholder={batch ? '逐张填写' : '0'} type="number" /></div>
            </div>
            <div>
              <label className="flex items-center gap-1.5 text-[14px] font-medium text-text-main mb-2" htmlFor="date-select"><span className="inline-flex items-center justify-center"><Calendar className="w-4 h-4" /></span><span>时间</span></label>
              <div className="relative">
                <div className="w-full h-12 bg-white/95 border border-[#e4ded0] rounded-xl pl-3.5 pr-8 text-[15px] font-normal text-text-main shadow-soft flex items-center">{rec.date.replace(/-/g, '/')}</div>
                <input id="date-select" type="date" value={rec.date} onChange={e => e.target.value && set({ date: e.target.value })} className="absolute inset-0 opacity-0 w-full h-full cursor-pointer" />
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-[#9ba69d]"><Chevron className="w-4 h-4 text-[#89a997]" /></div>
              </div>
            </div>
          </section>
          <section data-purpose="group-selection">
            <label className="flex items-center gap-1.5 text-[14px] font-medium text-text-main mb-2" htmlFor="group-select"><span className="inline-flex items-center justify-center"><FolderY className="w-4 h-4" /></span><span>分组</span></label>
            <div className="relative">
              <button onClick={() => setGroupSheet(true)} className="w-full h-12 bg-white/95 border border-[#e4ded0] rounded-xl px-4 flex items-center justify-between text-[15px] text-text-main shadow-soft active:bg-stone-50" id="group-select" type="button">
                <span id="group-name-display">{group?.name || '未分组'}</span><Chevron className="w-4 h-4 text-[#89a997]" />
              </button>
            </div>
          </section>
          <section data-purpose="notes-input">
            <label className="flex items-center gap-1.5 text-[14px] font-medium text-text-main mb-2" htmlFor="notes-textarea"><span className="inline-flex items-center justify-center"><Note className="w-4 h-4" /></span><span>备注</span></label>
            {!batch && <input value={rec.title} onChange={e => set({ title: e.target.value })} placeholder="标题（可选，如：生日贺图 / 画师名）" className="w-full h-11 mb-2.5 bg-white/95 border border-[#e4ded0] rounded-xl px-4 text-[15px] text-text-main placeholder-[#a1aaa2] shadow-soft" />}
            <textarea value={rec.note} onChange={e => set({ note: e.target.value })} className="w-full bg-white/95 border border-[#e4ded0] rounded-2xl p-4 text-[15px] text-text-main placeholder-[#a1aaa2] shadow-soft resize-none focus:bg-white leading-relaxed" id="notes-textarea" placeholder="补充说明..." rows={3} />
          </section>
          <div className="pt-4">
            <button className="w-full h-[52px] bg-sage-primary hover:bg-sage-hover text-white text-[16px] font-medium tracking-wide rounded-2xl shadow-btn flex items-center justify-center gap-2 active:scale-[0.985] transition-all duration-150" type="submit">
              <Save className="w-5 h-5 text-white" /><span>{batch ? `保存 ${batch.length} 条约稿` : '保存约稿'}</span>
            </button>
          </div>
        </form>
      </main>
      <Sheet open={groupSheet} onClose={() => setGroupSheet(false)}>
        <div className="bg-[#fcfbf7] rounded-t-[28px] p-5 pb-[calc(var(--sab)+20px)] max-h-[70vh] overflow-y-auto border-t border-[#e4ded0]">
          <div className="w-10 h-1.5 rounded-full bg-[#dcd6c6] mx-auto mb-4" />
          <h3 className="text-[16px] font-bold text-text-main mb-3 flex items-center gap-2"><FolderY className="w-5 h-5" />选择分组</h3>
          <div className="space-y-2">
            {[{ id: undefined as string | undefined, name: '未分组' }, ...groups].map(g => (
              <button key={g.id || 'none'} onClick={() => { set({ groupId: g.id }); setGroupSheet(false) }} className={`w-full text-left px-4 h-12 rounded-xl flex items-center justify-between border ${rec.groupId === g.id ? 'bg-[#edf4ef] border-[#89a997] text-[#3c6a58] font-bold' : 'bg-white border-[#e4ded0] text-text-main'}`}>
                <span>{g.name}</span>{rec.groupId === g.id && <span className="material-symbols-outlined text-[18px]">check</span>}
              </button>
            ))}
            <button onClick={() => setGroupDlg(true)} className="w-full h-12 rounded-xl border-2 border-dashed border-[#89a997]/80 text-[#537363] flex items-center justify-center gap-1 font-medium text-[14px]"><span className="material-symbols-outlined text-[18px]">add</span>新建分组</button>
          </div>
        </div>
      </Sheet>
      <GroupDialog open={groupDlg} onClose={() => setGroupDlg(false)} onConfirm={createGroup} />
    </Page>
  )
}
