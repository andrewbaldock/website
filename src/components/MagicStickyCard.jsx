import { Link } from 'react-router-dom'
import MagicStickyWordmark from './MagicStickyWordmark.jsx'

// Home-page promo card for Magic Sticky — sits below the Aether card. Mirrors AetherCard's
// shape (screenshot + body + "View Case Study"), but in the pastel-officey aesthetic: soft
// sage-green surface, warm daisy accent, no neon glow.
export default function MagicStickyCard() {
  return (
    <section className="section-magicsticky">
      <div className="section">
        <div className="ms-card__wrap">
          <Link className="ms-card" to="/magicsticky">
            <img
              className="ms-card__screenshot"
              src="/images/magicsticky.png"
              alt="Magic Sticky — a shared prompt every Claude can read"
            />
            <div className="ms-card__body">
              <p className="ms-card__label">Full-Stack Project:</p>
              <MagicStickyWordmark className="ms-card__wordmark" daisySize={34} />
              <p className="ms-card__desc">
                Bun / Hono / SQLite app + a Model-Context-Protocol connector with its own OAuth 2.1
                server. A small stack of plain-text sticky notes where one is the shared prompt that
                every Claude you talk to — desktop, phone, CLI — reads and writes over MCP.
              </p>
              <p className="ms-card__desc">
                TLDR: One note. Every Claude. Same context.
              </p>
              <span className="ms-card__link">View Case Study →</span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}
