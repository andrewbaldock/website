// Occasional life in the sky: line seagulls (flapping) that glide across the
// top now and then, a jet that cruises past once in a while, and a small
// line-cloud drifting by. Strokes are --accent and thin (bridge-fine); each
// element fades in only during its pass so the sky is usually still.

// A seagull "m": two shallow wings. Centered at 0,0; s = scale.
function gull(s = 1) {
  const w = 13 * s, h = 7 * s
  return `M${-2 * w} 0 c ${w * 0.5} ${-h} ${w * 1.5} ${-h} ${2 * w} 0`
    + ` c ${w * 0.5} ${-h} ${w * 1.5} ${-h} ${2 * w} 0`
}

// A small rounded line-cloud outline (open-bottom puff row).
const PUFF = 'M0 22 C2 8 20 6 24 16 C28 2 50 4 52 18 C64 16 66 30 54 32 L6 32 C-4 32 -4 24 0 22 Z'

// A filled top-view airliner silhouette pointing right (nose at +x).
const PLANE = 'M46 0 C42 -2 38 -2.5 30 -2.6 L22 -2.6 L6 -15 L1 -15 L14 -2.8 L2 -2.8 '
  + 'L-3 -8 L-7 -8 L-4 -1.4 L-8 0 L-4 1.4 L-7 8 L-3 8 L2 2.8 L14 2.8 L1 15 L6 15 '
  + 'L22 2.6 L30 2.6 C38 2.5 42 2 46 0 Z'

export default function SkyLife() {
  return (
    <div className="skylife" aria-hidden="true">
      <svg viewBox="0 0 1440 300" preserveAspectRatio="xMidYMin slice" xmlns="http://www.w3.org/2000/svg">
        {/* Contrail gradient: opaque at the jet, fading fast toward the old end. */}
        <defs>
          <linearGradient id="contrail" gradientUnits="userSpaceOnUse" x1="5" y1="0" x2="120" y2="0">
            <stop offset="0" stopColor="var(--accent)" stopOpacity="0.5" />
            <stop offset="0.28" stopColor="var(--accent)" stopOpacity="0.13" />
            <stop offset="1" stopColor="var(--accent)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <g className="drift-cloud dc1"><path d={PUFF} /></g>
        <g className="drift-cloud dc2"><path d={PUFF} /></g>
        <g className="gull g1"><g className="wings"><path d={gull(0.7)} /></g></g>
        <g className="gull g2"><g className="wings"><path d={gull(0.55)} /></g></g>
        {/* The jet rides the front; the contrail is a short fixed-length wisp
            trailing just behind its tail, so it stays glued to the plane and
            leaves the scene with it. */}
        <g className="plane">
          <g className="flyer">
            <line className="trail" x1="5" y1="0" x2="120" y2="0" stroke="url(#contrail)" />
            <g className="jet"><path className="body" d={PLANE} /></g>
          </g>
        </g>
        <circle className="sat s1" r="2.4" />
      </svg>
    </div>
  )
}
