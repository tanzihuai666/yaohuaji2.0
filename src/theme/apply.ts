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
/** 暗色毛玻璃主题（冰晶琉璃）：深色底 + 文字反白 + 卡片亚克力化。
 * 浅色主题走 HSL 色相偏移；暗色主题需要独立分支——底色、文字、卡片质感全换。
 * 策略：CSS 变量覆盖文字/强调色（自动全局生效）+ 玻璃拟态规则处理卡片底。 */
function darkGlassCSS(p: { colors: [string, string, string] }): string {
  const T = 'html[data-theme="glassdark"]'
  const [pr, pg, pb] = hex2rgb(p.colors[0]) // 品牌青 #3A7D69
  const css: string[] = []
  // 1. 深色底（取自 Stitch 设计稿）+ 页面透明
  css.push(`${T}{background:rgb(13,14,18) !important}`)
  css.push(`${T} body{background:radial-gradient(120% 120% at 50% 10%, rgb(47,53,66) 0%, rgb(26,28,35) 50%, rgb(13,14,18) 100%) fixed !important;color:#fff}`)
  css.push(`${T} [class^="pg-"],${T} [class*=" pg-"],${T} [class*="bg-dotted-journal"]{background-color:transparent !important;background-image:none !important}`)
  // 2. CSS 变量覆盖：文字反白、强调色变青（所有用变量的类自动跟随）
  css.push(`${T}{--c-on-surface:255 255 255;--c-on-surface-variant:200 205 200;--c-text-main:255 255 255;--c-text-muted:190 195 190;--c-text-sub:170 178 170;--c-charcoal-title:255 255 255;--c-darkCharcoal:255 255 255;--c-textGray:190 195 190;--c-on-background:255 255 255;--c-primary:${pr} ${pg} ${pb};--c-theme-primary:${pr} ${pg} ${pb};--c-accentGreen:${pr} ${pg} ${pb};--c-sage-primary:${pr} ${pg} ${pb};--yh-primary:${pr} ${pg} ${pb};--yh-primary-light:58 125 105;--c-outline-variant:255 255 255;--c-outline:200 205 200}`)
  // 3. 卡片亚克力化：浅色底 -> 半透明白 + blur（变量类 + 白底类 + 浅色 hex 全系 + 自定义卡片类）
  const glassSel = [
    `${T} [class*="bg-surface"]`, `${T} [class*="bg-cardBg"]`, `${T} [class*="bg-white"]`,
    `${T} [class*="bg-[#f" i]`, `${T} [class*="bg-[#e" i]:not([class*="bg-[#e06d63" i])`,
    `${T} [class*="bg-[#d" i]`, `${T} [class*="bg-[#c" i]`,
    `${T} .journal-card`,
  ].join(',')
  css.push(`${glassSel}{background-color:rgba(255,255,255,0.12) !important;backdrop-filter:blur(20px) saturate(160%) !important;-webkit-backdrop-filter:blur(20px) saturate(160%) !important;border-color:rgba(255,255,255,0.22) !important;box-shadow:0 8px 28px rgba(0,0,0,0.28), inset 0 1px 1px rgba(255,255,255,0.25) !important}`)
  // 4. 品牌绿实心按钮 -> 青色
  const brandSel = [
    `${T} [class*="bg-[#3c6a58" i]`, `${T} [class*="bg-[#3C6A58" i]`,
    `${T} [class*="bg-[#3e6b57" i]`, `${T} [class*="bg-[#4f725f" i]`,
    `${T} [class*="bg-[#4F725F" i]`, `${T} [class*="bg-[#436a5b" i]`,
    `${T} [class*="bg-[#426a5a" i]`, `${T} [class*="bg-[#345b49" i]`,
    `${T} [class*="bg-[#235241" i]`,
  ].join(',')
  css.push(`${brandSel}{background-color:rgb(${pr},${pg},${pb}) !important}`)
  // 5. 硬编码深色文字（非变量类）-> 白；次级 -> 白 65%
  css.push(`${T} [class*="text-stone-900"],${T} [class*="text-stone-800"],${T} [class*="text-stone-700"],${T} [class*="text-[#2d332f" i],${T} [class*="text-[#213028" i],${T} [class*="text-[#2a2e2b" i],${T} [class*="text-[#2f3430" i],${T} [class*="text-[#303d36" i],${T} [class*="text-[#3b4943" i]{color:#fff !important}`)
  css.push(`${T} [class*="text-stone-600"],${T} [class*="text-stone-500"],${T} [class*="text-stone-400"],${T} [class*="text-[#656e67" i],${T} [class*="text-[#7c9487" i],${T} [class*="text-[#889d92" i],${T} [class*="text-[#556b5e" i],${T} [class*="text-[#6b7a6e" i],${T} [class*="text-[#557766" i],${T} [class*="text-[#6b726d" i],${T} [class*="text-[#537363" i],${T} [class*="text-[#5f6f67" i],${T} [class*="text-[#91a098" i]{color:rgba(255,255,255,0.65) !important}`)
  css.push(`${T} [class*="text-[#3c6a58" i],${T} [class*="text-[#3C6A58" i],${T} [class*="text-[#3e6b57" i],${T} [class*="text-[#4f725f" i],${T} [class*="text-[#4F725F" i],${T} [class*="text-[#4b6f5a" i],${T} [class*="text-[#4B6F5A" i]{color:rgb(127,181,163) !important}`)
  // 6. 输入框
  css.push(`${T} input,${T} textarea,${T} select{background-color:rgba(255,255,255,0.1) !important;color:#fff !important;border-color:rgba(255,255,255,0.2) !important}`)
  css.push(`${T} input::placeholder,${T} textarea::placeholder{color:rgba(255,255,255,0.4) !important}`)
  // 7. 样式表里写死的品牌绿 -> 青色（复用扫描机制）
  css.push(literalOverrides(rgb2hsl(hex2rgb(p.colors[0]))))
  return css.join('\n')
}
export function applyTheme(paletteId: string) {
  let el = document.getElementById(STYLE_ID) as HTMLStyleElement | null
  if (!el) { el = document.createElement('style'); el.id = STYLE_ID; document.head.appendChild(el) }
  const p = PALETTES.find(x => x.id === paletteId)
  if (!p || p.id === 'paper') { el.textContent = ''; document.documentElement.dataset.theme = 'paper'; return }
  if (p.dark) { el.textContent = darkGlassCSS(p); document.documentElement.dataset.theme = p.id; return }
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
