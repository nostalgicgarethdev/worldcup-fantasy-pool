import { motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import { useWallet } from '@solana/wallet-adapter-react'
import { PotDisplay } from '../components/PotDisplay'
import { SendEntryButton } from '../components/SendEntryButton'

export function Home() {
  const { connected } = useWallet()

  return (
    <div className="space-y-16 pb-12 relative">
      {/* Subtle liquid background accents for new-age depth */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-[radial-gradient(circle,#a855f7_0%,transparent_70%)] opacity-[0.035] blur-3xl" />
        <div className="absolute bottom-[-30%] right-[-15%] w-[700px] h-[700px] bg-[radial-gradient(circle,#7c3aed_0%,transparent_65%)] opacity-[0.04] blur-3xl" />
      </div>

      {/* Hero */}
      <div className="pt-12 md:pt-16 text-center relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 backdrop-blur px-5 py-1 text-xs tracking-[3.5px] text-[var(--subtle)] mb-8"
        >
          FIFA WORLD CUP 2026  •  48 TEAMS  •  104 MATCHES
        </motion.div>

        <h1 className="display text-[68px] md:text-[88px] font-semibold tracking-[-5.8px] leading-[0.86] text-[var(--text-h)] mb-5">
          The most<br />premium<br />World Cup pool.
        </h1>

        <p className="max-w-[460px] mx-auto text-[17px] text-[var(--text)]/90 tracking-[-0.15px]">
          Send the entry in the official token to the treasury.<br />
          Your sending wallet <span className="text-[var(--text-h)]">is</span> your identity. 
          Predict 1X2. Highest scorers claim the pot.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-10">
          <NavLink 
            to="/predict" 
            className="btn-outline px-9 py-3.5 text-base"
          >
            Explore Matches
          </NavLink>
          <SendEntryButton />
        </div>

        <div className="mt-5 text-xs text-[var(--subtle)]/80">
          {connected 
            ? "Connected — send entry from this wallet to join the league" 
            : "Connect wallet to send entry or view your profile"}
        </div>
      </div>

      {/* Live Pot — Heavy Frost style (matching the reference "Heavy Frost" preset) */}
      <div className="max-w-[760px] mx-auto px-2">
        <div className="text-center mb-5">
          <div className="inline-flex items-center gap-2 text-[10px] tracking-[3px] text-[var(--subtle)]/70 font-medium mb-1">LIVE • VERIFIABLE ON SOLANA</div>
          <div className="text-2xl tracking-[-1px] text-[var(--text-h)]">The Pot</div>
        </div>
        <PotDisplay />
      </div>

      {/* How it works — clean, premium steps */}
      <div className="max-w-4xl mx-auto">
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
              whileHover={{ y: -3 }}
              className="glass group p-7 md:p-8"
            >
              <div className="font-mono text-xs tracking-[3.5px] text-[var(--accent-2)]/90 mb-4">{step.num}</div>
              <div className="text-[var(--text-h)] text-[22px] font-semibold tracking-[-0.6px] mb-3.5 group-hover:text-[var(--accent-2)] transition-colors">{step.title}</div>
              <p className="text-[15px] leading-relaxed text-[var(--text)]/90">{step.desc}</p>
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
