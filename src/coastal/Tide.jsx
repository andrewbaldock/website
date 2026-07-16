import { arcFrac, arcPoint, isDayHour } from './timeOfDay'

// Persistent shoreline fixed to the viewport bottom. Wave motion is CSS
// (byte-for-byte the approved keyframes). Whichever body is up casts a
// reflection on the water at its x-position: a warm gold glint by day (sun),
// a cool silver one by night (moon).

// One wave = a cubic per 480-unit period. Built wide (6 periods from off-screen
// left to well past the right edge) so that a drift of exactly one period
// (-480) loops seamlessly with the strip always covered — no pop at the seam.
function waveTop(x0, count, base, amp) {
  let d = `M${x0},${base}`
  for (let i = 0; i < count; i++) {
    const x = x0 + i * 480
    d += ` C${x + 180},${base - amp} ${x + 300},${base + amp} ${x + 480},${base}`
  }
  return d
}
const waveA = waveTop(-480, 6, 110, 30) // ends at 2400
const waveB = waveTop(-420, 6, 130, 28) // ends at 2460, phase-offset from A

export default function Tide({ hour, sweeping }) {
  const day = isDayHour(hour)
  const bx = Math.max(90, Math.min(1350, Math.round(arcPoint(arcFrac(hour))[0])))
  const refl = day ? '#eec765' : '#c7d6f2' // sun-gold vs moon-silver
  const core = day ? 0.4 : 0.5

  return (
    <div className={`tide${sweeping ? ' is-sweeping' : ''}`} role="img" aria-label="A shoreline where the tide meets the sand at the foot of the page">
      <svg viewBox="0 0 1440 200" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <linearGradient id="water" x1="0" y1="0" x2="0" y2="1">
            <stop className="g0" offset="0%" /><stop className="g1" offset="45%" /><stop className="g2" offset="100%" />
          </linearGradient>
          <linearGradient id="sand" x1="0" y1="0" x2="0" y2="1">
            <stop className="g0" offset="0%" /><stop className="g1" offset="55%" /><stop className="g2" offset="100%" />
          </linearGradient>
          <radialGradient id="reflbeam" cx="50%" cy="42%" r="62%">
            <stop offset="0%" stopColor={refl} stopOpacity={core} />
            <stop offset="40%" stopColor={refl} stopOpacity={core * 0.7} />
            <stop offset="100%" stopColor={refl} stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect x="0" y="0" width="1440" height="200" fill="url(#sand)" opacity="0.5" />
        {/* The glint comes and goes with the body that casts it (see .tide-refl).
            It fades on this wrapper rather than the ellipse, because the shimmer
            animates the ellipse's own opacity and a running animation outranks
            any opacity we'd set on it. */}
        <g className="tide-refl">
          <ellipse id="reflection" cx={bx} cy="150" rx="66" ry="60" fill="url(#reflbeam)" />
        </g>
        <g className="tide-water">
          <g className="tide-layer-a">
            <path opacity="0.45" d={waveA + ' L2400,220 L-480,220 Z'} />
          </g>
          <g className="tide-layer-b">
            <path fill="url(#water)" opacity="0.62" d={waveB + ' L2460,220 L-420,220 Z'} />
          </g>
          <g className="tide-foam">
            <path fill="none" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" d={waveB} />
          </g>
        </g>
      </svg>
    </div>
  )
}
