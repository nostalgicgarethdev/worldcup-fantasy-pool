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
    <header className="sticky top-0 z-50 glass border-b border-white/10 backdrop-blur-3xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <NavLink to="/" className="flex items-center gap-3 font-semibold text-[var(--text-h)] tracking-[-0.5px] text-xl">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[var(--accent)] to-[var(--accent-2)] flex items-center justify-center text-white text-xs font-bold">WC</div>
            WC Pool
          </NavLink>
          <div className="hidden text-[10px] uppercase tracking-[3px] text-[var(--subtle)]/70 sm:block">FIFA 2026</div>
        </div>

        <nav className="hidden items-center gap-2 text-sm md:flex">
          <NavLink to="/predict" className={({ isActive }) => navClass(isActive)}>Predict</NavLink>
          <NavLink to="/leaderboard" className={({ isActive }) => navClass(isActive)}>Leaderboard</NavLink>
          <NavLink to="/rules" className={({ isActive }) => navClass(isActive)}>Rules</NavLink>
          {isAdmin && <NavLink to="/admin" className={({ isActive }) => navClass(isActive)}>Admin</NavLink>}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <PotDisplay compact />
          </div>
          <WalletMultiButton className="wallet-btn" />
          {publicKey && (
            <NavLink
              to={`/profile/${publicKey.toBase58()}`}
              className="text-xs px-3 py-1.5 rounded-full border border-white/10 hover:bg-white/5 text-[var(--subtle)] hover:text-[var(--text-h)] hidden md:block transition-colors"
            >
              My Profile
            </NavLink>
          )}
        </div>
      </div>

      {/* Mobile nav - glassy */}
      <div className="md:hidden border-t border-white/10 bg-black/30 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 py-3 text-sm">
          <NavLink to="/predict" className={({ isActive }) => navClass(isActive)}>Predict</NavLink>
          <NavLink to="/leaderboard" className={({ isActive }) => navClass(isActive)}>Leaderboard</NavLink>
          <NavLink to="/rules" className={({ isActive }) => navClass(isActive)}>Rules</NavLink>
          <NavLink to="/profile" className={({ isActive }) => navClass(isActive)}>Profile</NavLink>
        </div>
      </div>
    </header>
  )
}

function navClass(isActive: boolean) {
  return `rounded-full px-4 py-1.5 text-sm transition-all ${isActive 
    ? 'bg-white/10 text-[var(--text-h)] border border-white/20' 
    : 'text-[var(--subtle)] hover:text-[var(--text-h)] hover:bg-white/5' }`
}

export default function App() {
  return (
    <div className="flex min-h-screen flex-col bg-[#050507] text-[var(--text)]">
      <Header />

      <main className="mx-auto w-full max-w-6xl flex-1 px-5 py-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/predict" element={<Predict />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/profile/:wallet?" element={<Profile />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/rules" element={<Rules />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<div className="glass p-8 text-center">Page not found. <NavLink to="/" className="text-[var(--accent-2)] underline">Go home</NavLink></div>} />
        </Routes>
      </main>

      <footer className="glass mt-auto border-t border-white/10 py-5 text-center text-xs text-[var(--subtle)]/70">
        Entry = send exact fee from your wallet to the treasury. Your sending address = your league profile. 
        Pot = live verifiable treasury balance. Payouts executed manually by the organizer.
      </footer>
    </div>
  )
}
