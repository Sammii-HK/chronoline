import { COSMOS_ALL } from '../data/cosmosAll'
import type { StrataConfig, StrataItem, Lane } from '../engine/strata'

const LANES: Lane[] = [
  { id: 'solarSystem', name: 'Solar System', color: '#E8B84B' },
  { id: 'stars', name: 'Nearby stars', color: '#4C82C3' },
  { id: 'zodiac', name: 'Constellations', color: '#C56BD6' },
  { id: 'deepSky', name: 'Clusters & nebulae', color: '#2FA98C' },
  { id: 'milkyWay', name: 'Milky Way', color: '#E07A3E' },
  { id: 'localGroup', name: 'Local Group', color: '#D7494C' },
  { id: 'largeScale', name: 'Large-scale structure', color: '#6C6CE8' },
]

const ZODIAC = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpius', 'Sagittarius', 'Capricornus', 'Aquarius', 'Pisces']
const FAMOUS = [...ZODIAC, 'Orion', 'Ursa Major', 'Ursa Minor', 'Cassiopeia', 'Cygnus', 'Crux', 'Lyra', 'Aquila', 'Canis Major', 'Canis Minor', 'Perseus', 'Andromeda', 'Centaurus', 'Bootes', 'Pegasus', 'Draco', 'Auriga']

function fmtDist(ly: number) {
  if (ly < 1e-6) return `${Math.round(ly * 3.156e7)} light-sec`
  if (ly < 4e-3) {
    const au = ly / 1.581e-5
    return `${au < 10 ? au.toFixed(1) : Math.round(au).toLocaleString()} AU`
  }
  if (ly < 1) return `${ly.toFixed(2)} ly`
  if (ly < 1e6) return `${Math.round(ly).toLocaleString()} ly`
  if (ly < 1e9) return `${(ly / 1e6).toFixed(ly < 1e7 ? 2 : 0)} million ly`
  return `${(ly / 1e9).toFixed(2)} billion ly`
}

const items: StrataItem[] = COSMOS_ALL.map((o) => ({
  id: o.id,
  label: o.name,
  pos: o.distanceLy,
  lane: o.category,
  sub: o.sub,
  importance: o.importance as 1 | 2 | 3 | 4,
  note: o.note,
}))

function compare(a: StrataItem, b: StrataItem): string[] {
  const near = a.pos <= b.pos ? a : b
  const far = a.pos <= b.pos ? b : a
  const gap = far.pos - near.pos
  const out: string[] = []
  if (near.sub && near.sub === far.sub) {
    out.push(`They share the constellation ${near.sub}, yet sit ${fmtDist(gap)} apart in depth. The shape is an illusion of our viewing angle.`)
  }
  if (gap > near.pos && near.pos > 0) {
    out.push(`${near.label} is closer to Earth than to ${far.label}.`)
  }
  out.push(`Light needs ${fmtDist(gap)} of travel to cross the gap between them.`)
  return out.slice(0, 3)
}

export const cosmosConfig: StrataConfig = {
  id: 'cosmos',
  name: 'Cosmos',
  tagline: 'the scale of the universe',
  scale: 'log',
  axis: { kind: 'distance', format: fmtDist, ticks: [3.17e-8, 1.581e-5, 1.581e-2, 1, 100, 1e4, 1e6, 1e8, 1e10] },
  lanes: LANES,
  fanLanes: ['zodiac'],
  fanPrimary: ZODIAC,
  fanFeatured: FAMOUS,
  fanToggleLabel: 'All constellations',
  items,
  compare,
  scrubberLabel: 'Distance shell',
  originLabel: ' from Earth',
  hint: 'scroll to zoom · drag to pan · zoom into a constellation to split it into its real stars · tap two to compare',
}
