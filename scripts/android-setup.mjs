#!/usr/bin/env node
/**
 * Post-`cap add/sync` Android customisation (runs in CI, idempotent):
 *  - launcher icons / adaptive icon / splash generated from public/icon.svg
 *  - runtime permissions (camera, notifications, exact alarms, media)
 *  - versionName / versionCode from package.json (+ optional VERSION_CODE env)
 *  - release signing from env (YH_KEYSTORE …) with debug-key fallback
 */
import { readFileSync, writeFileSync, existsSync, readdirSync, statSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'
import sharp from 'sharp'

const root = process.cwd()
const app = join(root, 'android/app')
const res = join(app, 'src/main/res')
if (!existsSync(app)) { console.error('android/ not found – run `npx cap add android` first'); process.exit(1) }
const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'))
const svg = readFileSync(join(root, 'public/icon.svg'))
const BG = '#FBF9F1'

// ---------- icons ----------
const frog = Buffer.from(svg.toString().replace(/<rect width="512" height="512"[^>]*\/>/, '').replace(/<g fill="#DCD8CA">[\s\S]*?<\/g>/, ''))
const DENS = { mdpi: 1, hdpi: 1.5, xhdpi: 2, xxhdpi: 3, xxxhdpi: 4 }
for (const [d, k] of Object.entries(DENS)) {
  const dir = join(res, `mipmap-${d}`); mkdirSync(dir, { recursive: true })
  const legacy = Math.round(48 * k), fg = Math.round(108 * k)
  await sharp(svg).resize(legacy, legacy).png().toFile(join(dir, 'ic_launcher.png'))
  const r = legacy / 2; const mask = Buffer.from(`<svg width="${legacy}" height="${legacy}"><circle cx="${r}" cy="${r}" r="${r}"/></svg>`)
  await sharp(svg).resize(legacy, legacy).composite([{ input: mask, blend: 'dest-in' }]).png().toFile(join(dir, 'ic_launcher_round.png'))
  const inner = Math.round(fg * 0.8)
  const f = await sharp(frog).resize(inner, inner).png().toBuffer()
  await sharp({ create: { width: fg, height: fg, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } }).composite([{ input: f, gravity: 'center' }]).png().toFile(join(dir, 'ic_launcher_foreground.png'))
}
mkdirSync(join(res, 'values'), { recursive: true })
writeFileSync(join(res, 'values/ic_launcher_background.xml'), `<?xml version="1.0" encoding="utf-8"?>\n<resources>\n    <color name="ic_launcher_background">${BG}</color>\n</resources>\n`)

// ---------- splash ----------
const walk = dir => readdirSync(dir).flatMap(n => { const p = join(dir, n); return statSync(p).isDirectory() ? walk(p) : [p] })
for (const file of walk(res).filter(p => /drawable[^/]*\/splash\.png$/.test(p))) {
  const { width, height } = await sharp(file).metadata()
  const s = Math.round(Math.min(width, height) * 0.32)
  const f = await sharp(frog).resize(s, s).png().toBuffer()
  await sharp({ create: { width, height, channels: 4, background: BG } }).composite([{ input: f, gravity: 'center' }]).png().toFile(file + '.tmp')
  writeFileSync(file, readFileSync(file + '.tmp')); (await import('node:fs')).unlinkSync(file + '.tmp')
}

// ---------- manifest ----------
const mf = join(app, 'src/main/AndroidManifest.xml')
let m = readFileSync(mf, 'utf8')
const perms = [
  'android.permission.INTERNET', 'android.permission.CAMERA', 'android.permission.POST_NOTIFICATIONS',
  'android.permission.SCHEDULE_EXACT_ALARM', 'android.permission.RECEIVE_BOOT_COMPLETED', 'android.permission.WAKE_LOCK',
  'android.permission.READ_MEDIA_IMAGES',
]
const extra = [
  '<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" android:maxSdkVersion="32" />',
  '<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" android:maxSdkVersion="29" />',
  '<uses-feature android:name="android.hardware.camera" android:required="false" />',
]
const add = [...perms.filter(p => !m.includes(`"${p}"`)).map(p => `<uses-permission android:name="${p}" />`), ...extra.filter(x => !m.includes(x.match(/name="([^"]+)"/)[1] + '"'))]
if (add.length) m = m.replace(/(\s*)<\/manifest>/, `\n    ${add.join('\n    ')}\n</manifest>`)
if (!m.includes('requestLegacyExternalStorage')) m = m.replace('<application', '<application\n        android:requestLegacyExternalStorage="true"')
writeFileSync(mf, m)

// ---------- version + signing ----------
const bg = join(app, 'build.gradle')
let g = readFileSync(bg, 'utf8')
const [ma, mi, pa] = pkg.version.split('.').map(n => parseInt(n, 10) || 0)
const code = Number(process.env.VERSION_CODE) || ma * 10000 + mi * 100 + pa
g = g.replace(/versionCode\s+\d+/, `versionCode ${code}`).replace(/versionName\s+"[^"]*"/, `versionName "${pkg.version}"`)
if (!g.includes('// yaohuaji-signing')) g += `
// yaohuaji-signing
android {
    signingConfigs {
        if (System.getenv("YH_KEYSTORE")) {
            yhRelease {
                storeFile file(System.getenv("YH_KEYSTORE"))
                storePassword System.getenv("YH_KEYSTORE_PASSWORD")
                keyAlias System.getenv("YH_KEY_ALIAS")
                keyPassword System.getenv("YH_KEY_PASSWORD") ?: System.getenv("YH_KEYSTORE_PASSWORD")
            }
        }
    }
    buildTypes {
        release {
            signingConfig System.getenv("YH_KEYSTORE") ? signingConfigs.yhRelease : signingConfigs.debug
        }
    }
}
`
writeFileSync(bg, g)
console.log(`android-setup: v${pkg.version} (${code}), +${add.length} permissions, signing=${process.env.YH_KEYSTORE ? 'release keystore' : 'debug fallback'}`)
