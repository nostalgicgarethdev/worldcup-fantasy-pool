export function Leaderboard() {
  return (
    <div>
      <h1 className="text-4xl font-semibold tracking-[-1.5px] text-[var(--text-h)] mb-2">Leaderboard</h1>
      <p className="text-[var(--subtle)] mb-8 max-w-md">Ranked by total correct predictions. Phase views and live scoring coming soon.</p>

      <div className="glass p-8">
        <div className="text-sm">Real entrants (wallets that sent the exact entry fee) + their points will appear here once the scoring engine and backend are connected.</div>
        <div className="mt-4 text-xs text-[var(--subtle)]/70">Full table with usernames, phase filters, and public profile links loading next.</div>
      </div>
    </div>
  )
}
