// Time-of-day math, driven by the *actual* sunrise/sunset rather than fixed
// 6am/6pm bounds — so at 7:15pm in July the sun is still up, as it should be.
//
// Sun times are computed for the site's home, San Francisco (this is the Bay
// Bridge, after all); the viewer's own clock supplies the current hour. The
// celestial body rides an arc from the real sunrise (left horizon) through
// solar noon to the real sunset (right horizon); the moon takes the night arc.

const LAT = 37.7749, LNG = -122.4194 // San Francisco

// SunCalc's core (Vladimir Agafonkin, BSD) reduced to sunrise/sunset.
function sunCalc(date, lat, lng) {
  const rad = Math.PI / 180, dayMs = 86400000, J1970 = 2440588, J2000 = 2451545
  const d = (date.valueOf() / dayMs - 0.5 + J1970) - J2000
  const lw = rad * -lng, phi = rad * lat
  const n = Math.round(d - 0.0009 - lw / (2 * Math.PI))
  const ds = 0.0009 + lw / (2 * Math.PI) + n
  const M = rad * (357.5291 + 0.98560028 * ds)
  const C = rad * (1.9148 * Math.sin(M) + 0.02 * Math.sin(2 * M) + 0.0003 * Math.sin(3 * M))
  const L = M + C + rad * 102.9372 + Math.PI
  const Jtransit = J2000 + ds + 0.0053 * Math.sin(M) - 0.0069 * Math.sin(2 * L)
  const dec = Math.asin(Math.sin(L) * Math.sin(rad * 23.4397))
  const cosH = (Math.sin(rad * -0.833) - Math.sin(phi) * Math.sin(dec)) / (Math.cos(phi) * Math.cos(dec))
  const w = Math.acos(Math.max(-1, Math.min(1, cosH))) / (2 * Math.PI)
  const fromJ = j => new Date((j + 0.5 - J1970) * dayMs)
  return { sunrise: fromJ(Jtransit - w), sunset: fromJ(Jtransit + w) }
}

// today's sunrise/sunset as local-clock hours, cached per calendar day
let _cache = null
export function sunHours() {
  const now = new Date()
  const key = now.toDateString()
  if (!_cache || _cache.key !== key) {
    const { sunrise, sunset } = sunCalc(now, LAT, LNG)
    _cache = {
      key,
      sr: sunrise.getHours() + sunrise.getMinutes() / 60,
      ss: sunset.getHours() + sunset.getMinutes() / 60,
    }
  }
  return _cache
}

// Finer bands anchored to the real sun times, so the sky drifts through a
// whole sunset instead of snapping day → dusk → night. Evening walks warm gold
// → pink → rose/purple → deep-blue before full dark; morning lifts through a
// dark pre-dawn first. Offsets are hours relative to sunrise (sr) / sunset (ss).
export function phaseFor(h) {
  const { sr, ss } = sunHours()
  const hm = ((h % 24) + 24) % 24
  if (hm >= sr - 1.6 && hm < sr - 0.5) return 'predawn'  // dark, first lightening
  if (hm >= sr - 0.5 && hm < sr + 1.0) return 'dawn'     // pink sunrise
  if (hm >= ss - 1.4 && hm < ss - 0.5) return 'golden'   // warm gold hour
  if (hm >= ss - 0.5 && hm < ss + 0.4) return 'sunset'   // pink glow, sun on the horizon
  if (hm >= ss + 0.4 && hm < ss + 1.1) return 'dusk'     // rose drifting to purple
  if (hm >= ss + 1.1 && hm < ss + 2.0) return 'twilight' // deep blue, night arriving
  if (hm >= sr + 1.0 && hm < ss - 1.4) return 'day'
  return 'night'
}

// Phases where the sky is dark enough for stars, deck lamps, and dark theme.
export const DARK_PHASES = new Set(['night', 'twilight', 'predawn'])
export function isDarkPhase(h) {
  return DARK_PHASES.has(phaseFor(h))
}

export function clockHour() {
  const d = new Date()
  return d.getHours() + d.getMinutes() / 60
}

export function isDayHour(h) {
  const { sr, ss } = sunHours()
  const hm = ((h % 24) + 24) % 24
  return hm >= sr && hm < ss
}

// The dial rests on one of two stops — mid-afternoon and the dead of night —
// and the toggle sweeps the 12 hours between them. Both sit clear of every
// band edge in phaseFor() at any time of year (SF sunset runs 16:51–20:35, so
// 15:30 is never past `golden`; sunrise runs 05:48–07:21, so 03:30 is always
// `night`), which keeps a stop from ever landing on a half-lit sky.
export const DAY_STOP = 15.5    // 3:30pm
export const NIGHT_STOP = 3.5   // 3:30am
export function stopFor(h) {
  return isDayHour(h) ? DAY_STOP : NIGHT_STOP
}
export const normHour = (h) => ((h % 24) + 24) % 24

// Fraction 0..1 across the visible arc: sunrise → solar noon → sunset for the
// sun; sunset → sunrise for the moon (spanning the real, uneven night length).
export function arcFrac(h) {
  const { sr, ss } = sunHours()
  const hm = ((h % 24) + 24) % 24
  if (isDayHour(h)) return (hm - sr) / (ss - sr)
  const nightLen = 24 - (ss - sr)
  return ((hm - ss + 24) % 24) / nightLen
}

const CX = 720, ARC_RX = 620, ARC_RY = 220, ARC_BASE_Y = 300
export function arcPoint(frac) {
  const a = Math.PI * (1 - frac)
  return [CX + ARC_RX * Math.cos(a), ARC_BASE_Y - ARC_RY * Math.sin(a)]
}
