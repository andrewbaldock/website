import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { DAY_STOP, NIGHT_STOP, clockHour, isDayHour, normHour, phaseFor, stopFor } from './timeOfDay'

// The whole-page day↔night engine. Sets `data-tod` on <html> (which the CSS
// tokens key off) while a coastal page is mounted, and removes it on unmount.
//
// The dial has three modes:
//   • 'stops'  — the default. It rests on 3:30pm or 3:30am, whichever matches
//     the sun outside, and sweeps the 12 hours between them at the real local
//     sunrise/sunset. The clock picks the stop; it doesn't set the look.
//   • 'live'   — the hidden panel's "track local time": the sky drifts with the
//     actual hour, so a real 7pm shows a real sunset.
//   • 'manual' — a hand-picked hour, from the panel's slider or a toggle click.
//
// 'live' and 'manual' are overrides, and they expire: the next real sunrise or
// sunset takes the wheel back and sweeps to the matching stop. The mode and the
// manual hour persist, so a choice survives a reload (until that next reset).
//
// Two hours in play: `target`, where the dial wants to be, and `hour` — the
// *applied* hour driving the sky/tide, which tweens toward it. That tween is
// the sweep.

const HOUR_KEY = 'ab-tod-hour'
const MODE_KEY = 'ab-tod-mode'

// How long the full 12-hour swing takes. Shorter moves scale down pro rata, so
// nudging the slider stays glued to the finger instead of easing in over a beat.
// Derived, not two hand-tuned numbers: a per-hour rate that didn't divide out to
// SWEEP_MS would leave the cap doing the work and quietly ignore this value.
const SWEEP_MS = 1600
const MS_PER_HOUR = SWEEP_MS / 12

function initMode() {
  if (typeof localStorage === 'undefined') return 'stops'
  const m = localStorage.getItem(MODE_KEY)
  return m === 'live' || m === 'manual' ? m : 'stops'
}
function initHour() {
  if (typeof localStorage === 'undefined') return stopFor(clockHour())
  const v = Number(localStorage.getItem(HOUR_KEY))
  return Number.isFinite(v) ? normHour(v) : stopFor(clockHour())
}

export function useTimeOfDay() {
  const [mode, setMode] = useState(initMode)
  const [manual, setManual] = useState(initHour)
  const [live, setLive] = useState(clockHour)
  const [sweeping, setSweeping] = useState(false)

  const target = mode === 'stops' ? stopFor(live) : mode === 'live' ? live : manual
  const [applied, setApplied] = useState(target)

  const targetRef = useRef(target); targetRef.current = target
  const appliedRef = useRef(applied); appliedRef.current = applied
  const modeRef = useRef(mode); modeRef.current = mode
  const rafRef = useRef(0)
  // Set when a move is a stop-to-stop swing, which has to run forward round the
  // clock — the sun sets forward into night, it never rewinds. Slider and live
  // moves leave it clear so nudging an hour earlier doesn't spin 23 the other
  // way.
  const sweepRef = useRef(false)

  // set data-tod before paint to avoid a flash of the default palette. The
  // removal MUST live in this same layout effect (not a passive one): on an SPA
  // route swap React runs the unmounting page's passive cleanups *after* the
  // mounting page's layout effects, so a passive removeAttribute would wipe the
  // data-tod the next page just set — leaving the page de-themed (dark ink on
  // the global dark body). Co-located here, the unmount's layout cleanup runs
  // before the next mount's layout setup, so data-tod is always set.
  useLayoutEffect(() => {
    document.documentElement.setAttribute('data-tod', phaseFor(applied))
    return () => document.documentElement.removeAttribute('data-tod')
  }, [applied])

  useEffect(() => () => cancelAnimationFrame(rafRef.current), [])

  // Gentle live tick. In 'live' this drifts the sky; otherwise its only job is
  // to let us notice the sun rise or set.
  useEffect(() => {
    const id = setInterval(() => setLive(clockHour()), 30000)
    return () => clearInterval(id)
  }, [])

  // Real local sunrise/sunset: the reset. Any override expires here and the sky
  // sweeps to whichever stop matches the sky outside.
  const wasDay = useRef(isDayHour(live))
  useEffect(() => {
    const day = isDayHour(live)
    if (day === wasDay.current) return
    wasDay.current = day
    sweepRef.current = true
    setMode('stops')
    try { localStorage.setItem(MODE_KEY, 'stops') } catch { /* private mode */ }
  }, [live])

  // Tween the applied hour to the target. Duration scales with the distance, so
  // the 12-hour sweep gets its full SWEEP_MS and small moves stay immediate.
  useEffect(() => {
    const from = appliedRef.current
    let delta = target - from
    if (sweepRef.current || modeRef.current === 'stops') delta = normHour(delta)
    sweepRef.current = false
    if (Math.abs(delta) < 0.001) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setApplied(normHour(target))
      return
    }

    const dur = Math.min(SWEEP_MS, Math.abs(delta) * MS_PER_HOUR)
    const t0 = performance.now()
    const step = (now) => {
      const p = Math.min(1, (now - t0) / dur)
      const e = p < 0.5 ? 2 * p * p : 1 - ((-2 * p + 2) ** 2) / 2 // easeInOutQuad
      setApplied(normHour(from + delta * e))
      if (p < 1) { rafRef.current = requestAnimationFrame(step); return }
      rafRef.current = 0
      setSweeping(false)
    }
    setSweeping(true)
    cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(step)
    return () => cancelAnimationFrame(rafRef.current)
  }, [target])

  const freeze = (h) => {
    setManual(h)
    setMode('manual')
    try {
      localStorage.setItem(HOUR_KEY, String(h))
      localStorage.setItem(MODE_KEY, 'manual')
    } catch { /* private mode */ }
  }

  // The toggle: swing to the other stop, the long way round the clock. Holds
  // there until the next sunrise/sunset resets it.
  const toggleTod = useCallback(() => {
    sweepRef.current = true
    freeze(isDayHour(targetRef.current) ? NIGHT_STOP : DAY_STOP)
  }, [])

  // Slider moved → freeze on that hour.
  const setHour = useCallback((h) => { freeze(h) }, [])

  // Checkbox → drift with the real clock (or freeze at the shown hour when
  // cleared), exactly as it always has.
  const trackLocal = useCallback((on) => {
    if (on) {
      setMode('live')
      try { localStorage.setItem(MODE_KEY, 'live') } catch { /* private mode */ }
    } else {
      freeze(targetRef.current)
    }
  }, [])

  return { hour: applied, target, track: mode === 'live', sweeping, setHour, trackLocal, toggleTod }
}
