import type { ThreadId, DomainId } from '../types'

export interface Lane {
  id: string
  name: string
  color: string
}

// Region lines. Array order = top-to-bottom row order on the map.
export const THREADS: { id: ThreadId; name: string; color: string }[] = [
  { id: 'nearEast', name: 'Near East', color: '#E07A3E' },
  { id: 'egyptAfrica', name: 'Egypt & Africa', color: '#C9A227' },
  { id: 'classical', name: 'Greece & Rome', color: '#D7494C' },
  { id: 'europe', name: 'Europe', color: '#4C82C3' },
  { id: 'islamic', name: 'Islamic world', color: '#5AA84F' },
  { id: 'india', name: 'India', color: '#E0699A' },
  { id: 'china', name: 'China & East Asia', color: '#2FA98C' },
  { id: 'americas', name: 'The Americas', color: '#C56BD6' },
  { id: 'ideas', name: 'Ideas & science', color: '#6C6CE8' },
  { id: 'global', name: 'Modern & global', color: '#8A93A2' },
]

// Domain lines, used when the colour mode is switched to "domain".
export const DOMAINS: { id: DomainId; name: string; color: string }[] = [
  { id: 'power', name: 'Power & politics', color: '#C0552E' },
  { id: 'war', name: 'War & conquest', color: '#B33636' },
  { id: 'religion', name: 'Religion & myth', color: '#8A6DC4' },
  { id: 'culture', name: 'Culture & art', color: '#C99A2E' },
  { id: 'science', name: 'Science & tech', color: '#3F7CC0' },
  { id: 'exploration', name: 'Exploration', color: '#2FA98C' },
  { id: 'economy', name: 'Trade & economy', color: '#4FA05A' },
  { id: 'disaster', name: 'Disaster & disease', color: '#6B7280' },
]

export const THREAD_MAP: Record<string, { name: string; color: string }> =
  Object.fromEntries(THREADS.map((t) => [t.id, { name: t.name, color: t.color }]))

export const DOMAIN_MAP: Record<string, { name: string; color: string }> =
  Object.fromEntries(DOMAINS.map((d) => [d.id, { name: d.name, color: d.color }]))
