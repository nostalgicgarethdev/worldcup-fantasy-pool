import { useParams } from 'react-router-dom'
import { useWallet } from '@solana/wallet-adapter-react'

export function Profile() {
  const { wallet } = useParams()
  const { publicKey, connected } = useWallet()
  const target = wallet || (connected && publicKey ? publicKey.toBase58() : null)

  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-tight text-[var(--text-h)] mb-2">Profile</h1>

      {!target && <div className="card max-w-md">Connect a wallet or visit a profile URL to see picks and entry status.</div>}

      {target && (
        <div className="space-y-4">
          <div className="card">
            <div className="font-mono text-sm break-all text-[var(--text-h)]">{target}</div>
            <div className="text-xs text-[var(--subtle)] mt-1">This wallet's sending address is their league identity (after they send the entry fee to the treasury).</div>
          </div>

          <div className="card text-sm">Picks, points, and entry proof will appear here once the full data layer + scoring is implemented.</div>
        </div>
      )}
    </div>
  )
}
