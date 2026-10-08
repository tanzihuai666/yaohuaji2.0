import { db, uid, type ImageRec } from './db'
import { Capacitor } from '@capacitor/core'

const loadBitmap = (blob: Blob, timeoutMs = 30000) => new Promise<HTMLImageElement>((res, rej) => {
  const url = URL.createObjectURL(blob); const img = new Image()
  const done = (fn: () => void) => { clearTimeout(timer); fn() }
  const timer = setTimeout(() => done(() => { URL.revokeObjectURL(url); rej(new Error('decode timeout')) }), timeoutMs)
  img.onload = () => done(() => { res(img); setTimeout(() => URL.revokeObjectURL(url), 1000) })
  img.onerror = () => done(() => { URL.revokeObjectURL(url); rej(new Error('decode failed')) })
  img.src = url
})
async function resize(img: HTMLImageElement, max: number, q: number, type = 'image/jpeg'): Promise<Blob> {
  const s = Math.min(1, max / Math.max(img.naturalWidth, img.naturalHeight))
  const c = document.createElement('canvas'); c.width = Math.round(img.naturalWidth * s); c.height = Math.round(img.naturalHeight * s)
  const ctx = c.getContext('2d')!; ctx.drawImage(img, 0, 0, c.width, c.height)
  return new Promise<Blob>((res, rej) => c.toBlob(b => b ? res(b) : rej(new Error('encode failed')), type, q))
}
/** Store original (kept full-res unless huge) + thumbnail. Returns image id. */
export async function saveImage(file: Blob, name = 'image'): Promise<string> {
  const img = await loadBitmap(file)
  const big = Math.max(img.naturalWidth, img.naturalHeight) > 4096 || file.size > 12 * 1024 * 1024
  const blob = big ? await resize(img, 4096, 0.92) : file
  const thumb = await resize(img, 480, 0.8)
  const rec: ImageRec = { id: uid(), blob, thumb, w: img.naturalWidth, h: img.naturalHeight, size: blob.size, name, createdAt: Date.now() }
  await db.images.put(rec); return rec.id
}
export async function saveFiles(files: FileList | File[] | null): Promise<string[]> {
  if (!files) return []; const out: string[] = []; let failed = 0
  for (const f of Array.from(files)) {
    if (f.type.startsWith('image/') || /\.(png|jpe?g|webp|gif|heic)$/i.test(f.name)) {
      try { out.push(await saveImage(f, f.name)) } catch { failed++ }
    }
  }
  if (failed > 0 && out.length === 0) throw new Error('image decode failed')
  return out
}
export function pickFiles(multiple = true, accept = 'image/*'): Promise<File[]> {
  return new Promise(res => {
    const i = document.createElement('input'); i.type = 'file'; i.accept = accept; i.multiple = multiple
    i.onchange = () => res(Array.from(i.files || [])); i.click()
  })
}
export async function pickImages(multiple = true) { return saveFiles(await pickFiles(multiple)) }
export async function takePhoto(): Promise<string | null> {
  if (Capacitor.isNativePlatform()) {
    const { Camera, CameraResultType, CameraSource } = await import('@capacitor/camera')
    try {
      const p = await Camera.getPhoto({ resultType: CameraResultType.Uri, source: CameraSource.Camera, quality: 92 })
      const blob = await (await fetch(p.webPath!)).blob(); return saveImage(blob, `photo-${Date.now()}.${p.format}`)
    } catch { return null }
  }
  const f = await new Promise<File[]>(res => { const i = document.createElement('input'); i.type = 'file'; i.accept = 'image/*'; i.setAttribute('capture', 'environment'); i.onchange = () => res(Array.from(i.files || [])); i.click() })
  return f[0] ? saveImage(f[0], f[0].name) : null
}
export async function deleteImages(ids: (string | undefined)[]) { const v = ids.filter(Boolean) as string[]; if (v.length) await db.images.bulkDelete(v) }
/** Pick + save images, but never throws: decode/save failures surface as a toast
 *  instead of a silent no-op (user taps, picks a photo, nothing happens). */
export async function pickImagesSafe(multiple = true, toast?: (m: string) => void): Promise<string[]> {
  try { return await pickImages(multiple) }
  catch { toast?.('图片读取失败，请换一张照片试试'); return [] }
}
