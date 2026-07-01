// Expansion pack for the scale-of-the-universe (distance) interactive.
// Standalone: import the CosmosObject type from the base dataset and export a
// second array. All ids prefixed "x-" to avoid clashing with COSMOS, and no
// name duplicates the base set. Distances are real published figures in
// light-years (best estimate where debated); solar-system bodies use tiny
// fractional light-years matching the base set's convention.

import type { CosmosObject } from './cosmos'

export const PACK: CosmosObject[] = [
  // ===== SOLAR SYSTEM: moons, dwarf planets, small bodies, spacecraft =====
  // Distances are order-of-magnitude average orbital scale from Earth.
  { id: 'x-phobos', name: 'Phobos', distanceLy: 2.4e-5, category: 'solarSystem', sub: 'Moon', importance: 4 },
  { id: 'x-deimos', name: 'Deimos', distanceLy: 2.4e-5, category: 'solarSystem', sub: 'Moon', importance: 4 },
  { id: 'x-io', name: 'Io', distanceLy: 8.2e-5, category: 'solarSystem', sub: 'Moon', importance: 3, note: 'The most volcanic world in the solar system, squeezed by Jupiter tides' },
  { id: 'x-europa', name: 'Europa', distanceLy: 8.2e-5, category: 'solarSystem', sub: 'Moon', importance: 2, note: 'An icy shell over a salt-water ocean that may hold more water than Earth' },
  { id: 'x-ganymede', name: 'Ganymede', distanceLy: 8.2e-5, category: 'solarSystem', sub: 'Moon', importance: 3, note: 'The largest moon in the solar system, bigger than the planet Mercury' },
  { id: 'x-callisto', name: 'Callisto', distanceLy: 8.2e-5, category: 'solarSystem', sub: 'Moon', importance: 4 },
  { id: 'x-titan', name: 'Titan', distanceLy: 1.5e-4, category: 'solarSystem', sub: 'Moon', importance: 2, note: 'A moon with a thick atmosphere and lakes of liquid methane' },
  { id: 'x-enceladus', name: 'Enceladus', distanceLy: 1.5e-4, category: 'solarSystem', sub: 'Moon', importance: 3, note: 'Jets of water ice erupt from a hidden ocean at its south pole' },
  { id: 'x-rhea', name: 'Rhea', distanceLy: 1.5e-4, category: 'solarSystem', sub: 'Moon', importance: 4 },
  { id: 'x-iapetus', name: 'Iapetus', distanceLy: 1.5e-4, category: 'solarSystem', sub: 'Moon', importance: 4 },
  { id: 'x-mimas', name: 'Mimas', distanceLy: 1.5e-4, category: 'solarSystem', sub: 'Moon', importance: 4 },
  { id: 'x-titania', name: 'Titania', distanceLy: 3.03e-4, category: 'solarSystem', sub: 'Moon', importance: 4 },
  { id: 'x-oberon', name: 'Oberon', distanceLy: 3.03e-4, category: 'solarSystem', sub: 'Moon', importance: 4 },
  { id: 'x-miranda', name: 'Miranda', distanceLy: 3.03e-4, category: 'solarSystem', sub: 'Moon', importance: 4 },
  { id: 'x-triton', name: 'Triton', distanceLy: 4.74e-4, category: 'solarSystem', sub: 'Moon', importance: 3, note: 'Orbits Neptune backwards, a captured Kuiper belt world with nitrogen geysers' },
  { id: 'x-charon', name: 'Charon', distanceLy: 6.2e-4, category: 'solarSystem', sub: 'Moon', importance: 4, note: 'So large it and Pluto orbit a point in empty space between them' },

  { id: 'x-ceres', name: 'Ceres', distanceLy: 4.3e-5, category: 'solarSystem', sub: 'Dwarf planet', importance: 3, note: 'The only dwarf planet in the asteroid belt, round enough to pull itself into a ball' },
  { id: 'x-vesta', name: 'Vesta', distanceLy: 4.0e-5, category: 'solarSystem', sub: 'Asteroid', importance: 4 },
  { id: 'x-pallas', name: 'Pallas', distanceLy: 4.4e-5, category: 'solarSystem', sub: 'Asteroid', importance: 4 },
  { id: 'x-hygiea', name: 'Hygiea', distanceLy: 5.0e-5, category: 'solarSystem', sub: 'Asteroid', importance: 4 },
  { id: 'x-eros', name: 'Eros', distanceLy: 2.3e-5, category: 'solarSystem', sub: 'Asteroid', importance: 4 },
  { id: 'x-bennu', name: 'Bennu', distanceLy: 1.7e-5, category: 'solarSystem', sub: 'Asteroid', importance: 4, note: 'A rubble-pile asteroid whose sample was returned to Earth in 2023' },
  { id: 'x-orcus', name: 'Orcus', distanceLy: 6.2e-4, category: 'solarSystem', sub: 'Dwarf planet', importance: 4 },
  { id: 'x-quaoar', name: 'Quaoar', distanceLy: 6.8e-4, category: 'solarSystem', sub: 'Dwarf planet', importance: 4 },
  { id: 'x-haumea', name: 'Haumea', distanceLy: 6.8e-4, category: 'solarSystem', sub: 'Dwarf planet', importance: 3, note: 'Spins so fast it is stretched into an egg shape and has its own ring' },
  { id: 'x-makemake', name: 'Makemake', distanceLy: 7.1e-4, category: 'solarSystem', sub: 'Dwarf planet', importance: 3 },
  { id: 'x-gonggong', name: 'Gonggong', distanceLy: 1.05e-3, category: 'solarSystem', sub: 'Dwarf planet', importance: 4 },
  { id: 'x-eris', name: 'Eris', distanceLy: 1.5e-3, category: 'solarSystem', sub: 'Dwarf planet', importance: 2, note: 'The discovery that got Pluto demoted, more massive than Pluto and far further out' },
  { id: 'x-sedna', name: 'Sedna', distanceLy: 1.2e-2, category: 'solarSystem', sub: 'Dwarf planet', importance: 3, note: 'On an orbit so vast a single year lasts over eleven thousand of ours' },

  { id: 'x-halley', name: "Halley's Comet", distanceLy: 2.8e-4, category: 'solarSystem', sub: 'Comet', importance: 3, note: 'Returns every 76 years, last seen in 1986 and due back in 2061' },
  { id: 'x-hale-bopp', name: 'Comet Hale-Bopp', distanceLy: 5.4e-5, category: 'solarSystem', sub: 'Comet', importance: 4, note: 'The great comet of 1997, visible to the naked eye for a record 18 months' },
  { id: 'x-oumuamua', name: "'Oumuamua", distanceLy: 5.0e-4, category: 'solarSystem', sub: 'Comet', importance: 3, note: 'The first known object to visit us from another star system' },

  { id: 'x-iss', name: 'International Space Station', distanceLy: 4.5e-11, category: 'solarSystem', sub: 'Satellite', importance: 3, note: 'Orbiting just 400 km up, its light reaches you in a millionth of a second' },
  { id: 'x-parker', name: 'Parker Solar Probe', distanceLy: 1.0e-6, category: 'solarSystem', sub: 'Spacecraft', importance: 4, note: 'The fastest object humans have built, dipping into the Sun corona' },
  { id: 'x-jwst', name: 'James Webb Space Telescope', distanceLy: 1.6e-7, category: 'solarSystem', sub: 'Satellite', importance: 3, note: 'Parked 1.5 million km away at the L2 point, watching the first galaxies' },
  { id: 'x-voyager-2', name: 'Voyager 2', distanceLy: 2.15e-3, category: 'solarSystem', sub: 'Spacecraft', importance: 2, note: 'The only craft to visit all four giant planets, now in interstellar space' },
  { id: 'x-pioneer-10', name: 'Pioneer 10', distanceLy: 3.0e-3, category: 'solarSystem', sub: 'Spacecraft', importance: 3, note: 'Carried a plaque for any finder, now silent and drifting towards Aldebaran' },
  { id: 'x-pioneer-11', name: 'Pioneer 11', distanceLy: 2.4e-3, category: 'solarSystem', sub: 'Spacecraft', importance: 4 },
  { id: 'x-new-horizons', name: 'New Horizons', distanceLy: 9.5e-4, category: 'solarSystem', sub: 'Spacecraft', importance: 2, note: 'Gave us our first close look at Pluto in 2015, still heading outward' },

  // ===== NEARBY / NOTABLE STARS =====
  { id: 'x-wolf-359', name: 'Wolf 359', distanceLy: 7.86, category: 'stars', importance: 4 },
  { id: 'x-lalande', name: 'Lalande 21185', distanceLy: 8.31, category: 'stars', importance: 4 },
  { id: 'x-luyten', name: "Luyten's Star", distanceLy: 12.3, category: 'stars', importance: 4 },
  { id: 'x-epsilon-eri', name: 'Epsilon Eridani', distanceLy: 10.5, category: 'stars', importance: 3, note: 'A young Sun-like star with a dusty disc and known planet, a near neighbour' },
  { id: 'x-ross-128', name: 'Ross 128', distanceLy: 11.0, category: 'stars', importance: 4 },
  { id: 'x-61-cygni', name: '61 Cygni', distanceLy: 11.4, category: 'stars', importance: 3, note: 'The first star to have its distance measured, back in 1838' },
  { id: 'x-tau-ceti', name: 'Tau Ceti', distanceLy: 11.9, category: 'stars', importance: 3, note: 'The nearest single Sun-like star, long a favourite target for planet hunters' },
  { id: 'x-gliese-581', name: 'Gliese 581', distanceLy: 20.4, category: 'stars', importance: 4 },
  { id: 'x-fomalhaut', name: 'Fomalhaut', distanceLy: 25.1, category: 'stars', importance: 3, note: 'Ringed by a vast dusty debris belt, the lonely star of the autumn sky' },
  { id: 'x-trappist-1', name: 'TRAPPIST-1', distanceLy: 40.7, category: 'stars', importance: 3, note: 'A tiny red dwarf circled by seven Earth-sized worlds' },
  { id: 'x-pollux-planet', name: 'Kepler-442', distanceLy: 1206, category: 'stars', importance: 4, note: 'Home to one of the most promising potentially habitable planets found' },
  { id: 'x-capella', name: 'Capella', distanceLy: 42.9, category: 'stars', importance: 3, note: 'Two golden giant stars orbiting close, the brightest star in Auriga' },
  { id: 'x-castor-region', name: 'Alderamin', distanceLy: 49, category: 'stars', importance: 4 },
  { id: 'x-mira', name: 'Mira', distanceLy: 300, category: 'stars', importance: 3, note: 'A pulsing red giant that brightens and fades over eleven months, the wonderful star' },
  { id: 'x-achernar', name: 'Achernar', distanceLy: 139, category: 'stars', importance: 3, note: 'Spins so fast its equator bulges outward, the end of the river Eridanus' },
  { id: 'x-canopus', name: 'Canopus', distanceLy: 310, category: 'stars', importance: 2, note: 'The second brightest star in the night sky, a beacon for spacecraft navigation' },
  { id: 'x-alnitak', name: 'Alnitak', distanceLy: 1260, category: 'stars', importance: 4 },
  { id: 'x-alnilam', name: 'Alnilam', distanceLy: 2000, category: 'stars', importance: 3, note: "The central star of Orion's belt, a blazing blue supergiant" },
  { id: 'x-mintaka', name: 'Mintaka', distanceLy: 1200, category: 'stars', importance: 4 },
  { id: 'x-bellatrix', name: 'Bellatrix', distanceLy: 250, category: 'stars', importance: 4 },
  { id: 'x-saiph', name: 'Saiph', distanceLy: 650, category: 'stars', importance: 4 },
  { id: 'x-eta-carinae', name: 'Eta Carinae', distanceLy: 7500, category: 'stars', importance: 3, note: 'A monster star that may explode as a supernova at any time' },
  { id: 'x-vy-cma', name: 'VY Canis Majoris', distanceLy: 3900, category: 'stars', importance: 3, note: 'One of the largest known stars, a hypergiant over a thousand Suns wide' },
  { id: 'x-uy-scuti', name: 'UY Scuti', distanceLy: 5100, category: 'stars', importance: 3, note: 'A red hypergiant so vast light would take hours to circle it' },
  { id: 'x-r136a1', name: 'R136a1', distanceLy: 163000, category: 'stars', importance: 3, note: 'The most massive star known, packing nearly 200 Suns into one blazing point' },
  { id: 'x-scholz', name: "Scholz's Star", distanceLy: 22, category: 'stars', importance: 4, note: 'Skimmed the outer Oort cloud 70,000 years ago, the closest known stellar flyby' },

  // ===== ZODIAC: more named stars per sign at their true, scattered distances =====
  // ARIES
  { id: 'x-z-aries-botein', name: 'Botein', distanceLy: 168, category: 'zodiac', sub: 'Aries', importance: 4 },
  { id: 'x-z-aries-41ari', name: '41 Arietis', distanceLy: 166, category: 'zodiac', sub: 'Aries', importance: 4 },
  // TAURUS
  { id: 'x-z-taurus-alcyone', name: 'Alcyone', distanceLy: 440, category: 'zodiac', sub: 'Taurus', importance: 3, note: 'The brightest of the Pleiades, seven times further than the eye of the bull' },
  { id: 'x-z-taurus-maia', name: 'Maia', distanceLy: 360, category: 'zodiac', sub: 'Taurus', importance: 4 },
  { id: 'x-z-taurus-zeta', name: 'Tianguan', distanceLy: 440, category: 'zodiac', sub: 'Taurus', importance: 4 },
  // GEMINI
  { id: 'x-z-gemini-wasat', name: 'Wasat', distanceLy: 62, category: 'zodiac', sub: 'Gemini', importance: 4 },
  { id: 'x-z-gemini-mebsuta', name: 'Mebsuta', distanceLy: 840, category: 'zodiac', sub: 'Gemini', importance: 4 },
  { id: 'x-z-gemini-tejat', name: 'Tejat', distanceLy: 230, category: 'zodiac', sub: 'Gemini', importance: 4 },
  // CANCER
  { id: 'x-z-cancer-altarf', name: 'Nahn', distanceLy: 76, category: 'zodiac', sub: 'Cancer', importance: 4 },
  { id: 'x-z-cancer-iota', name: 'Iota Cancri', distanceLy: 300, category: 'zodiac', sub: 'Cancer', importance: 4 },
  { id: 'x-z-cancer-asellus-b', name: 'Asellus Borealis', distanceLy: 158, category: 'zodiac', sub: 'Cancer', importance: 4 },
  // LEO
  { id: 'x-z-leo-chertan', name: 'Chertan', distanceLy: 165, category: 'zodiac', sub: 'Leo', importance: 4 },
  { id: 'x-z-leo-adhafera', name: 'Adhafera', distanceLy: 274, category: 'zodiac', sub: 'Leo', importance: 4 },
  // VIRGO
  { id: 'x-z-virgo-heze', name: 'Heze', distanceLy: 74, category: 'zodiac', sub: 'Virgo', importance: 4 },
  { id: 'x-z-virgo-zavijava', name: 'Zavijava', distanceLy: 36, category: 'zodiac', sub: 'Virgo', importance: 4 },
  { id: 'x-z-virgo-auva', name: 'Auva', distanceLy: 198, category: 'zodiac', sub: 'Virgo', importance: 4 },
  // LIBRA
  { id: 'x-z-libra-brachium', name: 'Brachium', distanceLy: 288, category: 'zodiac', sub: 'Libra', importance: 4 },
  { id: 'x-z-libra-zubenelakrab', name: 'Zubenelakrab', distanceLy: 152, category: 'zodiac', sub: 'Libra', importance: 4 },
  { id: 'x-z-libra-48lib', name: '48 Librae', distanceLy: 515, category: 'zodiac', sub: 'Libra', importance: 4 },
  // SCORPIUS
  { id: 'x-z-scorpius-acrab', name: 'Acrab', distanceLy: 400, category: 'zodiac', sub: 'Scorpius', importance: 4 },
  { id: 'x-z-scorpius-lesath', name: 'Lesath', distanceLy: 580, category: 'zodiac', sub: 'Scorpius', importance: 4 },
  // SAGITTARIUS
  { id: 'x-z-sag-kaus-media', name: 'Kaus Media', distanceLy: 348, category: 'zodiac', sub: 'Sagittarius', importance: 4 },
  { id: 'x-z-sag-kaus-borealis', name: 'Kaus Borealis', distanceLy: 78, category: 'zodiac', sub: 'Sagittarius', importance: 4 },
  { id: 'x-z-sag-albaldah', name: 'Albaldah', distanceLy: 510, category: 'zodiac', sub: 'Sagittarius', importance: 4 },
  // CAPRICORNUS
  { id: 'x-z-cap-nashira', name: 'Nashira', distanceLy: 139, category: 'zodiac', sub: 'Capricornus', importance: 4 },
  { id: 'x-z-cap-psi', name: 'Psi Capricorni', distanceLy: 48, category: 'zodiac', sub: 'Capricornus', importance: 4 },
  // AQUARIUS
  { id: 'x-z-aqr-sadachbia', name: 'Sadachbia', distanceLy: 158, category: 'zodiac', sub: 'Aquarius', importance: 4 },
  { id: 'x-z-aqr-albali', name: 'Albali', distanceLy: 213, category: 'zodiac', sub: 'Aquarius', importance: 4 },
  { id: 'x-z-aqr-ancha', name: 'Ancha', distanceLy: 320, category: 'zodiac', sub: 'Aquarius', importance: 4 },
  // PISCES
  { id: 'x-z-pisces-fumalsamakah', name: 'Fumalsamakah', distanceLy: 495, category: 'zodiac', sub: 'Pisces', importance: 4 },
  { id: 'x-z-pisces-torcular', name: 'Torcular', distanceLy: 294, category: 'zodiac', sub: 'Pisces', importance: 4 },
  { id: 'x-z-pisces-eta', name: 'Alpherg Kaht', distanceLy: 350, category: 'zodiac', sub: 'Pisces', importance: 4 },

  // ===== DEEP SKY: clusters and nebulae =====
  { id: 'x-beehive', name: 'Beehive Cluster', distanceLy: 577, category: 'deepSky', importance: 3, note: 'An open cluster in Cancer, a smudge to the eye but hundreds of stars in binoculars' },
  { id: 'x-double-cluster', name: 'Double Cluster', distanceLy: 7500, category: 'deepSky', importance: 3, note: 'Two glittering star clusters side by side in Perseus' },
  { id: 'x-m13', name: 'Great Hercules Cluster', distanceLy: 22200, category: 'deepSky', importance: 2, note: 'A globular of hundreds of thousands of stars, target of a famous 1974 radio message' },
  { id: 'x-m5', name: 'Messier 5', distanceLy: 24500, category: 'deepSky', importance: 4 },
  { id: 'x-47-tuc', name: '47 Tucanae', distanceLy: 13000, category: 'deepSky', importance: 3, note: 'The second brightest globular cluster, a dense ball of ancient stars' },
  { id: 'x-lagoon', name: 'Lagoon Nebula', distanceLy: 4100, category: 'deepSky', importance: 3, note: 'A glowing cloud in Sagittarius where new stars are lighting up' },
  { id: 'x-trifid', name: 'Trifid Nebula', distanceLy: 4100, category: 'deepSky', importance: 4 },
  { id: 'x-helix', name: 'Helix Nebula', distanceLy: 655, category: 'deepSky', importance: 3, note: 'A dying star blowing off its shell, sometimes called the eye of God' },
  { id: 'x-dumbbell', name: 'Dumbbell Nebula', distanceLy: 1360, category: 'deepSky', importance: 4 },
  { id: 'x-cats-eye', name: "Cat's Eye Nebula", distanceLy: 3300, category: 'deepSky', importance: 4 },
  { id: 'x-veil', name: 'Veil Nebula', distanceLy: 2400, category: 'deepSky', importance: 4, note: 'Delicate filaments of gas left by a supernova around 10,000 years ago' },
  { id: 'x-rosette', name: 'Rosette Nebula', distanceLy: 5000, category: 'deepSky', importance: 4 },
  { id: 'x-north-america', name: 'North America Nebula', distanceLy: 2590, category: 'deepSky', importance: 4 },
  { id: 'x-carina', name: 'Carina Nebula', distanceLy: 8500, category: 'deepSky', importance: 3, note: 'A vast star-forming region home to the unstable giant Eta Carinae' },
  { id: 'x-tarantula', name: 'Tarantula Nebula', distanceLy: 161000, category: 'deepSky', importance: 3, note: 'The most active starburst known, blazing inside the Large Magellanic Cloud' },
  { id: 'x-m4', name: 'Messier 4', distanceLy: 5500, category: 'deepSky', importance: 4, note: 'The nearest globular cluster to us, near the bright star Antares' },
  { id: 'x-ptolemy', name: 'Ptolemy Cluster', distanceLy: 800, category: 'deepSky', importance: 4 },

  // ===== MILKY WAY structure =====
  { id: 'x-sgr-a', name: 'Sagittarius A*', distanceLy: 26670, category: 'milkyWay', importance: 1, note: 'The supermassive black hole at the very centre of our galaxy, four million Suns heavy' },
  { id: 'x-orion-arm', name: 'Orion Arm', distanceLy: 100, category: 'milkyWay', importance: 3, note: 'The minor spiral arm we live inside, a spur between two larger arms' },
  { id: 'x-sagittarius-arm', name: 'Sagittarius Arm', distanceLy: 6500, category: 'milkyWay', importance: 3 },
  { id: 'x-scutum-arm', name: 'Scutum-Centaurus Arm', distanceLy: 20000, category: 'milkyWay', importance: 4 },
  { id: 'x-local-bubble', name: 'Local Bubble', distanceLy: 300, category: 'milkyWay', importance: 3, note: 'A cavity of thin hot gas around the Sun, carved out by ancient supernovae' },
  { id: 'x-gould-belt', name: 'Gould Belt', distanceLy: 1000, category: 'milkyWay', importance: 4, note: 'A ring of bright young stars and clouds tilted to the galactic plane' },
  { id: 'x-galactic-halo', name: 'Galactic halo', distanceLy: 130000, category: 'milkyWay', importance: 3, note: 'A faint sphere of old stars and dark matter wrapping the whole galaxy' },
  { id: 'x-galactic-bulge', name: 'Galactic bulge', distanceLy: 24000, category: 'milkyWay', importance: 4 },

  // ===== LOCAL GROUP: nearby galaxies =====
  { id: 'x-canis-major-dwarf', name: 'Canis Major Dwarf', distanceLy: 25000, category: 'localGroup', importance: 3, note: 'The closest galaxy of all, a shredded dwarf being eaten by the Milky Way' },
  { id: 'x-sagittarius-dwarf', name: 'Sagittarius Dwarf', distanceLy: 70000, category: 'localGroup', importance: 3, note: 'A small galaxy passing straight through our own, slowly torn apart' },
  { id: 'x-draco-dwarf', name: 'Draco Dwarf', distanceLy: 260000, category: 'localGroup', importance: 4 },
  { id: 'x-ursa-minor-dwarf', name: 'Ursa Minor Dwarf', distanceLy: 220000, category: 'localGroup', importance: 4 },
  { id: 'x-fornax-dwarf', name: 'Fornax Dwarf', distanceLy: 460000, category: 'localGroup', importance: 4 },
  { id: 'x-sculptor-dwarf', name: 'Sculptor Dwarf', distanceLy: 290000, category: 'localGroup', importance: 4 },
  { id: 'x-leo-i', name: 'Leo I', distanceLy: 820000, category: 'localGroup', importance: 4 },
  { id: 'x-m32', name: 'Messier 32', distanceLy: 2.65e6, category: 'localGroup', importance: 3, note: "A compact dwarf glued to Andromeda's side, its outer stars long stripped away" },
  { id: 'x-m110', name: 'Messier 110', distanceLy: 2.69e6, category: 'localGroup', importance: 4, note: 'A dwarf elliptical companion to the Andromeda galaxy' },
  { id: 'x-ngc-6822', name: "NGC 6822 (Barnard's Galaxy)", distanceLy: 1.6e6, category: 'localGroup', importance: 4 },
  { id: 'x-ic-10', name: 'IC 10', distanceLy: 2.2e6, category: 'localGroup', importance: 4, note: 'The only starburst galaxy in our Local Group' },
  { id: 'x-ic-1613', name: 'IC 1613', distanceLy: 2.38e6, category: 'localGroup', importance: 4 },
  { id: 'x-wlm', name: 'WLM Galaxy', distanceLy: 3.04e6, category: 'localGroup', importance: 4 },
  { id: 'x-ngc-3109', name: 'NGC 3109', distanceLy: 4.3e6, category: 'localGroup', importance: 4 },

  // ===== LARGE SCALE structure =====
  { id: 'x-sculptor-group', name: 'Sculptor Group', distanceLy: 1.15e7, category: 'largeScale', importance: 3, note: 'The nearest galaxy group beyond our own, strung out below the Local Group' },
  { id: 'x-m81-group', name: 'M81 Group', distanceLy: 1.18e7, category: 'largeScale', importance: 4 },
  { id: 'x-centaurus-a', name: 'Centaurus A', distanceLy: 1.3e7, category: 'largeScale', importance: 3, note: 'A nearby galaxy with a dark dust lane and a jet blasting from its black hole' },
  { id: 'x-whirlpool', name: 'Whirlpool Galaxy', distanceLy: 2.3e7, category: 'largeScale', importance: 3, note: 'A perfect grand-design spiral caught tugging on a smaller companion' },
  { id: 'x-sombrero', name: 'Sombrero Galaxy', distanceLy: 3.15e7, category: 'largeScale', importance: 4 },
  { id: 'x-fornax-cluster', name: 'Fornax Cluster', distanceLy: 6.2e7, category: 'largeScale', importance: 4 },
  { id: 'x-local-void', name: 'Local Void', distanceLy: 7.5e7, category: 'largeScale', importance: 3, note: 'A vast near-empty region right next door that is quietly pushing us away' },
  { id: 'x-coma-cluster', name: 'Coma Cluster', distanceLy: 3.2e8, category: 'largeScale', importance: 3, note: 'A rich cluster of thousands of galaxies where dark matter was first suspected' },
  { id: 'x-perseus-cluster', name: 'Perseus Cluster', distanceLy: 2.4e8, category: 'largeScale', importance: 4 },
  { id: 'x-shapley', name: 'Shapley Supercluster', distanceLy: 6.5e8, category: 'largeScale', importance: 3, note: 'The largest concentration of galaxies in the nearby universe' },
  { id: 'x-perseus-pisces', name: 'Perseus-Pisces Supercluster', distanceLy: 2.5e8, category: 'largeScale', importance: 4 },
  { id: 'x-bootes-void', name: 'Boötes Void', distanceLy: 7.0e8, category: 'largeScale', importance: 2, note: 'A bubble of near-empty space 330 million light-years across, the great nothing' },
  { id: 'x-cfa2-wall', name: 'CfA2 Great Wall', distanceLy: 6.0e8, category: 'largeScale', importance: 3, note: 'One of the first giant sheets of galaxies ever mapped' },
  { id: 'x-3c-273', name: 'Quasar 3C 273', distanceLy: 2.4e9, category: 'largeScale', importance: 3, note: 'The first quasar ever identified, a feeding black hole outshining whole galaxies' },
  { id: 'x-huge-lqg', name: 'Huge Large Quasar Group', distanceLy: 9.0e9, category: 'largeScale', importance: 4, note: 'A chain of 73 quasars four billion light-years long, a structure that challenges cosmology' },
  { id: 'x-hercules-cm-wall', name: 'Hercules-Corona Borealis Great Wall', distanceLy: 1.0e10, category: 'largeScale', importance: 3, note: 'The largest known structure in the universe, spanning ten billion light-years' },
  { id: 'x-gn-z11', name: 'Galaxy GN-z11', distanceLy: 1.34e10, category: 'largeScale', importance: 3, note: 'One of the most distant galaxies seen, its light left when the cosmos was young' },
  { id: 'x-cmb', name: 'Cosmic Microwave Background', distanceLy: 4.55e10, category: 'largeScale', importance: 1, note: 'The afterglow of the Big Bang, the oldest light there is, from just after the beginning' },
]
