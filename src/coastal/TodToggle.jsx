import { useEffect, useRef, useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import { isDayHour } from './timeOfDay'

// The day/night complication. The face shows the current body (sun by day,
// moon by night); a tap opens a little panel with a slider that spins the
// app's time of day, plus a "track local time" checkbox.
function label(h) {
  h = ((h % 24) + 24) % 24
  let hr = Math.floor(h)
  let m = Math.round((h - hr) * 60)
  if (m === 60) { m = 0; hr = (hr + 1) % 24 }
  const ampm = hr < 12 ? 'AM' : 'PM'
  const h12 = hr % 12 === 0 ? 12 : hr % 12
  return `${h12}:${String(m).padStart(2, '0')} ${ampm}`
}

export default function TodToggle({ hour, target, track, setHour, trackLocal }) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)
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

  return (
    <div className="tod" ref={rootRef}>
      <button
        className="tod-toggle"
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label="Set time of day"
      >
        {day ? <Sun strokeWidth={1.6} /> : <Moon strokeWidth={1.6} />}
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
