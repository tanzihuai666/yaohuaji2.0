import { useEffect, useState } from 'react'
import { Modal } from './ui'
import { FolderSmall, X } from './RecordIcons'

/** 新建/重命名分组弹窗 — mirrors the Stitch GroupDialog screen. */
export default function GroupDialog({ open, title = '新建分组', initial = '', onClose, onConfirm }: { open: boolean; title?: string; initial?: string; onClose: () => void; onConfirm: (name: string) => void }) {
  const [v, setV] = useState(initial)
  useEffect(() => { if (open) setV(initial) }, [open, initial])
  const ok = () => { if (v.trim()) onConfirm(v.trim()) }
  return (
    <Modal open={open} onClose={onClose}>
      <div className="pg-GroupDialog !min-h-0 !bg-none !bg-transparent">
        <div className="relative bg-[#fcfbf7] rounded-2xl shadow-xl w-[86%] max-w-xs mx-auto p-5 z-10 border border-[#e4ded0] flex flex-col gap-4">
          <div className="flex items-center justify-between pb-1 border-b border-[#ece6d8]">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-[#edf4ef] flex items-center justify-center text-[#556b5e] border border-[#d3ded6]"><FolderSmall className="w-4 h-4" /></span>
              <h3 className="text-[16px] font-bold text-text-main tracking-wide">{title}</h3>
            </div>
            <button aria-label="关闭" onClick={onClose} className="w-7 h-7 rounded-full bg-[#f2ede2] hover:bg-[#e7e1d5] active:scale-95 text-[#6b7a6e] flex items-center justify-center transition-colors" type="button"><X className="w-3.5 h-3.5" /></button>
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#5a7667] mb-1.5" htmlFor="modal-group-input">分组名称</label>
            <input autoFocus value={v} maxLength={20} onChange={e => setV(e.target.value)} onKeyDown={e => e.key === 'Enter' && ok()} className="w-full h-11 bg-white border border-[#d6cfbe] rounded-xl px-3.5 text-[14px] text-text-main placeholder-[#a1aaa2] focus:bg-white focus:border-[#89a997] outline-none transition-all shadow-sm" id="modal-group-input" placeholder="请输入分组名称（如：商稿、主设、头像...）" type="text" />
          </div>
          <div className="flex items-center gap-2.5 pt-1">
            <button onClick={onClose} className="flex-1 h-10 rounded-xl bg-[#edf1ec] border border-[#d8e2da] text-[#556b5e] font-medium text-[14px] active:bg-[#e4ece6] transition-colors" type="button">取消</button>
            <button onClick={ok} disabled={!v.trim()} className="flex-1 h-10 rounded-xl bg-[#3c6a58] hover:bg-[#235241] active:scale-[0.98] text-white font-medium text-[14px] shadow-sm transition-all disabled:opacity-50" type="button">确认</button>
          </div>
        </div>
      </div>
    </Modal>
  )
}
