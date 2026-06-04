// In dev (vite dev server on :5173) the local Aether app runs on :5174.
// In production builds it's the live deployment.
export const AETHER_URL = import.meta.env.DEV
  ? 'http://localhost:5174'
  : 'https://aether.andrewbaldock.com'
