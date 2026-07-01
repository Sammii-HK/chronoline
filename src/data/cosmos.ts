// Scale-of-the-universe dataset. Same engine as the history timeline, but the
// axis is DISTANCE (log, light-years from Earth) rather than time.
// Starter set, hand-curated; expand later. Distances are light-years; for
// solar-system bodies these are orbital-scale approximations (order of magnitude
// is what matters on a log axis).

export type CosmosCategory =
  | 'solarSystem'
  | 'stars'
  | 'zodiac'
  | 'deepSky'
  | 'milkyWay'
  | 'localGroup'
  | 'largeScale'

export interface CosmosObject {
  id: string
  name: string
  distanceLy: number
  category: CosmosCategory
  sub?: string
  importance: 1 | 2 | 3 | 4
  note?: string
}

export const COSMOS: CosmosObject[] = [
  // ===== SOLAR SYSTEM =====
  { id: 'moon', name: 'The Moon', distanceLy: 4.06e-8, category: 'solarSystem', importance: 1, note: 'Light from the Moon reaches us in just over a second' },
  { id: 'sun', name: 'The Sun', distanceLy: 1.58e-5, category: 'solarSystem', importance: 1, note: 'Eight light-minutes away, and it holds 99.8% of the solar system mass' },
  { id: 'mercury', name: 'Mercury', distanceLy: 6.2e-6, category: 'solarSystem', importance: 3 },
  { id: 'venus', name: 'Venus', distanceLy: 1.14e-5, category: 'solarSystem', importance: 3 },
  { id: 'mars', name: 'Mars', distanceLy: 2.4e-5, category: 'solarSystem', importance: 2, note: 'Even at its closest, a radio signal takes about three minutes to reach it' },
  { id: 'asteroid-belt', name: 'Asteroid belt', distanceLy: 4.3e-5, category: 'solarSystem', importance: 3 },
  { id: 'jupiter', name: 'Jupiter', distanceLy: 8.2e-5, category: 'solarSystem', importance: 2, note: 'Big enough to swallow every other planet with room to spare' },
  { id: 'saturn', name: 'Saturn', distanceLy: 1.5e-4, category: 'solarSystem', importance: 2 },
  { id: 'uranus', name: 'Uranus', distanceLy: 3.03e-4, category: 'solarSystem', importance: 3 },
  { id: 'neptune', name: 'Neptune', distanceLy: 4.74e-4, category: 'solarSystem', importance: 2 },
  { id: 'pluto', name: 'Pluto', distanceLy: 6.2e-4, category: 'solarSystem', importance: 3 },
  { id: 'kuiper-belt', name: 'Kuiper belt', distanceLy: 7.1e-4, category: 'solarSystem', importance: 3 },
  { id: 'voyager-1', name: 'Voyager 1', distanceLy: 2.6e-3, category: 'solarSystem', importance: 2, note: 'The furthest human-made object, still calling home after nearly 50 years' },
  { id: 'oort-cloud', name: 'Oort cloud', distanceLy: 0.79, category: 'solarSystem', importance: 2, note: 'A shell of icy comets nearly a light-year out, the true edge of the Sun grip' },

  // ===== NEARBY / NOTABLE STARS =====
  { id: 'proxima', name: 'Proxima Centauri', distanceLy: 4.24, category: 'stars', importance: 1, note: 'The nearest star to the Sun, and it would still take 4.2 years at light speed' },
  { id: 'alpha-cen', name: 'Alpha Centauri', distanceLy: 4.37, category: 'stars', importance: 2 },
  { id: 'barnards', name: "Barnard's Star", distanceLy: 5.96, category: 'stars', importance: 3 },
  { id: 'sirius', name: 'Sirius', distanceLy: 8.6, category: 'stars', importance: 2, note: 'The brightest star in our sky, and one of the closest' },
  { id: 'procyon', name: 'Procyon', distanceLy: 11.5, category: 'stars', importance: 3 },
  { id: 'altair', name: 'Altair', distanceLy: 16.7, category: 'stars', importance: 3 },
  { id: 'vega', name: 'Vega', distanceLy: 25, category: 'stars', importance: 2, note: 'Was the pole star 12,000 years ago and will be again' },
  { id: 'arcturus', name: 'Arcturus', distanceLy: 37, category: 'stars', importance: 3 },
  { id: 'polaris', name: 'Polaris', distanceLy: 433, category: 'stars', importance: 2, note: 'The pole star we steer by is over 400 light-years away' },
  { id: 'rigel', name: 'Rigel', distanceLy: 860, category: 'stars', importance: 3 },
  { id: 'deneb', name: 'Deneb', distanceLy: 2600, category: 'stars', importance: 3, note: 'So luminous it looks bright to us from 2,600 light-years away' },
  { id: 'betelgeuse', name: 'Betelgeuse', distanceLy: 548, category: 'stars', importance: 2, note: 'A dying giant, and when it goes supernova we will see it in daylight' },

  // ===== ZODIAC (constellations as stars at their true, scattered distances) =====
  { id: 'z-aries-hamal', name: 'Hamal', distanceLy: 66, category: 'zodiac', sub: 'Aries', importance: 3 },
  { id: 'z-aries-sheratan', name: 'Sheratan', distanceLy: 60, category: 'zodiac', sub: 'Aries', importance: 4 },
  { id: 'z-aries-mesarthim', name: 'Mesarthim', distanceLy: 164, category: 'zodiac', sub: 'Aries', importance: 4 },
  { id: 'z-taurus-aldebaran', name: 'Aldebaran', distanceLy: 65, category: 'zodiac', sub: 'Taurus', importance: 2, note: 'The eye of the bull sits at 65 ly, but the Pleiades behind it are seven times further' },
  { id: 'z-taurus-elnath', name: 'Elnath', distanceLy: 134, category: 'zodiac', sub: 'Taurus', importance: 4 },
  { id: 'z-taurus-ain', name: 'Ain', distanceLy: 155, category: 'zodiac', sub: 'Taurus', importance: 4 },
  { id: 'z-gemini-pollux', name: 'Pollux', distanceLy: 34, category: 'zodiac', sub: 'Gemini', importance: 3 },
  { id: 'z-gemini-castor', name: 'Castor', distanceLy: 51, category: 'zodiac', sub: 'Gemini', importance: 3 },
  { id: 'z-gemini-alhena', name: 'Alhena', distanceLy: 109, category: 'zodiac', sub: 'Gemini', importance: 4 },
  { id: 'z-cancer-tarf', name: 'Tarf', distanceLy: 290, category: 'zodiac', sub: 'Cancer', importance: 4 },
  { id: 'z-cancer-asellus', name: 'Asellus Australis', distanceLy: 136, category: 'zodiac', sub: 'Cancer', importance: 4 },
  { id: 'z-cancer-acubens', name: 'Acubens', distanceLy: 174, category: 'zodiac', sub: 'Cancer', importance: 4 },
  { id: 'z-leo-regulus', name: 'Regulus', distanceLy: 79, category: 'zodiac', sub: 'Leo', importance: 2, note: 'The heart of the lion, a fast-spinning star flattened into an egg shape' },
  { id: 'z-leo-denebola', name: 'Denebola', distanceLy: 36, category: 'zodiac', sub: 'Leo', importance: 3 },
  { id: 'z-leo-algieba', name: 'Algieba', distanceLy: 130, category: 'zodiac', sub: 'Leo', importance: 4 },
  { id: 'z-leo-zosma', name: 'Zosma', distanceLy: 58, category: 'zodiac', sub: 'Leo', importance: 4 },
  { id: 'z-virgo-spica', name: 'Spica', distanceLy: 250, category: 'zodiac', sub: 'Virgo', importance: 2, note: 'One bright point to us is really two stars whirling around each other' },
  { id: 'z-virgo-porrima', name: 'Porrima', distanceLy: 38, category: 'zodiac', sub: 'Virgo', importance: 4 },
  { id: 'z-virgo-vindemiatrix', name: 'Vindemiatrix', distanceLy: 109, category: 'zodiac', sub: 'Virgo', importance: 4 },
  { id: 'z-libra-zubeneschamali', name: 'Zubeneschamali', distanceLy: 185, category: 'zodiac', sub: 'Libra', importance: 4 },
  { id: 'z-libra-zubenelgenubi', name: 'Zubenelgenubi', distanceLy: 77, category: 'zodiac', sub: 'Libra', importance: 4 },
  { id: 'z-scorpius-antares', name: 'Antares', distanceLy: 550, category: 'zodiac', sub: 'Scorpius', importance: 2, note: 'A supergiant so vast it would engulf Mars if placed where our Sun is' },
  { id: 'z-scorpius-shaula', name: 'Shaula', distanceLy: 570, category: 'zodiac', sub: 'Scorpius', importance: 4 },
  { id: 'z-scorpius-sargas', name: 'Sargas', distanceLy: 270, category: 'zodiac', sub: 'Scorpius', importance: 4 },
  { id: 'z-scorpius-dschubba', name: 'Dschubba', distanceLy: 400, category: 'zodiac', sub: 'Scorpius', importance: 4 },
  { id: 'z-sag-kaus', name: 'Kaus Australis', distanceLy: 143, category: 'zodiac', sub: 'Sagittarius', importance: 4 },
  { id: 'z-sag-nunki', name: 'Nunki', distanceLy: 228, category: 'zodiac', sub: 'Sagittarius', importance: 4 },
  { id: 'z-sag-ascella', name: 'Ascella', distanceLy: 88, category: 'zodiac', sub: 'Sagittarius', importance: 4 },
  { id: 'z-cap-deneb-algedi', name: 'Deneb Algedi', distanceLy: 39, category: 'zodiac', sub: 'Capricornus', importance: 4 },
  { id: 'z-cap-dabih', name: 'Dabih', distanceLy: 330, category: 'zodiac', sub: 'Capricornus', importance: 4 },
  { id: 'z-cap-algedi', name: 'Algedi', distanceLy: 109, category: 'zodiac', sub: 'Capricornus', importance: 4 },
  { id: 'z-aqr-sadalsuud', name: 'Sadalsuud', distanceLy: 540, category: 'zodiac', sub: 'Aquarius', importance: 4 },
  { id: 'z-aqr-sadalmelik', name: 'Sadalmelik', distanceLy: 520, category: 'zodiac', sub: 'Aquarius', importance: 4 },
  { id: 'z-aqr-skat', name: 'Skat', distanceLy: 113, category: 'zodiac', sub: 'Aquarius', importance: 4 },
  { id: 'z-pisces-alpherg', name: 'Alpherg', distanceLy: 330, category: 'zodiac', sub: 'Pisces', importance: 4 },
  { id: 'z-pisces-gamma', name: 'Gamma Piscium', distanceLy: 135, category: 'zodiac', sub: 'Pisces', importance: 4 },
  { id: 'z-pisces-eta', name: 'Eta Piscium', distanceLy: 350, category: 'zodiac', sub: 'Pisces', importance: 4 },

  // ===== DEEP SKY: clusters and nebulae =====
  { id: 'hyades', name: 'Hyades cluster', distanceLy: 153, category: 'deepSky', importance: 3 },
  { id: 'pleiades', name: 'The Pleiades', distanceLy: 444, category: 'deepSky', importance: 1, note: 'The seven sisters are a true cluster of hot young stars, born together' },
  { id: 'orion-nebula', name: 'Orion Nebula', distanceLy: 1344, category: 'deepSky', importance: 2, note: 'A stellar nursery you can see with the naked eye, stars being born now' },
  { id: 'crab-nebula', name: 'Crab Nebula', distanceLy: 6500, category: 'deepSky', importance: 3, note: 'The wreckage of a supernova Chinese astronomers recorded in 1054' },
  { id: 'ring-nebula', name: 'Ring Nebula', distanceLy: 2570, category: 'deepSky', importance: 4 },
  { id: 'omega-cen', name: 'Omega Centauri', distanceLy: 17000, category: 'deepSky', importance: 3, note: 'A globular cluster of millions of stars, possibly a galaxy core stripped bare' },
  { id: 'eagle-nebula', name: 'Eagle Nebula', distanceLy: 5700, category: 'deepSky', importance: 4 },

  // ===== MILKY WAY structure =====
  { id: 'galactic-centre', name: 'Galactic centre', distanceLy: 26000, category: 'milkyWay', importance: 1, note: 'At the heart of our galaxy sits Sagittarius A*, a black hole four million Suns heavy' },
  { id: 'perseus-arm', name: 'Perseus arm', distanceLy: 6400, category: 'milkyWay', importance: 3 },
  { id: 'milky-way-edge', name: 'Far edge of the Milky Way', distanceLy: 80000, category: 'milkyWay', importance: 2, note: 'Our galaxy spans 100,000 light-years, and we sit two thirds of the way out' },

  // ===== LOCAL GROUP: nearby galaxies =====
  { id: 'lmc', name: 'Large Magellanic Cloud', distanceLy: 160000, category: 'localGroup', importance: 2, note: 'A satellite galaxy visible to the naked eye from the southern sky' },
  { id: 'smc', name: 'Small Magellanic Cloud', distanceLy: 200000, category: 'localGroup', importance: 3 },
  { id: 'andromeda', name: 'Andromeda galaxy', distanceLy: 2.54e6, category: 'localGroup', importance: 1, note: 'The furthest thing visible to the naked eye, and it is heading for a collision with us' },
  { id: 'triangulum', name: 'Triangulum galaxy', distanceLy: 2.73e6, category: 'localGroup', importance: 3 },

  // ===== LARGE SCALE structure =====
  { id: 'virgo-cluster', name: 'Virgo Cluster', distanceLy: 5.4e7, category: 'largeScale', importance: 2, note: 'A swarm of over a thousand galaxies pulling our whole neighbourhood towards it' },
  { id: 'great-attractor', name: 'Great Attractor', distanceLy: 2.5e8, category: 'largeScale', importance: 3 },
  { id: 'laniakea', name: 'Laniakea Supercluster', distanceLy: 5.2e8, category: 'largeScale', importance: 2, note: 'Our home supercluster, 100,000 galaxies flowing together, named heaven immeasurable' },
  { id: 'sloan-great-wall', name: 'Sloan Great Wall', distanceLy: 1e9, category: 'largeScale', importance: 3 },
  { id: 'cosmic-web', name: 'The cosmic web', distanceLy: 1e10, category: 'largeScale', importance: 3, note: 'Galaxies string along vast filaments with near-empty voids between them' },
  { id: 'observable-edge', name: 'Edge of the observable universe', distanceLy: 4.65e10, category: 'largeScale', importance: 1, note: 'The furthest we can ever see, the light having travelled since the universe began' },
]
