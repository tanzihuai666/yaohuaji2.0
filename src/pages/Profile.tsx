import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Page from '../components/Page'
import Img from '../components/Img'
import BottomNav from '../components/BottomNav'
import { DefaultAvatar } from '../components/Mascots'
import { Modal, Sheet, useUI } from '../components/ui'
import { saveSettings, useSettings } from '../lib/settings'
import { pickImagesSafe, deleteImages } from '../lib/images'
import pkg from '../../package.json'

const ic = 'w-5 h-5 stroke-[#4D7162] fill-none stroke-[2] stroke-linecap-round stroke-linejoin-round'
const User = ({ className = ic }: { className?: string }) => <svg className={className} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
const CARDS = [
  { t: '个人资料', d: '头像 · 昵称 · 标语', k: 'profile', icon: <User /> },
  { t: '主题背景', d: '配色 · 自定义背景', k: '/theme', icon: <svg className={ic} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="13.5" cy="6.5" fill="#4D7162" r=".5" /><circle cx="17.5" cy="10.5" fill="#4D7162" r=".5" /><circle cx="8.5" cy="7.5" fill="#4D7162" r=".5" /><circle cx="6.5" cy="12.5" fill="#4D7162" r=".5" /><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" /></svg> },
  { t: '存储备份', d: '空间 · 导出 · 导入', k: '/storage', icon: <svg className={ic} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" x2="12" y1="22.08" y2="12" /></svg> },
  { t: '关于妖画集', d: '版本 · 说明', k: 'about', icon: <svg className={ic} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg> },
]

export default function Profile() {
  const nav = useNavigate(); const ui = useUI(); const s = useSettings()
  const [edit, setEdit] = useState(false); const [about, setAbout] = useState(false)
  const [form, setForm] = useState({ nickname: '', motto: '' }); const [avatar, setAvatar] = useState<string | undefined>()
  const openEdit = () => { setForm({ nickname: s.nickname, motto: s.motto }); setAvatar(s.avatar); setEdit(true) }
  const pickAvatar = async () => { const [i] = await pickImagesSafe(false, ui.toast); if (i) { if (avatar && avatar !== s.avatar) await deleteImages([avatar]); setAvatar(i) } }
  const save = async () => {
    if (!form.nickname.trim()) return ui.toast('昵称不能为空')
    if (s.avatar && s.avatar !== avatar) await deleteImages([s.avatar])
    await saveSettings({ nickname: form.nickname.trim(), motto: form.motto.trim(), avatar }); setEdit(false); ui.toast('个人资料已保存')
  }
  const cancel = async () => { if (avatar && avatar !== s.avatar) await deleteImages([avatar]); setEdit(false) }
  const customized = s.nickname !== '妖芝' || s.motto !== '一纸一笔，皆是山河' || !!s.avatar

  return (
    <Page name="Profile">
      <main className="w-full max-w-[420px] min-h-screen flex flex-col justify-between relative px-4 pb-28 pt-2 pt-safe overflow-x-hidden">
        <header className="w-full flex flex-col">
          <div className="w-full py-2.5 flex justify-center items-center" data-purpose="nav-title">
            <div className="flex items-center space-x-2 text-darkCharcoal">
              <User className="w-4 h-4 stroke-[#484E49] fill-none stroke-[2]" />
              <h1 className="text-[17px] font-bold tracking-wide text-[#2F3430]">我的</h1>
            </div>
          </div>
        </header>
        <div className="flex-1 flex flex-col pt-3 space-y-4">
          <section onClick={openEdit} className="bg-cardBg rounded-[22px] p-4 soft-shadow border border-[#E9EBE8] flex items-center justify-between transition-transform active:scale-[0.99] cursor-pointer" data-purpose="user-profile-card">
            <div className="flex items-center space-x-3.5 min-w-0">
              <div className="relative w-16 h-16 rounded-full p-[2px] bg-gradient-to-tr from-[#98B8A6] via-[#B8D1C3] to-[#8FAFA0] flex-shrink-0 shadow-sm">
                <div className="w-full h-full rounded-full overflow-hidden border-2 border-white bg-amber-50 flex items-center justify-center">
                  <Img id={s.avatar} alt={s.nickname} className="w-full h-full object-cover object-center scale-[1.03]" fallback={<DefaultAvatar />} />
                </div>
              </div>
              <div className="flex flex-col justify-center min-w-0">
                <h2 className="text-[20px] font-extrabold text-[#282C29] leading-tight tracking-tight truncate">{s.nickname}</h2>
                <p className="text-[13px] text-[#868C87] mt-1 font-normal tracking-tight truncate">{customized ? s.motto || '还没有写标语' : '点击设置你的昵称和标语'}</p>
              </div>
            </div>
            <button aria-label="编辑个人信息" className="p-2 text-[#7F8681] hover:text-accentGreen focus:outline-none">
              <svg className="w-5 h-5 stroke-current fill-none stroke-[1.8]" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
            </button>
          </section>
          <section className="grid grid-cols-2 gap-3.5 pt-1" data-purpose="feature-grid">
            {CARDS.map(c => (
              <article key={c.k} onClick={() => (c.k === 'profile' ? openEdit() : c.k === 'about' ? setAbout(true) : nav(c.k))} className="bg-cardBg rounded-[22px] p-4 soft-shadow border border-[#E9EBE8] flex flex-col items-start min-h-[148px] justify-between cursor-pointer transition-all active:scale-95 hover:border-[#CCD8D0]">
                <div className="w-11 h-11 rounded-2xl bg-dimGreenBg flex items-center justify-center text-accentGreen">{c.icon}</div>
                <div className="mt-4 w-full">
                  <h3 className="text-[17px] font-bold text-[#2A2E2B] tracking-tight">{c.t}</h3>
                  <p className="text-[12px] text-[#939A94] mt-0.5 font-medium tracking-normal">{c.d}</p>
                </div>
              </article>
            ))}
          </section>
          <footer className="w-full pt-4 pb-2 text-center" data-purpose="app-version-footer">
            <p className="text-[12px] text-[#9DA39E] tracking-wider font-normal">妖画集 {pkg.version} · 本地存档 · 无广告</p>
          </footer>
        </div>
      </main>
      <BottomNav />
      <Sheet open={edit} onClose={cancel}>
        <div className="bg-[#FBFBF9] rounded-t-[28px] px-5 pt-3 pb-[calc(var(--sab)+20px)] border-t border-[#E9EBE8]">
          <div className="w-10 h-1.5 rounded-full bg-[#DADDD9] mx-auto mb-4" />
          <h3 className="text-[16px] font-extrabold text-[#2A2E2B] mb-4 flex items-center gap-1.5"><User className="w-4 h-4 stroke-[#4D7162] fill-none stroke-[2]" />个人资料</h3>
          <div className="flex flex-col items-center mb-4">
            <button type="button" onClick={pickAvatar} className="relative w-20 h-20 rounded-full p-[2px] bg-gradient-to-tr from-[#98B8A6] via-[#B8D1C3] to-[#8FAFA0] shadow-sm">
              <div className="w-full h-full rounded-full overflow-hidden border-2 border-white bg-amber-50 flex items-center justify-center"><Img id={avatar} className="w-full h-full object-cover" fallback={<DefaultAvatar />} /></div>
              <span className="absolute -bottom-0.5 -right-0.5 w-7 h-7 rounded-full bg-[#3C6A58] text-white flex items-center justify-center border-2 border-white"><span className="material-symbols-outlined text-[15px]">photo_camera</span></span>
            </button>
            {avatar && <button type="button" onClick={async () => { if (avatar !== s.avatar) await deleteImages([avatar]); setAvatar(undefined) }} className="mt-2 text-[12px] text-[#939A94]">恢复默认头像</button>}
          </div>
          <label className="block text-[12px] font-bold text-[#6B726D] mb-1.5 pl-1">昵称</label>
          <input value={form.nickname} maxLength={12} onChange={e => setForm({ ...form, nickname: e.target.value })} className="w-full h-11 px-4 rounded-xl border border-[#E3E6E2] bg-white text-[15px] outline-none focus:border-[#3C6A58] mb-3" placeholder="你的画师昵称" />
          <label className="block text-[12px] font-bold text-[#6B726D] mb-1.5 pl-1">标语</label>
          <input value={form.motto} maxLength={30} onChange={e => setForm({ ...form, motto: e.target.value })} className="w-full h-11 px-4 rounded-xl border border-[#E3E6E2] bg-white text-[15px] outline-none focus:border-[#3C6A58]" placeholder="一纸一笔，皆是山河" />
          <p className="text-[11px] text-[#9DA39E] mt-1.5 pl-1">昵称与标语会显示在首页问候语和价目表海报中</p>
          <div className="grid grid-cols-[1fr_2fr] gap-3 mt-5">
            <button onClick={cancel} className="h-12 rounded-xl border border-[#E3E6E2] bg-white text-[14px] font-bold text-[#6B726D]">取消</button>
            <button onClick={save} className="h-12 rounded-xl bg-[#3C6A58] text-white text-[14px] font-bold shadow-[0_6px_16px_rgba(60,106,88,0.22)]">保存</button>
          </div>
        </div>
      </Sheet>
      <Modal open={about} onClose={() => setAbout(false)}>
        <div className="bg-white rounded-[22px] p-6 text-center border border-[#E9EBE8] shadow-xl">
          <img src="./icon.svg" alt="" className="w-16 h-16 mx-auto mb-3 rounded-2xl" />
          <h3 className="text-[18px] font-extrabold text-[#2A2E2B]">妖画集 <span className="text-[13px] font-bold text-[#3C6A58]">v{pkg.version}</span></h3>
          <p className="text-[13px] text-[#6B726D] mt-3 leading-relaxed text-left">画师专属的手账风接稿助手：稿单排期与截稿提醒、价目表海报、角色设子档案、画作相册、记账钱包。<br />所有数据仅保存在本机（IndexedDB），不联网、不上传、无广告。建议定期在「存储备份」导出 ZIP 备份。</p>
          <div className="mt-4 grid grid-cols-2 gap-2 text-[12px] text-[#4D7162]">
            <div className="bg-[#EEF3EF] rounded-xl py-2">🔒 本地离线</div><div className="bg-[#EEF3EF] rounded-xl py-2">🎨 9 套主题</div>
          </div>
          <button onClick={() => setAbout(false)} className="mt-5 w-full h-11 rounded-xl bg-[#3C6A58] text-white font-bold text-[14px]">知道啦</button>
        </div>
      </Modal>
    </Page>
  )
}
