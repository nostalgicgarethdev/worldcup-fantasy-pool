import { NavLink } from 'react-router-dom'
import { useWallet } from '@solana/wallet-adapter-react'
import { PotDisplay } from '../components/PotDisplay'
import { SendEntryButton } from '../components/SendEntryButton'
import { config } from '../lib/config'

export function Home() {
  const { publicKey, connected } = useWallet()

  return (
    <div className="space-y-8">
      <div className="text-center pt-8 pb-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-xs tracking-[2px] text-[var(--subtle)] mb-4">
          FIFA WORLD CUP 2026 • 48 TEAMS • 104 MATCHES
        </div>
        <h1 className="text-5xl md:text-6xl font-semibold tracking-[-2.5px] text-[var(--text-h)]">WC Pool</h1>
        <p className="mt-3 max-w-md mx-auto text-lg text-[var(--text)]">
          Send {config.entryFee.toLocaleString()} {config.tokenSymbol} to the treasury.<br />
          Your sending wallet = your league profile. Predict matches. Top scorer(s) win the pot.
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <PotDisplay />
      </div>

      <div className="flex flex-col items-center gap-3 pt-4">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <NavLink to="/predict" className="btn-outline px-8 py-3 text-base">View / Make Picks</NavLink>
          <SendEntryButton />
        </div>
        <div className="text-xs text-[var(--subtle)]">
          {connected ? 'Connected — send the fee from this wallet to become a member' : 'Connect a wallet to send entry or view your profile'}
        </div>
        <NavLink to="/leaderboard" className="text-sm text-[var(--accent)] hover:underline">View current leaderboard →</NavLink>
      </div>

      <div className="max-w-xl mx-auto pt-8 text-center text-sm text-[var(--subtle)]">
        One-time entry. 3 points per correct 1X2 outcome. Group stage + full knockout supported.
        Staged phase winners + final overall winner. All payouts from the visible treasury (you control the wallet).
      </div>
    </div>
  )
}
