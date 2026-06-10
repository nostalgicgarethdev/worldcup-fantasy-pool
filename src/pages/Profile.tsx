import { useParams } from 'react-router-dom'
import { useWallet } from '@solana/wallet-adapter-react'

export function Profile() {
  const { wallet } = useParams()
  const { publicKey, connected } = useWallet()
  const target = wallet || (connected && publicKey ? publicKey.toBase58() : null)

  return (
    <div>
      <h1 className="text-4xl font-semibold tracking-[-1.5px] text-[var(--text-h)] mb-2">Profile</h1>

      {!target && <div className="glass max-w-md p-7">Connect a wallet or paste a profile address to view picks and entry status.</div>}

      {target && (
        <div className="space-y-5 max-w-2xl">
          <div className="glass p-7">
            <div className="font-mono text-base break-all text-[var(--text-h)] tracking-wider">{target}</div>
            <div className="text-xs mt-2 text-[var(--subtle)]">Sending address from treasury deposit = permanent league profile.</div>
          </div>

          <div className="glass p-7 text-sm">Picks and points will load here once scoring + persistent storage are connected.</div>
        </div>
      )}
    </div>
  )
}
