// Simple demo scoring for WC Pool.
// In real version this runs server-side from verified picks + official results.

export type Outcome = 'H' | 'D' | 'A'
export type PickMap = Record<number, Outcome>

// Demo results for early matches (matchday 1+). 
// Format: matchId -> correct outcome. Expand as matches are played.
// These can be overridden live via Admin (persisted to localStorage for this demo).
const STORAGE_KEY = 'wc-demo-results'

function loadOverrides(): Record<number, Outcome> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch { return {} }
}

const baseDemoResults: Record<number, Outcome> = {
  // Group A - matchday 1 (2026-06-11)
  1: 'H',   // Mexico beat South Africa
  2: 'A',   // Czech Republic beat South Korea (demo)
  // Group B opener
  7: 'H',   // Canada over Bosnia
}

export function getDemoResults(): Record<number, Outcome> {
  return { ...baseDemoResults, ...loadOverrides() }
}

// Back-compat export for modules that imported { demoResults }
export const demoResults = getDemoResults()

export function saveDemoResult(matchId: number, outcome: Outcome | null) {
  const cur = loadOverrides()
  if (outcome) cur[matchId] = outcome
  else delete cur[matchId]
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cur))
}

// Compute points for a set of picks against results (3 pts per correct)
export function computeScore(picks: PickMap, results: Record<number, Outcome> = getDemoResults()): number {
  let score = 0
  for (const [midStr, pick] of Object.entries(picks)) {
    const mid = Number(midStr)
    const correct = results[mid]
    if (correct && pick === correct) score += 3
  }
  return score
}

// Very small demo entrants for the leaderboard (local only)
export const demoEntrants = [
  { wallet: 'DemoLeader88x', picks: {1:'H',2:'D',7:'A'} as PickMap, label: 'Leader (demo)' },
  { wallet: '3i5oTdPCydCEGJSkHLsFm1hck4nxdhiCuGDmyr47HNHT', picks: {1:'H',2:'A',7:'H'} as PickMap, label: 'Treasury (organizer)' },
]

export function getDemoLeaderboard(currentWalletPicks?: PickMap, currentWallet?: string) {
  const rows = demoEntrants.map(e => ({
    wallet: e.wallet,
    score: computeScore(e.picks),
    picksCount: Object.keys(e.picks).length,
    label: e.label,
  }))

  if (currentWalletPicks && Object.keys(currentWalletPicks).length > 0 && currentWallet) {
    const myScore = computeScore(currentWalletPicks)
    rows.unshift({
      wallet: currentWallet,
      score: myScore,
      picksCount: Object.keys(currentWalletPicks).length,
      label: 'You',
    })
  }

  // sort desc by score, then by picks made
  return rows.sort((a, b) => b.score - a.score || b.picksCount - a.picksCount)
}
