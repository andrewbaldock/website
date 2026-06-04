import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Radio,
  Wrench,
  Boxes,
  History,
  Activity,
  Moon,
} from 'lucide-react'
import { AETHER_URL as LIVE_URL } from '../config.js'

const REPO_URL = 'https://github.com/andrewbaldock/aether'

// The AETHER neon wordmark — lifted from AetherCard so the case study leads with
// the same brand mark (glow filter + duo gradient + CRT scanline mask).
function AetherWordmark() {
  return (
    <svg className="aether-cs__wordmark" viewBox="0 0 640 100" aria-label="Aether">
      <defs>
        <filter id="aether-cs-glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="b1" />
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="b2" />
          <feMerge>
            <feMergeNode in="b2" />
            <feMergeNode in="b1" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="aether-cs-duo" x1="0" y1="0" x2="1" y2="0.4">
          <stop offset="0%" stopColor="#ff2e9a" />
          <stop offset="55%" stopColor="#ff2e9a" />
          <stop offset="78%" stopColor="#b54bd0" />
          <stop offset="100%" stopColor="#16c2ff" />
        </linearGradient>
        <pattern id="aether-cs-scan" width="10" height="5" patternUnits="userSpaceOnUse">
          <rect width="10" height="3.2" fill="#fff" />
          <rect y="3.2" width="10" height="1.8" fill="#000" />
        </pattern>
        <mask id="aether-cs-mask">
          <rect width="640" height="100" fill="url(#aether-cs-scan)" />
        </mask>
      </defs>
      <g filter="url(#aether-cs-glow)" mask="url(#aether-cs-mask)">
        <text x="320" y="78" textAnchor="middle" fontFamily="Ubuntu" fontWeight="700"
          fontSize="82" letterSpacing="4" fill="url(#aether-cs-duo)">AETHER</text>
      </g>
    </svg>
  )
}

const FEATURES = [
  {
    icon: Radio,
    title: 'Streaming responses',
    body: 'Tokens stream in live over Server-Sent Events — answers appear as they’re generated, and real errors surface mid-stream.',
  },
  {
    icon: Wrench,
    title: 'Agent loop with tools',
    body: 'The model can call tools mid-conversation; the backend runs them and feeds results back, looping until the answer is complete.',
  },
  {
    icon: Boxes,
    title: 'Pluggable capabilities',
    body: 'Answers render in their best form. Widgets are plugins keyed by type, so new experiences add a renderer without touching the shell.',
  },
  {
    icon: History,
    title: 'Persistent sessions',
    body: 'Conversations save to Supabase under an anonymous identity — browse history, rename, and resume. No login friction.',
  },
  {
    icon: Activity,
    title: 'Behind-the-scenes view',
    body: 'A live diagram of the agent loop — request to the model to tokens to tools and back — so the machinery is visible, not hidden.',
  },
  {
    icon: Moon,
    title: 'Neon light/dark theme',
    body: 'A cohesive cyberpunk palette with considered micro-interactions, set pre-paint to avoid a flash, and honoring reduced-motion.',
  },
]

const STACK = [
  'React 19',
  'TypeScript',
  'Bun',
  'Hono',
  'Anthropic SDK',
  'Supabase',
  'Tailwind v4',
  'Vite',
  'Vercel',
  'Fly.io',
  'Biome',
]

const LLMS = [
  'Claude (Anthropic)',
  'GPT (OpenAI)',
  'Gemini (Google)',
  'Llama / local',
]

