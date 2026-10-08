import JSZip from 'jszip'
import { db, TABLES } from './db'
import { imageCache } from '../hooks/useImage'

const DATA_TABLES = TABLES.filter(t => t !== 'images')
const ext = (type: string) => (type.includes('png') ? 'png' : type.includes('webp') ? 'webp' : type.includes('gif') ? 'gif' : 'jpg')
const jsonSize = (v: unknown) => new Blob([JSON.stringify(v)]).size

export async function usage() {
  const imgs = await db.images.toArray()
  const imgBytes = imgs.reduce((s, i) => s + (i.blob?.size || 0) + (i.thumb?.size || 0), 0)
  let data = 0
  for (const t of DATA_TABLES.filter(t => t !== 'kv')) data += jsonSize(await db.table(t).toArray())
  const kvRows = await db.kv.toArray(); const conf = jsonSize(kvRows)
  const refs = await referencedImages(); const orphans = imgs.filter(i => !refs.has(i.id))
  return { images: imgBytes, imageCount: imgs.length, data, conf, total: imgBytes + data + conf, orphanBytes: orphans.reduce((s, i) => s + i.blob.size + i.thumb.size, 0), orphanIds: orphans.map(i => i.id) }
}

export async function referencedImages() {
  const s = new Set<string>(); const add = (...ids: (string | undefined)[]) => ids.forEach(i => i && s.add(i))
  ;(await db.orders.toArray()).forEach(o => add(...o.refImages, ...o.deliverImages))
  ;(await db.characters.toArray()).forEach(c => add(c.avatar, ...c.refImages))
  ;(await db.records.toArray()).forEach(r => add(...r.images))
  ;(await db.folders.toArray()).forEach(f => add(f.cover))
  ;(await db.artworks.toArray()).forEach(a => add(a.image))
  ;(await db.prices.toArray()).forEach(p => add(...p.samples))
  for (const k of await db.kv.toArray()) {
    const v = k.value as Record<string, unknown> | null
    if (v && typeof v === 'object') { add(v.avatar as string, v.bgImage as string); if (Array.isArray(v.refImages)) add(...(v.refImages as string[])) }
  }
  return s
}

/** Remove images no longer referenced by any record and drop in-memory object URLs. */
export async function cleanCache() {
  const { orphanIds, orphanBytes } = await usage()
  if (orphanIds.length) await db.images.bulkDelete(orphanIds)
  imageCache.forEach(u => URL.revokeObjectURL(u)); imageCache.clear()
  try {
    const { Capacitor } = await import('@capacitor/core').then(m => m)
    if (Capacitor.isNativePlatform()) {
      const { Filesystem, Directory } = await import('@capacitor/filesystem')
      const r = await Filesystem.readdir({ path: '', directory: Directory.Cache })
      for (const f of r.files) await Filesystem.deleteFile({ path: f.name, directory: Directory.Cache }).catch(() => {})
    }
  } catch { /* ignore */ }
  return { count: orphanIds.length, bytes: orphanBytes }
}

export async function exportZip(onProgress?: (p: number) => void) {
  const zip = new JSZip()
  const data: Record<string, unknown> = { app: 'yaohuaji2', version: 1, exportedAt: new Date().toISOString() }
  for (const t of DATA_TABLES) data[t] = await db.table(t).toArray()
  const imgs = await db.images.toArray(); const meta: unknown[] = []
  imgs.forEach((im, i) => {
    const e = ext(im.blob.type); zip.file(`images/${im.id}.${e}`, im.blob); zip.file(`thumbs/${im.id}.jpg`, im.thumb)
    meta.push({ id: im.id, w: im.w, h: im.h, size: im.size, name: im.name, createdAt: im.createdAt, file: `images/${im.id}.${e}`, type: im.blob.type }); onProgress?.(((i + 1) / Math.max(1, imgs.length)) * 0.5)
  })
  data.images = meta
  zip.file('data.json', JSON.stringify(data))
  return zip.generateAsync({ type: 'blob', compression: 'STORE', streamFiles: true }, m => onProgress?.(0.5 + m.percent / 200))
}

/** Merge a backup ZIP into the local database without overwriting existing rows. */
export async function importZip(file: Blob, onProgress?: (p: number) => void) {
  const zip = await JSZip.loadAsync(file)
  const dj = zip.file('data.json'); if (!dj) throw new Error('不是有效的妖画集备份文件')
  const data = JSON.parse(await dj.async('string'))
  if (data.app !== 'yaohuaji2') throw new Error('备份文件格式不匹配')
  let added = 0
  const metas = (data.images || []) as { id: string; w: number; h: number; size: number; name: string; createdAt: number; file: string; type: string }[]
  const have = new Set((await db.images.toCollection().primaryKeys()) as string[])
  for (let i = 0; i < metas.length; i++) {
    const m = metas[i]; if (have.has(m.id)) continue
    const f = zip.file(m.file); if (!f) continue
    const blob = new Blob([await f.async('arraybuffer')], { type: m.type || 'image/jpeg' })
    const t = zip.file(`thumbs/${m.id}.jpg`); const thumb = t ? new Blob([await t.async('arraybuffer')], { type: 'image/jpeg' }) : blob
    await db.images.add({ id: m.id, blob, thumb, w: m.w, h: m.h, size: m.size, name: m.name, createdAt: m.createdAt }); added++
    onProgress?.(((i + 1) / Math.max(1, metas.length)) * 0.8)
  }
  for (const t of DATA_TABLES) {
    const rows = (data[t] || []) as Record<string, unknown>[]; if (!rows.length) continue
    const tb = db.table(t); const pk = t === 'kv' ? 'key' : 'id'
    const exist = new Set((await tb.toCollection().primaryKeys()) as string[])
    const fresh = rows.filter(r => !exist.has(r[pk] as string)); if (fresh.length) { await tb.bulkAdd(fresh); added += fresh.length }
  }
  onProgress?.(1)
  return added
}

export async function wipeAll() {
  await db.transaction('rw', TABLES.map(t => db.table(t)), async () => { for (const t of TABLES) await db.table(t).clear() })
  imageCache.forEach(u => URL.revokeObjectURL(u)); imageCache.clear()
  try { const { LocalNotifications } = await import('@capacitor/local-notifications'); const p = await LocalNotifications.getPending(); if (p.notifications.length) await LocalNotifications.cancel({ notifications: p.notifications.map(n => ({ id: n.id })) }) } catch { /* web */ }
}
