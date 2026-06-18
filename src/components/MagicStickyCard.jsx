import { Link } from 'react-router-dom'
import MagicStickyCardWordmark from './MagicStickyCardWordmark.jsx'

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
              <span className="ms-card__wordmark"><MagicStickyCardWordmark /></span>
              <p className="ms-card__desc">
                A note-taking surface that's just <em>present</em> wherever you are — mobile browser,
                desktop, and every Claude surface. And one of those notes is a <strong>shared prompt
                every one of your Claudes reads and writes</strong>, so each AI you talk to already
                knows your context.
              </p>
              <p className="ms-card__desc">
                Bun / Hono / SQLite + a Model-Context-Protocol connector with its own OAuth 2.1 server.
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
