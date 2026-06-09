// Aether compact lettermark — the "A" in Grenze Gotisch.
// Mirrors the sidebar compact Wordmark from the Aether app.
export function AetherLogo({ size = 20 }) {
  return (
    <svg
      width={Math.round(size * 140 / 112)}
      height={size}
      viewBox="230 6 140 112"
      role="img"
      aria-label="Aether"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Aether</title>
      <text
        x="300"
        y="98"
        textAnchor="middle"
        fontFamily="'Grenze Gotisch', ui-sans-serif, system-ui, sans-serif"
        fontWeight={600}
        fontSize={108}
        letterSpacing={1}
        fill="currentColor"
      >
        A
      </text>
    </svg>
  )
}
