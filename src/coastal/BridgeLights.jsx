// Sparkly deck lights strung along the Bay Bridge, lit only at night. Overlaid
// on the exact same box as the bridge engraving (viewBox = the bridge art's
// 1512×1122) so the lamps sit on the roadway. Each twinkles on its own offset.

// A line of lamps following the deck (tuned against the traced bridge art).
const DECK = Array.from({ length: 16 }, (_, i) => {
  const t = i / 15
  return [332 + t * 1168, 520 - t * 366] // deck slopes up toward the right
})

export default function BridgeLights() {
  return (
    <div className="bridge-lights" aria-hidden="true">
      <svg viewBox="0 0 1512 1122" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
        {DECK.map(([x, y], i) => (
          <circle key={i} className="lamp" cx={x} cy={y} r="4.5"
            style={{ animationDelay: `${((i * 0.53) % 3).toFixed(2)}s` }} />
        ))}
      </svg>
    </div>
  )
}
