import { useEffect, useRef, useState } from 'react'
import { arcFrac, arcPoint, isDayHour } from './timeOfDay'
import { lotusPetals } from './tideLife'

// Persistent shoreline fixed to the viewport bottom. Wave motion is CSS
// (byte-for-byte the approved keyframes). Whichever body is up casts a
// reflection on the water at its x-position: a warm gold glint by day (sun),
// a cool silver one by night (moon).
//
// A lotus blossom drifts across now and then — never two at once unless it's a
// rare overlap, and never in a hurry. The strip is position:fixed, so unlike
// the sky it never scrolls away; it's in the corner of the eye on every screen
// of the page, forever. That's why the passes are minutes long and the rests
// between them are generous. Restraint matters more here than in the sky.

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

const rand = (a, b) => a + Math.random() * (b - a)

// Three blossoms, each its own size, shade (see coastal.less) and pace. r is in
// viewBox units — with the ~2.5:1 vertical squash the big one lands around
// 48 × 19px on screen, and the small one reads as further out. Seed heads are
// derived from r, not hardcoded.
//
// ms must match the animation duration in coastal.less. The y band is in
// viewBox units: the surface wave oscillates around 130, so these keep each
// blossom riding it rather than beached on the sand or lost in deep water.
const PASSES = [
  { sel: '.l1', r: 24, ms: 300000, y: [126, 144] },
  { sel: '.l2', r: 16, ms: 360000, y: [134, 152] },
  { sel: '.l3', r: 20, ms: 330000, y: [128, 148] },
]

// Must outlive the slowest ring: the third starts 1.1s late and runs 5s (see
// .ripple in coastal.less), so anything under 6.1s blinks it out mid-spread.
const RIPPLE_MS = 6400

export default function Tide({ hour, sweeping }) {
  const day = isDayHour(hour)
  const bx = Math.max(90, Math.min(1350, Math.round(arcPoint(arcFrac(hour))[0])))
  const refl = day ? '#eec765' : '#c7d6f2' // sun-gold vs moon-silver
  const core = day ? 0.4 : 0.5
  const rootRef = useRef(null)
  const svgRef = useRef(null)
  const idRef = useRef(0)
  const [ripples, setRipples] = useState([])

  // Touch a blossom and the water answers. The ripple is dropped as a sibling
  // at the blossom's *current* spot rather than parented to it — water stays
  // where it was disturbed while the blossom drifts on.
  //
  // Position comes from getBoundingClientRect, not getScreenCTM: CTM is defined
  // over SVG transform *attributes* and browsers disagree about whether a
  // running CSS animation counts, which would silently land every ripple at
  // 0,0. Rects always reflect what's actually on screen. preserveAspectRatio is
  // "none", so mapping the rect back into viewBox units is a plain linear scale
  // on each axis independently.
  const splash = (e) => {
    const svg = svgRef.current
    if (!svg || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const s = svg.getBoundingClientRect()
    const b = e.currentTarget.getBoundingClientRect()
    if (!s.width || !s.height) return
    const x = ((b.left + b.width / 2) - s.left) / s.width * 1440
    const y = ((b.top + b.height / 2) - s.top) / s.height * 200
    const id = ++idRef.current
    setRipples((rs) => [...rs, { id, x, y }])
    setTimeout(() => setRipples((rs) => rs.filter((r) => r.id !== id)), RIPPLE_MS)
  }

  // Self-scheduling setTimeout loop: drift one blossom across, rest, repeat.
  // Now and then the second one overlaps the first — "a blossom or two".
  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const timers = new Set()
    const after = (ms, fn) => { const t = setTimeout(() => { timers.delete(t); fn() }, ms); timers.add(t) }
    let last = -1

    // enter = seconds to skip into the pass. Negative starts it already underway
    // (used once, on load); every later pass drifts in from the edge. Must be
    // set BEFORE .play — animation-delay is read when the animation starts, not
    // while it runs. Returns how long this pass will actually be on screen.
    const play = (p, enter = 0) => {
      const el = root.querySelector(p.sel)
      if (!el) return 0
      // re-place it before each pass, so it never repeats the same line
      el.style.setProperty('--y', `${rand(p.y[0], p.y[1])}px`)
      el.style.setProperty('--enter', `${enter}s`)
      el.classList.add('play')
      const dur = p.ms + enter * 1000 // enter is negative, so this is shorter
      after(dur, () => el.classList.remove('play'))
      return dur
    }

    // Each blossom keeps its own loop rather than taking turns from one
    // scheduler — drift, rest, drift again, independently. "Up to three" then
    // falls out of them overlapping by chance instead of being choreographed,
    // and the water is never in lockstep.
    const cycle = (p, enter = 0) => {
      const dur = play(p, enter)
      after(dur + rand(90000, 420000), () => cycle(p))
    }

    // The first blossom is already on its way when the page loads — no empty
    // water to sit through. A negative enter drops it in mid-drift rather than
    // at the edge, so it reads as having been there all along rather than being
    // launched the moment you arrived.
    cycle(PASSES[0], -rand(30, 80))
    // the others join at no predictable moment behind it
    after(rand(15000, 120000), () => cycle(PASSES[1]))
    after(rand(60000, 300000), () => cycle(PASSES[2]))

    return () => {
      timers.forEach(clearTimeout)
      root.querySelectorAll('.play').forEach((el) => el.classList.remove('play'))
    }
  }, [])

  const blossom = ({ sel, r }) => (
    <g className={`lotus ${sel.slice(1)}`} key={sel} onMouseEnter={splash} onClick={splash}>
      <g className="bob">
        {/* Hit area. An ellipse, not a circle, and deliberately huge on y: the
            viewBox squashes ~2.5:1, so a circle of r here would render about
            9px tall — a cruel target for something that never stops moving.
            ry is pre-stretched to come out roughly square on screen. */}
        <ellipse className="hit" rx={r * 1.2} ry={r * 2.6} />
        {lotusPetals(r).map(({ key, rot, d }) => (
          <path key={key} d={d} transform={`rotate(${rot})`} />
        ))}
        <circle className="seed" r={r * 0.19} />
      </g>
    </g>
  )

  return (
    <div ref={rootRef} className={`tide${sweeping ? ' is-sweeping' : ''}`} role="img" aria-label="A shoreline where the tide meets the sand at the foot of the page">
      <svg ref={svgRef} viewBox="0 0 1440 200" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
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

        {/* Rings spread from wherever a blossom was touched. Drawn under the
            blossoms so they read as the water's response, not part of the
            flower. The viewBox squash turns them into ellipses on its own,
            which is what rings on a pond seen at an angle look like. */}
        {ripples.map(({ id, x, y }) => (
          <g className="ripple" key={id} style={{ transform: `translate(${x}px,${y}px)` }}>
            <circle r="5" /><circle r="5" /><circle r="5" />
          </g>
        ))}

        {/* The blossoms float ON the surface, so they're drawn last — and in the
            page's own engraved line language, outlines with a blush inside. */}
        {PASSES.map(blossom)}
      </svg>
    </div>
  )
}
