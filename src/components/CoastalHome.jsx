import { Link } from 'react-router-dom'
import { useTimeOfDay } from '../coastal/useTimeOfDay'
import Sky from '../coastal/Sky.jsx'
import SkyLife from '../coastal/SkyLife.jsx'
import BridgeLights from '../coastal/BridgeLights.jsx'
import Tide from '../coastal/Tide.jsx'
import TodToggle from '../coastal/TodToggle.jsx'
import Reveal from '../coastal/Reveal.jsx'
import BridgeWater from '../coastal/BridgeWater.jsx'
import CoinRays from '../coastal/CoinRays.jsx'
import Hero from './Hero.jsx'
import { AetherLogo } from './AetherLogo.jsx'
import MagicStickyCardWordmark from './MagicStickyCardWordmark.jsx'

export default function CoastalHome() {
  const tod = useTimeOfDay()
  const { hour } = tod

  return (
    <div className="coastal">
      <Sky hour={hour} />
      {/* Line-drawn cloud landscape filling the left of the sky — the mirror
          of the bridge engraving on the right, masked so it recolors with the
          day↔night flip. */}
      <div className="clouds" aria-hidden="true" />
      {/* Occasional gulls, a plane, and a drifting line-cloud across the top. */}
      <SkyLife />
      {/* Bay Bridge over a watercolor wash of bay water, engraved into the right
          side of the background — masked so it recolors with the day↔night flip. */}
      <BridgeWater />
      <div className="bridge" aria-hidden="true" />
      {/* Twinkling deck lamps, lit only at night. */}
      <BridgeLights />

      <header>
        <div className="wrap">
          <nav className="nav" aria-label="Primary">
            <Link className="brand" to="/" aria-label="Andrew Baldock, home">
              <span className="dot" aria-hidden="true" />
              A. BALDOCK
            </Link>
            <div className="nav-right">
              <ul className="nav-links">
                <li><Link to="/resume">Résumé</Link></li>
                <li><a href="https://www.linkedin.com/in/andrewbaldock" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                <li><a href="https://github.com/andrewbaldock" target="_blank" rel="noopener noreferrer">GitHub</a></li>
                <li><a href="https://www.youtube.com/@baldockdigital/videos" target="_blank" rel="noopener noreferrer">YouTube</a></li>
              </ul>
              <TodToggle {...tod} />
            </div>
          </nav>
        </div>
      </header>

      <main id="top">
        <Hero />

        <section className="work">
          <div className="wrap">
            <div className="work-head">
              <h2>Selected work</h2>
              <p>Three fullstack apps for the modern age — AI-agent enabled, design system included.<span className="work-stack">React · TS · Vite · Tailwind · Postgres</span></p>
            </div>
            <div className="work-rows">
              <Reveal>
                <article className="wrow" style={{ '--ac': 'var(--gold)' }}>
                  <div className="wrow-media">
                    <img src="/images/juno.png" alt="Juno — household finance companion" loading="lazy" />
                  </div>
                  <div className="wrow-body">
                    <div className="wrow-mark">
                      <span className="wrow-brand">
                        <span className="wrow-coinwrap"><CoinRays /><img className="wrow-coin" src="/images/juno-coin.png" alt="" aria-hidden="true" /></span>
                        <span className="wrow-word">J<span className="u">UNO</span></span>
                      </span>
                    </div>
                    <span className="card-num">01 — Flagship</span>
                    <p className="desc">A household-finance companion that models a family's whole money picture and embeds a Claude advisor — one that returns scenario deltas while the app does every calculation. It even maintains its own ledger over MCP, and ships a public design system.</p>
                    <div className="wrow-links">
                      <Link className="wrow-cover" to="/juno">Case study <span className="arw" aria-hidden="true">→</span></Link>
                      <a href="https://juno-demo.andrewbaldock.com" target="_blank" rel="noopener noreferrer">Live demo <span className="arw" aria-hidden="true">↗</span></a>
                      <a href="https://juno-demo.andrewbaldock.com/design" target="_blank" rel="noopener noreferrer">Design system <span className="arw" aria-hidden="true">↗</span></a>
                    </div>
                  </div>
                </article>
              </Reveal>
              <Reveal delay={0.08}>
                <article className="wrow" style={{ '--ac': 'var(--periwinkle)' }}>
                  <div className="wrow-media">
                    <video src="/images/aether.webm" poster="/images/aether-poster.jpg" autoPlay loop muted playsInline />
                  </div>
                  <div className="wrow-body">
                    <div className="wrow-mark">
                      <span className="wrow-brand">
                        <span className="wrow-alogo"><AetherLogo size={26} /></span>
                        <span className="wrow-aword">Aether</span>
                      </span>
                    </div>
                    <span className="card-num">02 — Product</span>
                    <p className="desc">A conversational explorer with a knowledge-graph UI — ask a question, watch the answer assemble itself into connected, navigable panels. Built as a platform: capabilities plug into a stable shell.</p>
                    <div className="wrow-links">
                      <Link className="wrow-cover" to="/aether">Case study <span className="arw" aria-hidden="true">→</span></Link>
                      <a href="https://aether.andrewbaldock.com" target="_blank" rel="noopener noreferrer">Live demo <span className="arw" aria-hidden="true">↗</span></a>
                    </div>
                  </div>
                </article>
              </Reveal>
              <Reveal delay={0.16}>
                <article className="wrow" style={{ '--ac': 'var(--mint)' }}>
                  <div className="wrow-media">
                    <img src="/images/magicsticky.png" alt="Magic Sticky — MCP sticky-note store" loading="lazy" />
                  </div>
                  <div className="wrow-body">
                    <div className="wrow-mark"><MagicStickyCardWordmark /></div>
                    <span className="card-num">03 — Product</span>
                    <p className="desc">A frictionless MCP sticky-note store — one shared note that every one of your AI agents reads and writes, so context follows you everywhere.</p>
                    <div className="wrow-links">
                      <Link className="wrow-cover" to="/magicsticky">Case study <span className="arw" aria-hidden="true">→</span></Link>
                    </div>
                  </div>
                </article>
              </Reveal>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap">
          <div className="foot">
            <div className="foot-name">Andrew Baldock<span className="sub">Senior React / TypeScript Engineer</span></div>
            <ul className="foot-links">
              <li><a href="https://www.linkedin.com/in/andrewbaldock" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
              <li><a href="https://github.com/andrewbaldock" target="_blank" rel="noopener noreferrer">GitHub</a></li>
              <li><a href="https://www.youtube.com/@baldockdigital/videos" target="_blank" rel="noopener noreferrer">YouTube</a></li>
              <li><Link to="/resume">Résumé</Link></li>
            </ul>
          </div>
        </div>
      </footer>

      <Tide hour={hour} />
    </div>
  )
}
