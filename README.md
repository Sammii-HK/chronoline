# Chronoline

A tube map of recorded history. One zoomable timeline where every culture is a coloured line: zoom out for the era-defining moments, zoom in and the lines fan apart into the detail. Inspired by David McCandless / Information is Beautiful, drawn like the London Underground map.

## Run it

```bash
npm install
npm run dev      # http://localhost:5179
npm run build    # type-check + production build (static, deploys anywhere)
```

## What's in the MVP

- **Semantic zoom.** Importance-ranked events appear and disappear by zoom level, so you never get an unreadable dot cloud. The axis re-ticks itself (millennia to decades).
- **Region / Domain toggle.** The same events re-sort onto region lines (Near East, Europe, China, the Americas, etc.) or onto domain lines (power, war, religion, science, exploration, disaster, economy).
- **Meanwhile bar.** Drag the sweep line to any year and read every civilisation's current state at once.
- **Compare.** Click any two events to draw the link and the gap in years between them.
- **Legendary events** (Trojan war, the Buddha, King Arthur) render with a dashed ring and a `?`, honestly marked as uncertain rather than hidden.
- **Interchange connectors.** Era-defining cross-cultural moments (Alexander, the Mongols, the Black Death, 1492) draw dotted links to the other lines they touched.

296 curated events from ~3000 BCE to 2025, weighted towards the modern era.

## Structure

| File | What |
|------|------|
| `src/types.ts` | `HistEvent`, `ThreadId`, `DomainId` |
| `src/data/events.ts` | The curated dataset (the heart of the product) |
| `src/data/threads.ts` | Region and domain lines, names and colours |
| `src/Timeline.tsx` | The whole engine: scale, zoom/pan, level-of-detail, labels, meanwhile, compare |
| `src/ErrorBoundary.tsx` | Surfaces render errors on screen during dev |

Rendered in SVG with a hand-rolled linear time scale and zoom. This is deliberate: SVG keeps text crisp and clickable and ships fast at this event count.

## Roadmap (deferred from the MVP)

- **Live Wikidata at scale.** Wikidata is CC0 and queryable; a fetch script can grow this from hundreds of hand-blessed events to thousands. Once event count crosses the SVG ceiling, move the dense layer to Canvas 2D (and WebGL via deck.gl/PixiJS only if needed), keeping D3 for the scales.
- **Dilating time axis.** A non-linear axis (d3 `scaleSymlog` or piecewise) so dense modern centuries get more room and empty millennia get less.
- **Route planner.** "How do you get from Socrates to the iPhone" — shortest chain of influence between two events, drawn as a journey with interchanges.
- **Portrait mode.** Flip the time axis to vertical for phones (the layout engine is orientation-agnostic by design).
- **Mythic ghost lines.** Render legendary/narrative time as a distinct semi-transparent track alongside attested history.
