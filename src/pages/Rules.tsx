import { config } from '../lib/config'

export function Rules() {
  return (
    <div className="max-w-3xl space-y-6">
      <h1 className="text-3xl font-semibold tracking-tight text-[var(--text-h)]">Rules & How It Works</h1>

      <div className="card">
        <h2 className="font-semibold text-[var(--text-h)] mb-2">Entry (Send to Treasury)</h2>
        <p className="text-sm">Send exactly <strong>{config.entryFee.toLocaleString()} {config.tokenSymbol}</strong> from your Solana wallet to the treasury address shown on the home page (and in the Pot card).</p>
        <p className="text-sm mt-2">The <strong>sending wallet address</strong> becomes your permanent profile and "login" in this league. No separate registration.</p>
        <p className="text-xs mt-2 text-[var(--subtle)]">Use the in-app "Send & Join" button (easiest) or send manually and paste the tx signature (or let the app auto-detect).</p>
      </div>

      <div className="card">
        <h2 className="font-semibold text-[var(--text-h)] mb-2">Predictions</h2>
        <p className="text-sm">For every match pick the outcome: Home win (1), Draw (X), or Away win (2).</p>
        <p className="text-sm mt-1">3 points for each correct pick. Picks lock at kickoff time.</p>
      </div>

      <div className="card">
        <h2 className="font-semibold text-[var(--text-h)] mb-2">Phases & Winners</h2>
        <p className="text-sm">Group stage accuracy + overall cumulative (group + knockout). The app highlights phase leaders. The organizer distributes from the treasury (visible pot) at logical points and at the end.</p>
      </div>

      <div className="card text-sm text-[var(--subtle)]">
        This is a skill-based community prediction pool / contest. The pot is the live verifiable balance of the treasury wallet. The organizer (you) manually sends prizes to verified top predictors. All entry and payout transactions are public on Solscan. Play responsibly.
      </div>
    </div>
  )
}
