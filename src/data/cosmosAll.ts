import { COSMOS } from './cosmos'
import { PACK as P_BASE } from './pack_cosmos'
import { PACK as P_SOLAR } from './pack_cosmos_solar'
import { PACK as P_STARS } from './pack_cosmos_stars'
import { PACK as P_DEEP } from './pack_cosmos_deep'
import { PACK as P_CONST } from './pack_cosmos_constellations'
import { PACK as P_CONST_S } from './pack_cosmos_const_south'
import { PACK as P_CONST_N } from './pack_cosmos_const_north'
import type { CosmosObject } from './cosmos'

// Combine the base set with every expansion pack, then de-duplicate.
// Key: within a constellation (zodiac) lane, a star is unique by sub+name (so the
// same star listed by two packs collapses). A bright star may still appear both
// on the stars line AND inside its constellation - those are different lanes, so
// they are intentionally kept (different keys).
const RAW: CosmosObject[] = [
  ...COSMOS,
  ...P_BASE,
  ...P_SOLAR,
  ...P_STARS,
  ...P_DEEP,
  ...P_CONST,
  ...P_CONST_S,
  ...P_CONST_N,
]

const seen = new Set<string>()
export const COSMOS_ALL: CosmosObject[] = RAW.filter((o) => {
  const key = o.category === 'zodiac' ? `z:${o.sub ?? ''}:${o.name.toLowerCase().trim()}` : `${o.category}:${o.name.toLowerCase().trim()}`
  if (seen.has(key)) return false
  seen.add(key)
  return true
})
