import { useState } from 'react'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { PublicKey, Transaction } from '@solana/web3.js'
import { getAssociatedTokenAddress, createTransferInstruction, createAssociatedTokenAccountInstruction, getAccount } from '@solana/spl-token'
import { toast } from 'sonner'
import { config, entryFeeRaw } from '../lib/config'

export function SendEntryButton({ onSuccess }: { onSuccess?: (sig: string) => void }) {
  const { connection } = useConnection()
  const { publicKey, sendTransaction } = useWallet()
  const [loading, setLoading] = useState(false)

  const disabled = !publicKey || loading || config.tokenMint.includes('YOUR_') || config.treasuryWallet.includes('YOUR_')

  async function handleSend() {
    if (!publicKey) return
    setLoading(true)

    try {
      const mint = new PublicKey(config.tokenMint)
      const treasury = new PublicKey(config.treasuryWallet)

      // User's ATA
      const userAta = await getAssociatedTokenAddress(mint, publicKey)
      // Treasury ATA
      const treasuryAta = await getAssociatedTokenAddress(mint, treasury)

      const tx = new Transaction()

      // Ensure treasury ATA exists (best effort)
      try {
        await getAccount(connection, treasuryAta)
      } catch {
        tx.add(createAssociatedTokenAccountInstruction(publicKey, treasuryAta, treasury, mint))
      }

      // Ensure user ATA exists
      try {
        await getAccount(connection, userAta)
      } catch {
        tx.add(createAssociatedTokenAccountInstruction(publicKey, userAta, publicKey, mint))
      }

      // The actual transfer
      tx.add(
        createTransferInstruction(
          userAta,
          treasuryAta,
          publicKey,
          entryFeeRaw,
        )
      )

      const { blockhash } = await connection.getLatestBlockhash()
      tx.recentBlockhash = blockhash
      tx.feePayer = publicKey

      const signature = await sendTransaction(tx, connection)
      await connection.confirmTransaction(signature, 'confirmed')

      toast.success('Entry sent! Wallet is now a league member.', { description: signature.slice(0, 16) + '...' })

      // Mark as paid locally for demo (real version will call /api/enter with sig for verification)
      localStorage.setItem(`wc-paid-${publicKey.toBase58()}`, signature)

      onSuccess?.(signature)
    } catch (e: any) {
      console.error(e)
      toast.error('Send failed', { description: e?.message || 'Check balance, network, and config (mint/treasury)' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleSend}
      disabled={disabled}
      className="btn-primary w-full md:w-auto px-8 py-3.5 text-base disabled:opacity-60 disabled:grayscale"
    >
      {loading ? 'Sending to treasury...' : `Send ${config.entryFee.toLocaleString()} ${config.tokenSymbol} & Join`}
    </button>
  )
}
