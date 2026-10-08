import type { ImgHTMLAttributes, ReactNode } from 'react'
import { useImageUrl } from '../hooks/useImage'
type P = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> & { id?: string; full?: boolean; fallback?: ReactNode }
export default function Img({ id, full, fallback = null, ...rest }: P) {
  const url = useImageUrl(id, full)
  if (!id) return <>{fallback}</>
  return url ? <img {...rest} src={url} draggable={false} /> : <div className={rest.className} style={{ ...rest.style, background: '#efeee8' }} />
}
