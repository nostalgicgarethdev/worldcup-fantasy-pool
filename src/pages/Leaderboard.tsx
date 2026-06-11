import { useWallet } from '@solana/wallet-adapter-react'
import { useEffect, useState } from 'react'
import { getDemoLeaderboard, type PickMap } from '../lib/scoring'
import { NavLink } from 'react-router-dom'

export function Leaderboard() {
  const { publicKey } = useWallet()
  const [myPicks, setMyPicks] = useState<PickMap>({})
  const wallet = publicKey?.toBase58() ?? null

  useEffect(() => {
    if (!wallet) return
    try {
      const raw = localStorage.getItem(`wc-picks-${wallet}`)
      if (raw) setMyPicks(JSON.parse(raw))
    } catch {}
  }, [wallet])

  const board = getDemoLeaderboard(Object.keys(myPicks).length ? myPicks : undefined, wallet || undefined)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-semibold tracking-[-1.5px] text-white drop-shadow mb-2">Leaderboard</h1>
        <p className="text-base text-white/80">3 pts per correct pick • Demo scores (expand results in scoring.ts as matches complete)</p>
      </div>

      <div className="glass overflow-hidden">
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between text-sm">
          <div className="font-medium text-white/90">Current Standings (demo)</div>
          <div className="text-white/60">{board.length} entrants shown</div>
        </div>

        <div className="divide-y divide-white/10">
          {board.map((row, idx) => {
            const isMe = wallet && row.wallet === wallet
            return (
              <div key={idx} className={`flex items-center gap-4 px-6 py-4 ${isMe ? 'bg-white/5' : ''}`}>
                <div className="w-8 text-center font-mono text-white/60 tabular-nums">#{idx + 1}</div>
                <div className="flex-1 min-w-0">
                  <div className="font-mono text-sm break-all text-[var(--text-h)]">{row.wallet}</div>
                  {row.label && <div className="text-xs text-white/60">{row.label}</div>}
                </div>
                <div className="text-right">
                  <div className="text-2xl font-semibold tabular-nums text-white drop-shadow">{row.score}</div>
                  <div className="text-[10px] uppercase tracking-widest text-white/60">pts • {row.picksCount} picks</div>
                </div>
                {isMe && <div className="text-xs px-2 py-0.5 rounded bg-[var(--accent-2)]/20 text-[var(--accent-2)]">YOU</div>}
              </div>
            )
          })}
        </div>
      </div>

      {wallet && Object.keys(myPicks).length === 0 && (
        <div className="glass p-6 text-sm text-white/80">
          No picks yet for this wallet. Go to <NavLink to="/predict" className="text-[var(--accent-2)] underline">Predict</NavLink> to make your 1X2 selections (after sending entry).
        </div>
      )}

      <div className="text-xs text-white/60 px-1">
        This is a local demo leaderboard. Real version will verify entries against treasury transfers + use server-computed scores from admin-entered results.
      </div>
    </div>
  )
}
