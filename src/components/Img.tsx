import type { ImgHTMLAttributes, ReactNode } from 'react'
import { useImageUrl } from '../hooks/useImage'
type P = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> & { id?: string; full?: boolean; preview?: string; fallback?: ReactNode }
export default function Img({ id, full, preview, fallback = null, ...rest }: P) {
  const url = useImageUrl(id, full)
  const src = preview || url
  if (!id && !preview) return <>{fallback}</>
  return src ? <img {...rest} src={src} draggable={false} /> : <div className={rest.className} style={{ ...rest.style, background: '#efeee8' }} />
}
