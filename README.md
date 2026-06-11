# WC Fantasy Pool — FIFA World Cup 2026 (Token Entry)

<p align="center">
  <img src="public/wcpool-logo.png" alt="WCPOOL Logo" width="200" />
</p>

**GitHub:** https://github.com/nostalgicgarethdev/worldcup-fantasy-pool

Real $TOKEN (pump.fun) prediction pool for the 2026 World Cup.

Users send a fixed entry fee from their Solana wallet to the treasury. Their sending address becomes their permanent league profile. Pick Home, Draw, or Away on matches. 3 points per correct outcome. The organizer enters results through the built-in admin, the leaderboard updates live, and top scorers win from the visible pot.

## Features

- Complete official 104-match 2026 schedule (all 72 group stage + full knockout bracket with placeholders)
- Premium liquid glass UI over a realistic soccer stadium background
- Solana wallet connect (Phantom + Solflare)
- Live on-chain treasury pot balance
- Real SPL token entry transfers when configured
- Full prediction interface across every group
- Working admin panel — enter results and instantly see updated scores, leaderboard, and profiles
- Per-wallet prediction persistence and dynamic live scoring

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

- The big **Pot** on the homepage shows the live $TOKEN balance of the treasury.
- The **Send X $TOKEN & Join** button builds a real SPL token transfer.
- The sender’s wallet address becomes their permanent identity in the league.

Start with a test mint on devnet. Switch to your real pump.fun token when you're ready for mainnet.

## How It Works

1. User connects their Solana wallet.
2. They send the exact entry fee from their wallet to the treasury (via the in-app button or by pasting the address into Phantom/Solflare).
3. Their sending address is now their permanent profile in the pool.
4. They submit 1X2 predictions on matches.
5. The organizer goes to `/admin` and enters results after matches.
6. Scores update live. The leaderboard and every profile reflect the current standings immediately.
7. At the end of phases or after the final, the organizer distributes prizes from the treasury to the winning wallets. The app provides the full ranked list.

All treasury activity is publicly verifiable on Solscan.

## Demo Admin

A fully functional demo admin is included so you can experience the complete scoring flow right away:

- Use the **Demo pay** button to simulate joining the pool.
- Make predictions across the groups.
- Open `/admin` and start entering results for matches.
- Watch the leaderboard and profiles update instantly.

Everything runs on localStorage for demo and development purposes. Perfect for testing the full experience.

## Important Notes

- This is a **skill-based fantasy contest**, not gambling. Frame it that way.
- The organizer controls the treasury and is responsible for paying winners.
- For real use with meaningful money, strongly recommend using a multisig for the treasury wallet.
- Start with a throwaway mint on devnet while testing.
