import type { CSSProperties, ReactNode } from 'react'
import body from './bodyStyles.json'
type B = Record<string, { style: Record<string, string>; cls: string }>
/** Wraps a Stitch screen: reproduces its original <body> class + inline style inside a scoped .pg-* container. */
export default function Page({ name, className, style, children }: { name: string; className?: string; style?: CSSProperties; children?: ReactNode }) {
  const b = (body as B)[name]
  return <div className={`pg-${name} ${className ?? b?.cls ?? ''}`} style={{ ...(b?.style as CSSProperties), ...style }}>{children}</div>
}
