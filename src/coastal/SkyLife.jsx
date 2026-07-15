// Occasional life in the sky: line seagulls (flapping) that glide across the
// top now and then, a jet that cruises past once in a while, and a small
// line-cloud drifting by. Strokes are --accent and thin (bridge-fine); each
// element fades in only during its pass so the sky is usually still.
//
// A tiny scheduler plays these passes ONE AT A TIME (rarely two) — see the
// useEffect below. Each pass is a one-shot CSS animation that runs only while
// its element carries the `play` class; the scheduler adds/removes it.

import { useEffect, useRef } from 'react'

// selector → how long that element's one-shot pass runs (must match coastal.less)
const PASSES = [
  { sel: '.g1', ms: 19000 },
  { sel: '.g2', ms: 22000 },
  { sel: '.dc1', ms: 42000 },
  { sel: '.dc2', ms: 50000 },
  { sel: '.plane', ms: 30000 },
  { sel: '.s1', ms: 44000 },
]
const rand = (a, b) => a + Math.random() * (b - a)

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
  const rootRef = useRef(null)

  // One pass at a time, rarely two. Self-scheduling setTimeout loop: play a
  // random pass, occasionally overlap a second, rest, repeat.
  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const timers = new Set()
    const after = (ms, fn) => { const t = setTimeout(() => { timers.delete(t); fn() }, ms); timers.add(t) }
    let last = -1

    const play = (p) => {
      const el = root.querySelector(p.sel)
      if (!el) return
      el.classList.add('play')
      after(p.ms, () => el.classList.remove('play'))
    }

    const tick = () => {
      let i = Math.floor(Math.random() * PASSES.length)
      if (i === last) i = (i + 1) % PASSES.length   // no immediate repeat
      last = i
      const primary = PASSES[i]
      play(primary)

      let endMs = primary.ms
      if (Math.random() < 0.15) {                    // rarely, a second overlaps
        let j = Math.floor(Math.random() * PASSES.length)
        if (j === i) j = (j + 1) % PASSES.length
        const delay = rand(2000, primary.ms * 0.4)
        after(delay, () => play(PASSES[j]))
        endMs = Math.max(endMs, delay + PASSES[j].ms)
      }

      after(endMs + rand(7000, 18000), tick)         // rest, then next pass
    }

    after(rand(1500, 4000), tick)

    return () => {
      timers.forEach(clearTimeout)
      root.querySelectorAll('.play').forEach((el) => el.classList.remove('play'))
    }
  }, [])

  return (
    <div className="skylife" aria-hidden="true" ref={rootRef}>
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
