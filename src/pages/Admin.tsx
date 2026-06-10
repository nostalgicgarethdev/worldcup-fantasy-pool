import { useWallet } from '@solana/wallet-adapter-react'
import { config } from '../lib/config'

export function Admin() {
  const { publicKey, connected } = useWallet()
  const isTreasury = connected && publicKey && publicKey.toBase58() === config.treasuryWallet

  if (!isTreasury) {
    return (
      <div className="glass max-w-md p-7 text-sm">
        Admin panel is restricted to the treasury wallet ({config.treasuryWallet ? config.treasuryWallet.slice(0,8)+'...' : 'configure in config.ts'}).
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-4xl font-semibold tracking-[-1.5px] text-[var(--text-h)] mb-6">Admin</h1>
      <div className="grid gap-5 md:grid-cols-2">
        <div className="glass p-7">
          <div className="font-medium mb-3 tracking-tight">Match Results</div>
          <div className="text-sm text-[var(--subtle)]">Enter results here to drive the live leaderboard. Full interface coming in the next update.</div>
        </div>
        <div className="glass p-7">
          <div className="font-medium mb-3 tracking-tight">Entrants &amp; Payouts</div>
          <div className="text-sm text-[var(--subtle)]">View verified depositors, rescan for manual sends, and generate payout lists for the current phase or overall winner.</div>
        </div>
      </div>
      <div className="text-xs mt-4 text-[var(--subtle)]/70">Full tools (result entry, rescan treasury, payout CSV) will be wired once backend + scoring are complete.</div>
    </div>
  )
}
