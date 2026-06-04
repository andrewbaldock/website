export default function AetherCard() {
  return (
    <section className="section-aether">
      <div className="section">
        <div className="aether-card__wrap">
          <span className="aether-card__spark" aria-hidden="true" />
        <a className="aether-card" href="https://andrewbaldock.com/aether" target="_blank" rel="noreferrer">
          <div className="aether-card__placeholder">Screenshot coming soon</div>
          <div className="aether-card__body">
            <p className="aether-card__label">Project:</p>
            <svg className="aether-card__wordmark" viewBox="0 0 640 100" aria-label="Aether">
              <defs>
                <filter id="aether-glow" x="-40%" y="-40%" width="180%" height="180%">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="b1" />
                  <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="b2" />
                  <feMerge>
                    <feMergeNode in="b2" />
                    <feMergeNode in="b1" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <linearGradient id="aether-duo" x1="0" y1="0" x2="1" y2="0.4">
                  <stop offset="0%"   stopColor="#ff2e9a" />
                  <stop offset="55%"  stopColor="#ff2e9a" />
                  <stop offset="78%"  stopColor="#b54bd0" />
                  <stop offset="100%" stopColor="#16c2ff" />
                </linearGradient>
                <pattern id="aether-scan" width="10" height="5" patternUnits="userSpaceOnUse">
                  <rect width="10" height="3.2" fill="#fff" />
                  <rect y="3.2" width="10" height="1.8" fill="#000" />
                </pattern>
                <mask id="aether-mask">
                  <rect width="640" height="100" fill="url(#aether-scan)" />
                </mask>
              </defs>
              <g filter="url(#aether-glow)" mask="url(#aether-mask)">
                <text x="0" y="78" fontFamily="Ubuntu" fontWeight="700"
                  fontSize="82" letterSpacing="4" fill="url(#aether-duo)">AETHER</text>
              </g>
            </svg>
            <p className="aether-card__desc">
              React / TypeScript / Bun / Hono / Supabase SPA with a switchable LLM agent loop. Conversational interface to building, editing, and researching just about anything via a plug-in capabilities architecture.
            </p>
            <p className="aether-card__desc">
              TLDR: Talk to AI, use tools.
            </p>
            {/* TODO: Aether URL once hosted */}
            <a className="aether-card__link" href="https://andrewbaldock.com/aether" target="_blank" rel="noreferrer"
              onClick={e => e.stopPropagation()}>View Project →</a>
          </div>
        </a>
        </div>
      </div>
    </section>
  )
}
