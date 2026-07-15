// Juno's rays — 60 interleaved gold/mint spokes radiating behind her coin
// (ported from motifs.tsx `Rays`).
export default function CoinRays() {
  const n = 60
  const lines = []
  for (let i = 0; i < n; i++) {
    const gold = i % 2 === 0
    lines.push(
      <line
        key={i}
        x1="0" y1="-10" x2="0" y2={gold ? -96 : -78}
        transform={`rotate(${(i / n) * 360})`}
        stroke={gold ? 'var(--gold)' : 'var(--mint)'}
        strokeWidth={gold ? 1.1 : 0.9}
        strokeLinecap="round"
        opacity={gold ? 0.8 : 0.55}
      />,
    )
  }
  return <svg className="rays" viewBox="-100 -100 200 200" aria-hidden="true">{lines}</svg>
}
