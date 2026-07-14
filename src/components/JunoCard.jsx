// Home-page project card for Juno — sits alongside Aether. Mirrors the MagicSticky card's
// shape (screenshot + body), but in Juno's own aesthetic: warm parchment surface, mint + gold
// accents, a Cormorant wordmark — her "temple of wealth" look, not a recolor of the disco page.
// No case-study route yet, so the CTAs go straight to the live demo and the source.
const DEMO_URL = 'https://juno-demo.andrewbaldock.com'
const REPO_URL = 'https://github.com/andrewbaldock/juno-moneta'

export default function JunoCard() {
  return (
    <section className="section-juno">
      <div className="section">
        <div className="juno-card__wrap">
          <div className="juno-card">
            <img
              className="juno-card__screenshot"
              src="/images/juno.png"
              alt="Juno — a household's whole financial picture, modeled"
            />
            <div className="juno-card__body">
              <p className="juno-card__label">Full-Stack Project:</p>
              <span className="juno-card__wordmark">Juno</span>
              <p className="juno-card__desc">
                A household's personal finance goddess. She models the family's whole picture —
                accounts, debts, cash flow, the estate — and answers what-ifs against the real
                numbers: <em>what if a salary stopped? pay the card off by spring? afford a bigger
                place?</em>{' '}Each one redraws today's path against the road not taken.
              </p>
              <p className="juno-card__desc">
                She runs scenarios on real figures, keeps her own ledger through a
                Model-Context-Protocol tool, and points out the gaps in her own data model — an
                advisor that helps maintain the app she lives in.
              </p>
              <p className="juno-card__desc">
                React 19 · Supabase Postgres + row-level security · Deno edge functions · a Claude
                advisor. The whole thing is a public, poke-able demo — no login, resets on reload.
              </p>
              <div className="juno-card__links">
                <a className="juno-card__link" href={DEMO_URL} target="_blank" rel="noreferrer">
                  Try the live demo →
                </a>
                <a className="juno-card__link juno-card__link--ghost" href={REPO_URL} target="_blank" rel="noreferrer">
                  View source →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
