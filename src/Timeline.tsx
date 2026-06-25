import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { HistEvent } from './types'
import { THREADS, DOMAINS, THREAD_MAP, DOMAIN_MAP } from './data/threads'

type ColorMode = 'thread' | 'domain'

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v))
const smooth = (x: number) => {
  const t = clamp(x, 0, 1)
  return t * t * (3 - 2 * t)
}
const fmtYear = (y: number) =>
  y < 0 ? `${Math.abs(Math.round(y)).toLocaleString()} BCE` : `${Math.round(y).toLocaleString()} CE`

const STEPS = [5, 10, 20, 25, 50, 100, 200, 250, 500, 1000, 2000]
function niceStep(k: number, w: number, span: number) {
  const ppy = (w * k) / span
  const want = 110 / ppy
  for (const s of STEPS) if (s >= want) return s
  return 2000
}

const TOP = 30
const BOTTOM = 46

export default function Timeline({ events }: { events: HistEvent[] }) {
  const stageRef = useRef<HTMLDivElement>(null)
  const dimsRef = useRef({ w: 1200, h: 640 })
  const [dims, setDims] = useState({ w: 1200, h: 640 })

  const [colorMode, setColorMode] = useState<ColorMode>('thread')
  const [view, setView] = useState({ k: 1, tx: 0 })
  const viewRef = useRef(view)
  viewRef.current = view
  const didInit = useRef(false)

  const [sel, setSel] = useState<string[]>([])
  const [hover, setHover] = useState<{ id: string; mx: number; my: number } | null>(null)
  const [mwOn, setMwOn] = useState(false)
  const [mwYear, setMwYear] = useState(1500)
  const [query, setQuery] = useState('')

  const [minY, maxY] = useMemo(() => {
    let lo = Infinity
    let hi = -Infinity
    for (const e of events) {
      lo = Math.min(lo, e.year)
      hi = Math.max(hi, e.endYear ?? e.year)
    }
    if (!isFinite(lo)) {
      lo = -3000
      hi = 2025
    }
    return [Math.floor((lo - 120) / 100) * 100, Math.ceil((Math.max(hi, 2025) + 25) / 10) * 10]
  }, [events])
  const boundsRef = useRef<[number, number]>([minY, maxY])
  boundsRef.current = [minY, maxY]

  const byId = useMemo(() => new Map(events.map((e) => [e.id, e])), [events])

  const clampTx = useCallback((tx: number, k: number, w: number) => clamp(tx, 120 - w * k, w - 120), [])

  useEffect(() => {
    const el = stageRef.current
    if (!el) return
    const ro = new ResizeObserver(() => {
      const r = el.getBoundingClientRect()
      const d = { w: Math.max(320, r.width), h: Math.max(360, r.height) }
      dimsRef.current = d
      setDims(d)
      if (!didInit.current) {
        didInit.current = true
        const [lo, hi] = boundsRef.current
        const span = hi - lo
        const W0 = -2500
        const W1 = 2030
        const nk = clamp(span / (W1 - W0), 0.8, 90)
        const ppy = d.w / span
        setView({ k: nk, tx: clampTx(-(W0 - lo) * ppy * nk, nk, d.w) })
      }
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [clampTx])

  const zoomAbout = useCallback(
    (px: number, factor: number) => {
      setView((v) => {
        const w = dimsRef.current.w
        const [lo, hi] = boundsRef.current
        const ppy = w / (hi - lo)
        const nk = clamp(v.k * factor, 0.75, 90)
        const yr = lo + (px - v.tx) / (ppy * v.k)
        const ntx = clampTx(px - (yr - lo) * ppy * nk, nk, w)
        return { k: nk, tx: ntx }
      })
    },
    [clampTx],
  )

  useEffect(() => {
    const el = stageRef.current
    if (!el) return
    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      const r = el.getBoundingClientRect()
      zoomAbout(e.clientX - r.left, e.deltaY < 0 ? 1.16 : 1 / 1.16)
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [zoomAbout])

  const drag = useRef<{ mode: 'pan' | 'mw' | null; lastX: number; startX: number; moved: boolean }>({
    mode: null,
    lastX: 0,
    startX: 0,
    moved: false,
  })

  const localX = (clientX: number) => {
    const r = stageRef.current!.getBoundingClientRect()
    return clientX - r.left
  }
  const yearAtPx = (px: number) => {
    const w = dimsRef.current.w
    const [lo, hi] = boundsRef.current
    const ppy = w / (hi - lo)
    return lo + (px - viewRef.current.tx) / (ppy * viewRef.current.k)
  }

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const px = localX(e.clientX)
    drag.current = { mode: 'pan', lastX: px, startX: px, moved: false }
    stageRef.current?.setPointerCapture(e.pointerId)
    stageRef.current?.classList.add('grabbing')
    setHover(null)
  }
  const onMwDown = (e: React.PointerEvent<SVGGElement>) => {
    e.stopPropagation()
    drag.current = { mode: 'mw', lastX: 0, startX: 0, moved: true }
    stageRef.current?.setPointerCapture(e.pointerId)
  }
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const m = drag.current
    if (!m.mode) return
    const px = localX(e.clientX)
    if (m.mode === 'mw') {
      setMwYear(clamp(Math.round(yearAtPx(px)), boundsRef.current[0], boundsRef.current[1]))
      return
    }
    const dx = px - m.lastX
    m.lastX = px
    if (Math.abs(px - m.startX) > 4) m.moved = true
    setView((v) => ({ k: v.k, tx: clampTx(v.tx + dx, v.k, dimsRef.current.w) }))
  }
  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    stageRef.current?.releasePointerCapture(e.pointerId)
    stageRef.current?.classList.remove('grabbing')
    drag.current.mode = null
  }

  const toggleSel = (id: string) => {
    if (drag.current.moved) return
    setSel((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id].slice(-2)))
  }

  const runSearch = () => {
    const q = query.trim().toLowerCase()
    if (!q) return
    const hit = events.find((e) => e.title.toLowerCase().includes(q))
    if (!hit) return
    const w = dimsRef.current.w
    const [lo, hi] = boundsRef.current
    const ppy = w / (hi - lo)
    const nk = Math.max(viewRef.current.k, 3.4)
    setView({ k: nk, tx: clampTx(w / 2 - (hit.year - lo) * ppy * nk, nk, w) })
    setSel([hit.id])
  }

  // ---- layout ----
  const lanes = colorMode === 'thread' ? THREADS : DOMAINS
  const laneIndex = useMemo(() => {
    const m = new Map<string, number>()
    lanes.forEach((l, i) => m.set(l.id, i))
    return m
  }, [lanes])
  const n = lanes.length
  const map = colorMode === 'thread' ? THREAD_MAP : DOMAIN_MAP

  const { w, h } = dims
  const ppyBase = w / (maxY - minY)
  const sx = (year: number) => (year - minY) * ppyBase * view.k + view.tx
  const usableH = h - TOP - BOTTOM
  const centerY = TOP + usableH / 2
  const eff = clamp(0.5 + 0.5 * smooth((view.k - 1) / 3), 0.5, 1)
  const rowGap = usableH / Math.max(1, n - 1)
  const rowY = (i: number) => centerY + (i - (n - 1) / 2) * rowGap * eff

  const k = view.k
  const showImp = (i: number) =>
    i === 1 ? true : i === 2 ? k >= 1.5 : i === 3 ? k >= 2.6 : k >= 4.2
  const showLbl = (i: number) =>
    i === 1 ? k >= 0.95 : i === 2 ? k >= 2.0 : i === 3 ? k >= 3.4 : k >= 6

  const laneOf = (e: HistEvent) => (colorMode === 'thread' ? e.thread : e.domain)
  const colorOf = (e: HistEvent) => map[laneOf(e)]?.color ?? '#888'

  // visible, sorted so important draw last (on top)
  const visible = events
    .filter((e) => showImp(e.importance))
    .map((e) => ({ e, x: sx(e.year), y: rowY(laneIndex.get(laneOf(e)) ?? 0) }))
    .filter((p) => p.x > -60 && p.x < w + 60)
    .sort((a, b) => b.e.importance - a.e.importance)

  // label declutter: reserve horizontal space per side, important events first
  type Cand = (typeof visible)[number]
  const labels: { p: Cand; side: 1 | -1 }[] = []
  const placedUp: [number, number][] = []
  const placedDn: [number, number][] = []
  const fits = (list: [number, number][], L: number, R: number) =>
    !list.some(([a, b]) => L < b + 8 && R > a - 8)
  let toggle = 0
  const placeLabels = (cands: Cand[]) => {
    for (const c of cands.sort((a, b) => a.x - b.x)) {
      const txt = c.e.fuzzy ? `${c.e.title} ?` : c.e.title
      const wpx = txt.length * 6.1 + 6
      const right = c.x > w - 150
      const L = right ? c.x - wpx : c.x
      const R = right ? c.x : c.x + wpx
      const order: (1 | -1)[] = toggle++ % 2 === 0 ? [-1, 1] : [1, -1]
      for (const side of order) {
        const list = side === -1 ? placedUp : placedDn
        if (fits(list, L, R)) {
          list.push([L, R])
          labels.push({ p: c, side })
          break
        }
      }
    }
  }
  placeLabels(visible.filter((p) => p.e.importance === 1 && showLbl(1)))
  placeLabels(visible.filter((p) => p.e.importance === 2 && showLbl(2)))
  placeLabels(visible.filter((p) => p.e.importance === 3 && showLbl(3)))
  placeLabels(visible.filter((p) => p.e.importance === 4 && showLbl(4)))

  // axis ticks
  const step = niceStep(k, w, maxY - minY)
  const tickStart = Math.ceil(minY / step) * step
  const ticks: number[] = []
  for (let yv = tickStart; yv <= maxY; yv += step) {
    const tx = sx(yv)
    if (tx > -10 && tx < w + 10) ticks.push(yv)
  }

  const selEvents = sel.map((id) => byId.get(id)).filter(Boolean) as HistEvent[]
  const hoverEv = hover ? byId.get(hover.id) : null

  // meanwhile: latest event per region thread at or before mwYear
  const mwState = useMemo(() => {
    if (!mwOn) return []
    return THREADS.map((t) => {
      let best: HistEvent | null = null
      for (const e of events) {
        if (e.thread !== t.id) continue
        if (e.year > mwYear) continue
        if (!best || e.year > best.year) best = e
      }
      return { lane: t, ev: best }
    })
  }, [mwOn, mwYear, events])

  return (
    <div className="app">
      <div className="topbar">
        <div className="brand">
          <b>Chronoline</b>
          <span>a tube map of recorded history</span>
        </div>
        <div className="seg" role="group" aria-label="Colour mode">
          <button className={colorMode === 'thread' ? 'on' : ''} onClick={() => setColorMode('thread')}>
            Region
          </button>
          <button className={colorMode === 'domain' ? 'on' : ''} onClick={() => setColorMode('domain')}>
            Domain
          </button>
        </div>
        <button className={`btn ${mwOn ? 'on' : ''}`} onClick={() => setMwOn((v) => !v)}>
          Meanwhile
        </button>
        <input
          className="search"
          placeholder="Search an event, then Enter"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && runSearch()}
        />
        <div className="spacer" />
        <button className="btn icon" aria-label="Zoom out" onClick={() => zoomAbout(dimsRef.current.w / 2, 1 / 1.4)}>
          –
        </button>
        <button className="btn icon" aria-label="Zoom in" onClick={() => zoomAbout(dimsRef.current.w / 2, 1.4)}>
          +
        </button>
        <button
          className="btn"
          onClick={() => {
            const wv = dimsRef.current.w
            const [lo, hi] = boundsRef.current
            const span = hi - lo
            const nk = clamp(span / (2030 - -2500), 0.8, 90)
            const ppy = wv / span
            setView({ k: nk, tx: clampTx(-(-2500 - lo) * ppy * nk, nk, wv) })
            setSel([])
            setMwOn(false)
          }}
        >
          Reset
        </button>
      </div>

      <div className="legend">
        {lanes.map((l) => (
          <span className="chip" key={l.id}>
            <span className="sw" style={{ background: l.color }} />
            {l.name}
          </span>
        ))}
      </div>

      <div
        className="stage"
        ref={stageRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <svg width={w} height={h} role="img" aria-label="Interactive timeline of world history">
          {/* time gridlines + axis */}
          {ticks.map((yv) => {
            const x = sx(yv)
            return (
              <g key={`t${yv}`}>
                <line x1={x} y1={TOP - 8} x2={x} y2={h - BOTTOM + 8} stroke="var(--grid)" strokeWidth={0.5} />
                <text x={x} y={h - BOTTOM + 26} textAnchor="middle" fontSize={11} fill="var(--faint)">
                  {fmtYear(yv)}
                </text>
              </g>
            )
          })}

          {/* lane lines */}
          {lanes.map((l, i) => {
            const y = rowY(i)
            const x0 = clamp(sx(minY), 0, w)
            const x1 = clamp(sx(maxY), 0, w)
            return (
              <line key={l.id} x1={x0} y1={y} x2={x1} y2={y} stroke={l.color} strokeWidth={2.4} strokeLinecap="round" opacity={0.85} />
            )
          })}

          {/* interchange connectors (region mode only) */}
          {colorMode === 'thread' &&
            eff > 0.6 &&
            visible
              .filter((p) => p.e.importance === 1 && p.e.links && p.e.links.length)
              .flatMap((p) =>
                (p.e.links as string[]).map((lid) => {
                  const ti = laneIndex.get(lid)
                  if (ti == null) return null
                  const ly = rowY(ti)
                  return (
                    <g key={`c${p.e.id}-${lid}`}>
                      <line x1={p.x} y1={p.y} x2={p.x} y2={ly} stroke={colorOf(p.e)} strokeWidth={1.3} strokeDasharray="2 3" opacity={0.5} />
                      <circle cx={p.x} cy={ly} r={3} fill="var(--bg)" stroke={map[lid]?.color ?? '#888'} strokeWidth={1.5} />
                    </g>
                  )
                }),
              )}

          {/* meanwhile sweep line */}
          {mwOn && (() => {
            const x = sx(mwYear)
            return (
              <g>
                <line x1={x} y1={TOP - 10} x2={x} y2={h - BOTTOM + 8} stroke="var(--accent)" strokeWidth={1.5} strokeDasharray="5 4" />
                <g style={{ cursor: 'ew-resize' }} onPointerDown={onMwDown}>
                  <rect x={x - 30} y={TOP - 26} width={60} height={18} rx={5} fill="var(--accent)" />
                  <text x={x} y={TOP - 13} textAnchor="middle" fontSize={11} fill="#1a1206" fontWeight={600}>
                    {mwYear < 0 ? `${Math.abs(mwYear)} BC` : mwYear}
                  </text>
                </g>
              </g>
            )
          })()}

          {/* stations */}
          {visible.map((p) => {
            const c = colorOf(p.e)
            const isSel = sel.includes(p.e.id)
            const imp = p.e.importance
            const r = imp === 1 ? 6.5 : imp === 2 ? 4.2 : imp === 3 ? 3.2 : 2.4
            return (
              <g key={p.e.id}>
                {isSel && <circle cx={p.x} cy={p.y} r={r + 4} fill="none" stroke="var(--text)" strokeWidth={1.5} />}
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={r}
                  fill={imp === 1 ? 'var(--bg)' : c}
                  stroke={c}
                  strokeWidth={imp === 1 ? 3 : 1.1}
                  strokeDasharray={p.e.fuzzy ? '2.5 2' : undefined}
                  style={{ cursor: 'pointer' }}
                  onClick={() => toggleSel(p.e.id)}
                  onMouseEnter={(ev) => {
                    if (drag.current.mode) return
                    const rr = stageRef.current!.getBoundingClientRect()
                    setHover({ id: p.e.id, mx: ev.clientX - rr.left, my: ev.clientY - rr.top })
                  }}
                  onMouseLeave={() => setHover(null)}
                />
              </g>
            )
          })}

          {/* labels */}
          {labels.map(({ p, side }) => {
            const right = p.x > w - 150
            const dx = right ? -10 : 10
            const dy = side === -1 ? -9 : 16
            const txt = p.e.fuzzy ? `${p.e.title} ?` : p.e.title
            return (
              <text
                key={`l${p.e.id}`}
                x={p.x + dx}
                y={p.y + dy}
                textAnchor={right ? 'end' : 'start'}
                fontSize={11.5}
                style={{ paintOrder: 'stroke', stroke: 'var(--bg)', strokeWidth: 3.5, fill: 'var(--text)' }}
              >
                {txt}
              </text>
            )
          })}

          {/* compare connector */}
          {selEvents.length === 2 && (() => {
            const a = selEvents[0]
            const b = selEvents[1]
            const ax = sx(a.year)
            const ay = rowY(laneIndex.get(laneOf(a)) ?? 0)
            const bx = sx(b.year)
            const by = rowY(laneIndex.get(laneOf(b)) ?? 0)
            const mx = (ax + bx) / 2
            const my = (ay + by) / 2 - 7
            return (
              <g>
                <line x1={ax} y1={ay} x2={bx} y2={by} stroke="var(--text)" strokeWidth={1.5} strokeDasharray="4 4" />
                <text x={mx} y={my} textAnchor="middle" fontSize={12} fontWeight={600} style={{ paintOrder: 'stroke', stroke: 'var(--bg)', strokeWidth: 4, fill: 'var(--accent)' }}>
                  {Math.abs(a.year - b.year).toLocaleString()} years apart
                </text>
              </g>
            )
          })()}

        </svg>

        {hover && hoverEv && (
          <div
            className="tip"
            style={{ left: clamp(hover.mx + 12, 4, w - 250), top: clamp(hover.my + 12, 4, h - 110) }}
          >
            <b>{hoverEv.title}</b>
            <div className="meta">
              {fmtYear(hoverEv.year)}
              {hoverEv.endYear ? ` – ${fmtYear(hoverEv.endYear)}` : ''} · {THREAD_MAP[hoverEv.thread]?.name}
            </div>
            {hoverEv.note && <div className="note">{hoverEv.note}</div>}
          </div>
        )}

        {mwOn && (
          <div className="mwpanel">
            <h4>
              Meanwhile in <span>{mwYear < 0 ? `${Math.abs(mwYear)} BCE` : `${mwYear} CE`}</span>
            </h4>
            {mwState.map(({ lane, ev }) => (
              <div className="mwrow" key={lane.id}>
                <span className="sw" style={{ background: lane.color }} />
                <div>
                  <div className="who">{lane.name}</div>
                  {ev ? (
                    <div className="what">
                      {ev.title} <span className="yr">{fmtYear(ev.year)}</span>
                    </div>
                  ) : (
                    <div className="yr">no recorded events yet</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {selEvents.length === 2 && (
          <div className="readout">
            <b>{Math.abs(selEvents[0].year - selEvents[1].year).toLocaleString()} years</b> between{' '}
            {selEvents[0].title} ({fmtYear(selEvents[0].year)}) and {selEvents[1].title} ({fmtYear(selEvents[1].year)})
            <span className="x" onClick={() => setSel([])}>
              clear
            </span>
          </div>
        )}

        <div className="hint">scroll to zoom · drag to pan · click two events to compare</div>
      </div>
    </div>
  )
}
