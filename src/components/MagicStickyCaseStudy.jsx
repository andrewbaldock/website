import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Eye,
  Pencil,
  Layers,
  Lock,
  RefreshCw,
  Smartphone,
} from 'lucide-react'
import { MAGICSTICKY_URL as LIVE_URL } from '../config.js'
import ThemeToggle, { usePageTheme } from './ThemeToggle.jsx'
import MagicStickyWordmark from './MagicStickyWordmark.jsx'

const REPO_URL = 'https://github.com/andrewbaldock/magicsticky'

// The four MCP tools — the entire machine-facing surface. "Saying no is the work": the product's
// discipline is keeping this list at four.
const TOOLS = [
  { name: 'whoami', body: 'Read the shared sticky — call it first, and any Claude inherits your current context with no setup.' },
  { name: 'write', body: 'Replace the shared sticky, guarded by a version token so a Claude edit can’t clobber one you just made in the browser.' },
  { name: 'list_stickies', body: 'The stack as metadata only — never the text of your other notes. The privacy boundary that keeps "only the shared one is readable" true.' },
  { name: 'set_shared', body: 'Flip which note in the stack is the shared prompt every Claude reads.' },
]

const FEATURES = [
  {
    icon: Eye,
    title: 'Read-first context',
    body: 'Every Claude calls whoami at the start, so it instantly knows who you are and what you’re doing — no re-explaining across sessions or devices.',
  },
  {
    icon: Pencil,
    title: 'Safe concurrent writes',
    body: 'One write path with optimistic version control. The human in the browser and a Claude over MCP can both edit the shared note without clobbering each other.',
  },
  {
    icon: Layers,
    title: 'A stack, not a database',
    body: 'A small stack of plain-text notes — one is the shared prompt, the rest are yours. Flat, free-text, ≤10k chars. The whole product is the discipline of staying a sticky note.',
  },
  {
    icon: Lock,
    title: 'Encrypted, yours to take',
    body: 'AES-256-GCM at rest (your id bound as AAD), a deny-all sign-in allowlist, one-tap export, and a typed-confirmation delete-everything. You own the note.',
  },
  {
    icon: RefreshCw,
    title: 'Every Claude, one note',
    body: 'Desktop, phone, and Claude Code all read and write the same shared sticky — so context follows you between every AI you talk to.',
  },
  {
    icon: Smartphone,
    title: 'Installable PWA',
    body: 'A phone-first web app with offline catch-up: notes captured offline append below a divider on reconnect — conflict-free, never overwriting.',
  },
]

const STACK = [
  'Bun',
  'Hono',
  'bun:sqlite',
  'React 19',
  'Vite',
  'MCP (Streamable HTTP)',
  'OAuth 2.1 + PKCE',
  'AES-256-GCM',
  'Fly.io',
  'AGPL-3.0',
]

