// Seeded from openfootball/worldcup.json (2026 schedule).
// Full 104 matches. Group matches numbered 1-72. Knockouts keep official numbers (73+).
// Placeholders like "2A", "W73", "L101" resolve after results are entered for bracket advancement.

export type Match = {
  id: number
  stage: "group" | "r32" | "r16" | "qf" | "sf" | "third" | "final"
  group?: string
  home: string
  away: string
  date: string
  time: string
  venue: string
}

export const matches: Match[] = [
  {
    "id": 1,
    "stage": "group",
    "home": "Mexico",
    "away": "South Africa",
    "date": "2026-06-11",
    "time": "13:00",
    "venue": "Mexico City",
    "group": "A"
  },
  {
    "id": 2,
    "stage": "group",
    "home": "South Korea",
    "away": "Czech Republic",
    "date": "2026-06-11",
    "time": "20:00",
    "venue": "Guadalajara (Zapopan)",
    "group": "A"
  },
  {
    "id": 3,
    "stage": "group",
    "home": "Czech Republic",
    "away": "South Africa",
    "date": "2026-06-18",
    "time": "12:00",
    "venue": "Atlanta",
    "group": "A"
  },
  {
    "id": 4,
    "stage": "group",
    "home": "Mexico",
    "away": "South Korea",
    "date": "2026-06-18",
    "time": "19:00",
    "venue": "Guadalajara (Zapopan)",
    "group": "A"
  },
  {
    "id": 5,
    "stage": "group",
    "home": "Czech Republic",
    "away": "Mexico",
    "date": "2026-06-24",
    "time": "19:00",
    "venue": "Mexico City",
    "group": "A"
  },
  {
    "id": 6,
    "stage": "group",
    "home": "South Africa",
    "away": "South Korea",
    "date": "2026-06-24",
    "time": "19:00",
    "venue": "Monterrey (Guadalupe)",
    "group": "A"
  },
  {
    "id": 7,
    "stage": "group",
    "home": "Canada",
    "away": "Bosnia & Herzegovina",
    "date": "2026-06-12",
    "time": "15:00",
    "venue": "Toronto",
    "group": "B"
  },
  {
    "id": 8,
    "stage": "group",
    "home": "Qatar",
    "away": "Switzerland",
    "date": "2026-06-13",
    "time": "12:00",
    "venue": "San Francisco Bay Area (Santa Clara)",
    "group": "B"
  },
  {
    "id": 9,
    "stage": "group",
    "home": "Switzerland",
    "away": "Bosnia & Herzegovina",
    "date": "2026-06-18",
    "time": "12:00",
    "venue": "Los Angeles (Inglewood)",
    "group": "B"
  },
  {
    "id": 10,
    "stage": "group",
    "home": "Canada",
    "away": "Qatar",
    "date": "2026-06-18",
    "time": "15:00",
    "venue": "Vancouver",
    "group": "B"
  },
  {
    "id": 11,
    "stage": "group",
    "home": "Switzerland",
    "away": "Canada",
    "date": "2026-06-24",
    "time": "12:00",
    "venue": "Vancouver",
    "group": "B"
  },
  {
    "id": 12,
    "stage": "group",
    "home": "Bosnia & Herzegovina",
    "away": "Qatar",
    "date": "2026-06-24",
    "time": "12:00",
    "venue": "Seattle",
    "group": "B"
  },
  {
    "id": 13,
    "stage": "group",
    "home": "Brazil",
    "away": "Morocco",
    "date": "2026-06-13",
    "time": "18:00",
    "venue": "New York/New Jersey (East Rutherford)",
    "group": "C"
  },
  {
    "id": 14,
    "stage": "group",
    "home": "Haiti",
    "away": "Scotland",
    "date": "2026-06-13",
    "time": "21:00",
    "venue": "Boston (Foxborough)",
    "group": "C"
  },
  {
    "id": 15,
    "stage": "group",
    "home": "Scotland",
    "away": "Morocco",
    "date": "2026-06-19",
    "time": "18:00",
    "venue": "Boston (Foxborough)",
    "group": "C"
  },
  {
    "id": 16,
    "stage": "group",
    "home": "Brazil",
    "away": "Haiti",
    "date": "2026-06-19",
    "time": "20:30",
    "venue": "Philadelphia",
    "group": "C"
  },
  {
    "id": 17,
    "stage": "group",
    "home": "Scotland",
    "away": "Brazil",
    "date": "2026-06-24",
    "time": "18:00",
    "venue": "Miami (Miami Gardens)",
    "group": "C"
  },
  {
    "id": 18,
    "stage": "group",
    "home": "Morocco",
    "away": "Haiti",
    "date": "2026-06-24",
    "time": "18:00",
    "venue": "Atlanta",
    "group": "C"
  },
  {
    "id": 19,
    "stage": "group",
    "home": "USA",
    "away": "Paraguay",
    "date": "2026-06-12",
    "time": "18:00",
    "venue": "Los Angeles (Inglewood)",
    "group": "D"
  },
  {
    "id": 20,
    "stage": "group",
    "home": "Australia",
    "away": "Turkey",
    "date": "2026-06-13",
    "time": "21:00",
    "venue": "Vancouver",
    "group": "D"
  },
  {
    "id": 21,
    "stage": "group",
    "home": "USA",
    "away": "Australia",
    "date": "2026-06-19",
    "time": "12:00",
    "venue": "Seattle",
    "group": "D"
  },
  {
    "id": 22,
    "stage": "group",
    "home": "Turkey",
    "away": "Paraguay",
    "date": "2026-06-19",
    "time": "20:00",
    "venue": "San Francisco Bay Area (Santa Clara)",
    "group": "D"
  },
  {
    "id": 23,
    "stage": "group",
    "home": "Turkey",
    "away": "USA",
    "date": "2026-06-25",
    "time": "19:00",
    "venue": "Los Angeles (Inglewood)",
    "group": "D"
  },
  {
    "id": 24,
    "stage": "group",
    "home": "Paraguay",
    "away": "Australia",
    "date": "2026-06-25",
    "time": "19:00",
    "venue": "San Francisco Bay Area (Santa Clara)",
    "group": "D"
  },
  {
    "id": 25,
    "stage": "group",
    "home": "Germany",
    "away": "Curaçao",
    "date": "2026-06-14",
    "time": "12:00",
    "venue": "Houston",
    "group": "E"
  },
  {
    "id": 26,
    "stage": "group",
    "home": "Ivory Coast",
    "away": "Ecuador",
    "date": "2026-06-14",
    "time": "19:00",
    "venue": "Philadelphia",
    "group": "E"
  },
  {
    "id": 27,
    "stage": "group",
    "home": "Germany",
    "away": "Ivory Coast",
    "date": "2026-06-20",
    "time": "16:00",
    "venue": "Toronto",
    "group": "E"
  },
  {
    "id": 28,
    "stage": "group",
    "home": "Ecuador",
    "away": "Curaçao",
    "date": "2026-06-20",
    "time": "19:00",
    "venue": "Kansas City",
    "group": "E"
  },
  {
    "id": 29,
    "stage": "group",
    "home": "Curaçao",
    "away": "Ivory Coast",
    "date": "2026-06-25",
    "time": "16:00",
    "venue": "Philadelphia",
    "group": "E"
  },
  {
    "id": 30,
    "stage": "group",
    "home": "Ecuador",
    "away": "Germany",
    "date": "2026-06-25",
    "time": "16:00",
    "venue": "New York/New Jersey (East Rutherford)",
    "group": "E"
  },
  {
    "id": 31,
    "stage": "group",
    "home": "Netherlands",
    "away": "Japan",
    "date": "2026-06-14",
    "time": "15:00",
    "venue": "Dallas (Arlington)",
    "group": "F"
  },
  {
    "id": 32,
    "stage": "group",
    "home": "Sweden",
    "away": "Tunisia",
    "date": "2026-06-14",
    "time": "20:00",
    "venue": "Monterrey (Guadalupe)",
    "group": "F"
  },
  {
    "id": 33,
    "stage": "group",
    "home": "Netherlands",
    "away": "Sweden",
    "date": "2026-06-20",
    "time": "12:00",
    "venue": "Houston",
    "group": "F"
  },
  {
    "id": 34,
    "stage": "group",
    "home": "Tunisia",
    "away": "Japan",
    "date": "2026-06-20",
    "time": "22:00",
    "venue": "Monterrey (Guadalupe)",
    "group": "F"
  },
  {
    "id": 35,
    "stage": "group",
    "home": "Japan",
    "away": "Sweden",
    "date": "2026-06-25",
    "time": "18:00",
    "venue": "Dallas (Arlington)",
    "group": "F"
  },
  {
    "id": 36,
    "stage": "group",
    "home": "Tunisia",
    "away": "Netherlands",
    "date": "2026-06-25",
    "time": "18:00",
    "venue": "Kansas City",
    "group": "F"
  },
  {
    "id": 37,
    "stage": "group",
    "home": "Belgium",
    "away": "Egypt",
    "date": "2026-06-15",
    "time": "12:00",
    "venue": "Seattle",
    "group": "G"
  },
  {
    "id": 38,
    "stage": "group",
    "home": "Iran",
    "away": "New Zealand",
    "date": "2026-06-15",
    "time": "18:00",
    "venue": "Los Angeles (Inglewood)",
    "group": "G"
  },
  {
    "id": 39,
    "stage": "group",
    "home": "Belgium",
    "away": "Iran",
    "date": "2026-06-21",
    "time": "12:00",
    "venue": "Los Angeles (Inglewood)",
    "group": "G"
  },
  {
    "id": 40,
    "stage": "group",
    "home": "New Zealand",
    "away": "Egypt",
    "date": "2026-06-21",
    "time": "18:00",
    "venue": "Vancouver",
    "group": "G"
  },
  {
    "id": 41,
    "stage": "group",
    "home": "Egypt",
    "away": "Iran",
    "date": "2026-06-26",
    "time": "20:00",
    "venue": "Seattle",
    "group": "G"
  },
  {
    "id": 42,
    "stage": "group",
    "home": "New Zealand",
    "away": "Belgium",
    "date": "2026-06-26",
    "time": "20:00",
    "venue": "Vancouver",
    "group": "G"
  },
  {
    "id": 43,
    "stage": "group",
    "home": "Spain",
    "away": "Cape Verde",
    "date": "2026-06-15",
    "time": "12:00",
    "venue": "Atlanta",
    "group": "H"
  },
  {
    "id": 44,
    "stage": "group",
    "home": "Saudi Arabia",
    "away": "Uruguay",
    "date": "2026-06-15",
    "time": "18:00",
    "venue": "Miami (Miami Gardens)",
    "group": "H"
  },
  {
    "id": 45,
    "stage": "group",
    "home": "Spain",
    "away": "Saudi Arabia",
    "date": "2026-06-21",
    "time": "12:00",
    "venue": "Atlanta",
    "group": "H"
  },
  {
    "id": 46,
    "stage": "group",
    "home": "Uruguay",
    "away": "Cape Verde",
    "date": "2026-06-21",
    "time": "18:00",
    "venue": "Miami (Miami Gardens)",
    "group": "H"
  },
  {
    "id": 47,
    "stage": "group",
    "home": "Cape Verde",
    "away": "Saudi Arabia",
    "date": "2026-06-26",
    "time": "19:00",
    "venue": "Houston",
    "group": "H"
  },
  {
    "id": 48,
    "stage": "group",
    "home": "Uruguay",
    "away": "Spain",
    "date": "2026-06-26",
    "time": "18:00",
    "venue": "Guadalajara (Zapopan)",
    "group": "H"
  },
  {
    "id": 49,
    "stage": "group",
    "home": "France",
    "away": "Senegal",
    "date": "2026-06-16",
    "time": "15:00",
    "venue": "New York/New Jersey (East Rutherford)",
    "group": "I"
  },
  {
    "id": 50,
    "stage": "group",
    "home": "Iraq",
    "away": "Norway",
    "date": "2026-06-16",
    "time": "18:00",
    "venue": "Boston (Foxborough)",
    "group": "I"
  },
  {
    "id": 51,
    "stage": "group",
    "home": "France",
    "away": "Iraq",
    "date": "2026-06-22",
    "time": "17:00",
    "venue": "Philadelphia",
    "group": "I"
  },
  {
    "id": 52,
    "stage": "group",
    "home": "Norway",
    "away": "Senegal",
    "date": "2026-06-22",
    "time": "20:00",
    "venue": "New York/New Jersey (East Rutherford)",
    "group": "I"
  },
  {
    "id": 53,
    "stage": "group",
    "home": "Norway",
    "away": "France",
    "date": "2026-06-26",
    "time": "15:00",
    "venue": "Boston (Foxborough)",
    "group": "I"
  },
  {
    "id": 54,
    "stage": "group",
    "home": "Senegal",
    "away": "Iraq",
    "date": "2026-06-26",
    "time": "15:00",
    "venue": "Toronto",
    "group": "I"
  },
  {
    "id": 55,
    "stage": "group",
    "home": "Argentina",
    "away": "Algeria",
    "date": "2026-06-16",
    "time": "20:00",
    "venue": "Kansas City",
    "group": "J"
  },
  {
    "id": 56,
    "stage": "group",
    "home": "Austria",
    "away": "Jordan",
    "date": "2026-06-16",
    "time": "21:00",
    "venue": "San Francisco Bay Area (Santa Clara)",
    "group": "J"
  },
  {
    "id": 57,
    "stage": "group",
    "home": "Argentina",
    "away": "Austria",
    "date": "2026-06-22",
    "time": "12:00",
    "venue": "Dallas (Arlington)",
    "group": "J"
  },
  {
    "id": 58,
    "stage": "group",
    "home": "Jordan",
    "away": "Algeria",
    "date": "2026-06-22",
    "time": "20:00",
    "venue": "San Francisco Bay Area (Santa Clara)",
    "group": "J"
  },
  {
    "id": 59,
    "stage": "group",
    "home": "Algeria",
    "away": "Austria",
    "date": "2026-06-27",
    "time": "21:00",
    "venue": "Kansas City",
    "group": "J"
  },
  {
    "id": 60,
    "stage": "group",
    "home": "Jordan",
    "away": "Argentina",
    "date": "2026-06-27",
    "time": "21:00",
    "venue": "Dallas (Arlington)",
    "group": "J"
  },
  {
    "id": 61,
    "stage": "group",
    "home": "Portugal",
    "away": "DR Congo",
    "date": "2026-06-17",
    "time": "12:00",
    "venue": "Houston",
    "group": "K"
  },
  {
    "id": 62,
    "stage": "group",
    "home": "Uzbekistan",
    "away": "Colombia",
    "date": "2026-06-17",
    "time": "20:00",
    "venue": "Mexico City",
    "group": "K"
  },
  {
    "id": 63,
    "stage": "group",
    "home": "Portugal",
    "away": "Uzbekistan",
    "date": "2026-06-23",
    "time": "12:00",
    "venue": "Houston",
    "group": "K"
  },
  {
    "id": 64,
    "stage": "group",
    "home": "Colombia",
    "away": "DR Congo",
    "date": "2026-06-23",
    "time": "20:00",
    "venue": "Guadalajara (Zapopan)",
    "group": "K"
  },
  {
    "id": 65,
    "stage": "group",
    "home": "Colombia",
    "away": "Portugal",
    "date": "2026-06-27",
    "time": "19:30",
    "venue": "Miami (Miami Gardens)",
    "group": "K"
  },
  {
    "id": 66,
    "stage": "group",
    "home": "DR Congo",
    "away": "Uzbekistan",
    "date": "2026-06-27",
    "time": "19:30",
    "venue": "Atlanta",
    "group": "K"
  },
  {
    "id": 67,
    "stage": "group",
    "home": "England",
    "away": "Croatia",
    "date": "2026-06-17",
    "time": "15:00",
    "venue": "Dallas (Arlington)",
    "group": "L"
  },
  {
    "id": 68,
    "stage": "group",
    "home": "Ghana",
    "away": "Panama",
    "date": "2026-06-17",
    "time": "19:00",
    "venue": "Toronto",
    "group": "L"
  },
  {
    "id": 69,
    "stage": "group",
    "home": "England",
    "away": "Ghana",
    "date": "2026-06-23",
    "time": "16:00",
    "venue": "Boston (Foxborough)",
    "group": "L"
  },
  {
    "id": 70,
    "stage": "group",
    "home": "Panama",
    "away": "Croatia",
    "date": "2026-06-23",
    "time": "19:00",
    "venue": "Toronto",
    "group": "L"
  },
  {
    "id": 71,
    "stage": "group",
    "home": "Panama",
    "away": "England",
    "date": "2026-06-27",
    "time": "17:00",
    "venue": "New York/New Jersey (East Rutherford)",
    "group": "L"
  },
  {
    "id": 72,
    "stage": "group",
    "home": "Croatia",
    "away": "Ghana",
    "date": "2026-06-27",
    "time": "17:00",
    "venue": "Philadelphia",
    "group": "L"
  },
  {
    "id": 73,
    "stage": "r32",
    "home": "2A",
    "away": "2B",
    "date": "2026-06-28",
    "time": "12:00",
    "venue": "Los Angeles (Inglewood)"
  },
  {
    "id": 74,
    "stage": "r32",
    "home": "1E",
    "away": "3A/B/C/D/F",
    "date": "2026-06-29",
    "time": "16:30",
    "venue": "Boston (Foxborough)"
  },
  {
    "id": 75,
    "stage": "r32",
    "home": "1F",
    "away": "2C",
    "date": "2026-06-29",
    "time": "19:00",
    "venue": "Monterrey (Guadalupe)"
  },
  {
    "id": 76,
    "stage": "r32",
    "home": "1C",
    "away": "2F",
    "date": "2026-06-29",
    "time": "12:00",
    "venue": "Houston"
  },
  {
    "id": 77,
    "stage": "r32",
    "home": "1I",
    "away": "3C/D/F/G/H",
    "date": "2026-06-30",
    "time": "17:00",
    "venue": "New York/New Jersey (East Rutherford)"
  },
  {
    "id": 78,
    "stage": "r32",
    "home": "2E",
    "away": "2I",
    "date": "2026-06-30",
    "time": "12:00",
    "venue": "Dallas (Arlington)"
  },
  {
    "id": 79,
    "stage": "r32",
    "home": "1A",
    "away": "3C/E/F/H/I",
    "date": "2026-06-30",
    "time": "19:00",
    "venue": "Mexico City"
  },
  {
    "id": 80,
    "stage": "r32",
    "home": "1L",
    "away": "3E/H/I/J/K",
    "date": "2026-07-01",
    "time": "12:00",
    "venue": "Atlanta"
  },
  {
    "id": 81,
    "stage": "r32",
    "home": "1D",
    "away": "3B/E/F/I/J",
    "date": "2026-07-01",
    "time": "17:00",
    "venue": "San Francisco Bay Area (Santa Clara)"
  },
  {
    "id": 82,
    "stage": "r32",
    "home": "1G",
    "away": "3A/E/H/I/J",
    "date": "2026-07-01",
    "time": "13:00",
    "venue": "Seattle"
  },
  {
    "id": 83,
    "stage": "r32",
    "home": "2K",
    "away": "2L",
    "date": "2026-07-02",
    "time": "19:00",
    "venue": "Toronto"
  },
  {
    "id": 84,
    "stage": "r32",
    "home": "1H",
    "away": "2J",
    "date": "2026-07-02",
    "time": "12:00",
    "venue": "Los Angeles (Inglewood)"
  },
  {
    "id": 85,
    "stage": "r32",
    "home": "1B",
    "away": "3E/F/G/I/J",
    "date": "2026-07-02",
    "time": "20:00",
    "venue": "Vancouver"
  },
  {
    "id": 86,
    "stage": "r32",
    "home": "1J",
    "away": "2H",
    "date": "2026-07-03",
    "time": "18:00",
    "venue": "Miami (Miami Gardens)"
  },
  {
    "id": 87,
    "stage": "r32",
    "home": "1K",
    "away": "3D/E/I/J/L",
    "date": "2026-07-03",
    "time": "20:30",
    "venue": "Kansas City"
  },
  {
    "id": 88,
    "stage": "r32",
    "home": "2D",
    "away": "2G",
    "date": "2026-07-03",
    "time": "13:00",
    "venue": "Dallas (Arlington)"
  },
  {
    "id": 89,
    "stage": "r16",
    "home": "W74",
    "away": "W77",
    "date": "2026-07-04",
    "time": "17:00",
    "venue": "Philadelphia"
  },
  {
    "id": 90,
    "stage": "r16",
    "home": "W73",
    "away": "W75",
    "date": "2026-07-04",
    "time": "12:00",
    "venue": "Houston"
  },
  {
    "id": 91,
    "stage": "r16",
    "home": "W76",
    "away": "W78",
    "date": "2026-07-05",
    "time": "16:00",
    "venue": "New York/New Jersey (East Rutherford)"
  },
  {
    "id": 92,
    "stage": "r16",
    "home": "W79",
    "away": "W80",
    "date": "2026-07-05",
    "time": "18:00",
    "venue": "Mexico City"
  },
  {
    "id": 93,
    "stage": "r16",
    "home": "W83",
    "away": "W84",
    "date": "2026-07-06",
    "time": "14:00",
    "venue": "Dallas (Arlington)"
  },
  {
    "id": 94,
    "stage": "r16",
    "home": "W81",
    "away": "W82",
    "date": "2026-07-06",
    "time": "17:00",
    "venue": "Seattle"
  },
  {
    "id": 95,
    "stage": "r16",
    "home": "W86",
    "away": "W88",
    "date": "2026-07-07",
    "time": "12:00",
    "venue": "Atlanta"
  },
  {
    "id": 96,
    "stage": "r16",
    "home": "W85",
    "away": "W87",
    "date": "2026-07-07",
    "time": "13:00",
    "venue": "Vancouver"
  },
  {
    "id": 97,
    "stage": "qf",
    "home": "W89",
    "away": "W90",
    "date": "2026-07-09",
    "time": "16:00",
    "venue": "Boston (Foxborough)"
  },
  {
    "id": 98,
    "stage": "qf",
    "home": "W93",
    "away": "W94",
    "date": "2026-07-10",
    "time": "12:00",
    "venue": "Los Angeles (Inglewood)"
  },
  {
    "id": 99,
    "stage": "qf",
    "home": "W91",
    "away": "W92",
    "date": "2026-07-11",
    "time": "17:00",
    "venue": "Miami (Miami Gardens)"
  },
  {
    "id": 100,
    "stage": "qf",
    "home": "W95",
    "away": "W96",
    "date": "2026-07-11",
    "time": "20:00",
    "venue": "Kansas City"
  },
  {
    "id": 101,
    "stage": "sf",
    "home": "W97",
    "away": "W98",
    "date": "2026-07-14",
    "time": "14:00",
    "venue": "Dallas (Arlington)"
  },
  {
    "id": 102,
    "stage": "sf",
    "home": "W99",
    "away": "W100",
    "date": "2026-07-15",
    "time": "15:00",
    "venue": "Atlanta"
  },
  {
    "id": 73,
    "stage": "third",
    "home": "L101",
    "away": "L102",
    "date": "2026-07-18",
    "time": "17:00",
    "venue": "Miami (Miami Gardens)"
  },
  {
    "id": 74,
    "stage": "final",
    "home": "W101",
    "away": "W102",
    "date": "2026-07-19",
    "time": "15:00",
    "venue": "New York/New Jersey (East Rutherford)"
  }
]

export const groupLetters = ["A","B","C","D","E","F","G","H","I","J","K","L"] as const

export function getMatchesByStage(stage: Match["stage"]) {
  return matches.filter(m => m.stage === stage)
}

export function getMatchesByGroup(group: string) {
  return matches.filter(m => m.group === group)
}

export function getAllGroups() {
  return groupLetters.map(g => ({ group: g, matches: getMatchesByGroup(g) }))
}
