// LineOp mark — three connected nodes = a production line/flow.
// Mirrors the app's LogoMark (lineop/src/components/brand/Logo.tsx).
export default function LineOpLogo({ size = 26 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      role="img"
      aria-label="LineOp"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>LineOp</title>
      <rect width="32" height="32" rx="8" fill="var(--lineop-teal)" />
      <path
        d="M8 20 L14 12 L20 18 L24 11"
        stroke="white"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="8" cy="20" r="2.4" fill="white" />
      <circle cx="14" cy="12" r="2.4" fill="white" />
      <circle cx="20" cy="18" r="2.4" fill="white" />
      <circle cx="24" cy="11" r="2.4" fill="white" />
    </svg>
  )
}
