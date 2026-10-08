import { useEffect, useState, type ReactNode } from 'react'
import { Sheet } from './ui'

export type Field = { key: string; label: string; type?: 'text' | 'number' | 'textarea' | 'date' | 'chips'; placeholder?: string; options?: string[]; half?: boolean }
type V = Record<string, string>

/** Bottom-sheet form used by price items, manual transactions, etc. Visual language follows the Stitch sheets. */
export default function FormSheet({ open, title, icon = 'edit_note', fields, initial, onClose, onSubmit, onDelete, okText = '保存', children }: {
  open: boolean; title: string; icon?: string; fields: Field[]; initial: V; onClose: () => void; onSubmit: (v: V) => void | Promise<void>; onDelete?: () => void; okText?: string; children?: ReactNode
}) {
  const [v, setV] = useState<V>(initial)
  useEffect(() => { if (open) setV(initial) }, [open]) // eslint-disable-line react-hooks/exhaustive-deps
  const set = (k: string, x: string) => setV(p => ({ ...p, [k]: x }))
  const inp = 'w-full h-11 px-4 rounded-xl border border-[#e3dfd2] bg-[#faf8f2] text-[14px] text-[#2d332f] outline-none focus:border-[#3c6a58] focus:ring-2 focus:ring-[#3c6a58]/15'
  return (
    <Sheet open={open} onClose={onClose}>
      <div className="bg-[#fbf9f1] rounded-t-[28px] px-5 pt-3 pb-[calc(var(--sab)+18px)] shadow-[0_-8px_30px_rgba(45,51,47,0.12)] max-h-[88vh] overflow-y-auto">
        <div className="w-10 h-1.5 rounded-full bg-[#dcd8cc] mx-auto mb-4" />
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[16px] font-extrabold text-[#2d332f] flex items-center gap-1.5"><span className="material-symbols-outlined text-[20px] text-[#3c6a58]">{icon}</span>{title}</h3>
          {onDelete && <button type="button" onClick={onDelete} className="text-[12px] font-bold text-[#e06d63] flex items-center gap-0.5 px-2.5 py-1 rounded-full bg-[#fdecea]"><span className="material-symbols-outlined text-[15px]">delete</span>删除</button>}
        </div>
        <div className="grid grid-cols-2 gap-3">
          {fields.map(f => (
            <label key={f.key} className={`${f.half ? '' : 'col-span-2'} block`}>
              <span className="block text-[12px] font-bold text-[#656e67] mb-1.5 pl-1">{f.label}</span>
              {f.type === 'textarea' ? <textarea rows={3} value={v[f.key] ?? ''} placeholder={f.placeholder} onChange={e => set(f.key, e.target.value)} className={inp + ' h-auto py-3 resize-none leading-relaxed'} />
                : f.type === 'chips' ? <div className="flex flex-wrap gap-2">{f.options!.map(o => (
                  <button type="button" key={o} onClick={() => set(f.key, o)} className={`px-3.5 py-1.5 rounded-full text-[12px] font-bold border transition-colors ${v[f.key] === o ? 'bg-[#3c6a58] text-white border-[#3c6a58]' : 'bg-white text-[#656e67] border-[#e3dfd2]'}`}>{o}</button>))}</div>
                : <input type={f.type === 'number' ? 'text' : f.type || 'text'} inputMode={f.type === 'number' ? 'decimal' : undefined} value={v[f.key] ?? ''} placeholder={f.placeholder} onChange={e => set(f.key, e.target.value)} className={inp} />}
            </label>
          ))}
        </div>
        {children}
        <div className="grid grid-cols-[1fr_2fr] gap-3 mt-5">
          <button type="button" onClick={onClose} className="h-12 rounded-xl border border-[#e3dfd2] bg-white text-[14px] font-bold text-[#656e67]">取消</button>
          <button type="button" onClick={() => onSubmit(v)} className="h-12 rounded-xl bg-[#3c6a58] text-white text-[14px] font-bold shadow-[0_6px_16px_rgba(60,106,88,0.22)] active:scale-[0.98]">{okText}</button>
        </div>
      </div>
    </Sheet>
  )
}
