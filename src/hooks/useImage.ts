import { useEffect, useState } from 'react'
import { db } from '../lib/db'
const cache = new Map<string, string>()
export function useImageUrl(id?: string, full = false) {
  const key = id ? id + (full ? ':f' : ':t') : ''
  const [url, setUrl] = useState<string | undefined>(key ? cache.get(key) : undefined)
  useEffect(() => {
    let live = true; if (!id) { setUrl(undefined); return }
    const c = cache.get(key); if (c) { setUrl(c); return }
    db.images.get(id).then(r => { if (!r || !live) return; const u = URL.createObjectURL(full ? r.blob : r.thumb); cache.set(key, u); setUrl(u) })
    return () => { live = false }
  }, [id, full, key])
  return url
}
export const imageCache = cache
