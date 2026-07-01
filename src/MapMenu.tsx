import { useState } from 'react'

export type Lens = 'cosmos' | 'history'

const MAPS: { id: Lens; name: string; sub: string }[] = [
  { id: 'cosmos', name: 'Cosmos', sub: 'the scale of the universe' },
  { id: 'history', name: 'History', sub: 'a tube map of recorded history' },
]

export default function MapMenu({ lens, setLens }: { lens: Lens; setLens: (l: Lens) => void }) {
  const [open, setOpen] = useState(false)
  const cur = MAPS.find((m) => m.id === lens) ?? MAPS[0]
  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        style={{ background: 'transparent', border: 0, padding: 0, textAlign: 'left', cursor: 'pointer', display: 'flex', flexDirection: 'column', lineHeight: 1.15 }}
      >
        <b style={{ fontSize: 17, fontWeight: 500, color: 'var(--text)' }}>
          Chronoline · {cur.name} <span style={{ opacity: 0.5 }}>▾</span>
        </b>
        <span style={{ fontSize: 11, color: 'var(--muted)' }}>{cur.sub}</span>
      </button>
      {open && (
        <>
          <div onClick={() => setOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 29 }} />
          <div style={{ position: 'absolute', top: '118%', left: 0, zIndex: 30, minWidth: 230, background: 'var(--panel)', border: '1px solid var(--border)', borderRadius: 10, padding: 4, boxShadow: '0 8px 28px rgba(0,0,0,0.45)' }}>
            {MAPS.map((m) => (
              <button key={m.id} className="menuitem" onClick={() => { setLens(m.id); setOpen(false) }}>
                <span style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <span style={{ fontWeight: 500 }}>{m.name}</span>
                  <span style={{ fontSize: 11, color: 'var(--muted)' }}>{m.sub}</span>
                </span>
                <span style={{ color: 'var(--accent)' }}>{m.id === lens ? '✓' : ''}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
