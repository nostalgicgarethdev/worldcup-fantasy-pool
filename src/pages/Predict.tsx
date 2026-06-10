import { useEffect, useState } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { matches, Match } from '../data/matches'
import { SendEntryButton } from '../components/SendEntryButton'
import { config } from '../lib/config'

type PickMap = Record<number, 'H' | 'D' | 'A'>

function getStorageKey(wallet: string) {
  return `wc-picks-${wallet}`
}

export function Predict() {
  const { publicKey, connected } = useWallet()
  const wallet = publicKey?.toBase58() ?? 'demo'

  const [picks, setPicks] = useState<PickMap>({})
  const [hasEntry, setHasEntry] = useState(false) // demo flag; later driven by real treasury send

  // Load from localStorage for this wallet (demo persistence)
  useEffect(() => {
    if (!wallet) return
    try {
      const raw = localStorage.getItem(getStorageKey(wallet))
      if (raw) setPicks(JSON.parse(raw))
    } catch {}
    // Demo: if user has "paid" in this browser session for this wallet, allow picks
    const paid = localStorage.getItem(`wc-paid-${wallet}`)
    setHasEntry(!!paid || wallet === 'demo')
  }, [wallet])

  function setPick(matchId: number, pick: 'H' | 'D' | 'A') {
    if (!hasEntry) return
    const next = { ...picks, [matchId]: pick }
    setPicks(next)
    try {
      localStorage.setItem(getStorageKey(wallet), JSON.stringify(next))
    } catch {}
  }

  function demoPay() {
    localStorage.setItem(`wc-paid-${wallet}`, 'true')
    setHasEntry(true)
    alert('Demo entry recorded for this browser wallet. In real use this will be an on-chain SPL transfer to the treasury.')
  }

  // Group by group for nice tabs (only groups that have matches in our seed)
  const groupsWithMatches = Array.from(new Set(matches.filter(m => m.group).map(m => m.group!)))

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-[var(--text-h)]">Predict Matches</h1>
          <p className="text-[var(--subtle)]">1X2 • 3 points per correct outcome • locks at kickoff</p>
        </div>
        <div className="text-right text-xs text-[var(--subtle)]">
          {connected ? `Connected: ${wallet.slice(0, 6)}...` : 'Demo mode (connect for real wallet)'}
        </div>
      </div>

      {!connected && (
        <div className="card max-w-sm">
          <p className="mb-3 text-sm">Connect a real wallet for production use. Current view is a working demo.</p>
          <WalletMultiButton />
        </div>
      )}

      {!hasEntry && (
        <div className="card border-[var(--accent)]/40 bg-[var(--accent)]/5">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
            <div>
              <div className="font-medium">You have not entered yet</div>
              <div className="text-sm text-[var(--subtle)]">Send exactly {config.entryFee.toLocaleString()} {config.tokenSymbol} from this wallet to the treasury (the sending address becomes your profile).</div>
            </div>
            <div className="flex gap-2">
              <SendEntryButton onSuccess={() => setHasEntry(true)} />
              <button onClick={demoPay} className="btn-outline whitespace-nowrap text-xs">Demo pay (local)</button>
            </div>
          </div>
        </div>
      )}

      {groupsWithMatches.map(group => {
        const groupMatches = matches.filter(m => m.group === group)
        return (
          <div key={group} className="space-y-3">
            <div className="text-xs uppercase tracking-widest text-[var(--subtle)] pl-1">Group {group}</div>
            {groupMatches.map((m: Match) => {
              const current = picks[m.id]
              const locked = false // real lock time logic later
              return (
                <div key={m.id} className="card flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-[var(--text-h)]">{m.home} <span className="text-[var(--subtle)]">vs</span> {m.away}</div>
                    <div className="text-xs text-[var(--subtle)]">{m.date} {m.time} • {m.venue}</div>
                  </div>

                  <div className="flex gap-2">
                    {(['H', 'D', 'A'] as const).map(p => (
                      <button
                        key={p}
                        disabled={!hasEntry || locked}
                        onClick={() => setPick(m.id, p)}
                        className={`btn px-4 py-1.5 text-sm border ${current === p ? 'border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--text-h)]' : 'border-[var(--border)] hover:border-[var(--accent)]/60'}`}
                      >
                        {p === 'H' ? 'Home' : p === 'D' ? 'Draw' : 'Away'}
                      </button>
                    ))}
                  </div>

                  {current && <div className="text-[10px] text-[var(--accent)] w-16">Your pick: {current}</div>}
                </div>
              )
            })}
          </div>
        )
      })}

      <div className="text-xs text-[var(--subtle)] pt-2">
        Full 104-match schedule (all groups + complete bracket) + real per-match lock times + server-backed persistence coming in the next implementation steps. Picks above are saved to this browser for the current wallet.
      </div>
    </div>
  )
}
