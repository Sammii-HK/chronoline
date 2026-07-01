import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import MapMenu, { type Lens } from './MapMenu'
import type { StrataConfig, StrataItem } from './engine/strata'

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v))
const lerp = (a: number, b: number, t: number) => a + (b - a) * t
const smooth = (x: number) => {
  const t = clamp(x, 0, 1)
  return t * t * (3 - 2 * t)
}
const L10 = Math.log10
const TOP = 30
const BOTTOM = 46

export default function StrataMap({ config, lens, setLens }: { config: StrataConfig; lens: Lens; setLens: (l: Lens) => void }) {
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
  const [shellPos, setShellPos] = useState(1000)
  const [query, setQuery] = useState('')
  const [allSubs, setAllSubs] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [hidden, setHidden] = useState<Set<string>>(() => new Set())

  // reset transient view state when the map (config) changes
  useEffect(() => {
    setView({ k: 1, tx: 0 })
    setSel([])
    setShellOn(false)
    setHidden(new Set())
    setAllSubs(false)
  }, [config.id])

  const ITEMS = config.items
  const LANES = config.lanes
  const LANE_MAP = useMemo(() => Object.fromEntries(LANES.map((l) => [l.id, l])), [LANES])
  const isLog = config.scale === 'log'
  const ax = useCallback((v: number) => (isLog ? L10(v) : v), [isLog])
  const inv = useCallback((a: number) => (isLog ? Math.pow(10, a) : a), [isLog])
  const fmt = config.axis.format
  const fmtSpan = config.formatSpan ?? config.axis.format
  const fanLaneId = config.fanLanes?.[0]
  const fanIdx = useMemo(() => (fanLaneId ? LANES.findIndex((l) => l.id === fanLaneId) : -1), [LANES, fanLaneId])

  const byId = useMemo(() => new Map(ITEMS.map((o) => [o.id, o])), [ITEMS])
  const [loP, hiP] = useMemo(() => {
    let lo = Infinity
    let hi = -Infinity
    for (const o of ITEMS) {
      lo = Math.min(lo, o.pos)
      hi = Math.max(hi, o.pos)
    }
    return [lo, hi]
  }, [ITEMS])
  const lo = ax(loP)
  const hi = ax(hiP)

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
  const unit = (v: number) => (ax(v) - lo) / (hi - lo)
  const fromUnit = (u: number) => inv(lo + u * (hi - lo))
  const sx = (v: number) => unit(v) * w * view.k + view.tx
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
  const posAtPx = (px: number) => fromUnit((px - viewRef.current.tx) / (w * viewRef.current.k))

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
      setShellPos(clamp(posAtPx(px), loP, hiP))
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
  const runSearch = () => {
    const q = query.trim().toLowerCase()
    if (!q) return
    const hit = ITEMS.find((o) => o.label.toLowerCase().includes(q))
    if (!hit) return
    const wv = dimsRef.current.w
    const nk = Math.max(viewRef.current.k, 8)
    setView({ k: nk, tx: clampTx(wv / 2 - unit(hit.pos) * wv * nk, nk, wv) })
    setSel([hit.id])
  }

  // ---- layout: one band per lane; the fan lane expands into sub-lanes on zoom ----
  const n = LANES.length
  const usableH = h - TOP - BOTTOM
  const laneIndex = useMemo(() => new Map(LANES.map((c, i) => [c.id, i])), [LANES])
  const subNames = useMemo(() => {
    if (!fanLaneId) return [] as string[]
    const s = new Set<string>()
    for (const o of ITEMS) if (o.lane === fanLaneId && o.sub) s.add(o.sub)
    const primary = (config.fanPrimary ?? []).filter((x) => s.has(x))
    const featured = config.fanFeatured ? new Set(config.fanFeatured) : null
    let rest = [...s].filter((x) => !primary.includes(x))
    if (featured && !allSubs) rest = rest.filter((x) => featured.has(x))
    rest.sort()
    return [...primary, ...rest]
  }, [ITEMS, fanLaneId, config.fanPrimary, config.fanFeatured, allSubs])
  const subIndex = useMemo(() => new Map(subNames.map((c, i) => [c, i])), [subNames])
  const mSub = Math.max(1, subNames.length)

  const sp = fanIdx >= 0 ? smooth(clamp((k - 2) / 3, 0, 1)) : 0
  const zFrac = fanIdx >= 0 ? lerp(1 / n, 0.82, sp) : 1 / n
  const otherFrac = n > 1 ? (1 - zFrac) / (n - 1) : 1
  const bands = useMemo(() => {
    const out: { top: number; h: number }[] = []
    let acc = TOP
    for (let i = 0; i < n; i++) {
      const bh = usableH * (i === fanIdx ? zFrac : otherFrac)
      out.push({ top: acc, h: bh })
      acc += bh
    }
    return out
  }, [n, usableH, zFrac, otherFrac, fanIdx])
  const laneCenterY = (i: number) => bands[i].top + bands[i].h / 2
  const subY = (si: number) => {
    const b = bands[fanIdx]
    const pad = b.h * 0.05
    return b.top + pad + ((b.h - 2 * pad) * (si + 0.5)) / mSub
  }
  const objY = (o: StrataItem) => {
    const i = laneIndex.get(o.lane) ?? 0
    if (fanLaneId && o.lane === fanLaneId && sp > 0.02 && o.sub) {
      const si = subIndex.get(o.sub)
      if (si != null) return lerp(laneCenterY(i), subY(si), sp)
    }
    return laneCenterY(i)
  }

  const showImp = (i: number) => (i <= 3 ? true : k >= 2.2)
  const showLbl = (i: number) => (i === 1 ? true : i === 2 ? k >= 1.1 : i === 3 ? k >= 1.9 : k >= 3.5)

  const visible = ITEMS.filter((o) => showImp(o.importance) && !hidden.has(o.lane))
    .map((o) => ({ o, x: sx(o.pos), y: objY(o), c: LANE_MAP[o.lane].color }))
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
      const wpx = c.o.label.length * 6.1 + 6
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
    for (const d of config.axis.ticks) {
      if (d < loP || d > hiP) continue
      const x = sx(d)
      if (x < -10 || x > w + 10) continue
      if (x - lastTx < 70) continue
      lastTx = x
      ticks.push({ d, x })
    }
  }

  const selObjs = sel.map((id) => byId.get(id)).filter(Boolean) as StrataItem[]
  const hoverO = hover ? byId.get(hover.id) : null

  const shellState = useMemo(() => {
    if (!shellOn) return []
    return LANES.map((cat) => {
      let best: StrataItem | null = null
      let bd = Infinity
      for (const o of ITEMS) {
        if (o.lane !== cat.id) continue
        const d = Math.abs(ax(o.pos) - ax(shellPos))
        if (d < bd) {
          bd = d
          best = o
        }
      }
      return { cat, o: best }
    })
  }, [shellOn, shellPos, ITEMS, LANES, ax])

  const laneNameOf = (id: string) => LANE_MAP[id]?.name ?? id

  return (
    <div className="app">
      <div className="topbar">
        <MapMenu lens={lens} setLens={setLens} />
        <div style={{ position: 'relative' }}>
          <button className="btn" aria-expanded={menuOpen} onClick={() => setMenuOpen((v) => !v)}>
            Options <span style={{ opacity: 0.55 }}>▾</span>
          </button>
          {menuOpen && (
            <>
              <div onClick={() => setMenuOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 29 }} />
              <div style={{ position: 'absolute', top: '112%', left: 0, zIndex: 30, minWidth: 210, background: 'var(--panel)', border: '1px solid var(--border)', borderRadius: 10, padding: 4, boxShadow: '0 8px 28px rgba(0,0,0,0.45)' }}>
                <button className="menuitem" onClick={() => { if (!shellOn) setShellPos(posAtPx(dimsRef.current.w / 2)); setShellOn((v) => !v) }}>
                  <span>{config.scrubberLabel}</span><span style={{ color: 'var(--accent)' }}>{shellOn ? '✓' : ''}</span>
                </button>
                {config.fanFeatured && config.fanToggleLabel && (
                  <button className="menuitem" onClick={() => setAllSubs((v) => !v)}>
                    <span>{config.fanToggleLabel}</span><span style={{ color: fanIdx >= 0 ? LANES[fanIdx].color : 'var(--accent)' }}>{allSubs ? '✓' : ''}</span>
                  </button>
                )}
                <div style={{ height: 1, background: 'var(--border)', margin: '4px 0' }} />
                <div style={{ fontSize: 11, color: 'var(--muted)', padding: '3px 10px 2px' }}>Lines</div>
                {LANES.map((c) => (
                  <button
                    key={c.id}
                    className="menuitem"
                    onClick={() => setHidden((hs) => { const nx = new Set(hs); if (nx.has(c.id)) nx.delete(c.id); else nx.add(c.id); return nx })}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ width: 10, height: 10, borderRadius: 3, background: c.color, opacity: hidden.has(c.id) ? 0.3 : 1 }} />
                      <span style={{ opacity: hidden.has(c.id) ? 0.5 : 1 }}>{c.name}</span>
                    </span>
                    <span style={{ color: c.color }}>{hidden.has(c.id) ? '' : '✓'}</span>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
        <div className="spacer" />
        {searchOpen ? (
          <input
            className="search"
            autoFocus
            placeholder="Search, then Enter"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') { runSearch(); setSearchOpen(false) } else if (e.key === 'Escape') setSearchOpen(false) }}
            onBlur={() => { if (!query) setSearchOpen(false) }}
          />
        ) : (
          <button className="btn icon" aria-label="Search" onClick={() => setSearchOpen(true)}>⌕</button>
        )}
        <button className="btn icon" aria-label="Zoom out" onClick={() => zoomAbout(dimsRef.current.w / 2, 1 / 1.4)}>–</button>
        <button className="btn icon" aria-label="Zoom in" onClick={() => zoomAbout(dimsRef.current.w / 2, 1.4)}>+</button>
        <button className="btn" onClick={() => { setView({ k: 1, tx: 0 }); setSel([]); setShellOn(false) }}>Reset</button>
      </div>

      <div className="legend">
        {LANES.map((c) => (
          <span className="chip" key={c.id}>
            <span className="sw" style={{ background: c.color }} />
            {c.name}
          </span>
        ))}
      </div>

      <div className="stage" ref={stageRef} onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp}>
        <svg width={w} height={h} role="img" aria-label={`Interactive map: ${config.name}`}>
          {ticks.map((t) => (
            <g key={`t${t.d}`}>
              <line x1={t.x} y1={TOP - 8} x2={t.x} y2={h - BOTTOM + 8} stroke="var(--grid)" strokeWidth={0.5} />
              <text x={t.x} y={h - BOTTOM + 26} textAnchor="middle" fontSize={11} fill="var(--faint)">{fmt(t.d)}</text>
            </g>
          ))}

          {LANES.map((c, i) => {
            if (hidden.has(c.id)) return null
            const y = laneCenterY(i)
            const isFan = c.id === fanLaneId
            return <line key={c.id} x1={clamp(sx(loP), 0, w)} y1={y} x2={clamp(sx(hiP), 0, w)} y2={y} stroke={c.color} strokeWidth={2.4} strokeLinecap="round" opacity={isFan ? 0.85 * (1 - sp) : 0.85} />
          })}

          {/* fan sub-lanes, revealed on zoom */}
          {fanLaneId &&
            fanIdx >= 0 &&
            !hidden.has(fanLaneId) &&
            sp > 0.02 &&
            (() => {
              const laneH = (bands[fanIdx].h * 0.9) / mSub
              const col = LANES[fanIdx].color
              return subNames.map((sign, si) => {
                const y = subY(si)
                return (
                  <g key={`zs${sign}`}>
                    <line x1={clamp(sx(loP), 0, w)} y1={y} x2={clamp(sx(hiP), 0, w)} y2={y} stroke={col} strokeWidth={1} strokeLinecap="round" opacity={0.16 + 0.4 * sp} />
                    {sp > 0.6 && laneH > 10 && (
                      <text x={7} y={y + 3} fontSize={9.5} opacity={(sp - 0.6) / 0.4} style={{ paintOrder: 'stroke', stroke: 'var(--bg)', strokeWidth: 3, fill: col }}>{sign}</text>
                    )}
                  </g>
                )
              })
            })()}

          {shellOn && (() => {
            const x = sx(shellPos)
            return (
              <g style={{ cursor: 'ew-resize' }} onPointerDown={onShellDown}>
                <rect x={x - 22} y={TOP - 16} width={44} height={h - BOTTOM - TOP + 26} fill="transparent" />
                <line x1={x} y1={TOP - 12} x2={x} y2={h - BOTTOM + 8} stroke="var(--accent)" strokeWidth={1.5} strokeDasharray="5 4" pointerEvents="none" />
                <rect x={x - 52} y={TOP - 27} width={104} height={20} rx={6} fill="var(--accent)" pointerEvents="none" />
                <text x={x} y={TOP - 13} textAnchor="middle" fontSize={11} fill="#1a1206" fontWeight={600} pointerEvents="none">{fmt(shellPos)}</text>
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
                <circle cx={p.x} cy={p.y} r={r} fill={imp === 1 ? 'var(--bg)' : p.c} stroke={p.c} strokeWidth={imp === 1 ? 3 : 1.1} strokeDasharray={p.o.fuzzy ? '2 2' : undefined} pointerEvents="none" />
                <circle cx={p.x} cy={p.y} r={Math.max(r + 7, 13)} fill="transparent" style={{ cursor: 'pointer' }}
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
                {p.o.label}
              </text>
            )
          })}

          {selObjs.length === 2 && (() => {
            const a = selObjs[0]
            const b = selObjs[1]
            const axp = sx(a.pos)
            const ay = objY(a)
            const bxp = sx(b.pos)
            const by = objY(b)
            return (
              <g>
                <line x1={axp} y1={ay} x2={bxp} y2={by} stroke="var(--text)" strokeWidth={1.5} strokeDasharray="4 4" />
                <text x={(axp + bxp) / 2} y={(ay + by) / 2 - 7} textAnchor="middle" fontSize={12} fontWeight={600} style={{ paintOrder: 'stroke', stroke: 'var(--bg)', strokeWidth: 4, fill: 'var(--accent)' }}>
                  {fmtSpan(Math.abs(a.pos - b.pos))} apart
                </text>
              </g>
            )
          })()}
        </svg>

        {hover && hoverO && (
          <div className="tip" style={{ left: clamp(hover.mx + 12, 4, w - 250), top: clamp(hover.my + 12, 4, h - 110) }}>
            <b>{hoverO.label}</b>
            <div className="meta">{fmt(hoverO.pos)}{config.originLabel ?? ''} · {laneNameOf(hoverO.lane)}{hoverO.sub ? ` · ${hoverO.sub}` : ''}</div>
            {hoverO.note && <div className="note">{hoverO.note}</div>}
          </div>
        )}

        {shellOn && (
          <div className="mwpanel">
            <h4>At <span>{fmt(shellPos)}</span></h4>
            {shellState.map(({ cat, o }) => (
              <div className="mwrow" key={cat.id}>
                <span className="sw" style={{ background: cat.color }} />
                <div>
                  <div className="who">{cat.name}</div>
                  {o ? <div className="what">{o.label} <span className="yr">{fmt(o.pos)}</span></div> : <div className="yr">nothing here</div>}
                </div>
              </div>
            ))}
          </div>
        )}

        {selObjs.length === 1 && (
          <div className="readout">
            <div><b>{selObjs[0].label}</b> · {fmt(selObjs[0].pos)}{config.originLabel ?? ''} · {laneNameOf(selObjs[0].lane)}{selObjs[0].sub ? ` · ${selObjs[0].sub}` : ''}</div>
            {selObjs[0].note ? <div className="rnote">{selObjs[0].note}</div> : null}
            <div className="rhint">tap another to compare</div>
            <span className="x" onClick={() => setSel([])}>clear</span>
          </div>
        )}

        {selObjs.length === 2 && (
          <div className="readout">
            <div><b>{fmtSpan(Math.abs(selObjs[0].pos - selObjs[1].pos))}</b> between {selObjs[0].label} and {selObjs[1].label}</div>
            {config.compare(selObjs[0], selObjs[1]).map((line, i) => <div className="reveal" key={i}>{line}</div>)}
            <span className="x" onClick={() => setSel([])}>clear</span>
          </div>
        )}

        {config.hint && <div className="hint">{config.hint}</div>}
      </div>
    </div>
  )
}
