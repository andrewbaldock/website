import { Link } from 'react-router-dom'

// The Aether promo card. `variant` picks the screenshot (and a light/dark surface
// treatment) so we can show the dark card on the (dark-locked) home page and still
// compare a light version. Default dark = the home page's look.
export default function AetherCard({ variant = 'dark' }) {
  const shot =
    variant === 'light'
      ? '/images/aether-card-screenshot.jpg'
      : '/images/aether-card-screenshot-dark.jpg'
  return (
    <section className="section-aether">
      <div className="section">
        <div className="aether-card__wrap">
          {/* The spark that races the border: a bright lead + a fading, twinkling trail
              of particles behind it. Each is the same offset-path with a growing delay. */}
          <span className="aether-card__spark aether-card__spark--lead" aria-hidden="true" />
          <span className="aether-card__spark aether-card__spark--t1" aria-hidden="true" />
          <span className="aether-card__spark aether-card__spark--t2" aria-hidden="true" />
          <span className="aether-card__spark aether-card__spark--t3" aria-hidden="true" />
          <span className="aether-card__spark aether-card__spark--t4" aria-hidden="true" />
          <span className="aether-card__spark aether-card__spark--t5" aria-hidden="true" />
        <Link className={`aether-card${variant === 'light' ? ' aether-card--light' : ''}`} to="/aether">
          <img className="aether-card__screenshot" src={shot} alt="Aether conversational explorer" />
          <div className="aether-card__body">
            <p className="aether-card__label">Full-Stack Project:</p>
            <svg className="aether-card__wordmark" viewBox="0 0 480 100" aria-label="Aether">
              <defs>
                {/* Pink(bottom-left) → cyan(top-right) — matches the live app brand */}
                <linearGradient id="aether-duo" x1="0" y1="0.65" x2="1" y2="0.35">
                  <stop offset="0%"   stopColor="#ff2e9a" />
                  <stop offset="50%"  stopColor="#b54bd0" />
                  <stop offset="100%" stopColor="#16c2ff" />
                </linearGradient>
              </defs>
              {/* Solid Grenze Gotisch (blackletter), no glow — crisp like the app */}
              <text x="0" y="80" fontFamily="'Grenze Gotisch', serif" fontWeight="600"
                fontSize="90" letterSpacing="1" fill="url(#aether-duo)">Aether</text>
            </svg>
            <p className="aether-card__desc">
              A <strong>shell for combining LLMs with output tools</strong> — endlessly
              multipurpose. You talk, the AI answers and runs tools, and each result renders in its
              best form (a chart, a graph, a 3D scene) via a plug-in capabilities architecture.
            </p>
            <p className="aether-card__desc">
              React / TypeScript / Bun / Hono / Supabase SPA with a switchable LLM agent loop.
            </p>
            <p className="aether-card__desc">
              TLDR: Talk to AI, use tools.
            </p>
            <span className="aether-card__link">View Case Study →</span>
          </div>
        </Link>
        </div>
      </div>
    </section>
  )
}
