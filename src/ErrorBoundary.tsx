import { Component, type ReactNode } from 'react'

export class ErrorBoundary extends Component<{ children: ReactNode }, { err: Error | null }> {
  state = { err: null as Error | null }
  static getDerivedStateFromError(err: Error) {
    return { err }
  }
  render() {
    if (this.state.err) {
      return (
        <pre style={{ color: '#ff9a9a', padding: 24, whiteSpace: 'pre-wrap', fontSize: 13, fontFamily: 'ui-monospace, monospace' }}>
          {this.state.err.message + '\n\n' + (this.state.err.stack || '')}
        </pre>
      )
    }
    return this.props.children
  }
}
