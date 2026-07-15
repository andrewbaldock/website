import { useEffect, useRef, useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import { isDayHour } from './timeOfDay'

// The day/night complication. The face shows the current body (sun by day, moon
// by night) and a tap swings the sky the 12 hours to the other stop.
//
// The hour slider is still here, but it's a back room now: ctrl/⌘-click it, or
// long-press on touch. Both are deliberately obscure — the panel overrides the
// local sun, and that's a power-user move, not the button's job.
const LONG_PRESS_MS = 500
function label(h) {
  h = ((h % 24) + 24) % 24
  let hr = Math.floor(h)
  let m = Math.round((h - hr) * 60)
  if (m === 60) { m = 0; hr = (hr + 1) % 24 }
  const ampm = hr < 12 ? 'AM' : 'PM'
  const h12 = hr % 12 === 0 ? 12 : hr % 12
  return `${h12}:${String(m).padStart(2, '0')} ${ampm}`
}

export default function TodToggle({ hour, target, track, setHour, trackLocal, toggleTod }) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)
  const pressRef = useRef(0)
  // A long press fires on its own timer, but the browser still delivers the
  // click when the finger lifts — this swallows that one so the sky doesn't
  // swing the moment the panel opens.
  const heldRef = useRef(false)
  const day = isDayHour(hour)

  useEffect(() => {
    if (!open) return
    const onDown = (e) => { if (!rootRef.current?.contains(e.target)) setOpen(false) }
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('pointerdown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const startPress = () => {
    heldRef.current = false
    clearTimeout(pressRef.current)
    pressRef.current = setTimeout(() => {
      heldRef.current = true
      setOpen(true)
    }, LONG_PRESS_MS)
  }
  const endPress = () => clearTimeout(pressRef.current)
  useEffect(() => () => clearTimeout(pressRef.current), [])

  const onClick = (e) => {
    // Windows/Linux ctrl-click arrives as a plain click with the flag set; on a
    // Mac it never gets here at all (see onContextMenu).
    if (e.ctrlKey || e.metaKey) { setOpen((o) => !o); return }
    if (heldRef.current) { heldRef.current = false; return }
    toggleTod()
  }

  // macOS turns ctrl-click into a secondary click: it fires contextmenu and no
  // click, so this is where a Mac's ctrl-click actually lands. Right-click gets
  // the panel too, which is the same bargain — an out-of-the-way gesture.
  const onContextMenu = (e) => {
    e.preventDefault()
    endPress()
    setOpen((o) => !o)
  }

  return (
    <div className="tod" ref={rootRef}>
      <button
        className="tod-toggle"
        type="button"
        onClick={onClick}
        onPointerDown={startPress}
        onPointerUp={endPress}
        onPointerLeave={endPress}
        onPointerCancel={endPress}
        onContextMenu={onContextMenu}
        aria-expanded={open}
        aria-label={day ? 'Switch to night' : 'Switch to day'}
      >
        {day ? <Sun className="tod-sun" strokeWidth={1.6} /> : <Moon strokeWidth={1.6} />}
      </button>

      {open && (
        <div className="tod-panel" role="dialog" aria-label="Time of day">
          <div className="tod-panel-head">
            <span className="tod-time">{label(target)}</span>
            {track && <span className="tod-live">live</span>}
          </div>
          <input
            className={`tod-slider${track ? ' is-tracking' : ''}`}
            type="range"
            min="0"
            max="24"
            step="0.25"
            value={target}
            aria-label="Time of day"
            onChange={(e) => setHour(Number(e.target.value))}
          />
          <label className="tod-track">
            <input
              type="checkbox"
              checked={track}
              onChange={(e) => trackLocal(e.target.checked)}
            />
            Track local time
          </label>
        </div>
      )}
    </div>
  )
}
