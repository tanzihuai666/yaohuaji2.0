import { useEffect, useState } from 'react'
import { db } from '../lib/db'
const cache = new Map<string, string>()
const refs = new Map<string, number>()
/** Revoke cached object URLs that no mounted component is using anymore. Safe to call anytime. */
export function pruneImageCache() {
  for (const [key, url] of cache) {
    if (!refs.get(key)) { cache.delete(key); try { URL.revokeObjectURL(url) } catch { /* noop */ } }
  }
}
export function useImageUrl(id?: string, full = false) {
  const key = id ? id + (full ? ':f' : ':t') : ''
  const [url, setUrl] = useState<string | undefined>(key ? cache.get(key) : undefined)
  useEffect(() => {
    let live = true; if (!id) { setUrl(undefined); return }
    refs.set(key, (refs.get(key) || 0) + 1)
    const release = () => {
      const n = (refs.get(key) || 1) - 1
      if (n <= 0) {
        refs.delete(key)
        const u = cache.get(key); cache.delete(key)
        // small delay: smooths quick remounts (StrictMode / list re-render) without leaking
        if (u) setTimeout(() => { try { URL.revokeObjectURL(u) } catch { /* noop */ } }, 8000)
      } else refs.set(key, n)
    }
    const c = cache.get(key); if (c) { setUrl(c); return release }
    db.images.get(id).then(r => {
      if (!r || !live) return
      const u = URL.createObjectURL(full ? r.blob : r.thumb)
      cache.set(key, u); setUrl(u)
    })
    return () => { live = false; release() }
  }, [id, full, key])
  return url
}
export const imageCache = cache
