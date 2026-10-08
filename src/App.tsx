import { useEffect } from 'react'
import { HashRouter, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { Capacitor } from '@capacitor/core'
import { UIProvider } from './components/ui'
import BgLayer from './components/BgLayer'
import Home from './pages/Home'
import Orders from './pages/Orders'
import OrderNew from './pages/OrderNew'
import OrderDetail from './pages/OrderDetail'
import PriceSheet from './pages/PriceSheet'
import Gallery from './pages/Gallery'
import CharacterNew from './pages/CharacterNew'
import Character from './pages/Character'
import RecordNew from './pages/RecordNew'
import FolderNew from './pages/FolderNew'
import Folder from './pages/Folder'
import Profile from './pages/Profile'
import Wallet from './pages/Wallet'
import Theme from './pages/Theme'
import Storage from './pages/Storage'

const TABS = ['/', '/orders', '/gallery', '/me']

/** Android hardware back button, status bar and scroll restoration. */
function NativeBridge() {
  const nav = useNavigate(); const loc = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [loc.pathname])
  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return
    let off: (() => void) | undefined; let last = 0
    import('@capacitor/app').then(({ App }) => {
      App.addListener('backButton', () => {
        // close any open sheet/dialog first
        const overlays = document.querySelectorAll<HTMLElement>('[data-back]')
        if (overlays.length) { overlays[overlays.length - 1].click(); return }
        const path = location.hash.replace(/^#/, '').split('?')[0] || '/'
        if (!TABS.includes(path)) return nav(-1)
        if (path !== '/') return nav('/', { replace: true })
        const now = Date.now(); if (now - last < 1800) App.exitApp(); else { last = now; window.dispatchEvent(new CustomEvent('yh-toast', { detail: '再按一次退出妖画集' })) }
      }).then(h => { off = () => h.remove() })
    })
    import('@capacitor/status-bar').then(({ StatusBar, Style }) => { StatusBar.setStyle({ style: Style.Light }).catch(() => {}) }).catch(() => {})
    return () => off?.()
  }, [nav])
  return null
}

export default function App() {
  return (
    <HashRouter>
      <UIProvider>
        <BgLayer />
        <NativeBridge />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/orders/new" element={<OrderNew />} />
          <Route path="/orders/:id" element={<OrderDetail />} />
          <Route path="/orders/:id/edit" element={<OrderNew />} />
          <Route path="/prices" element={<PriceSheet />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/characters/new" element={<CharacterNew />} />
          <Route path="/characters/:id" element={<Character />} />
          <Route path="/characters/:id/edit" element={<CharacterNew />} />
          <Route path="/characters/:id/records/new" element={<RecordNew />} />
          <Route path="/records/:rid/edit" element={<RecordNew />} />
          <Route path="/folders/new" element={<FolderNew />} />
          <Route path="/folders/:id" element={<Folder />} />
          <Route path="/folders/:id/edit" element={<FolderNew />} />
          <Route path="/me" element={<Profile />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/theme" element={<Theme />} />
          <Route path="/storage" element={<Storage />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </UIProvider>
    </HashRouter>
  )
}
