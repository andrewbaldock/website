# andrewbaldock.com

Personal portfolio site for [Andrew Baldock](https://andrewbaldock.com) — Boss-Level UI Engineer.

## Dev

```bash
bun run dev        # http://localhost:5173  (pinned — won't collide with aether on 5174)
bun run build      # production build → dist/
bun run resume:pdf # regenerate public/resume.pdf from scripts/resumeTemplate.mjs
bun run preview    # serve dist/ to sanity-check a prod build
```

## Short Stack

- **React 19** + **Vite 8** — pinned to port **5173**
- **LESS** for styling (single file: `src/App.less`)
- **react-router-dom 7** for routing (`/` home, `/resume`)
- **Lucide React** for icons
- **Tippy.js** for tooltips
- **Playwright** (dev dep) for PDF generation via `scripts/render-resume.mjs`
- **Bun** as the package manager / runtime

## Resume / PDF

Content lives in `src/resumeData.js` — single source of truth for both the web resume page (`ResumePage.jsx`) and the PDF. The PDF is rendered by Playwright/Chromium from `scripts/resumeTemplate.mjs`. Run `bun run resume:pdf` after any data change and commit the updated `public/resume.pdf`.

Web pages intentionally omit email and phone (privacy). The PDF keeps both.
