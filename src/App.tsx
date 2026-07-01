import { useState } from 'react'
import Timeline from './Timeline'
import CosmosView from './CosmosView'
import { EVENTS as EVENTS_CORE } from './data/events'
import { PACK as HIST_EU } from './data/pack_history_europe'
import { PACK as HIST_WORLD } from './data/pack_history_world'
import { PACK as HIST_IDEAS } from './data/pack_history_ideas'
import { ErrorBoundary } from './ErrorBoundary'

const EVENTS = [...EVENTS_CORE, ...HIST_EU, ...HIST_WORLD, ...HIST_IDEAS]

export default function App() {
  const [lens, setLens] = useState<'history' | 'cosmos'>('cosmos')
  return (
    <ErrorBoundary>
      {lens === 'history' ? <Timeline events={EVENTS} /> : <CosmosView />}
      <div
        style={{
          position: 'absolute',
          top: 12,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 20,
          display: 'flex',
          gap: 6,
          background: 'var(--panel)',
          border: '1px solid var(--border)',
          borderRadius: 10,
          padding: 3,
        }}
      >
        <button className={`btn ${lens === 'cosmos' ? 'on' : ''}`} style={{ padding: '5px 12px' }} onClick={() => setLens('cosmos')}>
          Cosmos
        </button>
        <button className={`btn ${lens === 'history' ? 'on' : ''}`} style={{ padding: '5px 12px' }} onClick={() => setLens('history')}>
          History
        </button>
      </div>
    </ErrorBoundary>
  )
}
