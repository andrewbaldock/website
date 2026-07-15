import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { clockHour, phaseFor } from './timeOfDay'

// The whole-page day↔night engine. Sets `data-tod` on <html> (which the CSS
// tokens key off) while a coastal page is mounted, and removes it on unmount.
//
// Two hours in play:
//   • `target` — where the dial points right now (the slider thumb). Snaps
//     immediately, so dragging feels 1:1 under the finger.
//   • `hour`   — the *applied* hour that drives the sky/tide. It eases toward
//     `target` each frame, so a click across the slider visibly spins the day.
//
// `track` (default on) means the dial follows the local clock. Moving the
// slider drops out of tracking; the checkbox turns it back on. Both the manual
// hour and the tracking flag persist so the choice survives a reload.

const HOUR_KEY = 'ab-tod-hour'
const TRACK_KEY = 'ab-tod-track'

function initTrack() {
  if (typeof localStorage === 'undefined') return true
  return localStorage.getItem(TRACK_KEY) !== '0' // default: track local time
}
function initHour() {
  if (typeof localStorage === 'undefined') return clockHour()
  const v = Number(localStorage.getItem(HOUR_KEY))
  return Number.isFinite(v) ? v : clockHour()
}

export function useTimeOfDay() {
  const [track, setTrack] = useState(initTrack)
  const [manual, setManual] = useState(initHour)
  const [live, setLive] = useState(clockHour)

  const target = track ? live : manual
  const [applied, setApplied] = useState(target)

  const targetRef = useRef(target); targetRef.current = target
  const appliedRef = useRef(applied); appliedRef.current = applied
  const rafRef = useRef(0)

  // set data-tod before paint to avoid a flash of the default palette
  useLayoutEffect(() => {
    document.documentElement.setAttribute('data-tod', phaseFor(applied))
  }, [applied])

  useEffect(() => () => {
    document.documentElement.removeAttribute('data-tod')
    cancelAnimationFrame(rafRef.current)
  }, [])

  // gentle live tick so the sky stays honest while tracking
  useEffect(() => {
    const id = setInterval(() => setLive(clockHour()), 30000)
    return () => clearInterval(id)
  }, [])

  // spin the applied hour toward the target — exponential ease, restarts
  // whenever the target moves (a drag feeds it a stream of small targets).
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) { setApplied(targetRef.current); return }
    const step = () => {
      const d = targetRef.current - appliedRef.current
      if (Math.abs(d) < 0.02) { setApplied(targetRef.current); rafRef.current = 0; return }
      setApplied(appliedRef.current + d * 0.15)
      rafRef.current = requestAnimationFrame(step)
    }
    cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(step)
    return () => cancelAnimationFrame(rafRef.current)
  }, [target])

  // Slider moved → freeze on that hour and stop tracking.
  const setHour = useCallback((h) => {
    setManual(h)
    setTrack(false)
    try {
      localStorage.setItem(HOUR_KEY, String(h))
      localStorage.setItem(TRACK_KEY, '0')
    } catch { /* private mode */ }
  }, [])

  // Checkbox → back to local time (or freeze at the shown hour when cleared).
  const trackLocal = useCallback((on) => {
    if (on) {
      setTrack(true)
      try { localStorage.setItem(TRACK_KEY, '1') } catch { /* private mode */ }
    } else {
      const h = targetRef.current
      setManual(h)
      setTrack(false)
      try {
        localStorage.setItem(HOUR_KEY, String(h))
        localStorage.setItem(TRACK_KEY, '0')
      } catch { /* private mode */ }
    }
  }, [])

  return { hour: applied, target, track, setHour, trackLocal }
}
