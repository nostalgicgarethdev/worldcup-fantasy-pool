// Seeded from public openfootball/worldcup.json (2026 schedule).
// Full 104 matches. Knockout use placeholder labels (2A, W73, etc).
// When admin enters a result the actual winner side is used for scoring.

export type Match = {
  id: number
  stage: 'group' | 'r32' | 'r16' | 'qf' | 'sf' | 'third' | 'final'
  group?: string
  home: string
  away: string
  date: string
  time: string
  venue: string
}

export const matches: Match[] = [
  // Group A
  { id: 1, stage: 'group', group: 'A', home: 'Mexico', away: 'South Africa', date: '2026-06-11', time: '13:00', venue: 'Mexico City' },
  { id: 2, stage: 'group', group: 'A', home: 'South Korea', away: 'Czech Republic', date: '2026-06-11', time: '20:00', venue: 'Guadalajara (Zapopan)' },
  { id: 3, stage: 'group', group: 'A', home: 'Czech Republic', away: 'South Africa', date: '2026-06-18', time: '12:00', venue: 'Atlanta' },
  { id: 4, stage: 'group', group: 'A', home: 'Mexico', away: 'South Korea', date: '2026-06-18', time: '19:00', venue: 'Guadalajara (Zapopan)' },
  { id: 5, stage: 'group', group: 'A', home: 'Czech Republic', away: 'Mexico', date: '2026-06-24', time: '19:00', venue: 'Mexico City' },
  { id: 6, stage: 'group', group: 'A', home: 'South Africa', away: 'South Korea', date: '2026-06-24', time: '19:00', venue: 'Monterrey (Guadalupe)' },

  // Group B (more)
  { id: 7, stage: 'group', group: 'B', home: 'Canada', away: 'Bosnia & Herzegovina', date: '2026-06-12', time: '15:00', venue: 'Toronto' },
  { id: 8, stage: 'group', group: 'B', home: 'Qatar', away: 'Switzerland', date: '2026-06-13', time: '12:00', venue: 'San Francisco Bay Area (Santa Clara)' },
  { id: 9, stage: 'group', group: 'B', home: 'Switzerland', away: 'Bosnia & Herzegovina', date: '2026-06-18', time: '12:00', venue: 'Los Angeles (Inglewood)' },
  { id: 10, stage: 'group', group: 'B', home: 'Canada', away: 'Qatar', date: '2026-06-18', time: '15:00', venue: 'Vancouver' },

  // R32 placeholders (demo of bracket)
  { id: 73, stage: 'r32', home: '2A', away: '2B', date: '2026-06-28', time: '12:00', venue: 'Los Angeles (Inglewood)' },
  { id: 74, stage: 'r32', home: '1E', away: '3A/B/C/D/F', date: '2026-06-29', time: '16:30', venue: 'Boston (Foxborough)' },
]

export const groupLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'] as const

export function getMatchesByStage(stage: Match['stage']) {
  return matches.filter(m => m.stage === stage)
}

export function getMatchesByGroup(group: string) {
  return matches.filter(m => m.group === group)
}
