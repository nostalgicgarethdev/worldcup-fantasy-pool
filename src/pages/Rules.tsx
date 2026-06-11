import { config } from '../lib/config'

export function Rules() {
  return (
    <div className="max-w-3xl space-y-6">
      <h1 className="text-4xl font-semibold tracking-[-1.2px] text-white drop-shadow">Rules</h1>

      <div className="glass">
        <div className="font-medium text-white mb-2 tracking-tight">Entry — Send to Treasury</div>
        <p className="text-[15px]">Send exactly <span className="font-medium text-white">{config.entryFee.toLocaleString()} {config.tokenSymbol}</span> from your wallet to the treasury (shown live on the homepage).</p>
        <p className="text-sm mt-3 text-white/70">The <span className="text-white">sending wallet address</span> is your identity and profile. Use the in-app button or send manually and let the app verify the transaction.</p>
      </div>

      <div className="glass">
        <div className="font-medium text-white mb-2 tracking-tight">Predictions</div>
        <p className="text-[15px]">For each match choose Home win, Draw, or Away win. <span className="font-medium">3 points</span> per correct outcome. Picks lock automatically at kickoff.</p>
      </div>

      <div className="glass">
        <div className="font-medium text-white mb-2 tracking-tight">Phases & Winners</div>
        <p className="text-[15px]">Cumulative scoring across group stage + knockouts. Phase leaders are highlighted. The organizer distributes from the transparent on-chain treasury at the end of phases and after the final.</p>
      </div>

      <div className="glass text-sm text-white/70 p-6">
        Skill-based prediction contest. Everything is on-chain and verifiable. The organizer manually executes payouts to the top verified wallets.
      </div>
    </div>
  )
}
