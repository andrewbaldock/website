import { Link } from 'react-router-dom'

export default function AetherCard() {
  return (
    <section className="section-aether">
      <div className="section">
        <div className="aether-card__wrap">
          <span className="aether-card__spark" aria-hidden="true" />
        <Link className="aether-card" to="/aether">
          <img className="aether-card__screenshot" src="/images/aether-card-screenshot.jpg" alt="Aether conversational explorer" />
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
              React / TypeScript / Bun / Hono / Supabase SPA with a switchable LLM agent loop. Conversational interface to building, editing, and researching just about anything via a plug-in capabilities architecture.
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
