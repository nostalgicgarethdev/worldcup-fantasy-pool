import { useEffect, useMemo, useState } from 'react'
import { Connection, PublicKey } from '@solana/web3.js'
import { config, entryFeeRaw } from '../lib/config'
import { formatTokenAmount, shortAddress } from '../lib/format'

export function PotDisplay({ compact = false }: { compact?: boolean }) {
  const [sol, setSol] = useState<number | null>(null)
  const [tokenBal, setTokenBal] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  const connection = useMemo(
    () => new Connection(config.solanaRpcUrl, 'confirmed'),
    [],
  )

  useEffect(() => {
    let cancelled = false
    setLoading(true)

    async function load() {
      if (!config.treasuryWallet || config.treasuryWallet.includes('YOUR_')) {
        if (!cancelled) {
          setSol(null)
          setTokenBal(null)
          setLoading(false)
        }
        return
      }

      try {
        const pubkey = new PublicKey(config.treasuryWallet)
        const lamports = await connection.getBalance(pubkey)
        if (!cancelled) setSol(lamports / 1_000_000_000)

        if (config.tokenMint && !config.tokenMint.includes('YOUR_')) {
          const mintKey = new PublicKey(config.tokenMint)
          const accounts = await connection.getParsedTokenAccountsByOwner(pubkey, { mint: mintKey })
          let total = 0
          for (const a of accounts.value) {
            const info = a.account.data as any
            total += info.parsed?.info?.tokenAmount?.uiAmount ?? 0
          }
          if (!cancelled) setTokenBal(total)
        }
      } catch (e) {
        console.error('Failed to load treasury balance', e)
        if (!cancelled) {
          setSol(null)
          setTokenBal(null)
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    const id = setInterval(load, 30000) // refresh every 30s
    return () => {
      cancelled = true
      clearInterval(id)
    }
  }, [connection])

  const treasury = config.treasuryWallet
  const isPlaceholder = !treasury || treasury.includes('YOUR_')

  if (compact) {
    return (
      <div className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-xs flex items-center gap-2">
        <span className="text-[var(--subtle)]">Pot</span>
        <span className="font-mono text-[var(--text-h)]">
          {loading ? '...' : isPlaceholder ? '—' : `${formatTokenAmount(BigInt(Math.floor((tokenBal ?? 0) * 1e6)), config.tokenDecimals)} ${config.tokenSymbol}`}
        </span>
      </div>
    )
  }

  return (
    <div className="card">
      <div className="flex items-baseline justify-between gap-3">
        <div>
          <div className="stat-label">Current Pot (live on-chain)</div>
          <div className="stat mt-1">
            {loading ? '...' : isPlaceholder ? 'Configure treasury' : `${tokenBal != null ? formatTokenAmount(BigInt(Math.floor(tokenBal * 1e6)), config.tokenDecimals) : '0'} ${config.tokenSymbol}`}
          </div>
          <div className="text-[10px] text-[var(--subtle)] mt-0.5">Treasury $TOKEN balance • updates every 30s</div>
        </div>
        <a
          href={treasury && !isPlaceholder ? `https://solscan.io/account/${treasury}` : '#'}
          target="_blank"
          rel="noreferrer"
          className="text-xs text-[var(--accent)] hover:underline"
        >
          View on Solscan ↗
        </a>
      </div>

      {!isPlaceholder && (
        <div className="mt-3 text-[10px] font-mono break-all text-[var(--subtle)] border-t border-[var(--border)] pt-2">
          {treasury}
        </div>
      )}
      {isPlaceholder && (
        <div className="mt-2 text-xs text-[var(--warn)]">Replace TREASURY_WALLET in src/lib/config.ts with your real address.</div>
      )}
    </div>
  )
}
