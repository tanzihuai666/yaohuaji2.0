import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Page from '../components/Page'
import { useUI } from '../components/ui'
import { cleanCache, exportZip, importZip, usage, wipeAll } from '../lib/backup'
import { pickFiles } from '../lib/images'
import { saveSettings, useSettings } from '../lib/settings'
import { saveToDocuments, shareBlob } from '../lib/share'
import { bytes, pad, today } from '../lib/format'

type U = Awaited<ReturnType<typeof usage>>
const fmtTime = (t?: number) => { if (!t) return '尚未备份'; const d = new Date(t); return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}` }

export default function Storage() {
  const nav = useNavigate(); const ui = useUI(); const s = useSettings()
  const [u, setU] = useState<U | null>(null); const [busy, setBusy] = useState<string | null>(null); const [pct, setPct] = useState(0)
  const refresh = async (toast = false) => { setU(await usage()); if (toast) ui.toast('已成功刷新存储统计') }
  useEffect(() => { refresh() }, []) // eslint-disable-line react-hooks/exhaustive-deps
  const total = u?.total || 0
  const parts = u ? [
    { l: '画库原图与作品', v: u.images, c: 'bg-primary-container' },
    { l: '设子档案与约稿数据', v: u.data, c: 'bg-secondary-container' },
    { l: '自定义配置与主题手账贴', v: u.conf, c: 'bg-tertiary-fixed-dim' },
  ] : []
  const p = (v: number) => (total ? Math.round((v / total) * 100) : 0)
  const [num, unit] = bytes(total).split(' ')

  const doExport = async (share: boolean) => {
    setBusy('export'); setPct(0)
    try {
      const blob = await exportZip(setPct); const name = `妖画集备份_${today()}_${Date.now().toString().slice(-6)}.zip`
      if (share) await shareBlob(blob, name, '妖画集备份'); else { const uri = await saveToDocuments(blob, name); ui.toast(uri.startsWith('file') ? '已保存到 文档/妖画集' : '备份已导出') }
      await saveSettings({ lastBackup: Date.now() })
    } catch (e) { ui.toast('导出失败：' + (e as Error).message) } finally { setBusy(null) }
  }
  const doImport = async () => {
    const [f] = await pickFiles(false, '.zip,application/zip,application/x-zip-compressed'); if (!f) return
    if (!(await ui.confirm({ title: '导入备份？', message: `将把「${f.name}」中的数据合并到本机，已有数据不会被覆盖。` , okText: '开始导入' }))) return
    setBusy('import'); setPct(0)
    try { const n = await importZip(f, setPct); ui.toast(n ? `导入完成，新增 ${n} 条数据` : '没有需要导入的新数据'); refresh() } catch (e) { ui.toast('导入失败：' + (e as Error).message) } finally { setBusy(null) }
  }
  const doClean = async () => { setBusy('clean'); const r = await cleanCache(); setBusy(null); ui.toast(r.count ? `已清理 ${r.count} 张无引用图片，释放 ${bytes(r.bytes)}` : '缓存已清理，无需释放'); refresh() }
  const doReset = async () => {
    if (!(await ui.confirm({ title: '清空全部数据？', message: '所有稿单、角色、画作、账目及设置将被永久删除，无法恢复。', okText: '继续', danger: true }))) return
    const v = await ui.prompt({ title: '二次确认', label: '请输入「确认清空」以继续', placeholder: '确认清空', icon: 'warning' })
    if (v !== '确认清空') return ui.toast('已取消')
    await wipeAll(); localStorage.clear(); sessionStorage.clear(); ui.toast('本机数据已全部清空'); setTimeout(() => { location.hash = '#/'; location.reload() }, 600)
  }

  return (
    <Page name="Storage">
      <div className="max-w-md mx-auto min-h-screen relative flex flex-col">
        <header className="sticky top-0 z-40 bg-surface/90 backdrop-blur-md px-margin py-3 pt-[calc(var(--sat)+12px)] flex items-center justify-between border-b border-surface-container-high/60 transition-all">
          <button aria-label="返回" onClick={() => nav(-1)} className="w-10 h-10 rounded-full bg-surface-container-lowest flex items-center justify-center text-primary shadow-sm stamp-press border border-surface-container-high focus:outline-none"><span className="material-symbols-outlined text-[20px]">arrow_back_ios_new</span></button>
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-primary-container" /><h1 className="font-headline-md text-headline-md text-on-surface tracking-tight">存储与备份管理</h1></div>
            <span className="font-label-md text-label-md text-outline">妖画集 · 本地手账离线仓库</span>
          </div>
          <button onClick={() => refresh(true)} className="w-10 h-10 rounded-full bg-surface-container-lowest flex items-center justify-center text-primary shadow-sm stamp-press border border-surface-container-high focus:outline-none" title="重新计算存储占用"><span className="material-symbols-outlined text-[22px]">sync</span></button>
        </header>
        <main className="flex-1 px-margin py-space-lg space-y-space-lg">
          <section className="bg-surface-container-lowest rounded-[1.25rem] p-5 paper-shadow border border-surface-container relative overflow-hidden">
            <div className="absolute -top-1.5 right-8 w-16 h-5 bg-tertiary-container/30 rotate-2 rounded-sm pointer-events-none border border-tertiary/20" />
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-1.5 text-primary mb-1"><span className="material-symbols-outlined text-[18px]">inventory_2</span><span className="font-label-lg text-label-lg">存储概况</span></div>
                <div className="flex items-baseline gap-1.5 mt-0.5"><span className="font-stat-counter text-stat-counter text-primary tracking-tight">{u ? num : '…'}</span><span className="font-headline-md text-headline-md text-primary">{u ? unit : ''}</span></div>
                <p className="font-body-md text-body-md text-outline mt-0.5">本地已用空间 · {u?.imageCount ?? 0} 张图片</p>
              </div>
              <div className="w-14 h-14 rounded-full bg-surface-container-low border border-surface-container-high flex flex-col items-center justify-center p-1 text-center rotate-3"><span className="material-symbols-outlined text-primary-container text-[18px]">eco</span><span className="font-label-md text-[10px] text-on-surface-variant leading-tight">安全无云</span></div>
            </div>
            <div className="mt-5">
              <div className="h-3.5 w-full bg-surface-container-high rounded-full overflow-hidden flex p-0.5 gap-0.5">
                {parts.map((x, i) => x.v > 0 && <div key={x.l} className={`h-full ${x.c} transition-all duration-500 ${i === 0 ? 'rounded-l-full' : ''} ${i === 2 ? 'rounded-r-full' : ''}`} style={{ width: `${Math.max(2, p(x.v))}%` }} title={x.l} />)}
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-surface-container-high/60 space-y-2.5">
              {parts.map(x => (
                <div key={x.l} className="flex items-center justify-between font-body-md text-body-md">
                  <div className="flex items-center gap-2"><span className={`w-2.5 h-2.5 rounded-full ${x.c}`} /><span className="text-on-surface font-label-lg text-label-lg">{x.l}</span></div>
                  <div className="flex items-center gap-2"><span className="text-outline">{p(x.v)}%</span><span className="font-label-lg text-label-lg text-on-surface">{bytes(x.v)}</span></div>
                </div>
              ))}
            </div>
            <div className="mt-3.5 bg-surface-container-low/70 rounded-2xl px-3 py-2 flex items-center justify-between text-outline">
              <div className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[16px] text-primary">verified_user</span><span className="font-label-md text-label-md">沙盒独立存储，卸载前请务必备份</span></div>
              <span className="font-label-md text-label-md bg-surface-container-highest px-2 py-0.5 rounded-full text-on-surface-variant">IndexedDB</span>
            </div>
          </section>

          <section className="bg-surface-container-lowest rounded-[1.25rem] p-5 paper-shadow border border-surface-container relative">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2"><div className="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center text-primary-container"><span className="material-symbols-outlined text-[20px]">folder_zip</span></div><h2 className="font-headline-md text-headline-md text-on-surface">ZIP 离线完整打包备份</h2></div>
              <span className="font-label-md text-label-md text-primary bg-primary-fixed/40 px-2.5 py-0.5 rounded-full border border-primary/20 flex-shrink-0">无损导出</span>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-4">一键将所有画作原图、设子档案、稿单及账目打包导出至手机「文档/妖画集」目录，或通过系统分享发送到网盘/聊天。</p>
            <div className="space-y-3">
              <div className="flex gap-2">
                <button disabled={!!busy} onClick={() => doExport(false)} className="flex-1 h-12 bg-primary-container hover:bg-primary text-on-primary rounded-2xl font-label-lg text-label-lg flex items-center justify-center gap-2 stamp-press shadow-sm transition-all focus:outline-none disabled:opacity-70">
                  <span className={`material-symbols-outlined text-[20px] ${busy === 'export' ? 'animate-spin' : ''}`}>{busy === 'export' ? 'progress_activity' : 'download'}</span>
                  <span>{busy === 'export' ? `正在打包 ${Math.round(pct * 100)}%` : '打包导出备份 ZIP'}</span>
                </button>
                <button disabled={!!busy} aria-label="分享备份" onClick={() => doExport(true)} className="w-12 h-12 rounded-2xl bg-primary-fixed text-primary flex items-center justify-center stamp-press disabled:opacity-60"><span className="material-symbols-outlined text-[20px]">share</span></button>
              </div>
              <button disabled={!!busy} onClick={doImport} className="w-full h-12 bg-surface-container-lowest sticker-dashed-border text-primary hover:bg-surface-container-low rounded-2xl font-label-lg text-label-lg flex items-center justify-center gap-2 stamp-press transition-all focus:outline-none disabled:opacity-60">
                <span className={`material-symbols-outlined text-[20px] ${busy === 'import' ? 'animate-spin' : ''}`}>{busy === 'import' ? 'progress_activity' : 'drive_folder_upload'}</span>
                <span>{busy === 'import' ? `正在导入 ${Math.round(pct * 100)}%` : '导入 ZIP 备份合并 (不覆盖已有数据)'}</span>
              </button>
            </div>
            <div className="mt-4 flex items-center justify-center">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-surface-container-low rounded-full border border-surface-container">
                <span className="material-symbols-outlined text-[15px] text-primary">schedule</span>
                <span className="font-label-md text-label-md text-outline">上次备份时间：{fmtTime(s.lastBackup)}</span>
                <span className={`w-1.5 h-1.5 rounded-full ${s.lastBackup ? 'bg-primary' : 'bg-secondary'}`} />
              </div>
            </div>
          </section>

          <section className="bg-surface-container-lowest rounded-[1.25rem] p-5 paper-shadow border border-surface-container">
            <div className="flex items-center gap-2 mb-3"><div className="w-8 h-8 rounded-full bg-tertiary-fixed flex items-center justify-center text-on-tertiary-container"><span className="material-symbols-outlined text-[20px]">mop</span></div><h2 className="font-headline-md text-headline-md text-on-surface">临时缓存管理</h2></div>
            <div className="bg-surface-container-low/60 rounded-2xl p-3.5 flex items-center justify-between border border-surface-container">
              <div className="pr-2">
                <div className="font-label-lg text-label-lg text-on-surface">清理临时缩略图缓存</div>
                <div className="font-body-md text-body-md text-outline mt-0.5">释放约 <span className="text-secondary font-bold">{bytes(u?.orphanBytes || 0)}</span>，不影响原图画作及稿单</div>
              </div>
              <button disabled={!!busy} onClick={doClean} className="shrink-0 px-3.5 py-1.5 rounded-full bg-surface-container-lowest hover:bg-surface-container text-primary font-label-lg text-label-lg border border-primary/20 stamp-press shadow-sm transition-all">{busy === 'clean' ? '清理中…' : '立即清理'}</button>
            </div>
          </section>

          <section className="bg-secondary-fixed/40 danger-dashed-border rounded-[1.25rem] p-5 relative overflow-hidden">
            <div className="flex items-center gap-2 mb-2 text-on-secondary-container"><span className="material-symbols-outlined text-[22px] text-secondary">warning</span><h2 className="font-headline-md text-headline-md">危险操作 · 重置数据</h2></div>
            <p className="font-body-md text-body-md text-on-secondary-fixed-variant leading-relaxed mb-4">重置后将清除当前设备上的所有设子档案、稿单记录及本地图片缓存，此操作不可逆，请提前确认已完成 ZIP 打包。</p>
            <button onClick={doReset} className="w-full h-11 rounded-2xl border border-secondary text-secondary hover:bg-secondary/10 bg-surface-container-lowest/80 font-label-lg text-label-lg flex items-center justify-center gap-2 stamp-press transition-all focus:outline-none">
              <span className="material-symbols-outlined text-[18px]">delete_sweep</span><span>清空本机全部手账数据 (双重防误触确认)</span>
            </button>
          </section>

          <section className="pt-2 pb-6 flex flex-col items-center justify-center text-center">
            <div className="relative p-4 rounded-full border-2 border-dashed border-outline-variant/80 bg-surface-container-lowest/70 w-32 h-32 flex flex-col items-center justify-center mb-3 rotate-[-2deg] shadow-sm">
              <span className="material-symbols-outlined text-[30px] text-primary mb-1">shield_lock</span>
              <span className="font-label-md text-[11px] font-bold text-primary-container leading-tight">妖画集 · 隐私</span>
              <span className="font-label-md text-[9px] text-outline leading-tight mt-0.5">NO CLOUD LEAK</span>
              <div className="absolute inset-1 rounded-full border border-primary/10 pointer-events-none" />
            </div>
            <p className="font-label-lg text-label-lg text-on-surface mb-1">纯本地离线存盘 · 零服务器上传</p>
            <p className="font-body-md text-body-md text-outline max-w-xs">手账与约稿数据百分之百保存在手机内部沙盒中，未获得你手动授权绝不传输。</p>
          </section>
          <div className="h-[var(--sab)]" />
        </main>
      </div>
    </Page>
  )
}
