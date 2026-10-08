import base from './baseTokens.json'
import brandHex from './brandHex.json'
import { PALETTES } from './palettes'

type HSL = [number, number, number]
const ch2rgb = (s: string) => s.split(' ').map(Number) as [number, number, number]
const hex2rgb = (h: string) => { const n = parseInt(h.slice(1), 16); return [n >> 16 & 255, n >> 8 & 255, n & 255] as [number, number, number] }
function rgb2hsl([r, g, b]: number[]): HSL {
  r /= 255; g /= 255; b /= 255; const mx = Math.max(r, g, b), mn = Math.min(r, g, b); let h = 0, s = 0; const l = (mx + mn) / 2
  if (mx !== mn) { const d = mx - mn; s = l > .5 ? d / (2 - mx - mn) : d / (mx + mn); h = mx === r ? (g - b) / d + (g < b ? 6 : 0) : mx === g ? (b - r) / d + 2 : (r - g) / d + 4; h *= 60 }
  return [h, s, l]
}
function hsl2rgb([h, s, l]: HSL) {
  const k = (n: number) => (n + h / 30) % 12, a = s * Math.min(l, 1 - l)
  const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))
  return [f(0), f(8), f(4)].map(v => Math.round(v * 255))
}
const BASE_PRIMARY = rgb2hsl(hex2rgb('#3C6A58'))
/** A token belongs to the "brand" family when its hue sits in the sage/green band. */
const isBrand = (hsl: HSL) => hsl[0] >= 85 && hsl[0] <= 175 && hsl[1] > 0.04

function mapColor(ch: string, target: HSL): string {
  const hsl = rgb2hsl(ch2rgb(ch)); if (!isBrand(hsl)) return ch
  const sScale = BASE_PRIMARY[1] ? target[1] / BASE_PRIMARY[1] : 1
  let l = hsl[2]
  if (l < 0.62) l = Math.max(0.1, Math.min(0.62, l + (target[2] - BASE_PRIMARY[2])))
  const out = hsl2rgb([target[0], Math.min(1, hsl[1] * sScale), l])
  return out.join(' ')
}

const STYLE_ID = 'yh-theme'
/** Canvas/background token names: these follow the palette's light tint so the whole
 *  page background changes together with the theme (previously only brand accents moved). */
const BG_KEYS = ['--c-paper', '--c-background', '--c-surface', '--c-page', '--c-parchment', '--c-paper-cream', '--c-surface-bright', '--c-sage-50', '--c-banner-bg']
type Decl = { sel: string; prop: string; val: string; imp: string }
let scanned: Decl[] | null = null
const COLOR_RE = /#([0-9a-f]{6}|[0-9a-f]{3})\b|rgba?\(\s*(\d+)[ ,]+(\d+)[ ,]+(\d+)\s*(?:[,/]\s*([^)]+))?\)/gi
const toCh = (m: RegExpExecArray): string | null => {
  if (m[1]) { const h = m[1].length === 3 ? m[1].split('').map(c => c + c).join('') : m[1]; return hex2rgb('#' + h).join(' ') }
  return `${m[2]} ${m[3]} ${m[4]}`
}
/** Collect every compiled CSS declaration that hard-codes a sage/green brand colour (Tailwind arbitrary values, page <style>s). */
function scan(): Decl[] {
  const out: Decl[] = []
  const walk = (rules: CSSRuleList) => {
    for (const r of Array.from(rules)) {
      if (r instanceof CSSStyleRule) {
        for (const prop of Array.from(r.style)) {
          const val = r.style.getPropertyValue(prop); if (!val || val.includes('var(--c-')) continue
          COLOR_RE.lastIndex = 0; let m: RegExpExecArray | null; let hit = false
          while ((m = COLOR_RE.exec(val))) { const ch = toCh(m); if (ch && isBrand(rgb2hsl(ch2rgb(ch)))) { hit = true; break } }
          if (hit) out.push({ sel: r.selectorText, prop, val, imp: r.style.getPropertyPriority(prop) })
        }
      } else if ('cssRules' in r && (r as CSSGroupingRule).cssRules) walk((r as CSSGroupingRule).cssRules)
    }
  }
  for (const sh of Array.from(document.styleSheets)) {
    if ((sh.ownerNode as HTMLElement | null)?.id === STYLE_ID) continue
    try { walk(sh.cssRules) } catch { /* cross-origin */ }
  }
  return out
}
function literalOverrides(target: HSL) {
  if (!scanned || !scanned.length) scanned = scan()
  return scanned.map(d => {
    const v = d.val.replace(COLOR_RE, (...a) => {
      const m = a as unknown as RegExpExecArray; const ch = toCh(m); if (!ch) return a[0]
      const mapped = mapColor(ch, target); if (mapped === ch) return a[0]
      return m[5] ? `rgb(${mapped} / ${m[5].trim()})` : `rgb(${mapped})`
    })
    return `${d.sel}{${d.prop}:${v}${d.imp ? ' !important' : ''}}`
  }).join('\n')
}
export function applyTheme(paletteId: string) {
  let el = document.getElementById(STYLE_ID) as HTMLStyleElement | null
  if (!el) { el = document.createElement('style'); el.id = STYLE_ID; document.head.appendChild(el) }
  const p = PALETTES.find(x => x.id === paletteId)
  if (!p || p.id === 'paper') { el.textContent = ''; document.documentElement.dataset.theme = 'paper'; return }
  const target = rgb2hsl(hex2rgb(p.colors[0]))
  const tint = hex2rgb(p.colors[2]).join(' ') // palette light tint -> page backgrounds
  const mapVar = (k: string, v: string) => BG_KEYS.includes(k) ? tint : mapColor(v, target)
  const rootVars = Object.entries(base.root as Record<string, string>).map(([k, v]) => `${k}:${mapVar(k, v)}`).join(';')
  let css = `:root{${rootVars}}\n`
  for (const [pg, vars] of Object.entries(base.perPage as Record<string, Record<string, string>>))
    css += `.pg-${pg}{${Object.entries(vars).map(([k, v]) => `${k}:${mapVar(k, v)}`).join(';')}}\n`
  css += `:root{${Object.entries(brandHex as Record<string, string>).map(([k, v]) => `${k}:${mapColor(v, target)}`).join(';')}}\n`
  // literal hex colors used directly in markup (bottom nav pill, buttons) follow the theme too
  const [r, g, b] = hex2rgb(p.colors[0]); const lt = hsl2rgb([target[0], Math.min(1, target[1] * 0.35), 0.91])
  css += `:root{--yh-primary:${r} ${g} ${b};--yh-primary-light:${lt.join(' ')}}\n`
  css += `body{background-color:rgb(${tint})}\n` // index.css hardcodes body bg; keep it in sync
  css += literalOverrides(target)
  el.textContent = css; document.documentElement.dataset.theme = p.id
}
