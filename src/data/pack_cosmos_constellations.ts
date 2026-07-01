// Constellations pack for the scale-of-the-universe (distance) interactive.
// Every object uses category 'zodiac' so it joins the shared "constellations"
// fan-line: each constellation can fan open into its real stars at their true,
// wildly different distances, exposing the flat pattern as a line-of-sight
// illusion. Distances are real published figures in light-years (best modern
// estimate where debated, e.g. Gaia / Hipparcos parallax; luminous supergiants
// carry larger uncertainty). All ids prefixed "cn-"; no id clashes with COSMOS
// or the "x-" pack. Zodiac sub names match the base set exactly so they merge;
// new named stars only, never duplicating a star already present for that sign.

import type { CosmosObject } from './cosmos'

export const PACK: CosmosObject[] = [
  // ============================================================
  // ZODIAC: additional shape-forming stars per sign
  // (no name duplicates of cosmos.ts or pack_cosmos.ts)
  // ============================================================

  // ----- ARIES -----
  { id: 'cn-aries-lilii-borea', name: 'Lilii Borea', distanceLy: 168, category: 'zodiac', sub: 'Aries', importance: 4 },
  { id: 'cn-aries-bharani', name: 'Bharani', distanceLy: 160, category: 'zodiac', sub: 'Aries', importance: 4 },
  { id: 'cn-aries-teegarden', name: "Teegarden's Star", distanceLy: 12.5, category: 'zodiac', sub: 'Aries', importance: 4, note: 'A tiny nearby red dwarf that happens to sit inside the ram, ten times closer than its bright stars' },

  // ----- TAURUS -----
  { id: 'cn-taurus-electra', name: 'Electra', distanceLy: 430, category: 'zodiac', sub: 'Taurus', importance: 4, note: 'One of the Pleiades sisters, hundreds of light-years past the eye of the bull' },
  { id: 'cn-taurus-atlas', name: 'Atlas', distanceLy: 435, category: 'zodiac', sub: 'Taurus', importance: 4 },
  { id: 'cn-taurus-merope', name: 'Merope', distanceLy: 360, category: 'zodiac', sub: 'Taurus', importance: 4 },
  { id: 'cn-taurus-prima-hyadum', name: 'Prima Hyadum', distanceLy: 155, category: 'zodiac', sub: 'Taurus', importance: 4 },
  { id: 'cn-taurus-chamukuy', name: 'Chamukuy', distanceLy: 150, category: 'zodiac', sub: 'Taurus', importance: 4 },

  // ----- GEMINI -----
  { id: 'cn-gemini-mekbuda', name: 'Mekbuda', distanceLy: 1200, category: 'zodiac', sub: 'Gemini', importance: 4, note: 'A pulsing supergiant far behind Pollux, which sits a mere 34 light-years away' },
  { id: 'cn-gemini-propus', name: 'Propus', distanceLy: 380, category: 'zodiac', sub: 'Gemini', importance: 4 },
  { id: 'cn-gemini-alzirr', name: 'Alzirr', distanceLy: 58, category: 'zodiac', sub: 'Gemini', importance: 4 },
  { id: 'cn-gemini-kappa', name: 'Kappa Geminorum', distanceLy: 143, category: 'zodiac', sub: 'Gemini', importance: 4 },

  // ----- CANCER -----
  { id: 'cn-cancer-tegmine', name: 'Tegmine', distanceLy: 83, category: 'zodiac', sub: 'Cancer', importance: 4 },
  { id: 'cn-cancer-copernicus', name: 'Copernicus', distanceLy: 41, category: 'zodiac', sub: 'Cancer', importance: 4, note: 'A Sun-like star with planets, close by while the crab pattern stretches to hundreds of light-years' },

  // ----- LEO -----
  { id: 'cn-leo-rasalas', name: 'Rasalas', distanceLy: 124, category: 'zodiac', sub: 'Leo', importance: 4 },
  { id: 'cn-leo-alterf', name: 'Alterf', distanceLy: 336, category: 'zodiac', sub: 'Leo', importance: 4 },
  { id: 'cn-leo-subra', name: 'Subra', distanceLy: 135, category: 'zodiac', sub: 'Leo', importance: 4 },
  { id: 'cn-leo-wolf-359-region', name: 'Rho Leonis', distanceLy: 5000, category: 'zodiac', sub: 'Leo', importance: 4, note: 'A blue supergiant thousands of light-years off, sharing a line of sight with much nearer lion stars' },

  // ----- VIRGO -----
  { id: 'cn-virgo-syrma', name: 'Syrma', distanceLy: 73, category: 'zodiac', sub: 'Virgo', importance: 4 },
  { id: 'cn-virgo-rijl-al-awwa', name: 'Rijl al Awwa', distanceLy: 71, category: 'zodiac', sub: 'Virgo', importance: 4 },
  { id: 'cn-virgo-zaniah', name: 'Zaniah', distanceLy: 265, category: 'zodiac', sub: 'Virgo', importance: 4 },
  { id: 'cn-virgo-kang', name: 'Kang', distanceLy: 340, category: 'zodiac', sub: 'Virgo', importance: 4 },

  // ----- LIBRA -----
  { id: 'cn-libra-zubenelhakrabi', name: 'Zubenelhakrabi', distanceLy: 152, category: 'zodiac', sub: 'Libra', importance: 4 },
  { id: 'cn-libra-gliese-581-region', name: 'Sigma Librae', distanceLy: 288, category: 'zodiac', sub: 'Libra', importance: 4 },
  { id: 'cn-libra-theta', name: 'Theta Librae', distanceLy: 163, category: 'zodiac', sub: 'Libra', importance: 4 },

  // ----- SCORPIUS -----
  { id: 'cn-scorpius-jabbah', name: 'Jabbah', distanceLy: 470, category: 'zodiac', sub: 'Scorpius', importance: 4 },
  { id: 'cn-scorpius-alniyat', name: 'Alniyat', distanceLy: 735, category: 'zodiac', sub: 'Scorpius', importance: 4 },
  { id: 'cn-scorpius-larawag', name: 'Larawag', distanceLy: 65, category: 'zodiac', sub: 'Scorpius', importance: 4, note: 'A near neighbour at 65 light-years while its constellation mate Antares blazes ten times further out' },
  { id: 'cn-scorpius-sabik-region', name: 'Girtab', distanceLy: 460, category: 'zodiac', sub: 'Scorpius', importance: 4 },
  { id: 'cn-scorpius-fang', name: 'Fang', distanceLy: 530, category: 'zodiac', sub: 'Scorpius', importance: 4 },

  // ----- SAGITTARIUS -----
  { id: 'cn-sag-rukbat', name: 'Rukbat', distanceLy: 170, category: 'zodiac', sub: 'Sagittarius', importance: 4 },
  { id: 'cn-sag-arkab-prior', name: 'Arkab Prior', distanceLy: 380, category: 'zodiac', sub: 'Sagittarius', importance: 4 },
  { id: 'cn-sag-alnasl', name: 'Alnasl', distanceLy: 96, category: 'zodiac', sub: 'Sagittarius', importance: 4 },
  { id: 'cn-sag-nunki-region', name: 'Polis', distanceLy: 500, category: 'zodiac', sub: 'Sagittarius', importance: 4 },

  // ----- CAPRICORNUS -----
  { id: 'cn-cap-dorsum', name: 'Dorsum', distanceLy: 690, category: 'zodiac', sub: 'Capricornus', importance: 4 },
  { id: 'cn-cap-alshat', name: 'Alshat', distanceLy: 105, category: 'zodiac', sub: 'Capricornus', importance: 4 },
  { id: 'cn-cap-omega', name: 'Omega Capricorni', distanceLy: 630, category: 'zodiac', sub: 'Capricornus', importance: 4 },

  // ----- AQUARIUS -----
  { id: 'cn-aqr-sadaltager', name: 'Sadaltager', distanceLy: 164, category: 'zodiac', sub: 'Aquarius', importance: 4 },
  { id: 'cn-aqr-situla', name: 'Situla', distanceLy: 760, category: 'zodiac', sub: 'Aquarius', importance: 4 },
  { id: 'cn-aqr-hydor', name: 'Hydor', distanceLy: 730, category: 'zodiac', sub: 'Aquarius', importance: 4 },
  { id: 'cn-aqr-bunda', name: 'Bunda', distanceLy: 158, category: 'zodiac', sub: 'Aquarius', importance: 4 },

  // ----- PISCES -----
  { id: 'cn-pisces-kullat-nunu', name: 'Kullat Nunu', distanceLy: 294, category: 'zodiac', sub: 'Pisces', importance: 4 },
  { id: 'cn-pisces-revati', name: 'Revati', distanceLy: 305, category: 'zodiac', sub: 'Pisces', importance: 4 },
  { id: 'cn-pisces-delta', name: 'Delta Piscium', distanceLy: 305, category: 'zodiac', sub: 'Pisces', importance: 4 },
  { id: 'cn-pisces-van-maanen', name: "Van Maanen's Star", distanceLy: 14.1, category: 'zodiac', sub: 'Pisces', importance: 4, note: 'The nearest solitary white dwarf, tucked among the fish stars but twenty times closer' },

  // ============================================================
  // NON-ZODIAC CONSTELLATIONS
  // ============================================================

  // ----- ORION (the belt stars are at wildly different distances) -----
  { id: 'cn-orion-betelgeuse', name: 'Betelgeuse', distanceLy: 548, category: 'zodiac', sub: 'Orion', importance: 2, note: 'The red shoulder of Orion, a dying supergiant that will one day explode as a supernova' },
  { id: 'cn-orion-rigel', name: 'Rigel', distanceLy: 860, category: 'zodiac', sub: 'Orion', importance: 2, note: 'The blue-white foot of Orion, a supergiant shining like 100,000 Suns' },
  { id: 'cn-orion-bellatrix', name: 'Bellatrix', distanceLy: 250, category: 'zodiac', sub: 'Orion', importance: 3, note: 'The amazon star, over twice as close as Rigel yet drawn as its neighbour' },
  { id: 'cn-orion-alnitak', name: 'Alnitak', distanceLy: 1260, category: 'zodiac', sub: 'Orion', importance: 3, note: 'The eastern belt star, more than twice as far as the belt appears uniform' },
  { id: 'cn-orion-alnilam', name: 'Alnilam', distanceLy: 2000, category: 'zodiac', sub: 'Orion', importance: 3, note: 'The middle belt star, and by far the most distant of the three despite looking evenly spaced' },
  { id: 'cn-orion-mintaka', name: 'Mintaka', distanceLy: 1200, category: 'zodiac', sub: 'Orion', importance: 3, note: 'The western belt star, roughly 800 light-years nearer than Alnilam beside it' },
  { id: 'cn-orion-saiph', name: 'Saiph', distanceLy: 650, category: 'zodiac', sub: 'Orion', importance: 3 },
  { id: 'cn-orion-meissa', name: 'Meissa', distanceLy: 1100, category: 'zodiac', sub: 'Orion', importance: 4, note: "The star marking Orion's head, a hot giant lighting the surrounding nebula" },
  { id: 'cn-orion-hatysa', name: 'Hatysa', distanceLy: 1980, category: 'zodiac', sub: 'Orion', importance: 4, note: "The bright star in Orion's sword, sitting near the great nebula" },

  // ----- URSA MAJOR (the Plough) -----
  { id: 'cn-uma-dubhe', name: 'Dubhe', distanceLy: 123, category: 'zodiac', sub: 'Ursa Major', importance: 3, note: 'A pointer star of the Plough, an orange giant far in front of the rest of the pattern' },
  { id: 'cn-uma-merak', name: 'Merak', distanceLy: 79, category: 'zodiac', sub: 'Ursa Major', importance: 3, note: 'The other pointer, part of a moving group of stars drifting together through space' },
  { id: 'cn-uma-phecda', name: 'Phecda', distanceLy: 84, category: 'zodiac', sub: 'Ursa Major', importance: 4 },
  { id: 'cn-uma-megrez', name: 'Megrez', distanceLy: 58, category: 'zodiac', sub: 'Ursa Major', importance: 4 },
  { id: 'cn-uma-alioth', name: 'Alioth', distanceLy: 81, category: 'zodiac', sub: 'Ursa Major', importance: 3, note: 'The brightest star of the Plough, at the base of the handle' },
  { id: 'cn-uma-mizar', name: 'Mizar', distanceLy: 83, category: 'zodiac', sub: 'Ursa Major', importance: 3, note: 'A famous double, with faint Alcor beside it, the classic eye test of the night sky' },
  { id: 'cn-uma-alkaid', name: 'Alkaid', distanceLy: 104, category: 'zodiac', sub: 'Ursa Major', importance: 3, note: 'The tip of the handle, a hot blue star not part of the moving group the others belong to' },
  { id: 'cn-uma-alcor', name: 'Alcor', distanceLy: 82, category: 'zodiac', sub: 'Ursa Major', importance: 4 },

  // ----- URSA MINOR (the Little Dipper) -----
  { id: 'cn-umi-polaris', name: 'Polaris', distanceLy: 433, category: 'zodiac', sub: 'Ursa Minor', importance: 2, note: 'The north star, sitting nearly over the pole while its dipper mates lie far nearer' },
  { id: 'cn-umi-kochab', name: 'Kochab', distanceLy: 131, category: 'zodiac', sub: 'Ursa Minor', importance: 3, note: 'An orange giant that guarded the pole three thousand years ago, a third of Polaris distance' },
  { id: 'cn-umi-pherkad', name: 'Pherkad', distanceLy: 487, category: 'zodiac', sub: 'Ursa Minor', importance: 4 },
  { id: 'cn-umi-yildun', name: 'Yildun', distanceLy: 172, category: 'zodiac', sub: 'Ursa Minor', importance: 4 },

  // ----- CASSIOPEIA (the W) -----
  { id: 'cn-cas-schedar', name: 'Schedar', distanceLy: 228, category: 'zodiac', sub: 'Cassiopeia', importance: 3, note: 'The queen bright orange giant, anchoring one end of the celestial W' },
  { id: 'cn-cas-caph', name: 'Caph', distanceLy: 54, category: 'zodiac', sub: 'Cassiopeia', importance: 3, note: 'The nearest bright star of the W, four times closer than Schedar beside it' },
  { id: 'cn-cas-gamma', name: 'Navi', distanceLy: 550, category: 'zodiac', sub: 'Cassiopeia', importance: 3, note: 'A wildly variable star at the centre of the W, nicknamed by an Apollo astronaut' },
  { id: 'cn-cas-ruchbah', name: 'Ruchbah', distanceLy: 99, category: 'zodiac', sub: 'Cassiopeia', importance: 4 },
  { id: 'cn-cas-segin', name: 'Segin', distanceLy: 410, category: 'zodiac', sub: 'Cassiopeia', importance: 4 },

  // ----- CYGNUS (the Northern Cross) -----
  { id: 'cn-cyg-deneb', name: 'Deneb', distanceLy: 2600, category: 'zodiac', sub: 'Cygnus', importance: 2, note: 'The swan tail, one of the most luminous stars known, dwarfing its nearby cross-mates' },
  { id: 'cn-cyg-sadr', name: 'Sadr', distanceLy: 1800, category: 'zodiac', sub: 'Cygnus', importance: 3, note: 'The heart of the swan, a supergiant wrapped in glowing hydrogen clouds' },
  { id: 'cn-cyg-albireo', name: 'Albireo', distanceLy: 430, category: 'zodiac', sub: 'Cygnus', importance: 3, note: 'The beak of the swan, a gorgeous gold-and-blue double star in binoculars' },
  { id: 'cn-cyg-gienah', name: 'Gienah Cygni', distanceLy: 72, category: 'zodiac', sub: 'Cygnus', importance: 3, note: 'A swan wing star only 72 light-years off, while Deneb at the tail is 36 times more distant' },
  { id: 'cn-cyg-delta', name: 'Fawaris', distanceLy: 165, category: 'zodiac', sub: 'Cygnus', importance: 4 },
  { id: 'cn-cyg-61', name: 'Aljanah', distanceLy: 72, category: 'zodiac', sub: 'Cygnus', importance: 4 },

  // ----- CRUX (the Southern Cross) -----
  { id: 'cn-crux-acrux', name: 'Acrux', distanceLy: 320, category: 'zodiac', sub: 'Crux', importance: 3, note: 'The brightest of the Southern Cross, a hot blue pair at the foot' },
  { id: 'cn-crux-mimosa', name: 'Mimosa', distanceLy: 280, category: 'zodiac', sub: 'Crux', importance: 3, note: 'The second brightest of the cross, a blue giant that pulsates subtly' },
  { id: 'cn-crux-gacrux', name: 'Gacrux', distanceLy: 88, category: 'zodiac', sub: 'Crux', importance: 3, note: 'The top of the cross, a red giant nearly four times closer than Acrux below it' },
  { id: 'cn-crux-imai', name: 'Imai', distanceLy: 345, category: 'zodiac', sub: 'Crux', importance: 4 },
  { id: 'cn-crux-ginan', name: 'Ginan', distanceLy: 228, category: 'zodiac', sub: 'Crux', importance: 4 },

  // ----- LYRA -----
  { id: 'cn-lyra-vega', name: 'Vega', distanceLy: 25, category: 'zodiac', sub: 'Lyra', importance: 2, note: 'A brilliant nearby star, once and future pole star, standing 100 times closer than its harp-mates' },
  { id: 'cn-lyra-sheliak', name: 'Sheliak', distanceLy: 960, category: 'zodiac', sub: 'Lyra', importance: 4, note: 'An eclipsing binary spilling gas between two stars, far behind Vega in the same small pattern' },
  { id: 'cn-lyra-sulafat', name: 'Sulafat', distanceLy: 620, category: 'zodiac', sub: 'Lyra', importance: 4 },
  { id: 'cn-lyra-delta2', name: 'Delta2 Lyrae', distanceLy: 740, category: 'zodiac', sub: 'Lyra', importance: 4 },

  // ----- AQUILA -----
  { id: 'cn-aql-altair', name: 'Altair', distanceLy: 16.7, category: 'zodiac', sub: 'Aquila', importance: 2, note: 'One of our nearest bright stars, spinning so fast it is visibly flattened' },
  { id: 'cn-aql-tarazed', name: 'Tarazed', distanceLy: 395, category: 'zodiac', sub: 'Aquila', importance: 3, note: 'An orange giant beside Altair yet more than twenty times further away' },
  { id: 'cn-aql-alshain', name: 'Alshain', distanceLy: 44.7, category: 'zodiac', sub: 'Aquila', importance: 4 },
  { id: 'cn-aql-okab', name: 'Okab', distanceLy: 83, category: 'zodiac', sub: 'Aquila', importance: 4 },
  { id: 'cn-aql-eta', name: 'Bezek', distanceLy: 1400, category: 'zodiac', sub: 'Aquila', importance: 4, note: 'A pulsing supergiant marking the eagle, a benchmark for measuring cosmic distances' },

  // ----- CANIS MAJOR -----
  { id: 'cn-cma-sirius', name: 'Sirius', distanceLy: 8.6, category: 'zodiac', sub: 'Canis Major', importance: 2, note: 'The brightest star in our sky, close by while its dog-mates blaze from a thousand light-years' },
  { id: 'cn-cma-adhara', name: 'Adhara', distanceLy: 430, category: 'zodiac', sub: 'Canis Major', importance: 3, note: 'A brilliant far star that fifty times closer looks the same as nearby Sirius' },
  { id: 'cn-cma-wezen', name: 'Wezen', distanceLy: 1600, category: 'zodiac', sub: 'Canis Major', importance: 3, note: 'A yellow supergiant nearly 200 times further than Sirius in the same little dog' },
  { id: 'cn-cma-mirzam', name: 'Mirzam', distanceLy: 490, category: 'zodiac', sub: 'Canis Major', importance: 3 },
  { id: 'cn-cma-aludra', name: 'Aludra', distanceLy: 2000, category: 'zodiac', sub: 'Canis Major', importance: 4 },
  { id: 'cn-cma-furud', name: 'Furud', distanceLy: 362, category: 'zodiac', sub: 'Canis Major', importance: 4 },

  // ----- PERSEUS -----
  { id: 'cn-per-mirfak', name: 'Mirfak', distanceLy: 510, category: 'zodiac', sub: 'Perseus', importance: 3, note: 'The brightest of Perseus, a supergiant embedded in a loose cluster of stars' },
  { id: 'cn-per-algol', name: 'Algol', distanceLy: 90, category: 'zodiac', sub: 'Perseus', importance: 3, note: 'The demon star, which dims every few days as a companion eclipses it' },
  { id: 'cn-per-atik', name: 'Atik', distanceLy: 750, category: 'zodiac', sub: 'Perseus', importance: 4 },
  { id: 'cn-per-menkib', name: 'Menkib', distanceLy: 1200, category: 'zodiac', sub: 'Perseus', importance: 4 },
  { id: 'cn-per-gorgonea', name: 'Gorgonea Tertia', distanceLy: 325, category: 'zodiac', sub: 'Perseus', importance: 4 },

  // ----- ANDROMEDA -----
  { id: 'cn-and-alpheratz', name: 'Alpheratz', distanceLy: 97, category: 'zodiac', sub: 'Andromeda', importance: 3, note: 'The head of the chained princess, a star shared with the Great Square of Pegasus' },
  { id: 'cn-and-mirach', name: 'Mirach', distanceLy: 197, category: 'zodiac', sub: 'Andromeda', importance: 3, note: 'A red giant, and a handy signpost that points toward the Andromeda galaxy' },
  { id: 'cn-and-almach', name: 'Almach', distanceLy: 350, category: 'zodiac', sub: 'Andromeda', importance: 3, note: 'A beautiful gold-and-blue multiple star, more than three times further than Alpheratz' },
  { id: 'cn-and-adhil', name: 'Adhil', distanceLy: 195, category: 'zodiac', sub: 'Andromeda', importance: 4 },
  { id: 'cn-and-nembus', name: 'Nembus', distanceLy: 690, category: 'zodiac', sub: 'Andromeda', importance: 4 },

  // ----- CENTAURUS -----
  { id: 'cn-cen-rigil-kentaurus', name: 'Rigil Kentaurus', distanceLy: 4.37, category: 'zodiac', sub: 'Centaurus', importance: 2, note: 'The nearest bright star system to the Sun, the foot of the centaur, a stellar next-door neighbour' },
  { id: 'cn-cen-hadar', name: 'Hadar', distanceLy: 390, category: 'zodiac', sub: 'Centaurus', importance: 3, note: 'A blue giant nearly ninety times further than its famous pointer partner Rigil Kentaurus' },
  { id: 'cn-cen-menkent', name: 'Menkent', distanceLy: 61, category: 'zodiac', sub: 'Centaurus', importance: 3, note: 'An orange giant, the only naked-eye centaur star well north of the celestial equator' },
  { id: 'cn-cen-muhlifain', name: 'Muhlifain', distanceLy: 130, category: 'zodiac', sub: 'Centaurus', importance: 4 },
  { id: 'cn-cen-alnair-centauri', name: 'Ma Wei', distanceLy: 395, category: 'zodiac', sub: 'Centaurus', importance: 4 },

  // ----- BOOTES -----
  { id: 'cn-boo-arcturus', name: 'Arcturus', distanceLy: 37, category: 'zodiac', sub: 'Bootes', importance: 2, note: 'A close orange giant racing through the galaxy, the brightest star of the northern sky' },
  { id: 'cn-boo-izar', name: 'Izar', distanceLy: 236, category: 'zodiac', sub: 'Bootes', importance: 3, note: 'A stunning double of an orange giant and a blue companion, six times further than Arcturus' },
  { id: 'cn-boo-muphrid', name: 'Muphrid', distanceLy: 37, category: 'zodiac', sub: 'Bootes', importance: 4, note: 'A true near-neighbour of Arcturus, both about 37 light-years away' },
  { id: 'cn-boo-seginus', name: 'Seginus', distanceLy: 87, category: 'zodiac', sub: 'Bootes', importance: 4 },
  { id: 'cn-boo-nekkar', name: 'Nekkar', distanceLy: 225, category: 'zodiac', sub: 'Bootes', importance: 4 },

  // ----- PEGASUS -----
  { id: 'cn-peg-markab', name: 'Markab', distanceLy: 133, category: 'zodiac', sub: 'Pegasus', importance: 3, note: 'A corner of the Great Square, the saddle of the winged horse' },
  { id: 'cn-peg-scheat', name: 'Scheat', distanceLy: 196, category: 'zodiac', sub: 'Pegasus', importance: 3, note: 'A red giant corner of the Square, half again as far as Markab beside it' },
  { id: 'cn-peg-algenib', name: 'Algenib', distanceLy: 470, category: 'zodiac', sub: 'Pegasus', importance: 3, note: 'The most distant corner of the Great Square, a pulsating blue star' },
  { id: 'cn-peg-enif', name: 'Enif', distanceLy: 690, category: 'zodiac', sub: 'Pegasus', importance: 3, note: 'The nose of the horse, an orange supergiant far beyond the Square it anchors' },
  { id: 'cn-peg-51', name: '51 Pegasi', distanceLy: 50.6, category: 'zodiac', sub: 'Pegasus', importance: 4, note: 'The first Sun-like star found to host a planet, a discovery that won a Nobel Prize' },

  // ----- DRACO -----
  { id: 'cn-dra-eltanin', name: 'Eltanin', distanceLy: 154, category: 'zodiac', sub: 'Draco', importance: 3, note: 'The dragon head, the brightest star of Draco and a future northern beacon' },
  { id: 'cn-dra-rastaban', name: 'Rastaban', distanceLy: 380, category: 'zodiac', sub: 'Draco', importance: 4 },
  { id: 'cn-dra-thuban', name: 'Thuban', distanceLy: 303, category: 'zodiac', sub: 'Draco', importance: 3, note: 'The pole star of the ancient Egyptians who aligned the pyramids to it' },
  { id: 'cn-dra-altais', name: 'Altais', distanceLy: 97, category: 'zodiac', sub: 'Draco', importance: 4 },
  { id: 'cn-dra-edasich', name: 'Edasich', distanceLy: 101, category: 'zodiac', sub: 'Draco', importance: 4 },

  // ----- AURIGA -----
  { id: 'cn-aur-capella', name: 'Capella', distanceLy: 42.9, category: 'zodiac', sub: 'Auriga', importance: 2, note: 'A pair of golden giants close by, the sixth brightest star in the whole night sky' },
  { id: 'cn-aur-menkalinan', name: 'Menkalinan', distanceLy: 81, category: 'zodiac', sub: 'Auriga', importance: 3, note: 'The shoulder of the charioteer, an eclipsing triple star' },
  { id: 'cn-aur-mahasim', name: 'Mahasim', distanceLy: 173, category: 'zodiac', sub: 'Auriga', importance: 4 },
  { id: 'cn-aur-hassaleh', name: 'Hassaleh', distanceLy: 490, category: 'zodiac', sub: 'Auriga', importance: 4, note: 'An orange giant more than ten times further than Capella in the same pentagon' },
  { id: 'cn-aur-almaaz', name: 'Almaaz', distanceLy: 2000, category: 'zodiac', sub: 'Auriga', importance: 4, note: 'A mysterious supergiant eclipsed every 27 years by a vast dark disc of dust' },

  // ----- HERCULES -----
  { id: 'cn-her-kornephoros', name: 'Kornephoros', distanceLy: 139, category: 'zodiac', sub: 'Hercules', importance: 3, note: 'The brightest star of Hercules, a yellow giant marking the hero shoulder' },
  { id: 'cn-her-rasalgethi', name: 'Rasalgethi', distanceLy: 360, category: 'zodiac', sub: 'Hercules', importance: 3, note: 'The head of the kneeling hero, a huge red giant that varies in brightness' },
  { id: 'cn-her-sarin', name: 'Sarin', distanceLy: 75, category: 'zodiac', sub: 'Hercules', importance: 4 },
  { id: 'cn-her-marsic', name: 'Marsic', distanceLy: 360, category: 'zodiac', sub: 'Hercules', importance: 4 },
  { id: 'cn-her-maasym', name: 'Maasym', distanceLy: 700, category: 'zodiac', sub: 'Hercules', importance: 4 },

  // ----- CARINA -----
  { id: 'cn-car-canopus', name: 'Canopus', distanceLy: 310, category: 'zodiac', sub: 'Carina', importance: 2, note: 'The second brightest star in the sky, a distant supergiant used to steer spacecraft' },
  { id: 'cn-car-miaplacidus', name: 'Miaplacidus', distanceLy: 113, category: 'zodiac', sub: 'Carina', importance: 3, note: 'The second brightest of the keel, nearly three times closer than Canopus' },
  { id: 'cn-car-avior', name: 'Avior', distanceLy: 610, category: 'zodiac', sub: 'Carina', importance: 3 },
  { id: 'cn-car-aspidiske', name: 'Aspidiske', distanceLy: 690, category: 'zodiac', sub: 'Carina', importance: 4 },
  { id: 'cn-car-theta', name: 'Vathorz Prior', distanceLy: 470, category: 'zodiac', sub: 'Carina', importance: 4 },

  // ----- LEPUS (the hare, at Orion's feet) -----
  { id: 'cn-lep-arneb', name: 'Arneb', distanceLy: 2200, category: 'zodiac', sub: 'Lepus', importance: 3, note: 'A far yellow supergiant marking the hare, its light older than recorded history' },
  { id: 'cn-lep-nihal', name: 'Nihal', distanceLy: 159, category: 'zodiac', sub: 'Lepus', importance: 4, note: 'A yellow giant, more than ten times closer than Arneb in the same small figure' },
  { id: 'cn-lep-mu', name: 'Mu Leporis', distanceLy: 185, category: 'zodiac', sub: 'Lepus', importance: 4 },

  // ----- CORONA BOREALIS (the northern crown) -----
  { id: 'cn-crb-alphecca', name: 'Alphecca', distanceLy: 75, category: 'zodiac', sub: 'Corona Borealis', importance: 3, note: 'The jewel of the northern crown, an eclipsing star ringed by a debris disc' },
  { id: 'cn-crb-nusakan', name: 'Nusakan', distanceLy: 112, category: 'zodiac', sub: 'Corona Borealis', importance: 4 },
  { id: 'cn-crb-t', name: 'Blaze Star', distanceLy: 3000, category: 'zodiac', sub: 'Corona Borealis', importance: 4, note: 'A recurrent nova that flares to naked-eye brightness roughly every 80 years' },

  // ----- CANIS MINOR -----
  { id: 'cn-cmi-procyon', name: 'Procyon', distanceLy: 11.5, category: 'zodiac', sub: 'Canis Minor', importance: 2, note: 'One of the nearest bright stars, the lead of the little dog and a corner of the Winter Triangle' },
  { id: 'cn-cmi-gomeisa', name: 'Gomeisa', distanceLy: 160, category: 'zodiac', sub: 'Canis Minor', importance: 4, note: 'A blue star fourteen times further than Procyon in the same two-star dog' },

  // ----- CETUS (the sea monster) -----
  { id: 'cn-cet-diphda', name: 'Diphda', distanceLy: 96, category: 'zodiac', sub: 'Cetus', importance: 3, note: 'The tail of the sea monster, an orange giant and the brightest star of Cetus' },
  { id: 'cn-cet-menkar', name: 'Menkar', distanceLy: 249, category: 'zodiac', sub: 'Cetus', importance: 3, note: 'The jaw of the beast, a red giant nearing the end of its life' },
  { id: 'cn-cet-kaffaljidhma', name: 'Kaffaljidhma', distanceLy: 82, category: 'zodiac', sub: 'Cetus', importance: 4 },
  { id: 'cn-cet-baten-kaitos', name: 'Baten Kaitos', distanceLy: 235, category: 'zodiac', sub: 'Cetus', importance: 4 },

  // ----- ERIDANUS (the river) -----
  { id: 'cn-eri-achernar', name: 'Achernar', distanceLy: 139, category: 'zodiac', sub: 'Eridanus', importance: 2, note: 'The end of the river, a hot star spinning so fast its equator bulges dramatically' },
  { id: 'cn-eri-cursa', name: 'Cursa', distanceLy: 90, category: 'zodiac', sub: 'Eridanus', importance: 3, note: 'The source of the river near Rigel, closer than the river winds toward Achernar' },
  { id: 'cn-eri-zaurak', name: 'Zaurak', distanceLy: 220, category: 'zodiac', sub: 'Eridanus', importance: 4 },
  { id: 'cn-eri-acamar', name: 'Acamar', distanceLy: 165, category: 'zodiac', sub: 'Eridanus', importance: 4 },
  { id: 'cn-eri-40', name: '40 Eridani', distanceLy: 16.3, category: 'zodiac', sub: 'Eridanus', importance: 4, note: 'A triple system with a white dwarf, a near neighbour lost among the river stars' },

  // ----- OPHIUCHUS (the serpent bearer) -----
  { id: 'cn-oph-rasalhague', name: 'Rasalhague', distanceLy: 48.6, category: 'zodiac', sub: 'Ophiuchus', importance: 3, note: 'The head of the serpent bearer, a swiftly spinning white star nearby' },
  { id: 'cn-oph-sabik', name: 'Sabik', distanceLy: 88, category: 'zodiac', sub: 'Ophiuchus', importance: 3 },
  { id: 'cn-oph-yed-prior', name: 'Yed Prior', distanceLy: 171, category: 'zodiac', sub: 'Ophiuchus', importance: 4 },
  { id: 'cn-oph-cebalrai', name: 'Cebalrai', distanceLy: 81, category: 'zodiac', sub: 'Ophiuchus', importance: 4 },
  { id: 'cn-oph-barnard', name: "Barnard's Star", distanceLy: 5.96, category: 'zodiac', sub: 'Ophiuchus', importance: 4, note: 'The fastest-moving star in our sky, a red dwarf almost on our doorstep among the serpent bearer stars' },

  // ----- GRUS (the crane) -----
  { id: 'cn-gru-alnair', name: 'Alnair', distanceLy: 101, category: 'zodiac', sub: 'Grus', importance: 3, note: 'The bright wing of the crane, a hot blue-white star of the southern sky' },
  { id: 'cn-gru-tiaki', name: 'Tiaki', distanceLy: 177, category: 'zodiac', sub: 'Grus', importance: 4 },
  { id: 'cn-gru-aldhanab', name: 'Aldhanab', distanceLy: 211, category: 'zodiac', sub: 'Grus', importance: 4 },
]
