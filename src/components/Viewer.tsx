import { createPortal } from 'react-dom'
import { useState } from 'react'
import { useImageUrl } from '../hooks/useImage'
import { db } from '../lib/db'
import { shareBlob } from '../lib/share'

/** Fullscreen image viewer with swipe-free prev/next, save/share and optional delete. */
export default function Viewer({ ids, index, onClose, onDelete }: { ids: string[]; index: number; onClose: () => void; onDelete?: (id: string) => void }) {
  const [i, setI] = useState(index)
  const id = ids[i]; const url = useImageUrl(id, true)
  if (!id) return null
  const share = async () => { const r = await db.images.get(id); if (r) await shareBlob(r.blob, r.name || `yaohuaji-${Date.now()}.jpg`) }
  return createPortal(
    <div className="fixed inset-0 z-[95] bg-black/95 flex flex-col" style={{ animation: 'yh-fade-in .15s' }}>
      <div className="flex items-center justify-between px-4 pt-[calc(var(--sat)+10px)] pb-2 text-white">
        <button data-back onClick={onClose} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center"><span className="material-symbols-outlined">close</span></button>
        <span className="text-sm font-bold opacity-80">{i + 1} / {ids.length}</span>
        <div className="flex gap-2">
          <button onClick={share} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center"><span className="material-symbols-outlined">ios_share</span></button>
          {onDelete && <button onClick={() => { onDelete(id); if (ids.length <= 1) onClose(); else setI(Math.max(0, i - 1)) }} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center"><span className="material-symbols-outlined">delete</span></button>}
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center relative overflow-hidden" onClick={onClose}>
        {url && <img src={url} className="max-w-full max-h-full object-contain" onClick={e => e.stopPropagation()} />}
        {i > 0 && <button onClick={e => { e.stopPropagation(); setI(i - 1) }} className="absolute left-2 w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center"><span className="material-symbols-outlined">chevron_left</span></button>}
        {i < ids.length - 1 && <button onClick={e => { e.stopPropagation(); setI(i + 1) }} className="absolute right-2 w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center"><span className="material-symbols-outlined">chevron_right</span></button>}
      </div>
    </div>, document.body)
}
