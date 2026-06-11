import { Routes, Route, NavLink } from 'react-router-dom'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { useWallet } from '@solana/wallet-adapter-react'

import { PotDisplay } from './components/PotDisplay'
import { Home } from './pages/Home'
import { Predict } from './pages/Predict'
import { Leaderboard } from './pages/Leaderboard'
import { Profile } from './pages/Profile'
import { Rules } from './pages/Rules'
import { Admin } from './pages/Admin'

function Header() {
  const { publicKey } = useWallet()
  const isAdmin = false // will be wired to treasury/organizer wallet check later

  return (
    <header className="sticky top-0 z-50 glass border-b border-white/10 backdrop-blur-3xl bg-white/5">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <NavLink to="/" className="flex items-center gap-3 font-semibold text-white tracking-[-0.5px] text-xl drop-shadow">
            <img src="/wcpool-logo.jpg" alt="WCPOOL" className="h-5 w-auto max-w-[36px]" />
          </NavLink>
          <div className="hidden text-xs uppercase tracking-[3px] text-white sm:block drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">FIFA 2026</div>
        </div>

        <nav className="hidden items-center gap-8 text-sm md:flex text-white">
          <NavLink to="/predict" className={({ isActive }) => `text-white ${navClass(isActive)}`}>Predict</NavLink>
          <NavLink to="/leaderboard" className={({ isActive }) => `text-white ${navClass(isActive)}`}>Leaderboard</NavLink>
          <NavLink to="/rules" className={({ isActive }) => `text-white ${navClass(isActive)}`}>Rules</NavLink>
          {isAdmin && <NavLink to="/admin" className={({ isActive }) => `text-white ${navClass(isActive)}`}>Admin</NavLink>}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <PotDisplay compact />
          </div>
          <WalletMultiButton className="wallet-btn" />
          {publicKey && (
            <NavLink
              to={`/profile/${publicKey.toBase58()}`}
              className="text-sm px-3 py-1.5 rounded-full border border-white/10 hover:bg-white/5 text-white hidden md:block transition-colors drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]"
            >
              My Profile
            </NavLink>
          )}
        </div>
      </div>

      {/* Mobile nav - glassy */}
      <div className="md:hidden border-t border-white/10 bg-black/30 backdrop-blur-xl mobile-nav">
        <div className="mx-auto flex max-w-6xl gap-8 overflow-x-auto px-4 py-3 text-base text-white">
          <NavLink to="/predict" className={({ isActive }) => `text-white ${navClass(isActive)}`}>Predict</NavLink>
          <NavLink to="/leaderboard" className={({ isActive }) => `text-white ${navClass(isActive)}`}>Leaderboard</NavLink>
          <NavLink to="/rules" className={({ isActive }) => `text-white ${navClass(isActive)}`}>Rules</NavLink>
          <NavLink to="/profile" className={({ isActive }) => `text-white ${navClass(isActive)}`}>Profile</NavLink>
        </div>
      </div>
    </header>
  )
}

function navClass(isActive: boolean) {
  return `rounded-full px-4 py-1.5 text-base transition-all drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)] ${isActive 
    ? 'bg-white/10 text-white border border-white/20' 
    : 'text-white hover:bg-white/5' }`
}

export default function App() {
  return (
    <div className="flex min-h-screen flex-col text-[var(--text)] relative">
      <Header />

      {/* Main content "canvas" with rich background so the liquid glass panels can shine (inspired by the reference) */}
      <main className="mx-auto w-full max-w-5xl flex-1 px-6 md:px-8 py-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/predict" element={<Predict />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/profile/:wallet?" element={<Profile />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/rules" element={<Rules />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<div className="glass p-8 text-center">Page not found. <NavLink to="/" className="text-white hover:text-white underline">Go home</NavLink></div>} />
        </Routes>
      </main>

      <footer className="glass mt-auto border-t border-white/10 py-5 text-center text-sm text-white drop-shadow">
        Entry = send exact fee from your wallet to the treasury. Your sending address = your league profile. 
        Pot = live verifiable treasury balance. Payouts executed manually by the organizer.
      </footer>
    </div>
  )
}
