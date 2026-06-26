# Lenses & roadmap

Chronoline is not a history app. It is an **infographic engine**: parallel lines along an
ordered axis, where zooming reveals each line is really many lines, any two points can be
compared for the gap between them, and a sweep bar reads every category at one point on the
axis. Each "lens" below is a config + dataset for that one engine, not a separate build.

It fits any subject with three knobs:
1. one ordered **axis** (time, size, distance, money, frequency, depth)
2. **categories that nest** (regions into countries, clades into species, zones into creatures)
3. where the payoff is **scale, gaps, or simultaneity**

---

## Built
- **Recorded history** — Chronoline itself. Axis: time (linear or log). Lanes: civilisations,
  splitting into countries. The reference implementation.

## Time-axis lenses (same shape as history)
- **Evolution / the tree of life** — Axis: deep time (log). Lanes: clades, splitting into species.
  The zoom-split IS the branching tree. Mass extinctions = the big interchange events.
  Reveal: more time separates Stegosaurus from T. rex than T. rex from us.
- **Big history** — Axis: log time, Big Bang to now. Lanes: cosmic / geological / biological / human.
  Reveal: fit all of time into one day and humans arrive in the last few seconds.
- **History of invention** — Lanes: fields (computing, medicine, energy, transport), splitting into
  sub-fields. Reveal: first iPhone to ChatGPT is a shorter gap than Wright brothers to the Moon.
- **Family trees that branch** — languages (English and Hindi share an ancestor), music genres,
  religions and mythologies. The branching is the sub-lane split.
- **A life or biography** — Lanes: people or life domains. The most personal and emotional version.

## Scale / size / distance lenses (same shape as the cosmos one)
- **Scale of size** — Axis: log size, atoms to galaxies. Reveal: on a log scale a human sits roughly
  halfway between an atom and a star.
- **Scale of money** — Axis: log amount. Reveal: a million seconds is 12 days, a billion is 32 years.
- **The electromagnetic spectrum** — Axis: frequency (log). Lanes: uses (radio, visible, X-ray).
  Reveal: wifi, your eyes and a hospital X-ray are the same wave at different pitches.

## Depth lenses (vertical axis, natural fit for portrait mode)
- **Oceans & seas** (NEW) — Axis: depth, surface to the Challenger Deep (~11 km), running downward.
  Lanes: life, human descent (divers, subs, wrecks), geology (basins, ridges, vents), physical
  (light, pressure, temperature). Zones marked on the axis: sunlight / twilight / midnight / abyss /
  hadal. Sweep bar: "at this depth, this creature, this wreck, this pressure, this much light."
  Reveals: sunlight runs out by ~200 m; the Titanic rests at ~3,800 m; the Mariana Trench is deeper
  than Everest is tall.
- **Cosmos / space** — TWO builds: (a) a 3D immersive Powers-of-Ten zoom out from Earth (Three.js),
  and (b) a 2D "Chronoline for space" (log distance axis, lanes = galaxies / zodiac constellations /
  solar-system bodies). The zodiac reveal: a constellation is an illusion, its stars are light-years
  apart in depth, connected only by our viewing angle.

## Lenses ON a dataset (same data, different view)
- **Kids history** — not a new build, a config: a `kidsSafe` flag and gentler `kidsNote` per event,
  a softer palette, simpler language. Flip a toggle and atrocities soften or drop. Evolution and space
  do not need this for content reasons, at most a "simple words" reading level.

---

## Packaging the engine (decision pending)
Goal: one reusable component, many lenses (incl. kids mode), not many codebases.

- **Shape**: a monorepo. Core package exposes a React component plus the transform/scale/zoom
  utilities and types. Each lens is a data + config module. Apps consume the core.
- **Config-driven core** = `{ axis transform + ticks, lanes + sub-lanes, item accessors, formatters,
  palette, scale-reveal generators }`.
- **Publish?** Start as a local workspace package (no publishing) so the API can churn freely while we
  build the second and third lens. Publish to npm (public, since it doubles as a portfolio piece) only
  once the API has stabilised against 2-3 real lenses. Avoid publishing v0.0.1 prematurely.
- **Name**: it is no longer "chronoline" once it is general. Candidates to pick from: Strata, Throughline,
  Zoomline, Lensline, Scaleline. (TBD.)
