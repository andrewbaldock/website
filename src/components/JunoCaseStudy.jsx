import { Link } from 'react-router-dom'
import { TrendingUp, Database, Columns2, Scale, BookMarked, Component } from 'lucide-react'
import { useTimeOfDay } from '../coastal/useTimeOfDay'
import Sky from '../coastal/Sky.jsx'
import Tide from '../coastal/Tide.jsx'
import TodToggle from '../coastal/TodToggle.jsx'
import Reveal from '../coastal/Reveal.jsx'
import TempleGarden from '../coastal/TempleGarden.jsx'
import CoinRays from '../coastal/CoinRays.jsx'

function Laurel() {
  return (
    <div className="wrap">
      <div className="laurel" aria-hidden="true">
        <i />
        <svg viewBox="0 0 24 24">
          <g className="lstroke">
            <path d="M12 2v20" />
            <path d="M12 7c-3.2 0-5.2 2.1-5.2 2.1S8.8 11.2 12 11.2M12 7c3.2 0 5.2 2.1 5.2 2.1S15.2 11.2 12 11.2" />
            <path d="M12 13c-3.2 0-5.2 2.1-5.2 2.1S8.8 17.2 12 17.2M12 13c3.2 0 5.2 2.1 5.2 2.1S15.2 17.2 12 17.2" />
          </g>
        </svg>
        <i />
      </div>
    </div>
  )
}

// Screenshot placeholder until owner-supplied images land. Drop a src to ship the real shot.
function Shot({ src, alt, placeholder }) {
  return src
    ? <div className="shot-slot"><img src={src} alt={alt} /></div>
    : <div className="shot-slot">{placeholder}</div>
}

const FEATURES = [
  { Icon: TrendingUp, title: 'Scenario modeling on real numbers', body: 'Month-by-month projection with income cliffs, payoffs, and cash-out dates — runway is never a flat extrapolation.' },
  { Icon: Database, title: 'The model maintains its own data', body: 'A stdio MCP server lets the advisor add, update, and correct ledger rows under row-level security — and request its own next feature.' },
  { Icon: Columns2, title: 'A data seam for a safe demo', body: 'One codebase, two data sources. A demo flag swaps a fictional household in — so the public demo carries zero real data, ever.' },
  { Icon: Scale, title: 'Honest-money discipline', body: 'Integer cents end to end. NULL means unknown, never zero — every metric reports what it’s missing instead of counting a gap as $0.' },
  { Icon: BookMarked, title: 'Durable advisor memory', body: 'Cross-conversation notes persist, so Juno remembers the facts you’ve established without you repeating them.' },
  { Icon: Component, title: 'A public design system', body: 'The whole visual language — tokens, type, engraved motifs, live components — is documented and shipped for anyone to read.' },
]

const CTA = (
  <div className="cta-row">
    <a className="btn btn-primary" href="https://juno-demo.andrewbaldock.com" target="_blank" rel="noopener noreferrer">Launch demo ↗</a>
    <a className="btn btn-ghost" href="https://juno-demo.andrewbaldock.com/design" target="_blank" rel="noopener noreferrer">Design system ↗</a>
    <a className="btn btn-ghost" href="https://github.com/andrewbaldock/juno-moneta" target="_blank" rel="noopener noreferrer">Source ↗</a>
  </div>
)

