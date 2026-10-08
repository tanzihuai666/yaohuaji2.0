import { Capacitor } from '@capacitor/core'
const toB64 = (b: Blob) => new Promise<string>((res, rej) => { const r = new FileReader(); r.onload = () => res(String(r.result).split(',')[1]); r.onerror = rej; r.readAsDataURL(b) })
/** Save a blob to app cache and open the system share sheet (native), or download it (web). Returns saved uri. */
export async function shareBlob(blob: Blob, filename: string, title = '妖画集') {
  if (Capacitor.isNativePlatform()) {
    const { Filesystem, Directory } = await import('@capacitor/filesystem'); const { Share } = await import('@capacitor/share')
    const w = await Filesystem.writeFile({ path: filename, data: await toB64(blob), directory: Directory.Cache })
    await Share.share({ title, files: [w.uri], dialogTitle: '保存或分享' }).catch(() => {})
    return w.uri
  }
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = filename; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 2000)
  return filename
}
/** Persist a file into the public Documents folder (native) for backups. */
export async function saveToDocuments(blob: Blob, filename: string) {
  if (!Capacitor.isNativePlatform()) return shareBlob(blob, filename)
  const { Filesystem, Directory } = await import('@capacitor/filesystem')
  try { const w = await Filesystem.writeFile({ path: `妖画集/${filename}`, data: await toB64(blob), directory: Directory.Documents, recursive: true }); return w.uri }
  catch { return shareBlob(blob, filename) }
}
export async function copyText(t: string) { try { await navigator.clipboard.writeText(t); return true } catch { const ta = document.createElement('textarea'); ta.value = t; document.body.appendChild(ta); ta.select(); const ok = document.execCommand('copy'); ta.remove(); return ok } }
