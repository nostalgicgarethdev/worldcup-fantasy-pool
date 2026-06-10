import { useEffect, useState } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { matches, type Match } from '../data/matches'
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
        <div className="glass max-w-sm p-6">
          <p className="mb-3 text-sm">Connect a real wallet for production use. Current view is a working demo.</p>
          <WalletMultiButton />
        </div>
      )}

      {!hasEntry && (
        <div className="glass border border-white/10 p-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
            <div>
              <div className="font-medium text-[var(--text-h)]">You have not entered yet</div>
              <div className="text-sm text-[var(--subtle)] mt-1">Send exactly {config.entryFee.toLocaleString()} {config.tokenSymbol} from this wallet to the treasury.<br />The sending address becomes your profile.</div>
            </div>
            <div className="flex gap-2 mt-3 sm:mt-0">
              <SendEntryButton onSuccess={() => setHasEntry(true)} />
              <button onClick={demoPay} className="btn-outline text-xs whitespace-nowrap">Demo pay</button>
            </div>
          </div>
        </div>
      )}

      {groupsWithMatches.map(group => {
        const groupMatches = matches.filter(m => m.group === group)
        return (
          <div key={group} className="space-y-3">
            <div className="text-[10px] uppercase tracking-[2.5px] text-[var(--subtle)]/70 pl-1.5 mb-1">GROUP {group}</div>
            {groupMatches.map((m: Match) => {
              const current = picks[m.id]
              const locked = false // real lock time logic later
              return (
                <div key={m.id} className="glass flex flex-col md:flex-row md:items-center gap-4 md:gap-6 p-5 md:p-6">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-3 text-lg">
                      <span className="font-semibold text-[var(--text-h)] tracking-[-0.3px]">{m.home}</span>
                      <span className="text-[10px] uppercase tracking-[2px] text-[var(--subtle)]/70">vs</span>
                      <span className="font-semibold text-[var(--text-h)] tracking-[-0.3px]">{m.away}</span>
                    </div>
                    <div className="text-xs text-[var(--subtle)]/80 mt-1.5">{m.date} {m.time} • {m.venue}</div>
                  </div>

                  <div className="flex gap-2 md:gap-2.5 md:min-w-[300px]">
                    {(['H', 'D', 'A'] as const).map(p => (
                      <button
                        key={p}
                        disabled={!hasEntry || locked}
                        onClick={() => setPick(m.id, p)}
                        className={`flex-1 rounded-2xl border py-[9px] text-sm font-medium transition-all active:scale-[0.985] ${current === p 
                          ? 'border-[var(--accent-2)] bg-white/5 text-[var(--text-h)] shadow-inner' 
                          : 'border-white/10 hover:border-white/25 text-[var(--text)] hover:text-[var(--text-h)]'}`}
                      >
                        {p === 'H' ? 'Home' : p === 'D' ? 'Draw' : 'Away'}
                      </button>
                    ))}
                  </div>

                  {current && <div className="text-[10px] uppercase tracking-widest text-[var(--accent-2)]/90 md:w-14 md:text-right font-medium">Picked {current}</div>}
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
