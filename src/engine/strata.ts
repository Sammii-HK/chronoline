// The reusable strata-map engine contract.
//
// Every "map" is one StrataConfig + its data. The shell built on top of this
// (header with the map dropdown + options + line toggles + search, the canvas
// with axis / lanes / items / sub-lane fan / labels, zoom + pan gestures,
// level-of-detail, tap-to-inspect, compare, and the scrubber) is written ONCE
// and reused. Adding history, cosmos, evolution (mya), oceans (depth), or any
// other timeline/strata means writing a config and a data array, nothing more.

export type ScaleKind = 'linear' | 'log'

export interface Lane {
  id: string
  name: string
  color: string
}

export interface StrataItem {
  id: string
  label: string
  /** Position on the axis in the config's units: year, light-years, million-years-ago, metres of depth... */
  pos: number
  /** Optional span end (e.g. a reign, an era). */
  end?: number
  /** Which lane this sits on. */
  lane: string
  /** Optional sub-lane it fans into on deep zoom: country, constellation, clade, ocean zone... */
  sub?: string
  importance: 1 | 2 | 3 | 4
  /** Legendary / uncertain position, drawn as a dashed ring. */
  fuzzy?: boolean
  note?: string
}

export interface StrataConfig {
  id: string
  name: string
  tagline: string
  scale: ScaleKind
  axis: {
    /** 'time' | 'distance' | 'depth' ... used in labels and the compare copy. */
    kind: string
    /** Format an axis value for ticks, readouts and labels. */
    format: (v: number) => string
    /** Candidate tick positions (the shell keeps the ones that fit). */
    ticks: number[]
    /** Default framed window [from, to]; omit to fit all. */
    frame?: [number, number]
  }
  lanes: Lane[]
  /** Lane ids whose items fan into sub-lanes on deep zoom (e.g. region -> countries, constellation -> stars). */
  fanLanes?: string[]
  items: StrataItem[]
  /** The "wait, that can't be right" lines shown when two items are compared. */
  compare: (a: StrataItem, b: StrataItem) => string[]
  /** Label for the scrubber ("Meanwhile in", "At this distance"...). */
  scrubberLabel: string
}
