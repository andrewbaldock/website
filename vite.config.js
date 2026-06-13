import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { writeFileSync } from 'node:fs'

function buildTimestamp() {
  return {
    name: 'build-timestamp',
    closeBundle() {
      const built = new Date().toLocaleString('en-US', {
        timeZone: 'America/Los_Angeles',
        dateStyle: 'full',
        timeStyle: 'short',
      })
      writeFileSync('dist/assets/timestamp.json', JSON.stringify({ built }, null, 2))
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), buildTimestamp()],
  server: { port: 5173, allowedHosts: ['website-dev'] },
})
