// Second expansion pack for the scale-of-the-universe (distance) interactive,
// zooming right in on near-Earth space and the solar system so the innermost
// end of the log axis is dense and rich. Standalone: imports the CosmosObject
// type and exports a third array. All ids prefixed "ne-" to avoid clashing with
// COSMOS (no prefix) and PACK ("x-"), and no name duplicates either base set.
//
// Distances are light-years, using the base set's convention. Near-Earth and
// solar-system bodies use tiny fractional light-years. Conversion: 1 light-year
// = 9.461e12 km, so 1 km = 1.057e-13 ly. Worked examples:
//   ISS (~408 km)              -> 4.31e-11 ly
//   geostationary (~35,786 km) -> 3.78e-9 ly
//   the Moon (~384,400 km)     -> 4.06e-8 ly  (matches base COSMOS)
//   James Webb / L2 (~1.5M km) -> 1.6e-7 ly
// Orbital-scale distances from Earth are order-of-magnitude, which is all that
// matters on a log axis.

import type { CosmosObject } from './cosmos'

export const PACK: CosmosObject[] = [
  // ===== NEAR-EARTH: satellites and stations in low orbit (the tiniest scales) =====
  { id: 'ne-suborbital', name: 'Karman line', distanceLy: 1.06e-11, category: 'solarSystem', sub: 'Structure', importance: 4, note: 'The 100 km line where space is said to begin, a tenth the height of the space stations' },
  { id: 'ne-starlink', name: 'Starlink satellite', distanceLy: 5.8e-11, category: 'solarSystem', sub: 'Satellite', importance: 3, note: 'One of thousands of small comms satellites strung around the Earth at 550 km' },
  { id: 'ne-tiangong', name: 'Tiangong station', distanceLy: 4.44e-11, category: 'solarSystem', sub: 'Satellite', importance: 3, note: "China's crewed outpost, orbiting a little below the older station" },
  { id: 'ne-hubble', name: 'Hubble Space Telescope', distanceLy: 5.7e-11, category: 'solarSystem', sub: 'Satellite', importance: 2, note: 'Circling at 540 km for over three decades, it rewrote how far we can see' },
  { id: 'ne-landsat', name: 'Landsat satellite', distanceLy: 7.6e-11, category: 'solarSystem', sub: 'Satellite', importance: 4, note: 'A sun-synchronous eye that has watched the changing land since 1972' },
  { id: 'ne-iridium', name: 'Iridium satellite', distanceLy: 8.6e-11, category: 'solarSystem', sub: 'Satellite', importance: 4 },
  { id: 'ne-gps', name: 'GPS satellite', distanceLy: 2.12e-9, category: 'solarSystem', sub: 'Satellite', importance: 3, note: 'One of a fleet 20,000 km up whose clocks must bend to relativity to keep you found' },
  { id: 'ne-galileo-sat', name: 'Galileo navigation satellite', distanceLy: 2.4e-9, category: 'solarSystem', sub: 'Satellite', importance: 4 },
  { id: 'ne-geo', name: 'Geostationary comms satellite', distanceLy: 3.78e-9, category: 'solarSystem', sub: 'Satellite', importance: 3, note: 'At 35,786 km it circles exactly once a day, so it hangs fixed above one spot' },
  { id: 'ne-goes', name: 'GOES weather satellite', distanceLy: 3.78e-9, category: 'solarSystem', sub: 'Satellite', importance: 3, note: 'A geostationary watcher that returns the swirling cloud maps of the forecast' },
  { id: 'ne-tdrs', name: 'TDRS relay satellite', distanceLy: 3.78e-9, category: 'solarSystem', sub: 'Satellite', importance: 4 },
  { id: 'ne-graveyard-orbit', name: 'Graveyard orbit', distanceLy: 4.1e-9, category: 'solarSystem', sub: 'Structure', importance: 4, note: 'A parking band just beyond geostationary where dead satellites are sent to rest' },

  // ===== NEAR-EARTH: cislunar and Lagrange points =====
  { id: 'ne-earth-l1', name: 'Sun-Earth L1 point', distanceLy: 1.59e-7, category: 'solarSystem', sub: 'Structure', importance: 3, note: 'A gravitational balance point 1.5 million km sunward, home to solar-storm sentinels' },
  { id: 'ne-soho', name: 'SOHO observatory', distanceLy: 1.59e-7, category: 'solarSystem', sub: 'Spacecraft', importance: 3, note: 'Stationed at L1 to stare at the Sun unblinking, and a prolific comet hunter' },
  { id: 'ne-dscovr', name: 'DSCOVR', distanceLy: 1.59e-7, category: 'solarSystem', sub: 'Spacecraft', importance: 4, note: 'From L1 it takes the daily full-disc portrait of the sunlit Earth' },
  { id: 'ne-earth-l2', name: 'Sun-Earth L2 point', distanceLy: 1.6e-7, category: 'solarSystem', sub: 'Structure', importance: 3, note: 'A quiet, cold vantage 1.5 million km anti-sunward, favoured by deep-space telescopes' },
  { id: 'ne-gaia', name: 'Gaia observatory', distanceLy: 1.6e-7, category: 'solarSystem', sub: 'Spacecraft', importance: 3, note: 'From L2 it has mapped the precise positions of nearly two billion stars' },
  { id: 'ne-euclid', name: 'Euclid telescope', distanceLy: 1.6e-7, category: 'solarSystem', sub: 'Spacecraft', importance: 4, note: 'An L2 survey mission hunting the dark energy that is pulling the cosmos apart' },
  { id: 'ne-roman', name: 'Roman Space Telescope', distanceLy: 1.6e-7, category: 'solarSystem', sub: 'Spacecraft', importance: 4 },

  // ===== SOLAR SYSTEM: the Sun's neighbourhood and inner reaches =====
  { id: 'ne-solar-corona', name: "Sun's outer corona", distanceLy: 1.5e-5, category: 'solarSystem', sub: 'Structure', importance: 4, note: 'The million-degree crown of the Sun, only truly visible during a total eclipse' },
  { id: 'ne-mercury-perihelion', name: 'Mercury at perihelion', distanceLy: 8.5e-6, category: 'solarSystem', sub: 'Planet', importance: 4, note: 'The closest planet swings in near enough that its orbit visibly wanders each century' },
  { id: 'ne-vulcanoids', name: 'Vulcanoid zone', distanceLy: 7.4e-6, category: 'solarSystem', sub: 'Structure', importance: 4, note: 'A hypothetical band of tiny asteroids that may hide inside Mercury orbit' },
  { id: 'ne-aten-asteroids', name: 'Aten asteroids', distanceLy: 1.0e-5, category: 'solarSystem', sub: 'Asteroid', importance: 4, note: 'A family of asteroids whose orbits mostly hug closer to the Sun than Earth' },
  { id: 'ne-apollo-asteroids', name: 'Apollo asteroids', distanceLy: 1.6e-5, category: 'solarSystem', sub: 'Asteroid', importance: 4, note: 'Earth-crossing rocks, the group most watched for a future impact' },

  // ===== SOLAR SYSTEM: notable moons not yet in the set =====
  { id: 'ne-amalthea', name: 'Amalthea', distanceLy: 8.1e-5, category: 'solarSystem', sub: 'Moon', importance: 4, note: 'A small reddish potato-shaped moon orbiting inside the great Galilean four' },
  { id: 'ne-himalia', name: 'Himalia', distanceLy: 8.5e-5, category: 'solarSystem', sub: 'Moon', importance: 4, note: 'The largest of Jupiter dozens of captured outer moonlets' },
  { id: 'ne-dione', name: 'Dione', distanceLy: 1.5e-4, category: 'solarSystem', sub: 'Moon', importance: 4, note: 'An icy Saturnian moon laced with bright wispy cliffs of fractured ice' },
  { id: 'ne-tethys', name: 'Tethys', distanceLy: 1.5e-4, category: 'solarSystem', sub: 'Moon', importance: 4, note: 'A Saturn moon scarred by an impact crater almost as wide as itself' },
  { id: 'ne-hyperion', name: 'Hyperion', distanceLy: 1.5e-4, category: 'solarSystem', sub: 'Moon', importance: 4, note: 'A spongy, chaotically tumbling moon that never keeps the same face to Saturn' },
  { id: 'ne-phoebe', name: 'Phoebe', distanceLy: 1.5e-4, category: 'solarSystem', sub: 'Moon', importance: 4, note: 'A dark, backwards-orbiting outer moon, probably a captured Kuiper belt body' },
  { id: 'ne-ariel', name: 'Ariel', distanceLy: 3.03e-4, category: 'solarSystem', sub: 'Moon', importance: 4, note: 'The brightest moon of Uranus, its surface split by long ice-carved valleys' },
  { id: 'ne-umbriel', name: 'Umbriel', distanceLy: 3.03e-4, category: 'solarSystem', sub: 'Moon', importance: 4, note: 'The darkest of the major Uranian moons, with one strange bright ring' },
  { id: 'ne-proteus', name: 'Proteus', distanceLy: 4.74e-4, category: 'solarSystem', sub: 'Moon', importance: 4, note: 'A dark, lumpy moon of Neptune, about as large as a body can be without turning round' },
  { id: 'ne-nereid', name: 'Nereid', distanceLy: 4.74e-4, category: 'solarSystem', sub: 'Moon', importance: 4, note: 'A small Neptune moon on one of the most stretched-out orbits known' },
  { id: 'ne-nix', name: 'Nix', distanceLy: 6.2e-4, category: 'solarSystem', sub: 'Moon', importance: 4, note: 'A small tumbling moon of Pluto, dwarfed by the giant Charon nearby' },
  { id: 'ne-hydra', name: 'Hydra', distanceLy: 6.2e-4, category: 'solarSystem', sub: 'Moon', importance: 4, note: 'The outermost of Pluto small moons, an icy shard spinning end over end' },
  { id: 'ne-dysnomia', name: 'Dysnomia', distanceLy: 1.5e-3, category: 'solarSystem', sub: 'Moon', importance: 4, note: 'The lone moon of distant Eris, the measure that revealed how massive Eris is' },

  // ===== SOLAR SYSTEM: dwarf planets and trans-Neptunian bodies not yet in the set =====
  { id: 'ne-pluto', name: 'Pluto (Kuiper belt)', distanceLy: 6.2e-4, category: 'solarSystem', sub: 'Dwarf planet', importance: 2, note: 'The best-loved of the ice dwarfs, a small frozen world with a heart-shaped plain' },
  { id: 'ne-huya', name: 'Huya', distanceLy: 5.9e-4, category: 'solarSystem', sub: 'Dwarf planet', importance: 4 },
  { id: 'ne-varuna', name: 'Varuna', distanceLy: 6.8e-4, category: 'solarSystem', sub: 'Dwarf planet', importance: 4 },
  { id: 'ne-ixion', name: 'Ixion', distanceLy: 6.5e-4, category: 'solarSystem', sub: 'Dwarf planet', importance: 4 },
  { id: 'ne-salacia', name: 'Salacia', distanceLy: 7.0e-4, category: 'solarSystem', sub: 'Dwarf planet', importance: 4 },
  { id: 'ne-2007or10', name: 'Chaos', distanceLy: 7.3e-4, category: 'solarSystem', sub: 'Dwarf planet', importance: 4 },
  { id: 'ne-farfarout', name: 'Farfarout', distanceLy: 5.6e-3, category: 'solarSystem', sub: 'Dwarf planet', importance: 4, note: 'The most distant solar-system object ever confirmed, over 130 times as far as Earth' },
  { id: 'ne-planet-nine', name: 'Planet Nine (hypothesised)', distanceLy: 8.5e-3, category: 'solarSystem', sub: 'Planet', importance: 4, note: 'A proposed giant world whose gravity may be herding the most distant icy orbits' },
  { id: 'ne-detached-objects', name: 'Detached objects', distanceLy: 1.0e-2, category: 'solarSystem', sub: 'Structure', importance: 4, note: 'Bodies flung onto lonely orbits beyond Neptune reach, cut off from the planets' },

  // ===== SOLAR SYSTEM: asteroids not yet in the set =====
  { id: 'ne-ryugu', name: 'Ryugu', distanceLy: 1.6e-5, category: 'solarSystem', sub: 'Asteroid', importance: 4, note: 'A spinning-top rubble pile whose grains were carried home to Earth in 2020' },
  { id: 'ne-itokawa', name: 'Itokawa', distanceLy: 1.7e-5, category: 'solarSystem', sub: 'Asteroid', importance: 4, note: 'The first asteroid ever sampled, a peanut-shaped heap of loose rubble' },
  { id: 'ne-apophis', name: 'Apophis', distanceLy: 1.0e-5, category: 'solarSystem', sub: 'Asteroid', importance: 3, note: 'A stadium-sized rock due to skim closer than our satellites in 2029' },
  { id: 'ne-psyche', name: 'Psyche', distanceLy: 4.3e-5, category: 'solarSystem', sub: 'Asteroid', importance: 3, note: 'A metal-rich asteroid that may be the exposed core of a shattered baby planet' },
  { id: 'ne-juno', name: 'Juno', distanceLy: 4.2e-5, category: 'solarSystem', sub: 'Asteroid', importance: 4 },
  { id: 'ne-ida', name: 'Ida', distanceLy: 4.4e-5, category: 'solarSystem', sub: 'Asteroid', importance: 4, note: 'The first asteroid found to have a moon of its own, tiny Dactyl' },
  { id: 'ne-gaspra', name: 'Gaspra', distanceLy: 3.4e-5, category: 'solarSystem', sub: 'Asteroid', importance: 4 },
  { id: 'ne-mathilde', name: 'Mathilde', distanceLy: 4.1e-5, category: 'solarSystem', sub: 'Asteroid', importance: 4 },
  { id: 'ne-didymos', name: 'Didymos', distanceLy: 1.8e-5, category: 'solarSystem', sub: 'Asteroid', importance: 4, note: 'Its little moon Dimorphos was deliberately nudged by a spacecraft in 2022' },
  { id: 'ne-hektor', name: 'Hektor', distanceLy: 8.2e-5, category: 'solarSystem', sub: 'Asteroid', importance: 4, note: 'The largest Trojan asteroid, sharing Jupiter orbit far ahead of the planet' },
  { id: 'ne-jupiter-trojans', name: 'Jupiter Trojans', distanceLy: 8.2e-5, category: 'solarSystem', sub: 'Asteroid', importance: 4, note: 'Two great swarms of asteroids trapped in Jupiter Lagrange points' },
  { id: 'ne-hilda-family', name: 'Hilda asteroids', distanceLy: 6.5e-5, category: 'solarSystem', sub: 'Asteroid', importance: 4 },
  { id: 'ne-chiron', name: 'Chiron', distanceLy: 1.9e-4, category: 'solarSystem', sub: 'Asteroid', importance: 4, note: 'A giant comet-asteroid crossbreed wandering among the outer planets' },
  { id: 'ne-pholus', name: 'Pholus', distanceLy: 3.0e-4, category: 'solarSystem', sub: 'Asteroid', importance: 4, note: 'One of the reddest bodies known, a centaur straddling Saturn and Neptune' },

  // ===== SOLAR SYSTEM: comets not yet in the set =====
  { id: 'ne-hyakutake', name: 'Comet Hyakutake', distanceLy: 4.0e-5, category: 'solarSystem', sub: 'Comet', importance: 4, note: 'The great comet of 1996, which swept startlingly close with a huge tail' },
  { id: 'ne-neowise', name: 'Comet NEOWISE', distanceLy: 4.5e-5, category: 'solarSystem', sub: 'Comet', importance: 4, note: 'The naked-eye comet of 2020 that graced the dawn and dusk skies' },
  { id: 'ne-encke', name: 'Comet Encke', distanceLy: 2.2e-5, category: 'solarSystem', sub: 'Comet', importance: 4, note: 'The comet with the shortest known orbit, returning every three and a bit years' },
  { id: 'ne-67p', name: '67P/Churyumov-Gerasimenko', distanceLy: 3.4e-5, category: 'solarSystem', sub: 'Comet', importance: 3, note: 'The rubber-duck-shaped comet where a lander first touched down in 2014' },
  { id: 'ne-shoemaker-levy', name: 'Comet Shoemaker-Levy 9', distanceLy: 8.2e-5, category: 'solarSystem', sub: 'Comet', importance: 3, note: 'Torn into a string of fragments that slammed into Jupiter in 1994' },
  { id: 'ne-tempel-1', name: 'Comet Tempel 1', distanceLy: 3.0e-5, category: 'solarSystem', sub: 'Comet', importance: 4, note: 'A probe fired an impactor into it in 2005 to peer beneath the crust' },
  { id: 'ne-borrelly', name: 'Comet Borrelly', distanceLy: 3.2e-5, category: 'solarSystem', sub: 'Comet', importance: 4 },
  { id: 'ne-borisov', name: '2I/Borisov', distanceLy: 6.0e-4, category: 'solarSystem', sub: 'Comet', importance: 3, note: 'The first clearly interstellar comet, a visitor born around another star' },
  { id: 'ne-great-comet-1997', name: 'Comet McNaught', distanceLy: 5.0e-5, category: 'solarSystem', sub: 'Comet', importance: 4, note: 'The great comet of 2007, whose fanned tail lit up southern skies' },

  // ===== SOLAR SYSTEM: spacecraft not yet in the set =====
  { id: 'ne-juno-craft', name: 'Juno probe', distanceLy: 8.2e-5, category: 'solarSystem', sub: 'Spacecraft', importance: 4, note: 'Looping over Jupiter poles, diving through its fierce radiation belts' },
  { id: 'ne-cassini', name: 'Cassini (ended)', distanceLy: 1.5e-4, category: 'solarSystem', sub: 'Spacecraft', importance: 3, note: 'Spent 13 years circling Saturn before its farewell dive into the planet in 2017' },
  { id: 'ne-osiris-rex', name: 'OSIRIS-REx', distanceLy: 1.7e-5, category: 'solarSystem', sub: 'Spacecraft', importance: 4, note: 'Snatched a sample from asteroid Bennu and dropped it to Earth in 2023' },
  { id: 'ne-lucy', name: 'Lucy probe', distanceLy: 8.2e-5, category: 'solarSystem', sub: 'Spacecraft', importance: 4, note: 'On a twelve-year tour of the Trojan asteroids that shadow Jupiter' },
  { id: 'ne-dawn', name: 'Dawn (ended)', distanceLy: 4.3e-5, category: 'solarSystem', sub: 'Spacecraft', importance: 4, note: 'The only craft to orbit two different worlds, Vesta and then Ceres' },
  { id: 'ne-solar-orbiter', name: 'Solar Orbiter', distanceLy: 6.0e-6, category: 'solarSystem', sub: 'Spacecraft', importance: 4, note: 'Swinging in close to capture the first views of the Sun stormy poles' },
  { id: 'ne-bepicolombo', name: 'BepiColombo', distanceLy: 7.0e-6, category: 'solarSystem', sub: 'Spacecraft', importance: 4, note: 'A joint mission spiralling inward to settle into orbit around Mercury' },
  { id: 'ne-juice', name: 'JUICE', distanceLy: 8.2e-5, category: 'solarSystem', sub: 'Spacecraft', importance: 4, note: 'Bound for Jupiter to study its ocean-bearing icy moons in detail' },
  { id: 'ne-pioneer-11-echo', name: 'Ulysses (ended)', distanceLy: 8.0e-5, category: 'solarSystem', sub: 'Spacecraft', importance: 4, note: 'Used Jupiter to fling itself over the Sun poles, a path no craft had flown' },

  // ===== SOLAR SYSTEM: structure and the heliosphere =====
  { id: 'ne-inner-asteroid-belt', name: 'Inner asteroid belt', distanceLy: 3.7e-5, category: 'solarSystem', sub: 'Structure', importance: 4, note: 'The near edge of the rocky belt, where the closer families of asteroids orbit' },
  { id: 'ne-outer-asteroid-belt', name: 'Outer asteroid belt', distanceLy: 5.4e-5, category: 'solarSystem', sub: 'Structure', importance: 4, note: 'The far edge of the belt, thinning out towards Jupiter shepherding gravity' },
  { id: 'ne-kirkwood-gaps', name: 'Kirkwood gaps', distanceLy: 4.6e-5, category: 'solarSystem', sub: 'Structure', importance: 4, note: 'Empty lanes swept clean in the asteroid belt by Jupiter rhythmic tug' },
  { id: 'ne-centaur-region', name: 'Centaur region', distanceLy: 2.6e-4, category: 'solarSystem', sub: 'Structure', importance: 4, note: 'The unstable zone between Jupiter and Neptune where icy wanderers cross' },
  { id: 'ne-inner-kuiper', name: 'Inner Kuiper belt', distanceLy: 6.3e-4, category: 'solarSystem', sub: 'Structure', importance: 4, note: 'The near, classical edge of the icy disc beyond Neptune' },
  { id: 'ne-kuiper-cliff', name: 'Kuiper cliff', distanceLy: 7.9e-4, category: 'solarSystem', sub: 'Structure', importance: 4, note: 'A sudden drop-off where the belt of icy bodies mysteriously thins out' },
  { id: 'ne-scattered-disc', name: 'Scattered disc', distanceLy: 1.6e-3, category: 'solarSystem', sub: 'Structure', importance: 3, note: 'A sparse outer region of tilted, stretched orbits, the source of many comets' },
  { id: 'ne-termination-shock', name: 'Termination shock', distanceLy: 1.4e-3, category: 'solarSystem', sub: 'Structure', importance: 3, note: 'Where the solar wind slams to a subsonic crawl against interstellar gas' },
  { id: 'ne-heliosheath', name: 'Heliosheath', distanceLy: 1.7e-3, category: 'solarSystem', sub: 'Structure', importance: 4, note: 'The turbulent outer layer of the Sun bubble, piled up against the galaxy' },
  { id: 'ne-heliopause', name: 'Heliopause', distanceLy: 1.9e-3, category: 'solarSystem', sub: 'Structure', importance: 2, note: 'The true boundary of the Sun domain, where its wind finally gives way to interstellar space' },
  { id: 'ne-bow-shock', name: 'Heliospheric bow wave', distanceLy: 2.3e-3, category: 'solarSystem', sub: 'Structure', importance: 4, note: 'A pile-up of interstellar gas ahead of the Sun as it ploughs through the galaxy' },
  { id: 'ne-inner-oort', name: 'Inner Oort cloud', distanceLy: 0.16, category: 'solarSystem', sub: 'Structure', importance: 3, note: 'The dense, doughnut-shaped inner reservoir of comets, thousands of times further than Neptune' },
  { id: 'ne-outer-oort', name: 'Outer Oort cloud', distanceLy: 1.5, category: 'solarSystem', sub: 'Structure', importance: 3, note: 'The faint spherical outer shell, marking the Sun gravitational reach halfway to the next star' },

  // ===== NEAR-INTERSTELLAR: the far edge where the Sun's grip fails =====
  { id: 'ne-hills-cloud-edge', name: "Edge of the Sun's realm", distanceLy: 2.0, category: 'solarSystem', sub: 'Structure', importance: 4, note: 'Beyond here a passing star pull rivals the Sun, the practical border of the solar system' },

  // ===== NEAR-EARTH: more of the crowded low and medium orbits =====
  { id: 'ne-cubesat', name: 'CubeSat', distanceLy: 4.6e-11, category: 'solarSystem', sub: 'Satellite', importance: 4, note: 'A satellite the size of a loaf of bread, built cheaply by students and startups' },
  { id: 'ne-space-debris', name: 'Orbital debris', distanceLy: 8.5e-11, category: 'solarSystem', sub: 'Structure', importance: 4, note: 'Millions of fragments of old rockets and dead craft circling as a hazard' },
  { id: 'ne-oneweb', name: 'OneWeb satellite', distanceLy: 1.3e-10, category: 'solarSystem', sub: 'Satellite', importance: 4 },
  { id: 'ne-molniya', name: 'Molniya orbit satellite', distanceLy: 4.2e-9, category: 'solarSystem', sub: 'Satellite', importance: 4, note: 'A long looping orbit that lets a satellite dwell for hours over the far north' },
  { id: 'ne-planet-labs', name: 'Earth-imaging satellite', distanceLy: 5.8e-11, category: 'solarSystem', sub: 'Satellite', importance: 4, note: 'One of a flock of shoebox cameras photographing the whole planet every day' },
  { id: 'ne-van-allen', name: 'Van Allen belts', distanceLy: 5.3e-10, category: 'solarSystem', sub: 'Structure', importance: 3, note: 'Twin rings of charged particles trapped by the Earth magnetic field' },
  { id: 'ne-magnetosphere-edge', name: 'Magnetopause', distanceLy: 6.8e-9, category: 'solarSystem', sub: 'Structure', importance: 4, note: 'The dayside boundary where the Earth magnetic field holds off the solar wind' },
  { id: 'ne-geotail', name: 'Magnetotail', distanceLy: 6.3e-8, category: 'solarSystem', sub: 'Structure', importance: 4, note: 'The Earth magnetic field streamed out into a long tail by the solar wind' },
  { id: 'ne-earth-l4', name: 'Earth-Moon L4 point', distanceLy: 4.06e-8, category: 'solarSystem', sub: 'Structure', importance: 4, note: 'A stable point sharing the Moon orbit, where faint dust clouds may gather' },
  { id: 'ne-earth-trojan', name: 'Earth Trojan asteroid', distanceLy: 1.58e-5, category: 'solarSystem', sub: 'Asteroid', importance: 4, note: 'A rare companion rock leading Earth along its own orbit around the Sun' },

  // ===== SOLAR SYSTEM: planetary rings and near-planet features =====
  { id: 'ne-saturn-rings', name: "Saturn's rings", distanceLy: 1.5e-4, category: 'solarSystem', sub: 'Structure', importance: 3, note: 'A dazzling disc of countless icy chunks, wide as many Earths yet paper-thin' },
  { id: 'ne-jupiter-ring', name: "Jupiter's ring", distanceLy: 8.2e-5, category: 'solarSystem', sub: 'Structure', importance: 4, note: 'A faint dusty ring, unseen until a passing probe caught it backlit by the Sun' },
  { id: 'ne-uranus-rings', name: "Uranus's rings", distanceLy: 3.03e-4, category: 'solarSystem', sub: 'Structure', importance: 4, note: 'Thin dark rings that circle the tipped-over planet nearly pole to pole' },
  { id: 'ne-neptune-arcs', name: "Neptune's ring arcs", distanceLy: 4.74e-4, category: 'solarSystem', sub: 'Structure', importance: 4, note: 'Odd incomplete ring segments, clumps of dust that should have spread out but have not' },
  { id: 'ne-great-red-spot', name: "Jupiter's Great Red Spot", distanceLy: 8.2e-5, category: 'solarSystem', sub: 'Planet', importance: 4, note: 'A storm wider than the Earth that has raged for centuries' },

  // ===== SOLAR SYSTEM: more moons =====
  { id: 'ne-metis', name: 'Metis', distanceLy: 8.1e-5, category: 'solarSystem', sub: 'Moon', importance: 4 },
  { id: 'ne-thebe', name: 'Thebe', distanceLy: 8.1e-5, category: 'solarSystem', sub: 'Moon', importance: 4 },
  { id: 'ne-pan', name: 'Pan', distanceLy: 1.5e-4, category: 'solarSystem', sub: 'Moon', importance: 4, note: 'A tiny ravioli-shaped moon that sweeps a gap clear within Saturn rings' },
  { id: 'ne-prometheus', name: 'Prometheus', distanceLy: 1.5e-4, category: 'solarSystem', sub: 'Moon', importance: 4, note: 'A shepherd moon whose gravity tugs delicate strands from a thin ring' },
  { id: 'ne-janus', name: 'Janus', distanceLy: 1.5e-4, category: 'solarSystem', sub: 'Moon', importance: 4, note: 'One of a pair of moons that swap orbits with each other every few years' },
  { id: 'ne-puck', name: 'Puck', distanceLy: 3.03e-4, category: 'solarSystem', sub: 'Moon', importance: 4 },
  { id: 'ne-larissa', name: 'Larissa', distanceLy: 4.74e-4, category: 'solarSystem', sub: 'Moon', importance: 4 },
  { id: 'ne-kerberos', name: 'Kerberos', distanceLy: 6.2e-4, category: 'solarSystem', sub: 'Moon', importance: 4 },
  { id: 'ne-styx', name: 'Styx', distanceLy: 6.2e-4, category: 'solarSystem', sub: 'Moon', importance: 4 },

  // ===== SOLAR SYSTEM: more small bodies and comet sources =====
  { id: 'ne-arrokoth', name: 'Arrokoth', distanceLy: 7.1e-4, category: 'solarSystem', sub: 'Asteroid', importance: 3, note: 'A two-lobed snowman visited in 2019, the most distant world ever explored up close' },
  { id: 'ne-plutinos', name: 'Plutinos', distanceLy: 6.2e-4, category: 'solarSystem', sub: 'Structure', importance: 4, note: 'A family of icy bodies locked to Neptune rhythm, just like Pluto' },
  { id: 'ne-cubewanos', name: 'Classical Kuiper objects', distanceLy: 6.8e-4, category: 'solarSystem', sub: 'Structure', importance: 4, note: 'The calm, near-circular icy bodies that make up the heart of the Kuiper belt' },
  { id: 'ne-leonid-stream', name: 'Leonid meteor stream', distanceLy: 2.8e-4, category: 'solarSystem', sub: 'Structure', importance: 4, note: 'A trail of comet crumbs the Earth ploughs through each November, sparking shooting stars' },
  { id: 'ne-perseid-stream', name: 'Perseid meteor stream', distanceLy: 3.5e-4, category: 'solarSystem', sub: 'Structure', importance: 4, note: 'Debris shed by a comet that lights the August sky as it burns in our air' },
  { id: 'ne-zodiacal-dust', name: 'Zodiacal dust cloud', distanceLy: 2.4e-5, category: 'solarSystem', sub: 'Structure', importance: 4, note: 'A faint lens of fine dust in the inner system, seen as a cone of light before dawn' },

  // ===== SOLAR SYSTEM: more spacecraft, historic and current =====
  { id: 'ne-galileo-craft', name: 'Galileo (ended)', distanceLy: 8.2e-5, category: 'solarSystem', sub: 'Spacecraft', importance: 4, note: 'Orbited Jupiter for years then plunged in to avoid contaminating Europa ocean' },
  { id: 'ne-messenger', name: 'MESSENGER (ended)', distanceLy: 6.5e-6, category: 'solarSystem', sub: 'Spacecraft', importance: 4, note: 'The first craft to orbit Mercury, ending its mission crashed on the planet' },
  { id: 'ne-akatsuki', name: 'Akatsuki', distanceLy: 1.1e-5, category: 'solarSystem', sub: 'Spacecraft', importance: 4, note: 'A probe studying the fierce super-rotating winds of Venus atmosphere' },
  { id: 'ne-perseverance', name: 'Perseverance rover', distanceLy: 2.4e-5, category: 'solarSystem', sub: 'Spacecraft', importance: 3, note: 'Trundling across an old Martian lake bed, caching rocks for a future return' },
  { id: 'ne-curiosity', name: 'Curiosity rover', distanceLy: 2.4e-5, category: 'solarSystem', sub: 'Spacecraft', importance: 4, note: 'A nuclear-powered rover climbing a Martian mountain layer by layer' },
  { id: 'ne-rosetta', name: 'Rosetta (ended)', distanceLy: 3.4e-5, category: 'solarSystem', sub: 'Spacecraft', importance: 4, note: 'Chased a comet for years, then gently set itself down on its surface to finish' },
  { id: 'ne-hayabusa2', name: 'Hayabusa2', distanceLy: 1.6e-5, category: 'solarSystem', sub: 'Spacecraft', importance: 4, note: 'Returned pieces of asteroid Ryugu and flew on towards its next target' },
  { id: 'ne-new-horizons-2', name: 'DART impactor site', distanceLy: 1.8e-5, category: 'solarSystem', sub: 'Spacecraft', importance: 4, note: 'Where a spacecraft slammed into a moonlet to prove we could steer an asteroid' },
  { id: 'ne-voyager-golden-record', name: 'Voyager beyond the shock', distanceLy: 2.7e-3, category: 'solarSystem', sub: 'Spacecraft', importance: 4, note: 'The twin craft carry a golden record of Earth sounds into the interstellar dark' },

  // ===== NEAR-EARTH: the Moon's own neighbourhood =====
  { id: 'ne-lunar-orbit-craft', name: 'Lunar Reconnaissance Orbiter', distanceLy: 4.06e-8, category: 'solarSystem', sub: 'Spacecraft', importance: 4, note: 'Circling the Moon low and mapping every crater in fine detail' },
  { id: 'ne-lunar-gateway', name: 'Lunar Gateway (planned)', distanceLy: 4.06e-8, category: 'solarSystem', sub: 'Satellite', importance: 4, note: 'A small station to be assembled in a looping orbit around the Moon' },
  { id: 'ne-apollo-sites', name: 'Apollo landing sites', distanceLy: 4.06e-8, category: 'solarSystem', sub: 'Structure', importance: 3, note: 'Six patches of the Moon where human footprints still sit undisturbed' },
  { id: 'ne-earth-moon-l2', name: 'Earth-Moon L2 point', distanceLy: 4.2e-8, category: 'solarSystem', sub: 'Structure', importance: 4, note: 'A point just beyond the far side, used to relay signals from the Moon hidden face' },
  { id: 'ne-queqiao', name: 'Queqiao relay', distanceLy: 4.2e-8, category: 'solarSystem', sub: 'Spacecraft', importance: 4, note: 'A satellite parked beyond the Moon to talk to landers on its far side' },

  // ===== SOLAR SYSTEM: a few more worlds and features =====
  { id: 'ne-olympus-mons', name: 'Olympus Mons', distanceLy: 2.4e-5, category: 'solarSystem', sub: 'Planet', importance: 4, note: 'The tallest volcano in the solar system, three times the height of Everest, on Mars' },
  { id: 'ne-valles-marineris', name: 'Valles Marineris', distanceLy: 2.4e-5, category: 'solarSystem', sub: 'Planet', importance: 4, note: 'A canyon on Mars long enough to stretch across the whole United States' },
  { id: 'ne-io-torus', name: 'Io plasma torus', distanceLy: 8.2e-5, category: 'solarSystem', sub: 'Structure', importance: 4, note: 'A doughnut of glowing gas fed by the volcanoes of Io, circling Jupiter' },
  { id: 'ne-hektor-region', name: 'Neptune Trojans', distanceLy: 4.74e-4, category: 'solarSystem', sub: 'Asteroid', importance: 4, note: 'Asteroids that share Neptune orbit, hidden far out in its gravitational calm spots' },
  { id: 'ne-sednoids', name: 'Sednoids', distanceLy: 1.5e-2, category: 'solarSystem', sub: 'Structure', importance: 4, note: 'A tiny handful of bodies on the loneliest orbits known, hinting at unseen forces' },

  // ===== NEAR-INTERSTELLAR: the reach toward the nearest stars =====
  { id: 'ne-oort-outer-fringe', name: 'Outermost Oort fringe', distanceLy: 1.9, category: 'solarSystem', sub: 'Structure', importance: 4, note: 'The faintest scattering of icy bodies, almost close enough to feel the next star' },
  { id: 'ne-interstellar-medium', name: 'Local interstellar cloud', distanceLy: 1.0, category: 'solarSystem', sub: 'Structure', importance: 4, note: 'The wisp of warm gas the Sun is currently drifting through on its galactic journey' },
]
