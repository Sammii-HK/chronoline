import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { COSMOS as COSMOS_BASE } from './data/cosmos'
import { PACK as COSMOS_PACK } from './data/pack_cosmos'
import type { CosmosObject, CosmosCategory } from './data/cosmos'

const COSMOS: CosmosObject[] = [...COSMOS_BASE, ...COSMOS_PACK]

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v))
const lerp = (a: number, b: number, t: number) => a + (b - a) * t
const smooth = (x: number) => {
  const t = clamp(x, 0, 1)
  return t * t * (3 - 2 * t)
}
const L10 = Math.log10

const CATEGORIES: { id: CosmosCategory; name: string; color: string }[] = [
  { id: 'solarSystem', name: 'Solar System', color: '#E8B84B' },
  { id: 'stars', name: 'Nearby stars', color: '#4C82C3' },
  { id: 'zodiac', name: 'Zodiac', color: '#C56BD6' },
  { id: 'deepSky', name: 'Clusters & nebulae', color: '#2FA98C' },
  { id: 'milkyWay', name: 'Milky Way', color: '#E07A3E' },
  { id: 'localGroup', name: 'Local Group', color: '#D7494C' },
  { id: 'largeScale', name: 'Large-scale structure', color: '#6C6CE8' },
]
const CAT_MAP = Object.fromEntries(CATEGORIES.map((c) => [c.id, c])) as Record<CosmosCategory, (typeof CATEGORIES)[number]>
const ZODIAC_SIGNS = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpius', 'Sagittarius', 'Capricornus', 'Aquarius', 'Pisces']
const Z_IDX = CATEGORIES.findIndex((c) => c.id === 'zodiac')

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

const TICK_LY = [3.17e-8, 1.581e-5, 1.581e-2, 1, 100, 1e4, 1e6, 1e8, 1e10]
const TOP = 30
const BOTTOM = 46

function reveals(a: CosmosObject, b: CosmosObject): string[] {
  const near = a.distanceLy <= b.distanceLy ? a : b
  const far = a.distanceLy <= b.distanceLy ? b : a
  const gap = far.distanceLy - near.distanceLy
  const out: string[] = []
  if (near.sub && near.sub === far.sub) {
    out.push(`They share the constellation ${near.sub}, yet sit ${fmtDist(gap)} apart in depth. The shape is an illusion of our viewing angle.`)
  }
  if (gap > near.distanceLy && near.distanceLy > 0) {
    out.push(`${near.name} is closer to Earth than to ${far.name}.`)
  }
  out.push(`Light needs ${fmtDist(gap)} of travel to cross the gap between them.`)
  return out.slice(0, 3)
}

