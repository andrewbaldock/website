import { useEffect, useState } from 'react'

// ponytail: dev-only tuning rig for the hero engraving + callouts, behind ?dev.
// Bridge knobs write INLINE styles onto .bridge, which outrank every stylesheet
// rule (including the data-tod overrides); wash knobs set custom props on :root
// that .cap already reads. Either way coastal.less needs no knowledge of this.
// Read the numbers off the panel's footer and paste them into the real files.
const MASK_SVG = '/images/bay-bridge.svg'

// These mirror the real defaults so the panel opens on the actual design rather
// than jolting it. THICK needs no twin — it self-syncs from the SVG below.
const DARK_DEFAULT = 0.43 // .bridge opacity, coastal.less:246
const WASH_DEFAULT = 55 // --wash fallback, .paper-wash() in coastal.less
const TINT_DEFAULT = 0 // --wash-tint fallback, .paper-wash() in coastal.less

// The tint spectrum: every stop is an existing token, so no stop can introduce
// a colour the page doesn't already own. Ordered cool → warm so dragging reads
// as a temperature sweep rather than a random palette.
const TINTS = [
  { name: 'paper', css: 'var(--bg)' }, //         no tint — the wash is just paper
  { name: 'sand', css: 'var(--sand-wet)' }, //    barely a tint; paper, a shade deeper
  { name: 'aqua', css: 'var(--aqua)' }, //        the bay water the bridge already crosses
  { name: 'mint', css: 'var(--mint)' }, //        the accent family — your original mock
  { name: 'peri', css: 'var(--periwinkle)' }, //  the dusk/sky note, cools toward night
  { name: 'gold', css: 'var(--gold)' }, //        warm counterweight; ties to sun + coin
]

// Both amount sliders are clamped to bands that stay defensible rather than to
// the full legal range — every stop should be worth shipping. WASH under ~55
// stops carrying text over the engraving, which is the only reason the wash
// exists. TINT past ~15 stops reading as tinted paper and becomes a coloured
// card, dragging a new surface onto a page built from hairlines and paper.
// Widen these if you want to see past the guardrails.
const BAND = { wash: [55, 100], tint: [0, 15] }

export default function BridgeDevPanel() {
  const [dark, setDark] = useState(DARK_DEFAULT)
  const [thick, setThick] = useState(null)
  const [wash, setWash] = useState(WASH_DEFAULT)
  const [tint, setTint] = useState(TINT_DEFAULT)
  const [hue, setHue] = useState(0)
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

  // .paper-wash() reads all three, so setting them on :root drives every washed
  // element at once — the hero paragraph and all three callouts.
  useEffect(() => {
    const root = document.documentElement.style
    root.setProperty('--wash', `${wash}%`)
    root.setProperty('--wash-tint', `${tint}%`)
    root.setProperty('--wash-tint-color', TINTS[hue].css)
  }, [wash, tint, hue])

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

  const row = { display: 'grid', gridTemplateColumns: '3.4rem 1fr 3.4rem', alignItems: 'center', gap: '0.5rem' }
  const val = { textAlign: 'right' }

  return (
    <div
      style={{
        position: 'fixed', bottom: '1rem', right: '1rem', zIndex: 9999,
        background: 'rgba(20,30,34,0.92)', color: '#e8f4f2', padding: '0.85rem 1rem',
        borderRadius: '10px', font: '12px/1.5 ui-monospace, monospace',
        boxShadow: '0 6px 24px rgba(0,0,0,0.3)',
        // fixed, not minWidth: the footer's longest line changes with every HUE
        // step, and an auto-sized box re-measures on each one — the panel jerks
        // around under the cursor you're dragging with.
        width: '21rem', boxSizing: 'border-box',
        backdropFilter: 'blur(6px)',
      }}
    >
      <div style={{ opacity: 0.55, marginBottom: '0.6rem', letterSpacing: '0.08em' }}>HERO ?dev</div>

      <div style={row}>
        <label htmlFor="dev-dark">DARK</label>
        <input
          id="dev-dark" type="range" min="0" max="1" step="0.01"
          value={dark} onChange={(e) => setDark(+e.target.value)}
        />
        <span style={val}>{dark.toFixed(2)}</span>
      </div>

      <div style={row}>
        <label htmlFor="dev-thick">THICK</label>
        <input
          id="dev-thick" type="range" min="0" max="80" step="1"
          value={thick ?? 0} onChange={(e) => setThick(+e.target.value)}
          disabled={thick == null}
        />
        <span style={val}>{thick ?? '…'}</span>
      </div>

      <div style={{ ...row, marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '1px solid rgba(232,244,242,0.15)' }}>
        <label htmlFor="dev-wash">WASH</label>
        <input
          id="dev-wash" type="range" min={BAND.wash[0]} max={BAND.wash[1]} step="1"
          value={wash} onChange={(e) => setWash(+e.target.value)}
        />
        <span style={val}>{wash}%</span>
      </div>

      <div style={row}>
        <label htmlFor="dev-hue">HUE</label>
        <input
          id="dev-hue" type="range" min="0" max={TINTS.length - 1} step="1"
          value={hue} onChange={(e) => setHue(+e.target.value)}
        />
        <span style={val}>{TINTS[hue].name}</span>
      </div>

      <div style={row}>
        <label htmlFor="dev-tint">TINT</label>
        <input
          id="dev-tint" type="range" min={BAND.tint[0]} max={BAND.tint[1]} step="1"
          value={tint} onChange={(e) => setTint(+e.target.value)}
          disabled={hue === 0}
        />
        <span style={val}>{hue === 0 ? '—' : `${tint}%`}</span>
      </div>

      {/* one line each, always rendered, never wrapping — so no value change
          can alter the panel's height either. */}
      <div style={{
        opacity: 0.5, marginTop: '0.7rem', fontSize: '11px', lineHeight: 1.45,
        whiteSpace: 'pre', overflow: 'hidden',
      }}>
        <div>coastal.less:246 → opacity:{dark.toFixed(2)}</div>
        <div>bay-bridge.svg:11 → stroke-width="{thick ?? '…'}"</div>
        <div>.paper-wash() → --wash,{wash}%</div>
        <div>{' '.repeat(15)}--wash-tint,{hue === 0 ? '0%' : `${tint}% of ${TINTS[hue].name}`}</div>
      </div>
    </div>
  )
}
