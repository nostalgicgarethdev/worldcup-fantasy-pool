# WC Fantasy Pool — FIFA World Cup 2026 (Token Entry)

**GitHub:** https://github.com/nostalgicgarethdev/worldcup-fantasy-pool

**Live site:** Deploy via Vercel (see below) — now with a premium, new-age professional design.

Real $TOKEN (pump.fun) prediction pool. Users send a fixed entry fee from their wallet to your treasury. The sending address becomes their league profile. 1X2 picks on matches. 3 pts per correct outcome. Staged phase winners + final overall winner take (portions of) the visible pot.

Real $TOKEN (pump.fun) prediction pool. Users send a fixed entry fee from their wallet to your treasury. The sending address becomes their league profile. 1X2 picks on matches. 3 pts per correct outcome. Staged phase winners + final overall winner take (portions of) the visible pot.

## Quick Start (Local)

```bash
cd worldcup-fantasy-pool
npm install
npm run dev
```

Open http://localhost:5173

## First Run — Configure Your Token & Treasury

Edit `src/lib/config.ts`:

```ts
tokenMint: 'YOUR_REAL_PUMPFUN_MINT_HERE',
treasuryWallet: 'YOUR_TREASURY_WALLET_ADDRESS_HERE',
entryFee: 100000,   // change to whatever X you want
```

- The big **Pot** card on the home page shows the live $TOKEN balance of the treasury (exactly like your other treasury displays).
- When users click **Send X $TOKEN & Join**, the app builds a real SPL token transfer and sends it to the treasury (user approves in Phantom/Solflare).
- Their **sending wallet address** is now a league member / profile.

For testing you can use devnet + a test mint first, then switch to mainnet + your real token.

## How Entry Works (per your spec)

1. User connects wallet.
2. They send the exact fee (in-app button or manual copy-paste to Phantom) **from their wallet to the treasury**.
3. The **from address** = their identity in the pool.
4. Once sent (and verified), they can submit 1X2 predictions for matches.
5. Organizer (treasury controller) enters results after matches.
6. Leaderboard + phase leaders update.
7. At phase ends / final you manually send prize(s) from the treasury to the winning wallet(s). The app gives you the ranked list.

Everything is transparent — anyone can look at the treasury on Solscan.

## Current Status (MVP in progress)

- ✅ Dark clean UI (matches your forge-agents / DePIN style)
- ✅ Wallet connect (Phantom + Solflare)
- ✅ Live treasury pot balance (SOL + your $TOKEN)
- ✅ Real SPL token entry transfer (Send button builds the tx)
- ✅ Working per-wallet prediction picks (saved locally for demo)
- ✅ Demo "pay" for instant testing without real tokens
- ⏳ Full 104 matches + real server + SQLite + scoring engine + admin result entry + payout list (being added next)
- ⏳ Optional display usernames (sign message after entry)

## Next (what will be added very soon)

- Full match schedule (all groups + knockout bracket from official data)
- Server-backed persistence (SQLite today, easy Supabase later)
- Real scoring + live leaderboard
- Admin panel for entering results + generating payout lists
- Proper lock times + tx verification endpoint for entries

## Deploy (Recommended)

The site is designed to be deployed as a static frontend (Vercel is perfect and what your other projects use).

**Fastest professional deploy:**

1. Go to https://vercel.com/new
2. Import the GitHub repo: `nostalgicgarethdev/worldcup-fantasy-pool`
3. Vercel will auto-detect Vite + use the `vercel.json` we added for React Router.
4. Deploy.

Every push to main will auto-deploy.

You can also run locally with `npm run build && npx vercel --prod` after running `vercel login`.

**Note on the token:** The treasury is now set. For the Send Entry button and exact $TOKEN pot balance to work, also set your pump.fun token mint in `src/lib/config.ts`. Currently transfers will show a friendly error until the mint is provided.

## Design

The UI has been elevated to a very premium, new-age, high-end aesthetic:
- Bold confident typography
- Luxurious live Pot display as the hero element
- Clean modern cards with excellent spacing
- Subtle professional motion (framer-motion)
- Strong visual hierarchy and trust signals
- Tactile prediction pickers

Not bland — sharp, expensive, web3/sports product feel.

## Important Notes

- This is a **skill-based fantasy contest**, not gambling. Frame it that way.
- You (the organizer) control the treasury and are responsible for paying winners.
- Strongly recommend using a multisig for the treasury once the pot is non-trivial.
- Test on devnet first with a throwaway mint.

When you're ready, paste your real token mint + treasury address and I'll pre-fill + help test a real transfer.
