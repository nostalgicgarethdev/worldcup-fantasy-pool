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
      <div className="glass rounded-2xl border border-white/10 px-3.5 py-1 text-[10px] flex items-center gap-2 font-medium tracking-widest">
        <span className="text-[var(--subtle)]/80">POT</span>
        <span className="font-mono text-[var(--text-h)] tabular-nums text-xs">
          {loading ? '...' : displayAmount} {config.tokenSymbol}
        </span>
      </div>
    )
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      className="glass relative overflow-hidden p-10 md:p-14 rounded-3xl"
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

      {/* Liquid glass depth layers */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.06),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.04),transparent_60%)] pointer-events-none" />

      {isConfigured && (
        <div className="relative z-10 mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-xs">
          <div className="font-mono text-[var(--subtle)]/80 break-all tracking-wider">
            {shortAddress(treasury, 6, 6)}
          </div>
          {!hasMint && (
            <div className="text-[var(--warn)]/90 text-[10px] px-2 py-px rounded bg-white/5">Set mint in config for token balance</div>
          )}
        </div>
      )}

      {!isConfigured && (
        <div className="relative z-10 mt-4 text-sm text-[var(--warn)]/90">
          Treasury set. Provide your pump.fun token mint for full $TOKEN display + transfers.
        </div>
      )}
    </motion.div>
  )
}
