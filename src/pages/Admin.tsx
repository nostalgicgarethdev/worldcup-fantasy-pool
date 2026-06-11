import { useWallet } from '@solana/wallet-adapter-react'
import { useState } from 'react'
import { config } from '../lib/config'
import { matches } from '../data/matches'
import { saveDemoResult, getDemoResults, type Outcome } from '../lib/scoring'

export function Admin() {
  const { publicKey, connected } = useWallet()
  const isTreasury = connected && publicKey && publicKey.toBase58() === config.treasuryWallet
  const [results, setResults] = useState(getDemoResults())
  const [filter, setFilter] = useState<'all' | 'group' | 'r32'>('group')

  const visibleMatches = matches
    .filter(m => filter === 'all' || m.stage === filter)
    .slice(0, 24) // first batch for the demo UI

  function setResult(id: number, o: Outcome | null) {
    saveDemoResult(id, o)
    setResults(getDemoResults())
  }

  const content = (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-semibold tracking-[-1.5px] text-white drop-shadow mb-2">Admin</h1>
        <p className="text-white/80">Demo result entry (local only). Changes affect leaderboard + profiles immediately in this browser.</p>
      </div>

      <div className="glass p-6">
        <div className="flex items-center gap-2 mb-4 text-sm">
          <span className="text-white/70">Show:</span>
          {(['group','r32','all'] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1 rounded-full border ${filter===f ? 'bg-white/10 border-white/30 text-white' : 'border-white/10 text-white/70 hover:text-white'}`}>{f}</button>
          ))}
          <span className="ml-auto text-xs text-white/50">Results saved to localStorage • refresh to propagate everywhere</span>
        </div>

        <div className="space-y-2">
          {visibleMatches.map(m => {
            const cur = results[m.id]
            return (
              <div key={m.id} className="glass flex flex-col sm:flex-row sm:items-center gap-3 p-4 text-sm">
                <div className="flex-1">
                  <span className="font-medium">{m.home}</span> <span className="text-white/50">vs</span> <span className="font-medium">{m.away}</span>
                  <span className="ml-2 text-xs text-white/50">#{m.id} • {m.date}</span>
                </div>
                <div className="flex gap-2">
                  {(['H','D','A'] as const).map(o => (
                    <button
                      key={o}
                      onClick={() => setResult(m.id, o)}
                      className={`px-4 py-1.5 rounded-xl border text-sm ${cur === o ? 'bg-[var(--accent-2)]/30 border-[var(--accent-2)] text-white' : 'border-white/15 hover:bg-white/5'}`}
                    >
                      {o === 'H' ? 'Home' : o === 'D' ? 'Draw' : 'Away'}
                    </button>
                  ))}
                  <button onClick={() => setResult(m.id, null)} className="px-3 py-1.5 rounded-xl border border-white/15 text-white/60 hover:text-white/90">Clear</button>
                </div>
                {cur && <div className="text-xs uppercase tracking-widest text-[var(--accent-2)]/90 self-center">set: {cur}</div>}
              </div>
            )
          })}
        </div>
        <div className="mt-4 text-xs text-white/60">Tip: After setting results, open Leaderboard or Profile in another tab (or refresh) to see updated scores. Real admin will be authenticated + persist server-side.</div>
      </div>

      <div className="glass p-6 text-sm text-white/80">
        Treasury: <span className="font-mono text-white/90">{config.treasuryWallet}</span><br />
        When real entrants appear, this panel will also list verified depositors (from on-chain history to treasury) and let you export payout addresses + amounts.
      </div>
    </div>
  )

  if (!isTreasury) {
    return (
      <div>
        <div className="glass max-w-md p-7 text-sm mb-4">
          Admin panel is restricted to the treasury wallet ({config.treasuryWallet ? config.treasuryWallet.slice(0,8)+'...' : 'configure in config.ts'}). <br />
          <span className="text-white/60">Showing demo controls anyway for local testing.</span>
        </div>
        {content}
      </div>
    )
  }

  return content
}