export default function JunoCaseStudy() {
  const tod = useTimeOfDay()
  const { hour } = tod

  return (
    <div className="coastal">
      <Sky hour={hour} />

      <header>
        <div className="wrap">
          <div className="topbar">
            <Link className="back" to="/">← Back</Link>
            <TodToggle {...tod} />
          </div>
        </div>
      </header>

      <main>
        {/* HERO — the goddess in her temple garden */}
        <section className="cs-hero">
          <TempleGarden />
          <div className="wrap presence">
            <span className="cs-eyebrow mono">Case study · A household goddess</span>
            <div className="coinwrap">
              <span className="glow" aria-hidden="true" />
              <CoinRays />
              <img className="coin" src="/images/juno-coin.png" alt="Juno — a Roman aureus" />
            </div>
            <h1 className="wordmark">J<span className="u">UNO</span></h1>
            <div className="rules"><i /><b>Moneta · Regina · Advisor</b><i /></div>
            <p className="cs-tagline">Your personal finance goddess — she holds the whole household picture, runs the what-ifs on real numbers, and quietly extends herself.</p>
            <p className="cs-byline">Designed &amp; built by <b>Andrew Baldock</b> · React 19 · TypeScript · Supabase · Claude</p>
            {CTA}
          </div>
        </section>

        {/* HERO SHOT */}
        <div className="cs-shot">
          <div className="wrap">
            <div className="shot-frame">
              <Shot placeholder="Juno hero — the three-column workspace (advisor + net worth)" />
            </div>
          </div>
        </div>

        {/* WHAT IT IS */}
        <Reveal>
          <section className="block">
            <div className="wrap read">
              <p className="kicker mono">What it is</p>
              <h2 className="h2">A financial model your family can actually talk to.</h2>
              <p className="lede">Juno holds every account, debt, and recurring dollar, then computes net worth, runway, and debt-payoff dates from them — and lets you ask what happens next.</p>
              <p className="body">A Claude-powered advisor answers what-if questions against the real figures with scenario timelines. Ask about a job loss, a home purchase, or paying a card off early, and the answer comes back as a projection you can read — not a guess.</p>
              <p className="body">It also keeps its own ledger: as a conversation establishes new facts, the advisor can add, update, and correct rows, and file “app gap” tasks when the data model is missing something. The same codebase runs on a real household behind auth or on a fully fictional demo — identical code paths, only the data source differs.</p>
            </div>
          </section>
        </Reveal>

        {/* CORE IDEA */}
        <Reveal>
          <section className="block">
            <div className="wrap read">
              <p className="kicker mono">The core idea</p>
              <h2 className="h2">An advisor that never does math it can't verify.</h2>
              <p className="body">The trust problem with an LLM near your money is arithmetic. Juno's answer: <strong>Claude is trusted with judgment, never calculation.</strong> It returns scenario <em>deltas</em> — add this income, end that flow, pay this debt down early — and a local engine computes every projection, runway, and payoff date. Claude never even sees raw account numbers, only names, amounts, and rates.</p>
            </div>
            <div className="wrap">
              <div className="diagram">
                <svg viewBox="0 0 900 220" role="img" aria-label="Claude returns scenario deltas; the local engine computes every number">
                  <rect className="dg-box gold" x="24" y="70" width="200" height="80" rx="12" />
                  <text className="dg-t" x="48" y="104">Claude advisor</text>
                  <text className="dg-s" x="48" y="126">judgment · deltas</text>
                  <rect className="dg-box accent" x="350" y="70" width="200" height="80" rx="12" />
                  <text className="dg-t" x="374" y="104">Local engine</text>
                  <text className="dg-s" x="374" y="126">src/lib/metrics</text>
                  <rect className="dg-box" x="676" y="70" width="200" height="80" rx="12" />
                  <text className="dg-t" x="700" y="100">Projections</text>
                  <text className="dg-s" x="700" y="122">runway · payoffs</text>
                  <path className="dg-line gold" d="M224 110 H338" />
                  <path className="dg-line gold" d="M330 104 l10 6 -10 6" />
                  <text className="dg-cap" x="238" y="98">scenario deltas</text>
                  <path className="dg-line accent" d="M550 110 H664" />
                  <path className="dg-line accent" d="M656 104 l10 6 -10 6" />
                  <text className="dg-cap" x="566" y="98">computed numbers</text>
                  <path className="dg-line" d="M124 150 V186 H776 V150" strokeDasharray="3 5" />
                  <text className="dg-cap" x="300" y="206">Claude never sees raw balances — only names, amounts, and rates</text>
                </svg>
              </div>
            </div>
          </section>
        </Reveal>

        {/* HIGHLIGHTS */}
        <Laurel />
        <section className="block">
          <div className="wrap">
            <div className="read">
              <p className="kicker mono">Highlights</p>
              <h2 className="h2">What's interesting under the hood.</h2>
            </div>
            <div className="features">
              {FEATURES.map(({ Icon, title, body }, i) => (
                <Reveal key={title} delay={(i % 3) * 0.06}>
                  <div className="feature">
                    <span className="fi" aria-hidden="true"><Icon strokeWidth={1.5} /></span>
                    <h3>{title}</h3>
                    <p>{body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* GALLERY */}
        <section className="block">
          <div className="wrap">
            <div className="read">
              <p className="kicker mono">A closer look</p>
              <h2 className="h2">Around the app.</h2>
            </div>
            <div className="gallery">
              <div className="gcell"><Shot placeholder="Advisor conversation — a scenario timeline in the workspace" /></div>
              <div className="gcell"><Shot placeholder="Net worth over time / accounts overview" /></div>
              <div className="gcell"><Shot placeholder="A what-if scenario chart with event markers" /></div>
              <div className="gcell"><Shot placeholder="The design-system page (tokens + components)" /></div>
            </div>
          </div>
        </section>

        {/* ARCHITECTURE */}
        <Laurel />
        <Reveal>
          <section className="block">
            <div className="wrap read">
              <p className="kicker mono">Architecture</p>
              <h2 className="h2">One frontend, RLS everywhere, secrets on the edge.</h2>
              <p className="body">The client is a static React SPA that talks directly to Supabase Postgres under row-level security with the publishable key — there's no separate app server. The only server code is two Deno edge functions: the JWT-gated <code>claude-proxy</code> that holds the Anthropic key and runs the advisor, and an ICS calendar feed.</p>
            </div>
            <div className="wrap">
              <div className="diagram">
                <svg viewBox="0 0 900 200" role="img" aria-label="React SPA talks to Supabase under RLS; a JWT-gated edge function proxies Claude">
                  <rect className="dg-box" x="24" y="60" width="190" height="80" rx="12" />
                  <text className="dg-t" x="46" y="94">Browser</text>
                  <text className="dg-s" x="46" y="116">React 19 SPA</text>
                  <rect className="dg-box accent" x="355" y="60" width="190" height="80" rx="12" />
                  <text className="dg-t" x="377" y="94">Supabase</text>
                  <text className="dg-s" x="377" y="116">Postgres · RLS</text>
                  <rect className="dg-box gold" x="686" y="30" width="190" height="60" rx="12" />
                  <text className="dg-t" x="708" y="58">claude-proxy</text>
                  <text className="dg-s" x="708" y="78">edge · JWT-gated</text>
                  <rect className="dg-box" x="686" y="112" width="190" height="52" rx="12" />
                  <text className="dg-t" x="708" y="136">Claude</text>
                  <text className="dg-s" x="708" y="154">Sonnet · Haiku</text>
                  <path className="dg-line accent" d="M214 100 H349" />
                  <path className="dg-line accent" d="M341 94 l10 6 -10 6" />
                  <text className="dg-cap" x="232" y="88">CRUD · anon key</text>
                  <path className="dg-line gold" d="M545 92 C 620 92 620 60 680 60" />
                  <path className="dg-line gold" d="M672 54 l10 6 -10 6" />
                  <path className="dg-line" d="M876 60 C 900 92 900 108 876 138" />
                  <text className="dg-cap" x="560" y="46">advisor turn</text>
                </svg>
              </div>
            </div>
            <div className="wrap read">
              <ul className="points">
                <li><strong>RLS on every table</strong>, keyed through household membership — the deployed client only ever sees its own household's rows.</li>
                <li><strong>The Anthropic key never touches the browser</strong> — it lives only in edge-function secrets.</li>
                <li><strong>Additive migrations only</strong> — a deployed frontend never breaks against a newer DB; per-feature data goes in jsonb bags, not a migration per knob.</li>
                <li><strong>Money is integer cents (bigint)</strong> everywhere; one module is the only parser and formatter.</li>
              </ul>
            </div>
          </section>
        </Reveal>

        {/* BUILT WITH */}
        <section className="block">
          <div className="wrap read">
            <p className="kicker mono">Built with</p>
            <div className="chips">
              {['React 19', 'TypeScript', 'Vite', 'Tailwind v4', 'Recharts', 'Supabase', 'Postgres · RLS', 'Deno Edge Functions', 'Claude (Anthropic)', 'MCP', 'Bun'].map((c) => (
                <span className="chip" key={c}>{c}</span>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* CTA BAND */}
      <div className="cta-band">
        <div className="wrap">
          <div className="cta-inner">
            <p className="cta-line">Meet Juno.</p>
            {CTA}
          </div>
        </div>
      </div>

      <div className="cs-foot">
        <div className="wrap"><Link className="back" to="/">← Back to home</Link></div>
      </div>

      <Tide hour={hour} />
    </div>
  )
}
