// Northern and equatorial IAU constellations, each with its principal stars
// placed at their real published distances (light-years). Distances are
// individual per-star, so a single constellation's stars scatter across the
// log axis. category = 'zodiac' throughout so they share the constellation
// fan-line rendering. This pack excludes the 12 zodiac signs and the
// already-handled constellations (Orion, Ursa Major/Minor, Cassiopeia, Cygnus,
// Perseus, Andromeda, Lyra, Aquila, Canis Major, Bootes, Pegasus, Draco,
// Auriga, Hercules).
import type { CosmosObject } from './cosmos'

export const PACK: CosmosObject[] = [
  // ===== Cepheus =====
  { id: 'ca-cep-alderamin', name: 'Alderamin', distanceLy: 49, category: 'zodiac', sub: 'Cepheus', importance: 3 },
  { id: 'ca-cep-alfirk', name: 'Alfirk', distanceLy: 690, category: 'zodiac', sub: 'Cepheus', importance: 4 },
  { id: 'ca-cep-errai', name: 'Errai', distanceLy: 45, category: 'zodiac', sub: 'Cepheus', importance: 4 },
  { id: 'ca-cep-garnet', name: 'Herschel’s Garnet Star', distanceLy: 3400, category: 'zodiac', sub: 'Cepheus', importance: 4, note: 'One of the largest known stars, a deep red hypergiant' },
  { id: 'ca-cep-zeta', name: 'Zeta Cephei', distanceLy: 730, category: 'zodiac', sub: 'Cepheus', importance: 4 },
  { id: 'ca-cep-eta', name: 'Eta Cephei', distanceLy: 47, category: 'zodiac', sub: 'Cepheus', importance: 4 },
  { id: 'ca-cep-delta', name: 'Delta Cephei', distanceLy: 887, category: 'zodiac', sub: 'Cepheus', importance: 4, note: 'The prototype Cepheid variable that let us measure cosmic distances' },

  // ===== Cetus =====
  { id: 'ca-cet-diphda', name: 'Diphda (Deneb Kaitos)', distanceLy: 96, category: 'zodiac', sub: 'Cetus', importance: 3 },
  { id: 'ca-cet-menkar', name: 'Menkar', distanceLy: 249, category: 'zodiac', sub: 'Cetus', importance: 3 },
  { id: 'ca-cet-mira', name: 'Mira', distanceLy: 300, category: 'zodiac', sub: 'Cetus', importance: 3, note: 'A pulsating red giant that fades and rebrightens over eleven months' },
  { id: 'ca-cet-tau', name: 'Tau Ceti', distanceLy: 11.9, category: 'zodiac', sub: 'Cetus', importance: 3, note: 'A near, Sun-like star with a known planetary system' },
  { id: 'ca-cet-baten', name: 'Baten Kaitos', distanceLy: 235, category: 'zodiac', sub: 'Cetus', importance: 4 },
  { id: 'ca-cet-kaffaljidhma', name: 'Kaffaljidhma', distanceLy: 82, category: 'zodiac', sub: 'Cetus', importance: 4 },
  { id: 'ca-cet-deneb-algenubi', name: 'Deneb Algenubi', distanceLy: 116, category: 'zodiac', sub: 'Cetus', importance: 4 },
  { id: 'ca-cet-menkib', name: 'Iota Ceti', distanceLy: 290, category: 'zodiac', sub: 'Cetus', importance: 4 },
  { id: 'ca-cet-theta', name: 'Theta Ceti', distanceLy: 114, category: 'zodiac', sub: 'Cetus', importance: 4 },
  { id: 'ca-cet-upsilon', name: 'Upsilon Ceti', distanceLy: 300, category: 'zodiac', sub: 'Cetus', importance: 4 },

  // ===== Camelopardalis =====
  { id: 'ca-cam-beta', name: 'Beta Camelopardalis', distanceLy: 870, category: 'zodiac', sub: 'Camelopardalis', importance: 4 },
  { id: 'ca-cam-cs', name: 'CS Camelopardalis', distanceLy: 3000, category: 'zodiac', sub: 'Camelopardalis', importance: 4 },
  { id: 'ca-cam-alpha', name: 'Alpha Camelopardalis', distanceLy: 6000, category: 'zodiac', sub: 'Camelopardalis', importance: 4, note: 'A blue supergiant thousands of light-years away' },
  { id: 'ca-cam-gamma', name: 'Gamma Camelopardalis', distanceLy: 310, category: 'zodiac', sub: 'Camelopardalis', importance: 4 },
  { id: 'ca-cam-vz', name: 'VZ Camelopardalis', distanceLy: 470, category: 'zodiac', sub: 'Camelopardalis', importance: 4 },

  // ===== Canes Venatici =====
  { id: 'ca-cvn-cor-caroli', name: 'Cor Caroli', distanceLy: 115, category: 'zodiac', sub: 'Canes Venatici', importance: 3 },
  { id: 'ca-cvn-chara', name: 'Chara', distanceLy: 27, category: 'zodiac', sub: 'Canes Venatici', importance: 4 },
  { id: 'ca-cvn-la-superba', name: 'La Superba', distanceLy: 710, category: 'zodiac', sub: 'Canes Venatici', importance: 4, note: 'A deep-red carbon star, one of the reddest stars visible' },
  { id: 'ca-cvn-amcvn', name: 'AM Canum Venaticorum', distanceLy: 970, category: 'zodiac', sub: 'Canes Venatici', importance: 4 },
  { id: 'ca-cvn-y', name: 'Y Canum Venaticorum', distanceLy: 710, category: 'zodiac', sub: 'Canes Venatici', importance: 4 },

  // ===== Canis Minor =====
  { id: 'ca-cmi-procyon', name: 'Procyon', distanceLy: 11.5, category: 'zodiac', sub: 'Canis Minor', importance: 2, note: 'The eighth-brightest star in the sky and one of our nearest neighbours' },
  { id: 'ca-cmi-gomeisa', name: 'Gomeisa', distanceLy: 160, category: 'zodiac', sub: 'Canis Minor', importance: 4 },

  // ===== Coma Berenices =====
  { id: 'ca-com-diadem', name: 'Diadem', distanceLy: 58, category: 'zodiac', sub: 'Coma Berenices', importance: 4 },
  { id: 'ca-com-beta', name: 'Beta Comae Berenices', distanceLy: 30, category: 'zodiac', sub: 'Coma Berenices', importance: 4 },
  { id: 'ca-com-gamma', name: 'Gamma Comae Berenices', distanceLy: 170, category: 'zodiac', sub: 'Coma Berenices', importance: 4 },
  { id: 'ca-com-fk', name: 'FK Comae Berenices', distanceLy: 800, category: 'zodiac', sub: 'Coma Berenices', importance: 4 },

  // ===== Corona Borealis =====
  { id: 'ca-crb-alphecca', name: 'Alphecca', distanceLy: 75, category: 'zodiac', sub: 'Corona Borealis', importance: 3, note: 'The jewel of the northern crown' },
  { id: 'ca-crb-nusakan', name: 'Nusakan', distanceLy: 112, category: 'zodiac', sub: 'Corona Borealis', importance: 4 },
  { id: 'ca-crb-gamma', name: 'Gamma Coronae Borealis', distanceLy: 145, category: 'zodiac', sub: 'Corona Borealis', importance: 4 },
  { id: 'ca-crb-r', name: 'R Coronae Borealis', distanceLy: 4300, category: 'zodiac', sub: 'Corona Borealis', importance: 4, note: 'A rare star that abruptly dims when it puffs out carbon soot' },
  { id: 'ca-crb-t', name: 'T Coronae Borealis', distanceLy: 3000, category: 'zodiac', sub: 'Corona Borealis', importance: 4, note: 'The Blaze Star, a recurrent nova due to flare again' },
  { id: 'ca-crb-delta', name: 'Delta Coronae Borealis', distanceLy: 165, category: 'zodiac', sub: 'Corona Borealis', importance: 4 },

  // ===== Corvus =====
  { id: 'ca-crv-gienah', name: 'Gienah', distanceLy: 154, category: 'zodiac', sub: 'Corvus', importance: 3 },
  { id: 'ca-crv-kraz', name: 'Kraz', distanceLy: 146, category: 'zodiac', sub: 'Corvus', importance: 4 },
  { id: 'ca-crv-algorab', name: 'Algorab', distanceLy: 87, category: 'zodiac', sub: 'Corvus', importance: 4 },
  { id: 'ca-crv-minkar', name: 'Minkar', distanceLy: 318, category: 'zodiac', sub: 'Corvus', importance: 4 },
  { id: 'ca-crv-alchiba', name: 'Alchiba', distanceLy: 49, category: 'zodiac', sub: 'Corvus', importance: 4 },

  // ===== Crater =====
  { id: 'ca-crt-labrum', name: 'Labrum', distanceLy: 174, category: 'zodiac', sub: 'Crater', importance: 4 },
  { id: 'ca-crt-alkes', name: 'Alkes', distanceLy: 159, category: 'zodiac', sub: 'Crater', importance: 4 },
  { id: 'ca-crt-gamma', name: 'Gamma Crateris', distanceLy: 86, category: 'zodiac', sub: 'Crater', importance: 4 },
  { id: 'ca-crt-beta', name: 'Beta Crateris', distanceLy: 296, category: 'zodiac', sub: 'Crater', importance: 4 },

  // ===== Delphinus =====
  { id: 'ca-del-sualocin', name: 'Sualocin', distanceLy: 254, category: 'zodiac', sub: 'Delphinus', importance: 4 },
  { id: 'ca-del-rotanev', name: 'Rotanev', distanceLy: 97, category: 'zodiac', sub: 'Delphinus', importance: 4 },
  { id: 'ca-del-gamma', name: 'Gamma Delphini', distanceLy: 114, category: 'zodiac', sub: 'Delphinus', importance: 4 },
  { id: 'ca-del-epsilon', name: 'Deneb Dulfim', distanceLy: 330, category: 'zodiac', sub: 'Delphinus', importance: 4 },
  { id: 'ca-del-delta', name: 'Delta Delphini', distanceLy: 203, category: 'zodiac', sub: 'Delphinus', importance: 4 },

  // ===== Equuleus =====
  { id: 'ca-equ-kitalpha', name: 'Kitalpha', distanceLy: 190, category: 'zodiac', sub: 'Equuleus', importance: 4 },
  { id: 'ca-equ-delta', name: 'Delta Equulei', distanceLy: 60, category: 'zodiac', sub: 'Equuleus', importance: 4 },
  { id: 'ca-equ-gamma', name: 'Gamma Equulei', distanceLy: 118, category: 'zodiac', sub: 'Equuleus', importance: 4 },

  // ===== Eridanus =====
  { id: 'ca-eri-achernar', name: 'Achernar', distanceLy: 139, category: 'zodiac', sub: 'Eridanus', importance: 2, note: 'A rapidly spinning star flattened at its poles, the ninth-brightest in the sky' },
  { id: 'ca-eri-cursa', name: 'Cursa', distanceLy: 90, category: 'zodiac', sub: 'Eridanus', importance: 3 },
  { id: 'ca-eri-zaurak', name: 'Zaurak', distanceLy: 220, category: 'zodiac', sub: 'Eridanus', importance: 4 },
  { id: 'ca-eri-acamar', name: 'Acamar', distanceLy: 164, category: 'zodiac', sub: 'Eridanus', importance: 4 },
  { id: 'ca-eri-rana', name: 'Rana', distanceLy: 29, category: 'zodiac', sub: 'Eridanus', importance: 4 },
  { id: 'ca-eri-azha', name: 'Azha', distanceLy: 135, category: 'zodiac', sub: 'Eridanus', importance: 4 },
  { id: 'ca-eri-epsilon', name: 'Epsilon Eridani', distanceLy: 10.5, category: 'zodiac', sub: 'Eridanus', importance: 3, note: 'A nearby young star with a debris disc and a known planet' },
  { id: 'ca-eri-40', name: '40 Eridani', distanceLy: 16.3, category: 'zodiac', sub: 'Eridanus', importance: 4, note: 'A triple system with a white dwarf, a nearby stellar corpse' },
  { id: 'ca-eri-beid', name: 'Beid', distanceLy: 145, category: 'zodiac', sub: 'Eridanus', importance: 4 },
  { id: 'ca-eri-sceptrum', name: 'Sceptrum', distanceLy: 89, category: 'zodiac', sub: 'Eridanus', importance: 4 },
  { id: 'ca-eri-theemin', name: 'Theemin', distanceLy: 180, category: 'zodiac', sub: 'Eridanus', importance: 4 },

  // ===== Hydra =====
  { id: 'ca-hya-alphard', name: 'Alphard', distanceLy: 177, category: 'zodiac', sub: 'Hydra', importance: 2, note: 'The solitary one, the lone bright heart of the water snake' },
  { id: 'ca-hya-gamma', name: 'Gamma Hydrae', distanceLy: 134, category: 'zodiac', sub: 'Hydra', importance: 4 },
  { id: 'ca-hya-zeta', name: 'Zeta Hydrae', distanceLy: 167, category: 'zodiac', sub: 'Hydra', importance: 4 },
  { id: 'ca-hya-nu', name: 'Nu Hydrae', distanceLy: 138, category: 'zodiac', sub: 'Hydra', importance: 4 },
  { id: 'ca-hya-pi', name: 'Pi Hydrae', distanceLy: 101, category: 'zodiac', sub: 'Hydra', importance: 4 },
  { id: 'ca-hya-epsilon', name: 'Epsilon Hydrae', distanceLy: 129, category: 'zodiac', sub: 'Hydra', importance: 4 },
  { id: 'ca-hya-r', name: 'R Hydrae', distanceLy: 710, category: 'zodiac', sub: 'Hydra', importance: 4, note: 'A long-period red giant variable' },
  { id: 'ca-hya-sigma', name: 'Sigma Hydrae', distanceLy: 355, category: 'zodiac', sub: 'Hydra', importance: 4 },
  { id: 'ca-hya-lambda', name: 'Lambda Hydrae', distanceLy: 115, category: 'zodiac', sub: 'Hydra', importance: 4 },
  { id: 'ca-hya-mu', name: 'Mu Hydrae', distanceLy: 249, category: 'zodiac', sub: 'Hydra', importance: 4 },
  { id: 'ca-hya-xi', name: 'Xi Hydrae', distanceLy: 130, category: 'zodiac', sub: 'Hydra', importance: 4 },

  // ===== Lacerta =====
  { id: 'ca-lac-alpha', name: 'Alpha Lacertae', distanceLy: 102, category: 'zodiac', sub: 'Lacerta', importance: 4 },
  { id: 'ca-lac-beta', name: 'Beta Lacertae', distanceLy: 170, category: 'zodiac', sub: 'Lacerta', importance: 4 },
  { id: 'ca-lac-1', name: '1 Lacertae', distanceLy: 620, category: 'zodiac', sub: 'Lacerta', importance: 4 },

  // ===== Leo Minor =====
  { id: 'ca-lmi-praecipua', name: 'Praecipua', distanceLy: 98, category: 'zodiac', sub: 'Leo Minor', importance: 4 },
  { id: 'ca-lmi-beta', name: 'Beta Leonis Minoris', distanceLy: 154, category: 'zodiac', sub: 'Leo Minor', importance: 4 },
  { id: 'ca-lmi-21', name: '21 Leonis Minoris', distanceLy: 98, category: 'zodiac', sub: 'Leo Minor', importance: 4 },
  { id: 'ca-lmi-10', name: '10 Leonis Minoris', distanceLy: 191, category: 'zodiac', sub: 'Leo Minor', importance: 4 },

  // ===== Lepus =====
  { id: 'ca-lep-arneb', name: 'Arneb', distanceLy: 2200, category: 'zodiac', sub: 'Lepus', importance: 3, note: 'A distant supergiant hare beneath Orion’s feet' },
  { id: 'ca-lep-nihal', name: 'Nihal', distanceLy: 160, category: 'zodiac', sub: 'Lepus', importance: 4 },
  { id: 'ca-lep-gamma', name: 'Gamma Leporis', distanceLy: 29, category: 'zodiac', sub: 'Lepus', importance: 4 },
  { id: 'ca-lep-epsilon', name: 'Epsilon Leporis', distanceLy: 209, category: 'zodiac', sub: 'Lepus', importance: 4 },
  { id: 'ca-lep-mu', name: 'Mu Leporis', distanceLy: 184, category: 'zodiac', sub: 'Lepus', importance: 4 },
  { id: 'ca-lep-r', name: 'Hind’s Crimson Star', distanceLy: 1300, category: 'zodiac', sub: 'Lepus', importance: 4, note: 'A deep-red carbon star that glows like a drop of blood' },

  // ===== Lynx =====
  { id: 'ca-lyn-alpha', name: 'Alpha Lyncis', distanceLy: 203, category: 'zodiac', sub: 'Lynx', importance: 4 },
  { id: 'ca-lyn-38', name: '38 Lyncis', distanceLy: 122, category: 'zodiac', sub: 'Lynx', importance: 4 },
  { id: 'ca-lyn-31', name: '31 Lyncis (Alsciaukat)', distanceLy: 380, category: 'zodiac', sub: 'Lynx', importance: 4 },
  { id: 'ca-lyn-2', name: '2 Lyncis', distanceLy: 148, category: 'zodiac', sub: 'Lynx', importance: 4 },
  { id: 'ca-lyn-10', name: '10 Ursae Majoris (in Lynx)', distanceLy: 52, category: 'zodiac', sub: 'Lynx', importance: 4 },

  // ===== Monoceros =====
  { id: 'ca-mon-beta', name: 'Beta Monocerotis', distanceLy: 690, category: 'zodiac', sub: 'Monoceros', importance: 4, note: 'A striking triple system of hot blue stars' },
  { id: 'ca-mon-alpha', name: 'Alpha Monocerotis', distanceLy: 148, category: 'zodiac', sub: 'Monoceros', importance: 4 },
  { id: 'ca-mon-gamma', name: 'Gamma Monocerotis', distanceLy: 500, category: 'zodiac', sub: 'Monoceros', importance: 4 },
  { id: 'ca-mon-delta', name: 'Delta Monocerotis', distanceLy: 384, category: 'zodiac', sub: 'Monoceros', importance: 4 },
  { id: 'ca-mon-plaskett', name: 'Plaskett’s Star', distanceLy: 5200, category: 'zodiac', sub: 'Monoceros', importance: 4, note: 'One of the most massive binary systems known' },
  { id: 'ca-mon-epsilon', name: 'Epsilon Monocerotis', distanceLy: 128, category: 'zodiac', sub: 'Monoceros', importance: 4 },
  { id: 'ca-mon-zeta', name: 'Zeta Monocerotis', distanceLy: 1850, category: 'zodiac', sub: 'Monoceros', importance: 4 },

  // ===== Ophiuchus =====
  { id: 'ca-oph-rasalhague', name: 'Rasalhague', distanceLy: 48, category: 'zodiac', sub: 'Ophiuchus', importance: 2, note: 'The head of the serpent-bearer' },
  { id: 'ca-oph-sabik', name: 'Sabik', distanceLy: 88, category: 'zodiac', sub: 'Ophiuchus', importance: 3 },
  { id: 'ca-oph-zeta', name: 'Zeta Ophiuchi', distanceLy: 366, category: 'zodiac', sub: 'Ophiuchus', importance: 4, note: 'A runaway star ploughing a bow shock through interstellar gas' },
  { id: 'ca-oph-yed-prior', name: 'Yed Prior', distanceLy: 171, category: 'zodiac', sub: 'Ophiuchus', importance: 4 },
  { id: 'ca-oph-cebalrai', name: 'Cebalrai', distanceLy: 82, category: 'zodiac', sub: 'Ophiuchus', importance: 4 },
  { id: 'ca-oph-barnards', name: 'Barnard’s Star', distanceLy: 5.96, category: 'zodiac', sub: 'Ophiuchus', importance: 3, note: 'A red dwarf with the fastest known motion across our sky' },
  { id: 'ca-oph-yed-posterior', name: 'Yed Posterior', distanceLy: 170, category: 'zodiac', sub: 'Ophiuchus', importance: 4 },
  { id: 'ca-oph-han', name: 'Han', distanceLy: 458, category: 'zodiac', sub: 'Ophiuchus', importance: 4 },
  { id: 'ca-oph-marfik', name: 'Marfik', distanceLy: 108, category: 'zodiac', sub: 'Ophiuchus', importance: 4 },
  { id: 'ca-oph-70', name: '70 Ophiuchi', distanceLy: 16.6, category: 'zodiac', sub: 'Ophiuchus', importance: 4, note: 'A nearby binary of two orange dwarf stars' },

  // ===== Sagitta =====
  { id: 'ca-sge-gamma', name: 'Gamma Sagittae', distanceLy: 258, category: 'zodiac', sub: 'Sagitta', importance: 4 },
  { id: 'ca-sge-delta', name: 'Delta Sagittae', distanceLy: 550, category: 'zodiac', sub: 'Sagitta', importance: 4 },
  { id: 'ca-sge-alpha', name: 'Sham', distanceLy: 620, category: 'zodiac', sub: 'Sagitta', importance: 4 },
  { id: 'ca-sge-beta', name: 'Beta Sagittae', distanceLy: 420, category: 'zodiac', sub: 'Sagitta', importance: 4 },

  // ===== Serpens =====
  { id: 'ca-ser-unukalhai', name: 'Unukalhai', distanceLy: 74, category: 'zodiac', sub: 'Serpens', importance: 3, note: 'The heart of the serpent' },
  { id: 'ca-ser-beta', name: 'Beta Serpentis', distanceLy: 155, category: 'zodiac', sub: 'Serpens', importance: 4 },
  { id: 'ca-ser-mu', name: 'Mu Serpentis', distanceLy: 156, category: 'zodiac', sub: 'Serpens', importance: 4 },
  { id: 'ca-ser-eta', name: 'Eta Serpentis', distanceLy: 60, category: 'zodiac', sub: 'Serpens', importance: 4 },
  { id: 'ca-ser-xi', name: 'Xi Serpentis', distanceLy: 105, category: 'zodiac', sub: 'Serpens', importance: 4 },
  { id: 'ca-ser-theta', name: 'Alya', distanceLy: 132, category: 'zodiac', sub: 'Serpens', importance: 4 },
  { id: 'ca-ser-nu', name: 'Nu Serpentis', distanceLy: 195, category: 'zodiac', sub: 'Serpens', importance: 4 },
  { id: 'ca-ser-omicron', name: 'Omicron Serpentis', distanceLy: 166, category: 'zodiac', sub: 'Serpens', importance: 4 },

  // ===== Sextans =====
  { id: 'ca-sex-alpha', name: 'Alpha Sextantis', distanceLy: 280, category: 'zodiac', sub: 'Sextans', importance: 4 },
  { id: 'ca-sex-gamma', name: 'Gamma Sextantis', distanceLy: 262, category: 'zodiac', sub: 'Sextans', importance: 4 },
  { id: 'ca-sex-beta', name: 'Beta Sextantis', distanceLy: 345, category: 'zodiac', sub: 'Sextans', importance: 4 },

  // ===== Triangulum =====
  { id: 'ca-tri-beta', name: 'Beta Trianguli', distanceLy: 127, category: 'zodiac', sub: 'Triangulum', importance: 4 },
  { id: 'ca-tri-mothallah', name: 'Mothallah', distanceLy: 63, category: 'zodiac', sub: 'Triangulum', importance: 4 },
  { id: 'ca-tri-gamma', name: 'Gamma Trianguli', distanceLy: 112, category: 'zodiac', sub: 'Triangulum', importance: 4 },
  { id: 'ca-tri-delta', name: 'Delta Trianguli', distanceLy: 35, category: 'zodiac', sub: 'Triangulum', importance: 4 },

  // ===== Vulpecula =====
  { id: 'ca-vul-anser', name: 'Anser', distanceLy: 292, category: 'zodiac', sub: 'Vulpecula', importance: 4, note: 'The brightest star in the little fox' },
  { id: 'ca-vul-23', name: '23 Vulpeculae', distanceLy: 330, category: 'zodiac', sub: 'Vulpecula', importance: 4 },
  { id: 'ca-vul-13', name: '13 Vulpeculae', distanceLy: 350, category: 'zodiac', sub: 'Vulpecula', importance: 4 },
  { id: 'ca-vul-1', name: '1 Vulpeculae', distanceLy: 810, category: 'zodiac', sub: 'Vulpecula', importance: 4 },

  // ===== Scutum =====
  { id: 'ca-sct-alpha', name: 'Alpha Scuti', distanceLy: 199, category: 'zodiac', sub: 'Scutum', importance: 4 },
  { id: 'ca-sct-beta', name: 'Beta Scuti', distanceLy: 900, category: 'zodiac', sub: 'Scutum', importance: 4 },
  { id: 'ca-sct-uy', name: 'UY Scuti', distanceLy: 5100, category: 'zodiac', sub: 'Scutum', importance: 4, note: 'One of the largest known stars, a red supergiant' },

  // ===== Antlia =====
  { id: 'ca-ant-alpha', name: 'Alpha Antliae', distanceLy: 366, category: 'zodiac', sub: 'Antlia', importance: 4 },
  { id: 'ca-ant-epsilon', name: 'Epsilon Antliae', distanceLy: 700, category: 'zodiac', sub: 'Antlia', importance: 4 },
  { id: 'ca-ant-iota', name: 'Iota Antliae', distanceLy: 202, category: 'zodiac', sub: 'Antlia', importance: 4 },

  // ===== Pyxis =====
  { id: 'ca-pyx-alpha', name: 'Alpha Pyxidis', distanceLy: 880, category: 'zodiac', sub: 'Pyxis', importance: 4 },
  { id: 'ca-pyx-beta', name: 'Beta Pyxidis', distanceLy: 388, category: 'zodiac', sub: 'Pyxis', importance: 4 },
  { id: 'ca-pyx-gamma', name: 'Gamma Pyxidis', distanceLy: 209, category: 'zodiac', sub: 'Pyxis', importance: 4 },
]
