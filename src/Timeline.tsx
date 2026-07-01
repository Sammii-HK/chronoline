import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { HistEvent } from './types'
import { THREADS, DOMAINS, THREAD_MAP, DOMAIN_MAP } from './data/threads'
import MapMenu, { type Lens } from './MapMenu'

type ColorMode = 'thread' | 'domain'

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v))
const lerp = (a: number, b: number, t: number) => a + (b - a) * t
const smooth = (x: number) => {
  const t = clamp(x, 0, 1)
  return t * t * (3 - 2 * t)
}
const fmtYear = (y: number) => {
  const a = Math.abs(Math.round(y))
  const s = a >= 10000 ? a.toLocaleString() : String(a)
  return y < 0 ? `${s} BCE` : `${s} CE`
}

const STEPS = [5, 10, 20, 25, 50, 100, 200, 250, 500, 1000, 2000]
function niceStep(k: number, w: number, span: number) {
  const ppy = (w * k) / span
  const want = 110 / ppy
  for (const s of STEPS) if (s >= want) return s
  return 2000
}

const commaN = (n: number) => Math.round(n).toLocaleString()

// The McCandless "wait, that can't be right" lines for a compared pair.
function scaleReveals(a: HistEvent, b: HistEvent): string[] {
  const old = a.year <= b.year ? a : b
  const young = a.year <= b.year ? b : a
  const gap = young.year - old.year
  if (gap <= 0) return []
  const out: string[] = []
  const toNow = 2025 - young.year
  if (toNow > 0 && gap > toNow) {
    out.push(`${young.title} sits closer to today than to ${old.title}: ${commaN(toNow)} years back, versus ${commaN(gap)} years between the two.`)
  }
  const lifetimes = gap / 76
  if (lifetimes >= 2) {
    out.push(`That is about ${commaN(lifetimes)} human lifetimes laid end to end.`)
  }
  const histPct = (gap / 5225) * 100
  if (histPct >= 18) {
    out.push(`It spans roughly ${Math.round(histPct)}% of all recorded history.`)
  }
  return out.slice(0, 3)
}

type TimeScale = 'linear' | 'log'

// year -> [0,1] position. Log mode compresses deep antiquity and expands recent
// centuries (denser where the events are), measured as time-before-present.
function toUnit(year: number, scale: TimeScale, lo: number, hi: number) {
  if (scale === 'linear') return (year - lo) / (hi - lo)
  const REF = hi + 5
  const lmin = Math.log(REF - hi + 1)
  const lmax = Math.log(REF - lo + 1)
  const L = Math.log(Math.max(1, REF - year + 1))
  return (lmax - L) / (lmax - lmin)
}
function fromUnit(u: number, scale: TimeScale, lo: number, hi: number) {
  if (scale === 'linear') return lo + u * (hi - lo)
  const REF = hi + 5
  const lmin = Math.log(REF - hi + 1)
  const lmax = Math.log(REF - lo + 1)
  const L = lmax - u * (lmax - lmin)
  return REF - (Math.exp(L) - 1)
}

const LOG_TICKS = [-8000, -6000, -5000, -4000, -3000, -2000, -1500, -1000, -500, -250, 0, 250, 500, 750, 1000, 1250, 1500, 1650, 1800, 1900, 1950, 1980, 2000, 2020]

const TOP = 30
const BOTTOM = 46
const LANE_H = 26

type View = { k: number; tx: number; ty: number }

