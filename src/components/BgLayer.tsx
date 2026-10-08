import { useEffect } from 'react'
import { useImageUrl } from '../hooks/useImage'
import { useSettings } from '../lib/settings'
import { applyTheme } from '../theme/apply'
/** Global theme + custom wallpaper layer (from 主题配色与背景). */
export default function BgLayer() {
  const s = useSettings()
  const url = useImageUrl(s.bgImage, true)
  useEffect(() => { applyTheme(s.theme) }, [s.theme])
  useEffect(() => {
    const h = document.documentElement
    h.classList.toggle('has-custom-bg', !!url); h.classList.toggle('no-dot-grid', !s.dotGrid)
  }, [url, s.dotGrid])
  if (!url) return null
  return <>
    <div className="app-bg-layer" style={{ background: 'rgb(var(--c-paper))' }} />
    <div className="app-bg-layer" style={{ backgroundImage: `url(${url})`, opacity: s.bgOpacity / 100 }} />
    {s.dotGrid && <div className="app-bg-layer" style={{ backgroundImage: 'radial-gradient(#dfdbce 0.85px, transparent 0.85px)', backgroundSize: '16px 16px', opacity: .7 }} />}
  </>
}
