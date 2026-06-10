import { motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import { useWallet } from '@solana/wallet-adapter-react'
import { PotDisplay } from '../components/PotDisplay'
import { SendEntryButton } from '../components/SendEntryButton'

export function Home() {
  const { connected } = useWallet()

  return (
    <div className="space-y-16 pb-12">
      {/* Hero */}
      <div className="pt-12 md:pt-16 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface-2)] px-4 py-1 text-xs tracking-[3px] text-[var(--subtle)] mb-6"
        >
          FIFA WORLD CUP 2026  •  48 TEAMS  •  104 MATCHES
        </motion.div>

        <h1 className="display text-[72px] md:text-[92px] font-semibold tracking-[-5.5px] leading-[0.88] text-[var(--text-h)] mb-4">
          The most<br />premium<br />World Cup pool.
        </h1>

        <p className="max-w-md mx-auto text-xl text-[var(--text)] tracking-[-0.2px]">
          Send a fixed amount of the official token to the treasury.<br />
          Your wallet becomes your identity. Predict 1X2. Top scorers take the pot.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-9">
          <NavLink 
            to="/predict" 
            className="btn-outline px-9 py-3.5 text-base"
          >
            View Matches &amp; Predict
          </NavLink>
          <SendEntryButton />
        </div>

        <div className="mt-4 text-xs text-[var(--subtle)]">
          {connected 
            ? "Wallet connected — send the entry fee from this address to unlock your profile" 
            : "Connect your wallet to participate"}
        </div>
      </div>

      {/* Live Pot — the hero visual */}
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-4">
          <div className="pill mx-auto mb-3">LIVE ON-CHAIN</div>
          <div className="text-[var(--subtle)] text-sm tracking-[1.5px] font-medium">THE POT</div>
        </div>
        <PotDisplay />
      </div>

      {/* How it works — clean, premium steps */}
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <div className="section-title">How the league works</div>
          <p className="text-[var(--subtle)] mt-2">Simple. Transparent. On-chain verifiable.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {[
            {
              num: "01",
              title: "Send to Treasury",
              desc: "One-time entry fee sent from your wallet to the official treasury. Your sending address = your permanent league profile."
            },
            {
              num: "02", 
              title: "Predict Outcomes",
              desc: "For every match, pick Home, Draw, or Away. 3 points for every correct pick. Picks lock at kickoff."
            },
            {
              num: "03",
              title: "Win the Pot",
              desc: "Highest total points after the final (or at phase closes) wins. All payouts are manual from the visible treasury you can verify on Solscan."
            }
          ].map((step, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -4 }}
              className="card group"
            >
              <div className="font-mono text-xs tracking-[3px] text-[var(--accent-2)] mb-3">{step.num}</div>
              <div className="text-[var(--text-h)] text-2xl font-semibold tracking-[-0.5px] mb-3 group-hover:text-[var(--accent-2)] transition-colors">{step.title}</div>
              <p className="text-[15px] leading-relaxed text-[var(--text)]">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Trust / New Age Signals */}
      <div className="max-w-3xl mx-auto text-center">
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-[var(--subtle)]">
          <div>✓ Wallet = Identity (no email, no custodial accounts)</div>
          <div>✓ Pot = Real-time treasury balance</div>
          <div>✓ Every entry &amp; payout is public on Solana</div>
          <div>✓ Skill-based contest • No house edge</div>
        </div>
      </div>

      <div className="text-center pt-6">
        <NavLink to="/leaderboard" className="text-[var(--accent-2)] hover:text-[var(--accent-strong)] font-medium text-sm tracking-wider flex items-center justify-center gap-1.5">
          VIEW CURRENT STANDINGS <span>→</span>
        </NavLink>
      </div>
    </div>
  )
}
