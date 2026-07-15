import { useEffect, useState } from 'react'

// ponytail: dev-only tuning rig for the bridge engraving, mounted behind ?dev.
// Writes INLINE styles onto .bridge, which outrank every stylesheet rule
// (including the data-tod night overrides) — so nothing in coastal.less has to
// know this exists. Read the numbers off the panel, paste them into
// coastal.less (DARK) and public/images/bay-bridge.svg (THICK), delete nothing.
const MASK_SVG = '/images/bay-bridge.svg'

// Mirrors .bridge opacity in coastal.less:246 so the panel opens on the real
// design instead of jolting it. THICK needs no twin — it self-syncs below.
const DARK_DEFAULT = 0.43

export default function BridgeDevPanel() {
  const [dark, setDark] = useState(DARK_DEFAULT)
  const [thick, setThick] = useState(null)
  const [svgText, setSvgText] = useState(null)

  // the trace lives in a file, so THICK can't be a CSS knob — fetch it once,
  // then rewrite stroke-width into a blob URL on every change. The slider
  // starts at whatever the file actually says, so it can never drift.
  useEffect(() => {
    fetch(MASK_SVG).then((r) => r.text()).then((t) => {
      setSvgText(t)
      const m = t.match(/stroke-width="([\d.]+)"/)
      setThick(m ? +m[1] : 0)
    })
  }, [])

  useEffect(() => {
    const el = document.querySelector('.bridge')
    if (el) el.style.opacity = String(dark)
  }, [dark])

  useEffect(() => {
    if (!svgText || thick == null) return
    const el = document.querySelector('.bridge')
    if (!el) return
    const patched = svgText.replace(/stroke-width="[\d.]+"/, `stroke-width="${thick}"`)
    const url = URL.createObjectURL(new Blob([patched], { type: 'image/svg+xml' }))
    const mask = `url("${url}") right top / contain no-repeat`
    el.style.mask = mask
    el.style.webkitMask = mask
    // revoke on the next frame, not immediately: the mask image loads async and
    // yanking the URL out from under it mid-drag flashes the bridge away.
    return () => requestAnimationFrame(() => URL.revokeObjectURL(url))
  }, [svgText, thick])

  const row = { display: 'grid', gridTemplateColumns: '3.5rem 1fr 3rem', alignItems: 'center', gap: '0.5rem' }

  return (
    <div
      style={{
        position: 'fixed', bottom: '1rem', right: '1rem', zIndex: 9999,
        background: 'rgba(20,30,34,0.92)', color: '#e8f4f2', padding: '0.85rem 1rem',
        borderRadius: '10px', font: '12px/1.5 ui-monospace, monospace',
        boxShadow: '0 6px 24px rgba(0,0,0,0.3)', minWidth: '17rem',
        backdropFilter: 'blur(6px)',
      }}
    >
      <div style={{ opacity: 0.55, marginBottom: '0.6rem', letterSpacing: '0.08em' }}>BRIDGE ?dev</div>

      <div style={row}>
        <label htmlFor="dev-dark">DARK</label>
        <input
          id="dev-dark" type="range" min="0" max="1" step="0.01"
          value={dark} onChange={(e) => setDark(+e.target.value)}
        />
        <span style={{ textAlign: 'right' }}>{dark.toFixed(2)}</span>
      </div>

      <div style={row}>
        <label htmlFor="dev-thick">THICK</label>
        <input
          id="dev-thick" type="range" min="0" max="80" step="1"
          value={thick ?? 0} onChange={(e) => setThick(+e.target.value)}
          disabled={thick == null}
        />
        <span style={{ textAlign: 'right' }}>{thick ?? '…'}</span>
      </div>

      <div style={{ opacity: 0.5, marginTop: '0.7rem', fontSize: '11px', lineHeight: 1.45 }}>
        coastal.less:246 → opacity:{dark.toFixed(2)}
        <br />
        bay-bridge.svg:11 → stroke-width="{thick ?? '…'}"
      </div>
    </div>
  )
}
