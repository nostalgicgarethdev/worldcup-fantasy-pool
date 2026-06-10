import { useEffect, useMemo, useState } from 'react'
import { Connection, PublicKey } from '@solana/web3.js'
import { config } from '../lib/config'
import { formatTokenAmount, shortAddress } from '../lib/format'
import { motion } from 'framer-motion'

export function PotDisplay({ compact = false }: { compact?: boolean }) {
  const [, setSol] = useState<number | null>(null)
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
      if (!config.treasuryWallet) {
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
        } else {
          // Still show something if mint not configured yet
          if (!cancelled) setTokenBal(null)
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
    const id = setInterval(load, 25000)
    return () => {
      cancelled = true
      clearInterval(id)
    }
  }, [connection])

  const treasury = config.treasuryWallet
  const hasMint = config.tokenMint && !config.tokenMint.includes('YOUR_')
  const isConfigured = treasury && !treasury.includes('YOUR_')

  const displayAmount = tokenBal != null 
    ? formatTokenAmount(BigInt(Math.floor(tokenBal * 1e6)), config.tokenDecimals) 
    : '—'

  if (compact) {
    return (
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-2)] px-4 py-1.5 text-xs flex items-center gap-2 font-medium">
        <span className="text-[var(--subtle)]">POT</span>
        <span className="font-mono text-[var(--text-h)] tabular-nums">
          {loading ? '...' : displayAmount} {config.tokenSymbol}
        </span>
      </div>
    )
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8 md:p-12"
    >
      <div className="flex items-start justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="pill">
              <span className="live-dot inline-block w-1.5 h-1.5 rounded-full bg-[var(--success)]" /> LIVE
            </div>
            <div className="text-xs uppercase tracking-[2px] text-[var(--subtle)] font-medium">TREASURY BALANCE</div>
          </div>

          <div className="flex items-baseline gap-3">
            <div className="text-[72px] md:text-[86px] font-semibold tracking-[-4.5px] leading-none text-[var(--text-h)] tabular-nums">
              {loading ? '…' : displayAmount}
            </div>
            <div className="text-3xl font-medium text-[var(--text)] pb-2">{config.tokenSymbol}</div>
          </div>

          <div className="text-sm text-[var(--subtle)] mt-1">
            Real-time on-chain • Refreshes every ~25s
          </div>
        </div>

        {isConfigured && (
          <a 
            href={`https://solscan.io/account/${treasury}`}
            target="_blank"
            rel="noreferrer"
            className="btn-ghost text-xs mt-1 hidden md:flex"
          >
            VIEW ON SOLSCAN →
          </a>
        )}
      </div>

      {isConfigured && (
        <div className="mt-8 pt-6 border-t border-[var(--border)] flex items-center justify-between text-xs">
          <div className="font-mono text-[var(--subtle)] break-all">
            {shortAddress(treasury, 6, 6)}
          </div>
          {!hasMint && (
            <div className="text-[var(--warn)] text-[10px]">Add your token mint in config.ts to show exact $TOKEN balance</div>
          )}
        </div>
      )}

      {!isConfigured && (
        <div className="mt-4 text-sm text-[var(--warn)]">
          Treasury address configured. Add your pump.fun token mint for full balance display and transfers.
        </div>
      )}
    </motion.div>
  )
}
