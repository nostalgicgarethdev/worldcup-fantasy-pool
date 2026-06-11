import { motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import { useWallet } from '@solana/wallet-adapter-react'
import { PotDisplay } from '../components/PotDisplay'
import { SendEntryButton } from '../components/SendEntryButton'

export function Home() {
  const { connected } = useWallet()

  return (
    <div className="space-y-16 pb-12 relative">
      {/* Hero */}
      <div className="pt-12 md:pt-16 text-center relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 backdrop-blur px-5 py-1.5 text-sm tracking-[3.5px] text-white mb-8 drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]"
        >
          FIFA WORLD CUP 2026  •  48 TEAMS  •  104 MATCHES
        </motion.div>

        <h1 className="display text-[76px] md:text-[100px] font-semibold tracking-[-6.2px] leading-[0.8] text-white mb-6 drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]">
          The most<br />premium<br />World Cup pool.
        </h1>

        <p className="max-w-[520px] mx-auto text-[17px] md:text-[21px] text-white tracking-[-0.1px] drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
          Send the entry in the official token to the treasury.<br />
          Your sending wallet <span className="text-white font-medium">is</span> your identity. 
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

        <div className="mt-5 text-sm text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
          {connected 
            ? "Connected — send entry from this wallet to join the league" 
            : "Connect wallet to send entry or view your profile"}
        </div>
      </div>

      {/* Live Pot — Heavy Frost style (matching the reference "Heavy Frost" preset) */}
      <div className="max-w-[760px] mx-auto px-2">
        <div className="text-center mb-5">
          <div className="inline-flex items-center gap-2 text-sm tracking-[3px] text-white font-medium mb-1 drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">LIVE • VERIFIABLE ON SOLANA</div>
          <div className="text-[32px] md:text-[36px] tracking-[-1.5px] text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)] font-semibold">The Pot</div>
        </div>
        <PotDisplay />
      </div>

      {/* How it works — horizontal scroll-snap (inspired by https://webflow-scroll-snap.webflow.io/)
          Turns the vertical stack into a beautiful, interactive horizontal snap experience.
          Keeps the page from feeling "too long". Pure liquid glass cards that snap into place. */}
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-6">
          <div className="section-title text-[28px] md:text-[32px] tracking-[-0.6px]">How the league works</div>
          <p className="text-white text-[15px] mt-1.5 tracking-[-0.1px] drop-shadow">Simple. Transparent. On-chain verifiable.</p>
        </div>

        {/* Premium horizontal snap scroller with liquid glass cards */}
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-8 -mx-4 px-4 md:mx-0 md:px-0">
          {[
            {
              num: "01",
              title: "Send to Treasury",
              desc: "Send the one-time entry fee from your wallet to the treasury. Your address = your profile."
            },
            {
              num: "02", 
              title: "Predict Outcomes",
              desc: "Pick Home, Draw or Away for each match. 3 points per correct pick. Locks at kickoff."
            },
            {
              num: "03",
              title: "Win the Pot",
              desc: "Most points after the final wins. Payouts from the visible treasury (verify on Solscan)."
            }
          ].map((step, i) => (
            <motion.div 
              key={i}
              whileHover={{ scale: 1.01 }}
              className="glass group p-6 md:p-7 text-base flex-shrink-0 w-[88%] sm:w-[360px] snap-center relative overflow-hidden"
            >
              {/* Subtle liquid highlight on the card */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
              
              <div className="font-mono text-sm tracking-[3px] text-white mb-2 drop-shadow">{step.num}</div>
              <div className="text-white text-2xl font-semibold tracking-[-0.4px] mb-3 group-hover:text-white transition-colors drop-shadow">{step.title}</div>
              <p className="text-base leading-relaxed text-white/95 drop-shadow relative z-10">{step.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center text-xs text-white -mt-4 mb-2 md:hidden tracking-widest">
          ← DRAG OR SWIPE TO EXPLORE →
        </div>
      </div>

      {/* Trust / New Age Signals */}
      <div className="max-w-3xl mx-auto text-center">
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-base text-white drop-shadow">
          <div>✓ Wallet = Identity (no email, no custodial accounts)</div>
          <div>✓ Pot = Real-time treasury balance</div>
          <div>✓ Every entry &amp; payout is public on Solana</div>
          <div>✓ Skill-based contest • No house edge</div>
        </div>
      </div>

      <div className="text-center pt-6">
        <NavLink to="/leaderboard" className="text-white hover:text-white font-medium text-base tracking-wider flex items-center justify-center gap-1.5 drop-shadow">
          VIEW CURRENT STANDINGS <span>→</span>
        </NavLink>
      </div>
    </div>
  )
}
