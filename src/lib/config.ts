// Config for the WC Fantasy Pool (edit these for your token + treasury)
export const config = {
  // === REPLACE THESE WITH YOUR REAL VALUES ===
  // Your pump.fun $TOKEN mint address (CA)
  tokenMint: 'YOUR_TOKEN_MINT_HERE',

  // Treasury wallet that receives all entry fees.
  // The live $TOKEN balance here = the pot (fully transparent on-chain).
  // You control distributions to winners.
  treasuryWallet: 'YOUR_TREASURY_WALLET_HERE',

  // Entry fee in whole tokens (adjust to what you want people to send).
  // Example: 100000 means 100,000 of your token (the app handles decimals).
  // Most pump.fun tokens use 6 decimals.
  entryFee: 100000,

  // Token decimals (6 is standard for most meme / pump tokens)
  tokenDecimals: 6,

  // Browser-friendly Solana RPC (publicnode works well for CORS in the browser).
  // For production load you can swap to a paid Helius/QuickNode via env.
  solanaRpcUrl: 'https://solana-rpc.publicnode.com',

  // Optional: your organizer/admin wallet (for auto-gating the Admin panel).
  // If left as null, admin is accessible when the connected wallet matches treasuryWallet.
  adminWallet: null as string | null,

  // Human label for the token (update after you give the real one)
  tokenSymbol: '$WCPOOL',
  tokenName: 'WC Pool Token',
}

// Helper: entry fee in raw units (for on-chain transfer)
export const entryFeeRaw = BigInt(config.entryFee) * BigInt(10 ** config.tokenDecimals)