export default function CosmosView() {
  const stageRef = useRef<HTMLDivElement>(null)
  const dimsRef = useRef({ w: 1200, h: 640 })
  const [dims, setDims] = useState({ w: 1200, h: 640 })

  const [view, setView] = useState({ k: 1, tx: 0 })
  const viewRef = useRef(view)
  viewRef.current = view
  const didInit = useRef(false)

  const [sel, setSel] = useState<string[]>([])
  const [hover, setHover] = useState<{ id: string; mx: number; my: number } | null>(null)
  const [shellOn, setShellOn] = useState(false)
  const [shellDist, setShellDist] = useState(1000)

  const byId = useMemo(() => new Map(COSMOS.map((o) => [o.id, o])), [])
  const [loLy, hiLy] = useMemo(() => {
    let lo = Infinity
    let hi = 0
    for (const o of COSMOS) {
      lo = Math.min(lo, o.distanceLy)
      hi = Math.max(hi, o.distanceLy)
    }
    return [lo, hi]
  }, [])
  const lo = L10(loLy)
  const hi = L10(hiLy)

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
        setView({ k: 1, tx: 0 })
      }
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const { w, h } = dims
  const unit = (ly: number) => (L10(ly) - lo) / (hi - lo)
  const fromUnit = (u: number) => Math.pow(10, lo + u * (hi - lo))
  const sx = (ly: number) => unit(ly) * w * view.k + view.tx
  const k = view.k

  const zoomAbout = useCallback(
    (px: number, factor: number) => {
      setView((v) => {
        const nk = clamp(v.k * factor, 0.85, 60)
        const ntx = clampTx(px - (px - v.tx) * (nk / v.k), nk, dimsRef.current.w)
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

  const drag = useRef<{ mode: 'pan' | 'shell' | null; lastX: number; startX: number; moved: boolean }>({ mode: null, lastX: 0, startX: 0, moved: false })
  const localX = (clientX: number) => clientX - stageRef.current!.getBoundingClientRect().left
  const distAtPx = (px: number) => fromUnit((px - viewRef.current.tx) / (w * viewRef.current.k))

  const onDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const px = localX(e.clientX)
    drag.current = { mode: 'pan', lastX: px, startX: px, moved: false }
    stageRef.current?.setPointerCapture(e.pointerId)
    stageRef.current?.classList.add('grabbing')
    setHover(null)
  }
  const onShellDown = (e: React.PointerEvent<SVGGElement>) => {
    e.stopPropagation()
    drag.current = { mode: 'shell', lastX: 0, startX: 0, moved: true }
    stageRef.current?.setPointerCapture(e.pointerId)
  }
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const m = drag.current
    if (!m.mode) return
    const px = localX(e.clientX)
    if (m.mode === 'shell') {
      setShellDist(clamp(distAtPx(px), loLy, hiLy))
      return
    }
    const dx = px - m.lastX
    m.lastX = px
    if (Math.abs(px - m.startX) > 4) m.moved = true
    setView((v) => ({ k: v.k, tx: clampTx(v.tx + dx, v.k, dimsRef.current.w) }))
  }
  const onUp = (e: React.PointerEvent<HTMLDivElement>) => {
    stageRef.current?.releasePointerCapture(e.pointerId)
    stageRef.current?.classList.remove('grabbing')
    drag.current.mode = null
  }
  const toggleSel = (id: string) => {
    if (drag.current.moved) return
    setSel((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id].slice(-2)))
  }

  // ---- layout: 7 category bands; the zodiac band expands into 12 sign sub-lanes on zoom ----
  const n = CATEGORIES.length
  const usableH = h - TOP - BOTTOM
  const catIndex = useMemo(() => new Map(CATEGORIES.map((c, i) => [c.id, i])), [])
  const signIndex = useMemo(() => new Map(ZODIAC_SIGNS.map((s, i) => [s, i])), [])

  const sp = smooth(clamp((k - 2) / 3, 0, 1))
  const zFrac = lerp(1 / n, 0.58, sp)
  const otherFrac = (1 - zFrac) / (n - 1)
  const bands = useMemo(() => {
    const out: { top: number; h: number }[] = []
    let acc = TOP
    for (let i = 0; i < n; i++) {
      const bh = usableH * (i === Z_IDX ? zFrac : otherFrac)
      out.push({ top: acc, h: bh })
      acc += bh
    }
    return out
  }, [n, usableH, zFrac, otherFrac])
  const catCenterY = (i: number) => bands[i].top + bands[i].h / 2
  const zSignY = (si: number) => {
    const b = bands[Z_IDX]
    const pad = b.h * 0.08
    return b.top + pad + ((b.h - 2 * pad) * (si + 0.5)) / 12
  }
  const objY = (o: CosmosObject) => {
    const i = catIndex.get(o.category) ?? 0
    if (o.category === 'zodiac' && sp > 0.02 && o.sub) {
      const si = signIndex.get(o.sub)
      if (si != null) return lerp(catCenterY(i), zSignY(si), sp)
    }
    return catCenterY(i)
  }

  const showImp = (i: number) => (i <= 3 ? true : k >= 2.2)
  const showLbl = (i: number) => (i === 1 ? true : i === 2 ? k >= 1.1 : i === 3 ? k >= 1.9 : k >= 3.5)

  const visible = COSMOS.filter((o) => showImp(o.importance))
    .map((o) => ({ o, x: sx(o.distanceLy), y: objY(o), c: CAT_MAP[o.category].color }))
    .filter((p) => p.x > -50 && p.x < w + 50)
    .sort((a, b) => b.o.importance - a.o.importance)

  type Cand = (typeof visible)[number]
  const labels: { p: Cand; side: 1 | -1 }[] = []
  const up: [number, number][] = []
  const dn: [number, number][] = []
  const fits = (list: [number, number][], La: number, Ra: number) => !list.some(([a, b]) => La < b + 8 && Ra > a - 8)
  let toggle = 0
  const place = (cands: Cand[]) => {
    for (const c of cands.sort((a, b) => a.x - b.x)) {
      const wpx = c.o.name.length * 6.1 + 6
      const right = c.x > w - 150
      const La = right ? c.x - wpx : c.x
      const Ra = right ? c.x : c.x + wpx
      const order: (1 | -1)[] = toggle++ % 2 === 0 ? [-1, 1] : [1, -1]
      for (const side of order) {
        const list = side === -1 ? up : dn
        if (fits(list, La, Ra)) {
          list.push([La, Ra])
          labels.push({ p: c, side })
          break
        }
      }
    }
  }
  place(visible.filter((p) => p.o.importance === 1 && showLbl(1)))
  place(visible.filter((p) => p.o.importance === 2 && showLbl(2)))
  place(visible.filter((p) => p.o.importance === 3 && showLbl(3)))
  place(visible.filter((p) => p.o.importance === 4 && showLbl(4)))

  const ticks: { d: number; x: number }[] = []
  {
    let lastTx = -1e9
    for (const d of TICK_LY) {
      if (d < loLy || d > hiLy) continue
      const x = sx(d)
      if (x < -10 || x > w + 10) continue
      if (x - lastTx < 70) continue
      lastTx = x
      ticks.push({ d, x })
    }
  }

  const selObjs = sel.map((id) => byId.get(id)).filter(Boolean) as CosmosObject[]
  const hoverO = hover ? byId.get(hover.id) : null

  const shellState = useMemo(() => {
    if (!shellOn) return []
    return CATEGORIES.map((cat) => {
      let best: CosmosObject | null = null
      let bd = Infinity
      for (const o of COSMOS) {
        if (o.category !== cat.id) continue
        const d = Math.abs(L10(o.distanceLy) - L10(shellDist))
        if (d < bd) {
          bd = d
          best = o
        }
      }
      return { cat, o: best }
    })
  }, [shellOn, shellDist])

  return (
    <div className="app">
      <div className="topbar">
        <div className="brand">
          <b>Chronoline · Cosmos</b>
          <span>the scale of the universe</span>
        </div>
        <button className={`btn ${shellOn ? 'on' : ''}`} onClick={() => { if (!shellOn) setShellDist(distAtPx(dimsRef.current.w / 2)); setShellOn((v) => !v) }}>
          Distance shell
        </button>
        <div className="spacer" />
        <button className="btn icon" aria-label="Zoom out" onClick={() => zoomAbout(dimsRef.current.w / 2, 1 / 1.4)}>–</button>
        <button className="btn icon" aria-label="Zoom in" onClick={() => zoomAbout(dimsRef.current.w / 2, 1.4)}>+</button>
        <button className="btn" onClick={() => { setView({ k: 1, tx: 0 }); setSel([]); setShellOn(false) }}>Reset</button>
      </div>

      <div className="legend">
        {CATEGORIES.map((c) => (
          <span className="chip" key={c.id}>
            <span className="sw" style={{ background: c.color }} />
            {c.name}
          </span>
        ))}
      </div>

      <div className="stage" ref={stageRef} onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp}>
        <svg width={w} height={h} role="img" aria-label="Interactive scale of the universe">
          {ticks.map((t) => (
            <g key={`t${t.d}`}>
              <line x1={t.x} y1={TOP - 8} x2={t.x} y2={h - BOTTOM + 8} stroke="var(--grid)" strokeWidth={0.5} />
              <text x={t.x} y={h - BOTTOM + 26} textAnchor="middle" fontSize={11} fill="var(--faint)">{fmtDist(t.d)}</text>
            </g>
          ))}

          {CATEGORIES.map((c, i) => {
            const y = catCenterY(i)
            const isZ = c.id === 'zodiac'
            return <line key={c.id} x1={clamp(sx(loLy), 0, w)} y1={y} x2={clamp(sx(hiLy), 0, w)} y2={y} stroke={c.color} strokeWidth={2.4} strokeLinecap="round" opacity={isZ ? 0.85 * (1 - sp) : 0.85} />
          })}

          {/* zodiac sign sub-lanes, revealed on zoom */}
          {sp > 0.02 &&
            ZODIAC_SIGNS.map((sign, si) => {
              const y = zSignY(si)
              return (
                <g key={`zs${sign}`}>
                  <line x1={clamp(sx(loLy), 0, w)} y1={y} x2={clamp(sx(hiLy), 0, w)} y2={y} stroke="#C56BD6" strokeWidth={1.2} strokeLinecap="round" opacity={0.25 + 0.5 * sp} />
                  {sp > 0.5 && (
                    <text x={7} y={y + 3} fontSize={10} opacity={(sp - 0.5) / 0.5} style={{ paintOrder: 'stroke', stroke: 'var(--bg)', strokeWidth: 3, fill: '#C56BD6' }}>{sign}</text>
                  )}
                </g>
              )
            })}

          {shellOn && (() => {
            const x = sx(shellDist)
            return (
              <g style={{ cursor: 'ew-resize' }} onPointerDown={onShellDown}>
                <rect x={x - 22} y={TOP - 16} width={44} height={h - BOTTOM - TOP + 26} fill="transparent" />
                <line x1={x} y1={TOP - 12} x2={x} y2={h - BOTTOM + 8} stroke="var(--accent)" strokeWidth={1.5} strokeDasharray="5 4" pointerEvents="none" />
                <rect x={x - 52} y={TOP - 27} width={104} height={20} rx={6} fill="var(--accent)" pointerEvents="none" />
                <text x={x} y={TOP - 13} textAnchor="middle" fontSize={11} fill="#1a1206" fontWeight={600} pointerEvents="none">{fmtDist(shellDist)}</text>
              </g>
            )
          })()}

          {visible.map((p) => {
            const imp = p.o.importance
            const r = imp === 1 ? 6.5 : imp === 2 ? 4.6 : imp === 3 ? 3.3 : 2.5
            const isSel = sel.includes(p.o.id)
            return (
              <g key={p.o.id}>
                {isSel && <circle cx={p.x} cy={p.y} r={r + 4} fill="none" stroke="var(--text)" strokeWidth={1.5} />}
                <circle cx={p.x} cy={p.y} r={r} fill={imp === 1 ? 'var(--bg)' : p.c} stroke={p.c} strokeWidth={imp === 1 ? 3 : 1.1} style={{ cursor: 'pointer' }}
                  onClick={() => toggleSel(p.o.id)}
                  onMouseEnter={(ev) => { if (drag.current.mode) return; const rr = stageRef.current!.getBoundingClientRect(); setHover({ id: p.o.id, mx: ev.clientX - rr.left, my: ev.clientY - rr.top }) }}
                  onMouseLeave={() => setHover(null)} />
              </g>
            )
          })}

          {labels.map(({ p, side }) => {
            const right = p.x > w - 150
            const dx = right ? -10 : 10
            const dy = side === -1 ? -10 : 17
            return (
              <text key={`l${p.o.id}`} x={p.x + dx} y={p.y + dy} textAnchor={right ? 'end' : 'start'} fontSize={11.5}
                style={{ paintOrder: 'stroke', stroke: 'var(--bg)', strokeWidth: 3.5, fill: 'var(--text)' }}>
                {p.o.name}
              </text>
            )
          })}

          {selObjs.length === 2 && (() => {
            const a = selObjs[0]
            const b = selObjs[1]
            const ax = sx(a.distanceLy)
            const ay = objY(a)
            const bx = sx(b.distanceLy)
            const by = objY(b)
            return (
              <g>
                <line x1={ax} y1={ay} x2={bx} y2={by} stroke="var(--text)" strokeWidth={1.5} strokeDasharray="4 4" />
                <text x={(ax + bx) / 2} y={(ay + by) / 2 - 7} textAnchor="middle" fontSize={12} fontWeight={600} style={{ paintOrder: 'stroke', stroke: 'var(--bg)', strokeWidth: 4, fill: 'var(--accent)' }}>
                  {fmtDist(Math.abs(a.distanceLy - b.distanceLy))} apart
                </text>
              </g>
            )
          })()}
        </svg>

        {hover && hoverO && (
          <div className="tip" style={{ left: clamp(hover.mx + 12, 4, w - 250), top: clamp(hover.my + 12, 4, h - 110) }}>
            <b>{hoverO.name}</b>
            <div className="meta">{fmtDist(hoverO.distanceLy)} from Earth · {CAT_MAP[hoverO.category].name}{hoverO.sub ? ` · ${hoverO.sub}` : ''}</div>
            {hoverO.note && <div className="note">{hoverO.note}</div>}
          </div>
        )}

        {shellOn && (
          <div className="mwpanel">
            <h4>At <span>{fmtDist(shellDist)}</span></h4>
            {shellState.map(({ cat, o }) => (
              <div className="mwrow" key={cat.id}>
                <span className="sw" style={{ background: cat.color }} />
                <div>
                  <div className="who">{cat.name}</div>
                  {o ? <div className="what">{o.name} <span className="yr">{fmtDist(o.distanceLy)}</span></div> : <div className="yr">nothing here</div>}
                </div>
              </div>
            ))}
          </div>
        )}

        {selObjs.length === 1 && (
          <div className="readout">
            <div><b>{selObjs[0].name}</b> · {fmtDist(selObjs[0].distanceLy)} from Earth · {CAT_MAP[selObjs[0].category].name}{selObjs[0].sub ? ` · ${selObjs[0].sub}` : ''}</div>
            {selObjs[0].note ? <div className="rnote">{selObjs[0].note}</div> : null}
            <div className="rhint">tap another object to compare</div>
            <span className="x" onClick={() => setSel([])}>clear</span>
          </div>
        )}

        {selObjs.length === 2 && (
          <div className="readout">
            <div><b>{fmtDist(Math.abs(selObjs[0].distanceLy - selObjs[1].distanceLy))}</b> between {selObjs[0].name} and {selObjs[1].name}</div>
            {reveals(selObjs[0], selObjs[1]).map((line, i) => <div className="reveal" key={i}>{line}</div>)}
            <span className="x" onClick={() => setSel([])}>clear</span>
          </div>
        )}

        <div className="hint">scroll to zoom · drag to pan · zoom in on the zodiac to split the signs · tap two to compare</div>
      </div>
    </div>
  )
}
