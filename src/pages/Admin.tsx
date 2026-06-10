import { useWallet } from '@solana/wallet-adapter-react'
import { config } from '../lib/config'

export function Admin() {
  const { publicKey, connected } = useWallet()
  const isTreasury = connected && publicKey && publicKey.toBase58() === config.treasuryWallet

  if (!isTreasury) {
    return (
      <div className="card max-w-md">
        Admin is only available when connected as the treasury/organizer wallet ({config.treasuryWallet ? config.treasuryWallet.slice(0, 8) + '...' : 'not configured'}).
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-tight text-[var(--text-h)] mb-4">Admin</h1>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="card">
          <div className="font-medium mb-2">Match Results</div>
          <div className="text-sm text-[var(--subtle)]">Enter scores or winners for matches here (will power the live leaderboard and scoring). Full UI coming in the next passes.</div>
        </div>
        <div className="card">
          <div className="font-medium mb-2">Entrants & Payouts</div>
          <div className="text-sm text-[var(--subtle)]">List of wallets that sent the fee + rescan button for manual sends. Generate payout list (top by phase / overall) with copyable addresses.</div>
        </div>
      </div>
      <div className="text-xs mt-4 text-[var(--subtle)]">This panel (and the full result entry + payout tools) will be fully functional once the matches data, DB, and scoring are wired.</div>
    </div>
  )
}
