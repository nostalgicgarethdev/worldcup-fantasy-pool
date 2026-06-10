export function Leaderboard() {
  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-tight text-[var(--text-h)] mb-2">Leaderboard</h1>
      <p className="text-[var(--subtle)] mb-6">Ranked by total correct predictions (3 pts each). Phase views (Group Stage / Overall) coming with scoring engine.</p>

      <div className="card">
        <div className="text-sm">Leaderboard will show real entrants (wallets that sent the exact entry fee to the treasury) + their points once the scoring + DB layer is live.</div>
        <div className="mt-3 text-xs text-[var(--subtle)]">Temporary placeholder — full ranked table with optional usernames, group pts vs total, and links to public profiles will be here shortly.</div>
      </div>
    </div>
  )
}
