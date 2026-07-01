import { useState } from 'react'
import Timeline from './Timeline'
import StrataMap from './StrataMap'
import { cosmosConfig } from './maps/cosmos'
import type { Lens } from './MapMenu'
import { EVENTS as EVENTS_CORE } from './data/events'
import { PACK as HIST_EU } from './data/pack_history_europe'
import { PACK as HIST_WORLD } from './data/pack_history_world'
import { PACK as HIST_IDEAS } from './data/pack_history_ideas'
import { ErrorBoundary } from './ErrorBoundary'

const EVENTS = [...EVENTS_CORE, ...HIST_EU, ...HIST_WORLD, ...HIST_IDEAS]

export default function App() {
  const [lens, setLens] = useState<Lens>('cosmos')
  return (
    <ErrorBoundary>
      {lens === 'history' ? <Timeline events={EVENTS} lens={lens} setLens={setLens} /> : <StrataMap config={cosmosConfig} lens={lens} setLens={setLens} />}
    </ErrorBoundary>
  )
}
