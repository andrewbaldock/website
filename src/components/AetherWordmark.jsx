import { useId } from 'react'

// Aether wordmark — "Aether" in Grenze Gotisch with the pink→purple→cyan diagonal
// gradient. Ported verbatim from the Aether repo (frontend/src/brand/Wordmark.tsx).
export default function AetherWordmark({ height = 30 }) {
  const grad = `aether-grad-${useId().replace(/:/g, '')}`
  const width = Math.round(height * 470 / 112)
  return (
    <svg
      width={width}
      height={height}
      viewBox="20 6 470 112"
      role="img"
      aria-label="Aether"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Aether</title>
      <defs>
        <linearGradient id={grad} x1="0" y1="0.65" x2="1" y2="0.35">
          <stop offset="0%" stopColor="#ff2e9a" />
          <stop offset="50%" stopColor="#b54bd0" />
          <stop offset="100%" stopColor="#16c2ff" />
        </linearGradient>
      </defs>
      <text
        x="20"
        y="98"
        textAnchor="start"
        fontFamily="'Grenze Gotisch', ui-sans-serif, system-ui, sans-serif"
        fontWeight={600}
        fontSize={108}
        letterSpacing={1}
        fill={`url(#${grad})`}
      >
        Aether
      </text>
    </svg>
  )
}
