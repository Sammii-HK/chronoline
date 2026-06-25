import Timeline from './Timeline'
import { EVENTS } from './data/events'
import { ErrorBoundary } from './ErrorBoundary'

export default function App() {
  return (
    <ErrorBoundary>
      <Timeline events={EVENTS} />
    </ErrorBoundary>
  )
}
