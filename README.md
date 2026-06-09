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

## Deploy — A Small Orange (manual SFTP via ForkLift)

The site runs on Apache shared hosting at A Small Orange. There is no auto-deploy — build locally, then upload manually.

```bash
bun run resume:pdf   # only if resumeData.js changed — commit the updated public/resume.pdf
bun run build        # → dist/
bun run preview      # optional: sanity-check at http://localhost:4173
```

Then in **ForkLift**: SFTP into the ASO host and copy the contents of `dist/` into the web root (`public_html/`), overwriting existing files. Typically that's:

- `assets/` folder
- `index.html`
- `resume.pdf` (if it changed)

The `.htaccess` in the web root is the SPA deep-link fallback — without it `/resume` 404s on hard refresh. It rewrites a request to `index.html` **only when the path isn't a real file or directory** (negated `-f`/`-d` conditions), so a genuinely missing asset still returns a real 404 instead of HTML-with-a-200 (which would surface as the "Unexpected token '<'" white-screen after a deploy). The source of truth is `public/.htaccess` (copied into `dist/` on build); the live copy must be kept in sync — edit it directly on the server via ForkLift (show hidden files).
