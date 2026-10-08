export const WEEK = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
export const pad = (n: number) => String(n).padStart(2, '0')
export const today = () => toISO(new Date())
export const toISO = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
export const parseISO = (s: string) => { const [y, m, d] = s.split('-').map(Number); return new Date(y, (m || 1) - 1, d || 1) }
export const cnDate = (s?: string) => { if (!s) return '未设置'; const d = parseISO(s); return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日` }
export const mdDate = (s?: string) => (s ? s.slice(5).replace('-', '-') : '')
export const daysLeft = (s?: string) => { if (!s) return Infinity; const a = parseISO(s).getTime(); const b = parseISO(today()).getTime(); return Math.round((a - b) / 86400000) }
export const yuan = (n: number) => '¥' + (Number.isInteger(n) ? n.toLocaleString('en-US') : n.toLocaleString('en-US', { maximumFractionDigits: 2 }))
export const bytes = (n: number) => n < 1024 ? `${n} B` : n < 1048576 ? `${(n / 1024).toFixed(1)} KB` : n < 1073741824 ? `${(n / 1048576).toFixed(1)} MB` : `${(n / 1073741824).toFixed(2)} GB`
export const ymKey = (s: string) => s.slice(0, 7)
