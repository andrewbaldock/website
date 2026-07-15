import { useId } from 'react'
import { arcFrac, arcPoint, isDarkPhase, isDayHour } from './timeOfDay'

// fractional star positions (0..1 of the 1440×300 sky band), engraved cross-marks
const STAR_POS = [
  [0.14, 0.16], [0.24, 0.30], [0.33, 0.14], [0.46, 0.24], [0.62, 0.13],
  [0.72, 0.28], [0.82, 0.18], [0.90, 0.32], [0.55, 0.34], [0.08, 0.36],
]

// Tarot-style sun rays: 16 alternating a long straight spoke with a wavy flame.
function sunRays(cx, cy) {
  const N = 16
  let d = ''
  for (let i = 0; i < N; i++) {
    const a = (i / N) * Math.PI * 2
    const ux = Math.cos(a), uy = Math.sin(a), px = -uy, py = ux
    const P = (r, o) => `${(cx + ux * r + px * o).toFixed(1)} ${(cy + uy * r + py * o).toFixed(1)}`
    d += i % 2 === 0
      ? `M${P(15, 0)} L${P(27, 0)} `                       // long straight spoke
      : `M${P(14, 0)} C${P(18, 2.5)} ${P(22, -2.5)} ${P(25, 0)} ` // wavy flame
  }
  return d
}

export default function Sky({ hour, sweeping }) {
  const maskId = 'moon-' + useId().replace(/:/g, '')
  const day = isDayHour(hour)
  const night = isDarkPhase(hour)
  const [bxF, byF] = arcPoint(arcFrac(hour))
  const bx = Math.round(bxF), by = Math.round(byF)

  return (
    <div className={`sky${sweeping ? ' is-sweeping' : ''}`} aria-hidden="true">
      <svg viewBox="0 0 1440 460" preserveAspectRatio="xMidYMin slice" xmlns="http://www.w3.org/2000/svg">
        <g style={{ display: night ? '' : 'none' }}>
          {STAR_POS.map((p, k) => {
            const x = Math.round(p[0] * 1440), y = Math.round(p[1] * 300), r = k % 2 ? 3.4 : 2.2
            return (
              <g className="star" key={k}>
                <path className="stroke" d={`M${x} ${y - r} V${y + r} M${x - r} ${y} H${x + r}`} />
              </g>
            )
          })}
        </g>
        {day ? (
          <g id="sun-g" opacity="0.95">
            <path d={sunRays(bx, by)} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx={bx} cy={by} r="10.5" fill="currentColor" />
          </g>
        ) : (
          <g id="moon-g" opacity="0.95">
            <defs>
              <mask id={maskId}>
                <circle cx={bx} cy={by} r="21" fill="#fff" />
                <circle cx={bx + 16} cy={by - 11} r="21" fill="#000" />
              </mask>
            </defs>
            <circle cx={bx} cy={by} r="21" fill="currentColor" mask={`url(#${maskId})`} />
          </g>
        )}
      </svg>
    </div>
  )
}
