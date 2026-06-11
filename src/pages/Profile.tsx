import { useParams } from 'react-router-dom'
import { useWallet } from '@solana/wallet-adapter-react'
import { useEffect, useState } from 'react'
import { computeScore, type PickMap } from '../lib/scoring'
import { matches } from '../data/matches'
import { NavLink } from 'react-router-dom'

export function Profile() {
  const { wallet: paramWallet } = useParams()
  const { publicKey, connected } = useWallet()
  const target = paramWallet || (connected && publicKey ? publicKey.toBase58() : null)
  const [picks, setPicks] = useState<PickMap>({})

  useEffect(() => {
    if (!target) return
    try {
      const raw = localStorage.getItem(`wc-picks-${target}`)
      if (raw) setPicks(JSON.parse(raw))
    } catch {}
  }, [target])

  const score = computeScore(picks)
  const pickedCount = Object.keys(picks).length
  const pickedMatchDetails = Object.entries(picks).map(([id, pick]) => {
    const m = matches.find(mm => mm.id === Number(id))
    return m ? { ...m, pick } : null
  }).filter(Boolean)

  return (
    <div className="space-y-6 max-w-3xl">
      <h1 className="text-4xl font-semibold tracking-[-1.5px] text-white drop-shadow mb-2">Profile</h1>

      {!target && <div className="glass max-w-md p-7">Connect a wallet or paste a profile address to view picks and entry status.</div>}

      {target && (
        <>
          <div className="glass p-7">
            <div className="font-mono text-base break-all text-[var(--text-h)] tracking-wider">{target}</div>
            <div className="text-xs mt-2 text-white/70">Sending address from treasury deposit = permanent league profile.</div>
            <div className="mt-3 flex items-center gap-3 text-sm">
              <div className="pill">DEMO</div>
              <div>Entry status: <span className="text-white/90">localStorage (real = on-chain send verified)</span></div>
            </div>
          </div>

          <div className="glass p-7">
            <div className="flex items-baseline gap-4 mb-4">
              <div>
                <div className="text-xs uppercase tracking-[2px] text-white/60">YOUR SCORE</div>
                <div className="text-6xl font-semibold tabular-nums tracking-[-2px] text-white drop-shadow">{score}</div>
              </div>
              <div className="text-white/70">pts from {pickedCount} picks</div>
            </div>

            {pickedCount === 0 ? (
              <div className="text-sm text-white/80">No predictions yet. <NavLink to="/predict" className="underline text-[var(--accent-2)]">Make your picks →</NavLink></div>
            ) : (
              <div className="space-y-2 text-sm">
                <div className="text-white/80 mb-2">Your current picks (demo):</div>
                {pickedMatchDetails.slice(0, 8).map((pm: any) => (
                  <div key={pm.id} className="flex justify-between border-b border-white/10 py-1 last:border-0">
                    <span>{pm.home} vs {pm.away}</span>
                    <span className="font-medium text-[var(--accent-2)]">{pm.pick}</span>
                  </div>
                ))}
                {pickedMatchDetails.length > 8 && <div className="text-xs text-white/60">+{pickedMatchDetails.length - 8} more…</div>}
              </div>
            )}
          </div>

          <div className="text-xs text-white/60">Full history + phase breakdowns + verified entry tx links will appear with backend.</div>
        </>
      )}
    </div>
  )
}