export default function Timeline({ events, lens, setLens }: { events: HistEvent[]; lens: Lens; setLens: (l: Lens) => void }) {
  const stageRef = useRef<HTMLDivElement>(null)
  const dimsRef = useRef({ w: 1200, h: 640 })
  const [dims, setDims] = useState({ w: 1200, h: 640 })

  const [colorMode, setColorMode] = useState<ColorMode>('thread')
  const [timeScale, setTimeScale] = useState<TimeScale>('linear')
  const timeScaleRef = useRef(timeScale)
  timeScaleRef.current = timeScale
  const [view, setView] = useState<View>({ k: 1, tx: 0, ty: 0 })
  const viewRef = useRef(view)
  viewRef.current = view
  const didInit = useRef(false)
  const anim = useRef<number | undefined>(undefined)

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

  // refs the imperative handlers read from (kept current by render)
  const spRef = useRef(0)
  const tyMinRef = useRef(0)

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
        const ts = timeScaleRef.current
        const W0 = ts === 'log' ? lo : -2500
        const W1 = ts === 'log' ? hi : 2030
        const u0 = toUnit(W0, ts, lo, hi)
        const u1 = toUnit(W1, ts, lo, hi)
        const nk = clamp(1 / (u1 - u0), 0.8, 90)
        setView({ k: nk, tx: clampTx(-u0 * d.w * nk, nk, d.w), ty: 0 })
      }
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [clampTx])

  const cancelAnim = () => {
    if (anim.current != null) cancelAnimationFrame(anim.current)
    anim.current = undefined
  }
  const animateTo = useCallback((target: View, ms = 340) => {
    cancelAnim()
    const start = { ...viewRef.current }
    const t0 = performance.now()
    const step = (now: number) => {
      const p = Math.min(1, (now - t0) / ms)
      const e = smooth(p)
      setView({ k: lerp(start.k, target.k, e), tx: lerp(start.tx, target.tx, e), ty: lerp(start.ty, target.ty, e) })
      if (p < 1) anim.current = requestAnimationFrame(step)
      else anim.current = undefined
    }
    anim.current = requestAnimationFrame(step)
  }, [])

  const zoomAbout = useCallback(
    (px: number, factor: number) => {
      cancelAnim()
      setView((v) => {
        const nk = clamp(v.k * factor, 0.75, 90)
        const ntx = clampTx(px - (px - v.tx) * (nk / v.k), nk, dimsRef.current.w)
        return { k: nk, tx: ntx, ty: v.ty }
      })
    },
    [clampTx],
  )

  const zoomBy = useCallback(
    (factor: number) => {
      const w = dimsRef.current.w
      const v = viewRef.current
      const px = w / 2
      const nk = clamp(v.k * factor, 0.75, 90)
      animateTo({ k: nk, tx: clampTx(px - (px - v.tx) * (nk / v.k), nk, w), ty: v.ty })
    },
    [animateTo, clampTx],
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

  const pointers = useRef(new Map<number, number>())
  const gesture = useRef<{ mode: 'pan' | 'mw' | 'pinch' | null; lastX: number; lastY: number; startX: number; moved: boolean; pinchDist: number }>({
    mode: null,
    lastX: 0,
    lastY: 0,
    startX: 0,
    moved: false,
    pinchDist: 0,
  })

  const rect = () => stageRef.current!.getBoundingClientRect()
  const localX = (clientX: number) => clientX - rect().left
  const yearAtPx = (px: number) => {
    const w = dimsRef.current.w
    const [lo, hi] = boundsRef.current
    return fromUnit((px - viewRef.current.tx) / (w * viewRef.current.k), timeScaleRef.current, lo, hi)
  }

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    cancelAnim()
    const r = rect()
    const px = e.clientX - r.left
    const py = e.clientY - r.top
    pointers.current.set(e.pointerId, px)
    stageRef.current?.setPointerCapture(e.pointerId)
    if (pointers.current.size >= 2) {
      const xs = [...pointers.current.values()]
      gesture.current = { mode: 'pinch', lastX: px, lastY: py, startX: px, moved: true, pinchDist: Math.abs(xs[0] - xs[1]) || 1 }
    } else {
      gesture.current = { mode: 'pan', lastX: px, lastY: py, startX: px, moved: false, pinchDist: 0 }
      stageRef.current?.classList.add('grabbing')
    }
    setHover(null)
  }
  const onMwDown = (e: React.PointerEvent<SVGGElement>) => {
    e.stopPropagation()
    cancelAnim()
    pointers.current.set(e.pointerId, localX(e.clientX))
    gesture.current = { mode: 'mw', lastX: 0, lastY: 0, startX: 0, moved: true, pinchDist: 0 }
    stageRef.current?.setPointerCapture(e.pointerId)
  }
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const g = gesture.current
    if (!g.mode) return
    const r = rect()
    const px = e.clientX - r.left
    const py = e.clientY - r.top
    if (pointers.current.has(e.pointerId)) pointers.current.set(e.pointerId, px)
    if (g.mode === 'mw') {
      setMwYear(clamp(Math.round(yearAtPx(px)), boundsRef.current[0], boundsRef.current[1]))
      return
    }
    if (g.mode === 'pinch') {
      const xs = [...pointers.current.values()]
      if (xs.length >= 2) {
        const dist = Math.abs(xs[0] - xs[1]) || 1
        const mid = (xs[0] + xs[1]) / 2
        const factor = dist / (g.pinchDist || dist)
        g.pinchDist = dist
        if (isFinite(factor) && factor > 0) zoomAbout(mid, factor)
      }
      return
    }
    const dx = px - g.lastX
    const dy = py - g.lastY
    g.lastX = px
    g.lastY = py
    if (Math.abs(px - g.startX) > 4 || Math.abs(dy) > 4) g.moved = true
    const vertical = spRef.current > 0.1
    setView((v) => ({
      k: v.k,
      tx: clampTx(v.tx + dx, v.k, dimsRef.current.w),
      ty: vertical ? clamp(v.ty + dy, tyMinRef.current, 0) : v.ty,
    }))
  }
  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    stageRef.current?.releasePointerCapture(e.pointerId)
    pointers.current.delete(e.pointerId)
    if (pointers.current.size === 0) {
      stageRef.current?.classList.remove('grabbing')
      gesture.current.mode = null
    } else if (pointers.current.size === 1 && gesture.current.mode === 'pinch') {
      const rx = [...pointers.current.values()][0]
      gesture.current = { mode: 'pan', lastX: rx, lastY: gesture.current.lastY, startX: rx, moved: true, pinchDist: 0 }
    }
  }

  const toggleSel = (id: string) => {
    if (gesture.current.moved) return
    setSel((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id].slice(-2)))
  }

  const frameFor = useCallback(
    (ts: TimeScale) => {
      const w = dimsRef.current.w
      const [lo, hi] = boundsRef.current
      const W0 = ts === 'log' ? lo : -2500
      const W1 = ts === 'log' ? hi : 2030
      const u0 = toUnit(W0, ts, lo, hi)
      const u1 = toUnit(W1, ts, lo, hi)
      const nk = clamp(1 / (u1 - u0), 0.8, 90)
      animateTo({ k: nk, tx: clampTx(-u0 * w * nk, nk, w), ty: 0 })
    },
    [animateTo, clampTx],
  )

  const resetView = useCallback(() => {
    frameFor(timeScaleRef.current)
    setSel([])
    setMwOn(false)
  }, [frameFor])

  const switchTimeScale = (ts: TimeScale) => {
    setTimeScale(ts)
    frameFor(ts)
    setSel([])
  }

  const runSearch = () => {
    const q = query.trim().toLowerCase()
    if (!q) return
    const hit = events.find((e) => e.title.toLowerCase().includes(q))
    if (!hit) return
    const w = dimsRef.current.w
    const [lo, hi] = boundsRef.current
    const nk = Math.max(viewRef.current.k, 3.4)
    const u = toUnit(hit.year, timeScaleRef.current, lo, hi)
    animateTo({ k: nk, tx: clampTx(w / 2 - u * w * nk, nk, w), ty: 0 })
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

  // sub-regions per thread, and a flat ordered list of all sub-lanes for the expanded view
  const { subLanes, slotOf, groupTop, totalUnits } = useMemo(() => {
    const subLanes = new Map<string, string[]>()
    for (const t of THREADS) subLanes.set(t.id, [])
    for (const e of events) {
      const arr = subLanes.get(e.thread)
      if (!arr) continue
      const key = e.sub ?? '·'
      if (!arr.includes(key)) arr.push(key)
    }
    for (const arr of subLanes.values())
      arr.sort((a, b) => (a === '·' ? -1 : b === '·' ? 1 : a.localeCompare(b)))
    // flat slot positions (in lane units), with a gap between region groups
    const slotOf = new Map<string, number>()
    const groupTop = new Map<string, number>()
    let pos = 0
    THREADS.forEach((t, ri) => {
      if (ri > 0) pos += 0.7
      const arr = subLanes.get(t.id)!
      const list = arr.length ? arr : ['·']
      groupTop.set(t.id, pos)
      for (const s of list) slotOf.set(t.id + '|' + s, pos++)
    })
    return { subLanes, slotOf, groupTop, totalUnits: pos }
  }, [events])

  const { w, h } = dims
  const unit = (year: number) => toUnit(year, timeScale, minY, maxY)
  const sx = (year: number) => unit(year) * w * view.k + view.tx
  const usableH = h - TOP - BOTTOM
  const centerY = TOP + usableH / 2
  const eff = clamp(0.5 + 0.5 * smooth((view.k - 1) / 3), 0.5, 1)
  const rowGap = usableH / Math.max(1, n - 1)
  const rowY = (i: number) => centerY + (i - (n - 1) / 2) * rowGap * eff

  const k = view.k
  const sp = colorMode === 'thread' ? smooth(clamp((k - 5) / 4, 0, 1)) : 0
  const expandedH = totalUnits * LANE_H + 24
  const tyMin = Math.min(0, h - BOTTOM - (TOP + 12 + expandedH))
  spRef.current = sp
  tyMinRef.current = tyMin
  const tyEff = sp > 0 ? clamp(view.ty, tyMin, 0) : 0
  const expandedY = (slot: number) => TOP + 12 + slot * LANE_H + LANE_H / 2 + tyEff

  const showImp = (i: number) =>
    i === 1 ? true : i === 2 ? k >= 1.5 : i === 3 ? k >= 2.6 : k >= 4.2
  const showLbl = (i: number) =>
    i === 1 ? k >= 0.95 : i === 2 ? k >= 2.0 : i === 3 ? k >= 3.4 : k >= 6

  const laneOf = (e: HistEvent) => (colorMode === 'thread' ? e.thread : e.domain)
  const colorOf = (e: HistEvent) => map[laneOf(e)]?.color ?? '#888'

  // y for a thread-mode sub-lane, blended from its region row to its expanded slot
  const laneFinalY = (regionRow: number, threadId: string, sub: string) => {
    const cY = rowY(regionRow)
    if (sp <= 0) return cY
    const slot = slotOf.get(threadId + '|' + sub) ?? 0
    return lerp(cY, expandedY(slot), sp)
  }
  // y for a region's header label in the expanded view
  const regionHeaderY = (regionRow: number, threadId: string) =>
    lerp(rowY(regionRow), expandedY(groupTop.get(threadId) ?? 0) - LANE_H * 0.55, sp)
  const eventY = (e: HistEvent) => {
    const i = laneIndex.get(laneOf(e)) ?? 0
    if (colorMode !== 'thread' || sp <= 0) return rowY(i)
    return laneFinalY(i, e.thread, e.sub ?? '·')
  }

  // visible, sorted so important draw last (on top)
  const visible = events
    .filter((e) => showImp(e.importance))
    .map((e) => ({ e, x: sx(e.year), y: eventY(e) }))
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
  const ticks: number[] = []
  if (timeScale === 'log') {
    let lastX = -1e9
    for (const yv of LOG_TICKS) {
      if (yv < minY || yv > maxY) continue
      const tx = sx(yv)
      if (tx < -10 || tx > w + 10) continue
      if (tx - lastX < 56) continue
      lastX = tx
      ticks.push(yv)
    }
  } else {
    const step = niceStep(k, w, maxY - minY)
    const tickStart = Math.ceil(minY / step) * step
    for (let yv = tickStart; yv <= maxY; yv += step) {
      const tx = sx(yv)
      if (tx > -10 && tx < w + 10) ticks.push(yv)
    }
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
        <MapMenu lens={lens} setLens={setLens} />
        <div className="seg" role="group" aria-label="Colour mode">
          <button className={colorMode === 'thread' ? 'on' : ''} onClick={() => setColorMode('thread')}>
            Region
          </button>
          <button className={colorMode === 'domain' ? 'on' : ''} onClick={() => setColorMode('domain')}>
            Domain
          </button>
        </div>
        <button
          className={`btn ${mwOn ? 'on' : ''}`}
          onClick={() => {
            if (!mwOn) setMwYear(clamp(Math.round(yearAtPx(dimsRef.current.w / 2)), boundsRef.current[0], boundsRef.current[1]))
            setMwOn((v) => !v)
          }}
        >
          Meanwhile
        </button>
        <button
          className={`btn ${timeScale === 'log' ? 'on' : ''}`}
          onClick={() => switchTimeScale(timeScale === 'log' ? 'linear' : 'log')}
          title="Logarithmic time axis: see all of history at once"
        >
          Log axis
        </button>
        <input
          className="search"
          placeholder="Search an event, then Enter"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && runSearch()}
        />
        <div className="spacer" />
        <button className="btn icon" aria-label="Zoom out" onClick={() => zoomBy(1 / 1.6)}>
          –
        </button>
        <button className="btn icon" aria-label="Zoom in" onClick={() => zoomBy(1.6)}>
          +
        </button>
        <button className="btn" onClick={resetView}>
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

          {/* region trunk lines (fade out as they split) */}
          {lanes.map((l, i) => {
            const y = rowY(i)
            const x0 = clamp(sx(minY), 0, w)
            const x1 = clamp(sx(maxY), 0, w)
            return (
              <line key={l.id} x1={x0} y1={y} x2={x1} y2={y} stroke={l.color} strokeWidth={2.4} strokeLinecap="round" opacity={colorMode === 'thread' ? 0.85 * (1 - sp) : 0.85} />
            )
          })}

          {/* sub-region lanes, revealed on zoom */}
          {colorMode === 'thread' &&
            sp > 0.02 &&
            lanes.map((l, i) => {
              const arr = subLanes.get(l.id) || []
              if (arr.length <= 1) return null
              const x0 = clamp(sx(minY), 0, w)
              const x1 = clamp(sx(maxY), 0, w)
              return arr.map((s) => {
                const y = laneFinalY(i, l.id, s)
                return (
                  <line key={`${l.id}-sub-${s}`} x1={x0} y1={y} x2={x1} y2={y} stroke={l.color} strokeWidth={1.2} strokeLinecap="round" opacity={0.3 + 0.55 * sp} />
                )
              })
            })}

          {/* meanwhile sweep line, with a wide invisible grab strip */}
          {mwOn && (() => {
            const x = sx(mwYear)
            return (
              <g style={{ cursor: 'ew-resize' }} onPointerDown={onMwDown}>
                <rect x={x - 22} y={TOP - 16} width={44} height={h - BOTTOM - TOP + 26} fill="transparent" />
                <line x1={x} y1={TOP - 12} x2={x} y2={h - BOTTOM + 8} stroke="var(--accent)" strokeWidth={1.5} strokeDasharray="5 4" pointerEvents="none" />
                <rect x={x - 33} y={TOP - 27} width={66} height={20} rx={6} fill="var(--accent)" pointerEvents="none" />
                <text x={x} y={TOP - 13} textAnchor="middle" fontSize={11} fill="#1a1206" fontWeight={600} pointerEvents="none">
                  {mwYear < 0 ? `${Math.abs(mwYear)} BCE` : `${mwYear} CE`}
                </text>
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
                  pointerEvents="none"
                />
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={Math.max(r + 7, 14)}
                  fill="transparent"
                  style={{ cursor: 'pointer' }}
                  onClick={() => toggleSel(p.e.id)}
                  onMouseEnter={(ev) => {
                    if (gesture.current.mode) return
                    const rr = rect()
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
            const ay = eventY(a)
            const bx = sx(b.year)
            const by = eventY(b)
            const mx = (ax + bx) / 2
            const my = (ay + by) / 2 - 7
            return (
              <g>
                <line x1={ax} y1={ay} x2={bx} y2={by} stroke="var(--text)" strokeWidth={1.5} strokeDasharray="4 4" />
                <text x={mx} y={my} textAnchor="middle" fontSize={12} fontWeight={600} style={{ paintOrder: 'stroke', stroke: 'var(--bg)', strokeWidth: 4, fill: 'var(--accent)' }}>
                  {commaN(Math.abs(a.year - b.year))} years apart
                </text>
              </g>
            )
          })()}

          {/* region headers + sub-region labels, revealed on deep zoom */}
          {colorMode === 'thread' &&
            sp > 0.55 &&
            lanes.map((l, i) => {
              const arr = subLanes.get(l.id) || []
              if (arr.length <= 1) return null
              const op = (sp - 0.55) / 0.45
              return (
                <g key={`grp-${l.id}`}>
                  <text
                    x={6}
                    y={regionHeaderY(i, l.id)}
                    fontSize={11}
                    fontWeight={500}
                    opacity={op}
                    style={{ paintOrder: 'stroke', stroke: 'var(--bg)', strokeWidth: 3.5, fill: l.color }}
                  >
                    {l.name}
                  </text>
                  {arr.map((sname) =>
                    sname === '·' ? null : (
                      <text
                        key={`${l.id}-sl-${sname}`}
                        x={16}
                        y={laneFinalY(i, l.id, sname) + 3}
                        fontSize={9.5}
                        opacity={op}
                        style={{ paintOrder: 'stroke', stroke: 'var(--bg)', strokeWidth: 3, fill: l.color }}
                      >
                        {sname}
                      </text>
                    ),
                  )}
                </g>
              )
            })}
        </svg>

        {hover && hoverEv && (
          <div className="tip" style={{ left: clamp(hover.mx + 12, 4, w - 250), top: clamp(hover.my + 12, 4, h - 110) }}>
            <b>{hoverEv.title}</b>
            <div className="meta">
              {fmtYear(hoverEv.year)}
              {hoverEv.endYear ? ` – ${fmtYear(hoverEv.endYear)}` : ''} · {THREAD_MAP[hoverEv.thread]?.name}
              {hoverEv.sub ? ` · ${hoverEv.sub}` : ''}
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

        {selEvents.length === 1 && (
          <div className="readout">
            <div>
              <b>{selEvents[0].title}</b> · {fmtYear(selEvents[0].year)}
              {selEvents[0].endYear ? ` to ${fmtYear(selEvents[0].endYear)}` : ''} · {THREAD_MAP[selEvents[0].thread]?.name}
            </div>
            {selEvents[0].note ? <div className="rnote">{selEvents[0].note}</div> : null}
            <div className="rhint">tap another event to compare</div>
            <span className="x" onClick={() => setSel([])}>
              clear
            </span>
          </div>
        )}

        {selEvents.length === 2 && (
          <div className="readout">
            <div>
              <b>{commaN(Math.abs(selEvents[0].year - selEvents[1].year))} years</b> between {selEvents[0].title} (
              {fmtYear(selEvents[0].year)}) and {selEvents[1].title} ({fmtYear(selEvents[1].year)})
            </div>
            {scaleReveals(selEvents[0], selEvents[1]).map((line, i) => (
              <div className="reveal" key={i}>
                {line}
              </div>
            ))}
            <span className="x" onClick={() => setSel([])}>
              clear
            </span>
          </div>
        )}

        <div className="hint">scroll or pinch to zoom · drag to pan · tap two events to compare</div>
      </div>
    </div>
  )
}