export default function MagicStickyCaseStudy() {
  useEffect(() => { window.scrollTo(0, 0) }, [])
  const { theme, toggle } = usePageTheme()

  return (
    <div className="ms-cs">
      <ThemeToggle theme={theme} onToggle={toggle} />
      <div className="ms-cs__inner">
        <div className="ms-cs__topbar">
          <Link to="/" className="ms-cs__back">← Back</Link>
        </div>

        <header className="ms-cs__hero">
          <p className="ms-cs__eyebrow">Case Study</p>
          <MagicStickyWordmark className="ms-cs__wordmark" daisySize={52} />
          <p className="ms-cs__tagline">
            One note, shared by every Claude you talk to — desktop, phone, and CLI all read and
            write the same living context.
          </p>
          <p className="ms-cs__byline">
            Designed &amp; built by <span className="ms-cs__byline-name">Andrew Baldock</span>
          </p>
          <div className="ms-cs__cta resume-buttons">
            <a className="primary" href={LIVE_URL} target="_blank" rel="noreferrer">
              Open Magic Sticky ↗
            </a>
          </div>
        </header>

        <div className="ms-cs__shot">
          <img src="/images/magicsticky.png" alt="The Magic Sticky shared prompt, rendered" />
        </div>

        <section className="ms-cs__block">
          <h2 className="ms-cs__h2">What it is</h2>
          <p className="ms-cs__lede">
            Magic Sticky is your living context. You keep a small stack of plain-text sticky notes,
            and exactly one is the <strong>shared prompt</strong> — the note every Claude you connect
            reads, and can update, over MCP.
          </p>
          <p className="ms-cs__body">
            Open it as a phone-first web app to jot and edit; connect it to a Claude and that AI
            inherits the note as ambient memory. The same sticky is visible from Claude on the
            desktop, on your phone, and in Claude Code — so each AI you talk to starts already
            knowing what you’re working on.
          </p>
          <p className="ms-cs__body">
            The whole product is a discipline: it stays a sticky note. No folders, no rich-text
            engine, no item lists — one free-text blob, ≤10,000 characters. Saying no is the work.
          </p>
        </section>

        <section className="ms-cs__block">
          <h2 className="ms-cs__h2">The four tools</h2>
          <p className="ms-cs__body">
            A Claude reaches Magic Sticky through an MCP connector with exactly four tools. Keeping
            the surface this small is deliberate — on a four-tool API, the names <em>are</em> the
            documentation.
          </p>
          <div className="ms-cs__tools">
            {TOOLS.map(({ name, body }) => (
              <div className="ms-cs__tool" key={name}>
                <code className="ms-cs__tool-name">{name}</code>
                <p className="ms-cs__tool-body">{body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="ms-cs__block">
          <h2 className="ms-cs__h2">Highlights</h2>
          <div className="ms-cs__features">
            {FEATURES.map(({ icon: Icon, title, body }) => (
              <div className="ms-cs__feature" key={title}>
                <Icon className="ms-cs__feature-icon" size={22} strokeWidth={1.5} />
                <h3 className="ms-cs__feature-title">{title}</h3>
                <p className="ms-cs__feature-body">{body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="ms-cs__block">
          <h2 className="ms-cs__h2">Any Claude can connect</h2>
          <p className="ms-cs__body">
            The defining promise — <em>every</em> Claude shares the one prompt — meant solving two
            different sign-ins. Humans authenticate with Google; a Claude authenticates as a machine.
            The desktop and phone connector dialogs only speak OAuth (no header field), so Magic
            Sticky became its <strong>own minimal OAuth 2.1 authorization server</strong>: discovery
            metadata, PKCE, and dynamic client registration. Paste the URL, sign in once, and the
            connector mints a per-client token — every Claude ends up holding its own token, all
            pointing at the same note.
          </p>
          <div className="ms-cs__arch" aria-hidden="true">
            <div className="ms-cs__arch-node">
              <span className="ms-cs__arch-label">Humans</span>
              <span className="ms-cs__arch-sub">PWA · Google sign-in</span>
            </div>
            <div className="ms-cs__arch-link">
              <span className="ms-cs__arch-link-top">/api · cookie</span>
              <span className="ms-cs__arch-arrow">⇄</span>
              <span className="ms-cs__arch-link-bot">one write path</span>
            </div>
            <div className="ms-cs__arch-node ms-cs__arch-node--hub">
              <span className="ms-cs__arch-label">One Fly app</span>
              <span className="ms-cs__arch-sub">Bun · Hono · SQLite</span>
            </div>
            <div className="ms-cs__arch-link">
              <span className="ms-cs__arch-link-top">/mcp · OAuth bearer</span>
              <span className="ms-cs__arch-arrow">⇄</span>
              <span className="ms-cs__arch-link-bot">4 tools</span>
            </div>
            <div className="ms-cs__arch-node">
              <span className="ms-cs__arch-label">Every Claude</span>
              <span className="ms-cs__arch-sub">desktop · phone · CLI</span>
            </div>
          </div>
          <ul className="ms-cs__points">
            <li>One Bun + Hono process serves the PWA, the human <code>/api</code>, and the <code>/mcp</code> connector at a single origin.</li>
            <li>The MCP endpoint is never put behind an edge proxy — the long-lived stream would time out.</li>
            <li>Sticky text is encrypted at rest with the owner’s id bound as authenticated data, so a leaked row can’t decrypt cross-user.</li>
            <li>Both writers — human and Claude — go through one version-checked write path, so the shared note is conflict-safe.</li>
          </ul>
        </section>

        <section className="ms-cs__block">
          <h2 className="ms-cs__h2">Built with</h2>
          <div className="ms-cs__chips">
            {STACK.map((tech) => (
              <span className="ms-cs__chip" key={tech}>{tech}</span>
            ))}
          </div>
        </section>

        <div className="ms-cs__cta-band">
          <p className="ms-cs__cta-line">One note. Every Claude.</p>
          <div className="resume-buttons">
            <a className="primary" href={LIVE_URL} target="_blank" rel="noreferrer">
              Open Magic Sticky ↗
            </a>
            <a className="secondary" href={REPO_URL} target="_blank" rel="noreferrer">
              GitHub
            </a>
          </div>
        </div>

        <div className="ms-cs__footer">
          <Link to="/" className="ms-cs__back">← Back to home</Link>
        </div>
      </div>
    </div>
  )
}