export default function AetherCaseStudy() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div className="aether-cs">
      <div className="aether-cs__inner">
        <div className="aether-cs__topbar">
          <Link to="/" className="aether-cs__back">← Back</Link>
          <a
            className="download-pdf"
            href={LIVE_URL}
            target="_blank"
            rel="noreferrer"
          >
            <span className="download-pdf__spark" aria-hidden="true" />
            Visit live app ↗
          </a>
        </div>

        <header className="aether-cs__hero">
          <p className="aether-cs__eyebrow">Case Study</p>
          <AetherWordmark />
          <p className="aether-cs__tagline">
            A conversational explorer — every view is a question answered in its best form.
          </p>
          <div className="aether-cs__cta resume-buttons">
            <a className="primary" href={LIVE_URL} target="_blank" rel="noreferrer">
              <span className="cta-spark" aria-hidden="true" />
              Launch Aether ↗
            </a>
          </div>
        </header>

        <div className="aether-cs__shot">
          <img src="/images/screenshot.jpg" alt="Aether conversational explorer" />
        </div>

        <section className="aether-cs__block">
          <h2 className="aether-cs__h2">What it is</h2>
          <p className="aether-cs__lede">
            Aether treats chat as the primary surface for exploring information. You
            ask; the model answers — and the answer renders in whatever form fits best:
            prose, a chart, a graph, a 3D scene.
          </p>
          <p className="aether-cs__body">
            The conversational core and a capability system are the infrastructure;
            specific experiences plug in on top. Every turn streams token-by-token,
            tools run server-side mid-conversation, and the whole exchange is saved
            to a persistent, anonymous session you can return to later.
          </p>
          <p className="aether-cs__body">
            It’s built as a platform, not a one-off app — the shell stays the same
            while new capabilities slot in behind it.
          </p>
        </section>

        <section className="aether-cs__block">
          <h2 className="aether-cs__h2">Highlights</h2>
          <div className="aether-cs__features">
            {FEATURES.map(({ icon: Icon, title, body }) => (
              <div className="aether-cs__feature" key={title}>
                <Icon className="aether-cs__feature-icon" size={22} strokeWidth={1.5} />
                <h3 className="aether-cs__feature-title">{title}</h3>
                <p className="aether-cs__feature-body">{body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="aether-cs__block">
          <h2 className="aether-cs__h2">You choose your LLM</h2>
          <p className="aether-cs__body">
            Aether isn’t tied to one provider. The agent loop talks to a thin model
            adapter, so you pick the LLM that fits the task — swap providers without
            touching the conversation, the tools, or the UI.
          </p>
          <div className="aether-cs__chips">
            {LLMS.map((llm) => (
              <span className="aether-cs__chip" key={llm}>{llm}</span>
            ))}
          </div>
        </section>

        <section className="aether-cs__block">
          <h2 className="aether-cs__h2">Architecture</h2>
          <p className="aether-cs__body">
            Two runtimes. The browser runs the compiled React SPA; a Bun + Hono API
            holds every secret. The frontend never touches the provider key — it
            posts a message and reads back a stream.
          </p>

          <div className="aether-cs__arch" aria-hidden="true">
            <div className="aether-cs__arch-node">
              <span className="aether-cs__arch-label">Browser</span>
              <span className="aether-cs__arch-sub">React 19 SPA</span>
            </div>
            <div className="aether-cs__arch-link">
              <span className="aether-cs__arch-link-top">POST /api/chat</span>
              <span className="aether-cs__arch-arrow">⇄</span>
              <span className="aether-cs__arch-link-bot">SSE stream</span>
            </div>
            <div className="aether-cs__arch-node">
              <span className="aether-cs__arch-label">Hono API</span>
              <span className="aether-cs__arch-sub">Bun · secrets</span>
            </div>
            <div className="aether-cs__arch-link">
              <span className="aether-cs__arch-link-top">agent loop</span>
              <span className="aether-cs__arch-arrow">⇄</span>
              <span className="aether-cs__arch-link-bot">tool results</span>
            </div>
            <div className="aether-cs__arch-node">
              <span className="aether-cs__arch-label">LLM</span>
              <span className="aether-cs__arch-sub">Claude · default</span>
            </div>
          </div>

          <ul className="aether-cs__points">
            <li>Secrets stay server-side; the SPA only ever sees the stream.</li>
            <li>Tokens stream to the client over SSE — no WebSocket, no server affinity.</li>
            <li>The agent loop runs tools and feeds results back until the turn resolves.</li>
            <li>Capabilities are plugins keyed by a <code>type</code> string; the shell stays untouched.</li>
            <li>The system prompt is cached (<code>cache_control: ephemeral</code>) to save tokens across turns.</li>
          </ul>
        </section>

        <section className="aether-cs__block">
          <h2 className="aether-cs__h2">Built with</h2>
          <div className="aether-cs__chips">
            {STACK.map((tech) => (
              <span className="aether-cs__chip" key={tech}>{tech}</span>
            ))}
          </div>
        </section>

        <div className="aether-cs__cta-band">
          <p className="aether-cs__cta-line">See it running.</p>
          <div className="resume-buttons">
            <a className="primary" href={LIVE_URL} target="_blank" rel="noreferrer">
              <span className="cta-spark" aria-hidden="true" />
              Launch Aether ↗
            </a>
            <a className="secondary" href={REPO_URL} target="_blank" rel="noreferrer">
              <span className="cta-spark" aria-hidden="true" />
              GitHub
            </a>
          </div>
        </div>

        <div className="aether-cs__footer">
          <Link to="/" className="aether-cs__back">← Back to home</Link>
        </div>
      </div>
    </div>
  )
}
