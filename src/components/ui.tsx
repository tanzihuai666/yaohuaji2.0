import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'

type ConfirmOpts = { title: string; message?: string; okText?: string; cancelText?: string; danger?: boolean }
type PromptOpts = { title: string; label?: string; placeholder?: string; defaultValue?: string; okText?: string; icon?: string; inputType?: string }
interface UI { toast: (m: string) => void; confirm: (o: ConfirmOpts) => Promise<boolean>; prompt: (o: PromptOpts) => Promise<string | null> }
const Ctx = createContext<UI>(null as unknown as UI)
export const useUI = () => useContext(Ctx)

export function UIProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<{ id: number; m: string }[]>([])
  const [dlg, setDlg] = useState<null | { kind: 'confirm'; o: ConfirmOpts; r: (v: boolean) => void } | { kind: 'prompt'; o: PromptOpts; r: (v: string | null) => void }>(null)
  const [val, setVal] = useState('')
  const toast = useCallback((m: string) => { const id = Date.now() + Math.random(); setToasts(t => [...t, { id, m }]); setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 2200) }, [])
  const confirm = useCallback((o: ConfirmOpts) => new Promise<boolean>(r => setDlg({ kind: 'confirm', o, r })), [])
  const prompt = useCallback((o: PromptOpts) => { setVal(o.defaultValue || ''); return new Promise<string | null>(r => setDlg({ kind: 'prompt', o, r })) }, [])
  useEffect(() => { const h = (e: Event) => toast((e as CustomEvent).detail); window.addEventListener('yh-toast', h); return () => window.removeEventListener('yh-toast', h) }, [toast])
  const close = (v: boolean) => { if (!dlg) return; if (dlg.kind === 'confirm') dlg.r(v); else dlg.r(v ? val.trim() : null); setDlg(null) }
  return (
    <Ctx.Provider value={{ toast, confirm, prompt }}>
      {children}
      {createPortal(<>
        <div className="fixed top-0 left-1/2 z-[100] flex flex-col items-center gap-2 pt-[calc(var(--sat)+14px)] pointer-events-none" style={{ transform: 'translateX(-50%)' }}>
          {toasts.map(t => <div key={t.id} className="px-4 py-2.5 rounded-full bg-[#2d332f]/90 text-white text-[13px] font-semibold shadow-lg backdrop-blur" style={{ animation: 'yh-fade-in .2s' }}>{t.m}</div>)}
        </div>
        {dlg && (
          <div data-back className="fixed inset-0 z-[90] flex items-center justify-center px-6 bg-[#2d332f]/35 backdrop-blur-[2px]" style={{ animation: 'yh-fade-in .15s' }} onClick={() => close(false)}>
            <div className="w-full max-w-[320px] bg-white rounded-[20px] p-5 shadow-[0_12px_40px_rgba(45,51,47,0.18)] border border-[#eeece4]" style={{ animation: 'yh-pop-in .18s' }} onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-[15px] font-extrabold text-[#2d332f] flex items-center gap-1.5">
                  {dlg.kind === 'prompt' && <span className="material-symbols-outlined text-[18px] text-[#3c6a58]">{dlg.o.icon || 'edit_note'}</span>}
                  {dlg.o.title}
                </h3>
                <button className="w-7 h-7 rounded-full bg-[#f4f3ee] flex items-center justify-center text-[#8e968f]" onClick={() => close(false)}><span className="material-symbols-outlined text-[16px]">close</span></button>
              </div>
              {dlg.kind === 'confirm' && dlg.o.message && <p className="text-[13px] leading-relaxed text-[#656e67] mb-4 whitespace-pre-line">{dlg.o.message}</p>}
              {dlg.kind === 'prompt' && <>
                {dlg.o.label && <label className="block text-[12px] font-bold text-[#656e67] mb-1.5">{dlg.o.label}</label>}
                <input autoFocus type={dlg.o.inputType || 'text'} inputMode={dlg.o.inputType === 'number' ? 'decimal' : undefined} value={val} onChange={e => setVal(e.target.value)} onKeyDown={e => e.key === 'Enter' && close(true)} placeholder={dlg.o.placeholder}
                  className="w-full h-11 px-4 rounded-full border border-[#e3dfd2] bg-[#faf8f2] text-[14px] outline-none focus:border-[#3c6a58] focus:ring-2 focus:ring-[#3c6a58]/15 mb-4" />
              </>}
              <div className="grid grid-cols-2 gap-3">
                <button className="h-10 rounded-full border border-[#e3dfd2] bg-white text-[13px] font-bold text-[#656e67]" onClick={() => close(false)}>{(dlg.o as ConfirmOpts).cancelText || '取消'}</button>
                <button className={`h-10 rounded-full text-[13px] font-bold text-white shadow-[0_6px_16px_rgba(60,106,88,0.22)] ${dlg.kind === 'confirm' && dlg.o.danger ? 'bg-[#e06d63]' : 'bg-[#3c6a58]'}`} onClick={() => close(true)}>{dlg.o.okText || '确认'}</button>
              </div>
            </div>
          </div>
        )}
      </>, document.body)}
    </Ctx.Provider>
  )
}

export function Sheet({ open, onClose, children }: { open: boolean; onClose: () => void; children: ReactNode }) {
  if (!open) return null
  return createPortal(
    <div data-back className="fixed inset-0 z-[80] flex items-end justify-center bg-[#2d332f]/35 backdrop-blur-[2px]" style={{ animation: 'yh-fade-in .15s' }} onClick={onClose}>
      <div className="w-full max-w-md" style={{ animation: 'yh-sheet-in .22s ease-out' }} onClick={e => e.stopPropagation()}>{children}</div>
    </div>, document.body)
}

export function Modal({ open, onClose, children }: { open: boolean; onClose: () => void; children: ReactNode }) {
  if (!open) return null
  return createPortal(
    <div data-back className="fixed inset-0 z-[80] flex items-center justify-center px-5 bg-[#2d332f]/40 backdrop-blur-[2px]" style={{ animation: 'yh-fade-in .15s' }} onClick={onClose}>
      <div className="w-full max-w-sm" style={{ animation: 'yh-pop-in .18s' }} onClick={e => e.stopPropagation()}>{children}</div>
    </div>, document.body)
}
