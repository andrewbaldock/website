// In dev (vite dev server on :5173) the local Aether app runs on :5174.
// In production builds it's the live deployment.
export const AETHER_URL = import.meta.env.DEV
  ? 'http://localhost:5174'
  : 'https://aether.andrewbaldock.com'

// In dev the Juno recruiter demo runs on :5182 (VITE_DEMO=true bun run dev).
export const JUNO_URL = import.meta.env.DEV
  ? 'http://localhost:5182'
  : 'https://juno-demo.andrewbaldock.com'

// In dev the LineOp OEE demo runs on :5183.
export const LINEOP_URL = import.meta.env.DEV
  ? 'http://localhost:5183'
  : 'https://lineop.andrewbaldock.com'

// Magic Sticky is deployed (one Fly app); no separate local dev URL needed for the case-study link.
export const MAGICSTICKY_URL = 'https://magicsticky.andrewbaldock.com'
