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
import ThemeToggle, { usePageTheme } from './ThemeToggle.jsx'

const REPO_URL = 'https://github.com/andrewbaldock/aether'

// The Aether wordmark — lifted from AetherCard so the case study leads with the
// same brand mark: solid Grenze Gotisch (blackletter) in the pink→cyan gradient,
// no glow, matching the live app.
function AetherWordmark() {
  return (
    <svg className="aether-cs__wordmark" viewBox="0 0 480 100" aria-label="Aether">
      <defs>
        <linearGradient id="aether-cs-duo" x1="0" y1="0.65" x2="1" y2="0.35">
          <stop offset="0%" stopColor="#ff2e9a" />
          <stop offset="50%" stopColor="#b54bd0" />
          <stop offset="100%" stopColor="#16c2ff" />
        </linearGradient>
      </defs>
      <text x="240" y="80" textAnchor="middle" fontFamily="'Grenze Gotisch', serif" fontWeight="600"
        fontSize="90" letterSpacing="1" fill="url(#aether-cs-duo)">Aether</text>
    </svg>
  )
}

// A mechanical-drawing-style blueprint of the 3-column shell. Authored as inline
// SVG so the dimension lines, witness lines, and callouts read as real drafting
// rather than styled divs — cyan/pink line-work on the page's dark ground, like a
// backlit CAD viewport. All measurements are the live app's: sidebar 240px, 4px
// drag handle, chat 30–82%, capability 20–32% (collapses to 0), 768px breakpoint.
// Decorative — the prose carries the meaning, so the whole figure is aria-hidden.
function InterfaceBlueprint() {
  return (
    <svg
      className="aether-cs__bp"
      viewBox="0 0 920 560"
      role="img"
      aria-label="Mechanical drawing of Aether's three-column interface shell"
    >
      <defs>
        {/* Arrowheads for dimension lines, both ends. */}
        <marker id="bp-arr" markerWidth="9" markerHeight="9" refX="7" refY="3"
          orient="auto" markerUnits="userSpaceOnUse">
          <path d="M0,0 L7,3 L0,6 Z" fill="currentColor" />
        </marker>
        <marker id="bp-arr-s" markerWidth="9" markerHeight="9" refX="0" refY="3"
          orient="auto" markerUnits="userSpaceOnUse">
          <path d="M7,0 L0,3 L7,6 Z" fill="currentColor" />
        </marker>
      </defs>

      {/* ── Sheet border + inner frame ── */}
      <rect className="aether-cs__bp-sheet" x="6" y="6" width="908" height="548" rx="2" />
      <rect className="aether-cs__bp-frame" x="16" y="16" width="888" height="528" />

      {/* ── PLAN VIEW: the three columns ── */}
      <g className="aether-cs__bp-plan">
        {/* outer device outline */}
        <rect className="aether-cs__bp-device" x="60" y="92" width="540" height="240" />

        {/* sidebar (col 1) */}
        <rect className="aether-cs__bp-col" x="60" y="92" width="92" height="240" />
        {/* drag handle (4px) — centered, so conversation + capability are equal width */}
        <rect className="aether-cs__bp-handle" x="373" y="92" width="6" height="240" />
        {/* chat (col 2) — half the resizable area */}
        <rect className="aether-cs__bp-col aether-cs__bp-col--chat" x="152" y="92" width="221" height="240" />
        {/* capability (col 3) — equal to conversation */}
        <rect className="aether-cs__bp-col" x="379" y="92" width="221" height="240" />

        {/* column inner labels */}
        <text className="aether-cs__bp-l" x="106" y="206">SIDEBAR</text>
        <text className="aether-cs__bp-s" x="106" y="222">conversations</text>

        {/* ── Capability column interior: tab bar across the top + an active
            widget (force-graph), mirroring DETAIL B. ── */}
        <text className="aether-cs__bp-l" x="489" y="110">CAPABILITY</text>
        <text className="aether-cs__bp-s" x="489" y="124">widget slot</text>
        {/* tab bar */}
        <line className="aether-cs__bp-slot-div" x1="389" y1="150" x2="590" y2="150" />
        <rect className="aether-cs__bp-tab aether-cs__bp-tab--on" x="389" y="138" width="44" height="12" />
        <rect className="aether-cs__bp-tab" x="437" y="138" width="44" height="12" />
        <rect className="aether-cs__bp-tab" x="485" y="138" width="36" height="12" />
        {/* active widget — a force-graph */}
        <g className="aether-cs__bp-ob-graph">
          <line x1="489" y1="200" x2="455" y2="178" />
          <line x1="489" y1="200" x2="528" y2="180" />
          <line x1="489" y1="200" x2="462" y2="226" />
          <line x1="489" y1="200" x2="524" y2="222" />
          <circle cx="489" cy="200" r="7" />
          <circle cx="455" cy="178" r="4.5" />
          <circle cx="528" cy="180" r="4.5" />
          <circle cx="462" cy="226" r="4.5" />
          <circle cx="524" cy="222" r="4.5" />
        </g>

        {/* hidden-line grid hint inside sidebar (conversation rows) */}
        <line className="aether-cs__bp-hidden" x1="72" y1="116" x2="140" y2="116" />
        <line className="aether-cs__bp-hidden" x1="72" y1="130" x2="140" y2="130" />
        <line className="aether-cs__bp-hidden" x1="72" y1="144" x2="140" y2="144" />

        {/* ── Conversation column interior: faint dialog history, compose box
            (with model switcher + send), and a tools bar — the real ChatPanel. */}
        <text className="aether-cs__bp-l" x="262" y="110">CONVERSATION</text>
        <text className="aether-cs__bp-s" x="262" y="124">persistent dialog</text>

        {/* faint dialog — assistant lines (left) + a user bubble (right) */}
        <g className="aether-cs__bp-dialog">
          {/* assistant turn */}
          <line x1="166" y1="146" x2="250" y2="146" />
          <line x1="166" y1="156" x2="262" y2="156" />
          <line x1="166" y1="166" x2="232" y2="166" />
          {/* user bubble, right-aligned */}
          <rect className="aether-cs__bp-bubble" x="270" y="178" width="90" height="26" rx="5" />
          {/* assistant turn */}
          <line x1="166" y1="218" x2="256" y2="218" />
          <line x1="166" y1="228" x2="238" y2="228" />
          <line x1="166" y1="238" x2="260" y2="238" />
        </g>

        {/* compose box */}
        <rect className="aether-cs__bp-compose" x="162" y="266" width="201" height="34" rx="5" />
        <line className="aether-cs__bp-hidden" x1="172" y1="276" x2="250" y2="276" />
        {/* model switcher pill (bottom-right inside box) */}
        <rect className="aether-cs__bp-switcher" x="300" y="287" width="38" height="9" rx="4.5" />
        <text className="aether-cs__bp-tiny" x="319" y="294">Sonnet ⌄</text>
        {/* send button */}
        <rect className="aether-cs__bp-send" x="342" y="286" width="11" height="11" rx="3" />

        {/* tools bar — KG chip (left), help (right) */}
        <rect className="aether-cs__bp-tool" x="162" y="308" width="46" height="13" rx="6.5" />
        <text className="aether-cs__bp-tiny" x="185" y="317">⊹ Graph</text>
        <circle className="aether-cs__bp-tool-dot" cx="357" cy="314" r="6" />
        <text className="aether-cs__bp-tiny" x="357" y="317">?</text>

        {/* part numbers / balloons */}
        <g className="aether-cs__bp-balloon">
          <circle cx="106" cy="80" r="9" /><text x="106" y="84">1</text>
        </g>
        <g className="aether-cs__bp-balloon">
          <circle cx="262" cy="80" r="9" /><text x="262" y="84">2</text>
        </g>
        <g className="aether-cs__bp-balloon">
          <circle cx="489" cy="80" r="9" /><text x="489" y="84">3</text>
        </g>

        {/* ── dimension lines (witness + arrows) ── */}
        {/* sidebar width = 240px */}
        <g className="aether-cs__bp-dim">
          <line className="aether-cs__bp-wit" x1="60" y1="332" x2="60" y2="356" />
          <line className="aether-cs__bp-wit" x1="152" y1="332" x2="152" y2="356" />
          <line className="aether-cs__bp-dimline" x1="60" y1="348" x2="152" y2="348"
            markerStart="url(#bp-arr-s)" markerEnd="url(#bp-arr)" />
          <text className="aether-cs__bp-dimtxt" x="106" y="344">240px</text>
        </g>
        {/* conversation = capability (equal split) */}
        <g className="aether-cs__bp-dim">
          <line className="aether-cs__bp-wit" x1="152" y1="332" x2="152" y2="372" />
          <line className="aether-cs__bp-wit" x1="373" y1="332" x2="373" y2="372" />
          <line className="aether-cs__bp-dimline" x1="152" y1="364" x2="373" y2="364"
            markerStart="url(#bp-arr-s)" markerEnd="url(#bp-arr)" />
          <text className="aether-cs__bp-dimtxt" x="262" y="360">conversation</text>
        </g>
        <g className="aether-cs__bp-dim aether-cs__bp-dim--accent">
          <line className="aether-cs__bp-wit" x1="379" y1="332" x2="379" y2="372" />
          <line className="aether-cs__bp-wit" x1="600" y1="332" x2="600" y2="372" />
          <line className="aether-cs__bp-dimline" x1="379" y1="364" x2="600" y2="364"
            markerStart="url(#bp-arr-s)" markerEnd="url(#bp-arr)" />
          <text className="aether-cs__bp-dimtxt aether-cs__bp-dimtxt--accent" x="489" y="360">capability</text>
        </g>
        {/* handle leader */}
        <g className="aether-cs__bp-dim aether-cs__bp-dim--accent">
          <line className="aether-cs__bp-lead" x1="376" y1="92" x2="376" y2="60" />
          <text className="aether-cs__bp-dimtxt aether-cs__bp-dimtxt--accent" x="376" y="54">4px drag handle ⇄</text>
        </g>

        {/* behavior callouts on the plan itself */}
        <text className="aether-cs__bp-note" x="489" y="252">→ 0 collapses when empty</text>
        <text className="aether-cs__bp-note aether-cs__bp-note--accent" x="489" y="266">⤢ expands fullscreen</text>

        <text className="aether-cs__bp-view" x="60" y="404">PLAN VIEW — DESKTOP SHELL ( ≥ 768px )</text>
      </g>

      {/* ── DETAIL B: the capability column as a stack of tabbed widgets, drawn
           in oblique (cabinet) projection — depth runs up-right at a fixed
           offset. Each panel behind the front is a registered widget; tabs along
           the top switch between them. Leader ties it back to plan-view col 3. */}
      <g className="aether-cs__bp-detail">
        <text className="aether-cs__bp-view" x="640" y="80">DETAIL B — CAPABILITY STACK ( OBLIQUE )</text>

        {/* leader from plan-view capability column up to the oblique view */}
        <line className="aether-cs__bp-lead" x1="600" y1="176" x2="640" y2="156" markerEnd="url(#bp-arr)" />

        {/* Three panels, offset up-right (dx +20 / dy -24 each), drawn back-to-
            front so each overlaps the one behind it. Stack shifted left to leave
            room for the right-hand captions. */}
        {/* Each tab is its own colour: chart = purple, table = cyan, graph =
            pink (the active front). Tab, panel stroke + widget hint all share it. */}
        {/* back panel 3 — CHART widget (purple), centred on its face */}
        <polygon className="aether-cs__bp-ob-face aether-cs__bp-ob-back aether-cs__bp-ob--chart" points="688,140 800,140 800,256 688,256" />
        <g className="aether-cs__bp-ob-hint aether-cs__bp-ob--chart">
          {/* axes */}
          <line x1="736" y1="150" x2="736" y2="196" />
          <line x1="736" y1="196" x2="788" y2="196" />
          {/* bars */}
          <rect x="742" y="176" width="8" height="20" />
          <rect x="754" y="164" width="8" height="32" />
          <rect x="766" y="170" width="8" height="26" />
          <rect x="778" y="156" width="8" height="40" />
        </g>
        {/* back panel 2 — TABLE widget (cyan), centred on its face */}
        <polygon className="aether-cs__bp-ob-face aether-cs__bp-ob-back aether-cs__bp-ob--table" points="668,164 780,164 780,280 668,280" />
        <g className="aether-cs__bp-ob-hint aether-cs__bp-ob--table">
          <rect x="696" y="196" width="56" height="48" />
          {/* rows */}
          <line x1="696" y1="208" x2="752" y2="208" />
          <line x1="696" y1="220" x2="752" y2="220" />
          <line x1="696" y1="232" x2="752" y2="232" />
          {/* columns */}
          <line x1="715" y1="196" x2="715" y2="244" />
          <line x1="733" y1="196" x2="733" y2="244" />
        </g>
        {/* tab stubs peeking from the back panels — flat, colour-coded, labelled */}
        <rect className="aether-cs__bp-ob-tab aether-cs__bp-ob--chart" x="702" y="130" width="36" height="10" />
        <text className="aether-cs__bp-ob-tablabel aether-cs__bp-ob-tablabel--chart" x="720" y="137.5">chart</text>
        <rect className="aether-cs__bp-ob-tab aether-cs__bp-ob--table" x="682" y="154" width="36" height="10" />
        <text className="aether-cs__bp-ob-tablabel aether-cs__bp-ob-tablabel--table" x="700" y="161.5">table</text>

        {/* FRONT panel — the active GRAPH widget (pink) */}
        <polygon className="aether-cs__bp-ob-face aether-cs__bp-ob-front aether-cs__bp-ob--graph" points="648,188 760,188 760,304 648,304" />
        {/* its tab (active) — flat rectangle */}
        <rect className="aether-cs__bp-ob-tab aether-cs__bp-ob-tab--on aether-cs__bp-ob--graph" x="662" y="178" width="36" height="10" />
        <text className="aether-cs__bp-ob-tablabel" x="680" y="185.5">graph</text>
        {/* widget content hint on the front face — a little force-graph */}
        <g className="aether-cs__bp-ob-graph">
          <line x1="700" y1="240" x2="678" y2="222" />
          <line x1="700" y1="240" x2="726" y2="226" />
          <line x1="700" y1="240" x2="688" y2="276" />
          <line x1="700" y1="240" x2="734" y2="266" />
          <circle cx="700" cy="240" r="6" />
          <circle cx="678" cy="222" r="4" />
          <circle cx="726" cy="226" r="4" />
          <circle cx="688" cy="276" r="4" />
          <circle cx="734" cy="266" r="4" />
        </g>

        {/* callouts — right-anchored so they never run past the frame */}
        <line className="aether-cs__bp-lead" x1="740" y1="146" x2="808" y2="146" markerEnd="url(#bp-arr)" />
        <text className="aether-cs__bp-ob-cap" x="896" y="144">tabs switch widgets</text>
        <line className="aether-cs__bp-lead" x1="760" y1="296" x2="808" y2="296" markerEnd="url(#bp-arr)" />
        <text className="aether-cs__bp-ob-cap" x="896" y="294">active widget face</text>

        <text className="aether-cs__bp-note" x="640" y="338">each tab = a registered renderer · graph · chart · 3D · table</text>
        <text className="aether-cs__bp-note aether-cs__bp-note--accent" x="640" y="354">register( type ) → new widget, shell untouched</text>
      </g>

      {/* ── PROJECTION: mobile ── */}
      <g className="aether-cs__bp-mobile">
        <text className="aether-cs__bp-view" x="60" y="446">3RD-ANGLE PROJECTION — MOBILE ( &lt; 768px )</text>

        {/* phone 1: chat full */}
        <rect className="aether-cs__bp-phone" x="60" y="456" width="56" height="84" rx="6" />
        <rect className="aether-cs__bp-mini-fill" x="64" y="466" width="48" height="70" />
        <text className="aether-cs__bp-s" x="88" y="552">chat</text>

        {/* phone 2: drawer */}
        <rect className="aether-cs__bp-phone" x="150" y="456" width="56" height="84" rx="6" />
        <rect className="aether-cs__bp-mini-fill aether-cs__bp-scrim" x="154" y="466" width="48" height="70" />
        <rect className="aether-cs__bp-mini-fill aether-cs__bp-mini-fill--side" x="154" y="466" width="32" height="70" />
        <text className="aether-cs__bp-s" x="178" y="552">drawer</text>

        {/* phone 3: overlay */}
        <rect className="aether-cs__bp-phone" x="240" y="456" width="56" height="84" rx="6" />
        <rect className="aether-cs__bp-mini-fill aether-cs__bp-mini-fill--cap" x="244" y="466" width="48" height="70" />
        <text className="aether-cs__bp-s" x="268" y="552">overlay</text>

        {/* leader to plan */}
        <line className="aether-cs__bp-lead" x1="120" y1="498" x2="150" y2="498"
          markerEnd="url(#bp-arr)" />
        <line className="aether-cs__bp-lead" x1="210" y1="498" x2="240" y2="498"
          markerEnd="url(#bp-arr)" />
        <text className="aether-cs__bp-note" x="320" y="492">stacks vertically · sidebar → off-canvas drawer</text>
        <text className="aether-cs__bp-note" x="320" y="508">capability → full-screen overlay · 44px touch targets</text>
      </g>

      {/* ── TITLE BLOCK ── */}
      <g className="aether-cs__bp-title">
        <rect x="640" y="476" width="244" height="56" />
        <line x1="640" y1="494" x2="884" y2="494" />
        <line x1="640" y1="513" x2="884" y2="513" />
        <line x1="780" y1="476" x2="780" y2="532" />
        <text className="aether-cs__bp-tk" x="646" y="488">PROJECT</text>
        <text className="aether-cs__bp-tv" x="646" y="508">AETHER · SHELL LAYOUT</text>
        <text className="aether-cs__bp-tk" x="786" y="488">DRG No.</text>
        <text className="aether-cs__bp-tv" x="786" y="508">AE/SHL/001</text>
        <text className="aether-cs__bp-tk" x="646" y="525">SCALE  NTS</text>
        <text className="aether-cs__bp-tk" x="730" y="525">REV  A</text>
        <text className="aether-cs__bp-tk" x="786" y="525">SHEET 1 OF 1</text>
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
  { provider: 'Claude (Anthropic)', models: ['Sonnet 4.6', 'Opus 4.8', 'Haiku 4.5'] },
  { provider: 'Gemini (Google)', models: ['3.5 Flash', '3.1 Flash-Lite'] },
  { provider: 'DeepSeek', models: ['V4 Flash'] },
  { provider: 'Mistral', models: ['Small'] },
]

export default function AetherCaseStudy() {
  useEffect(() => { window.scrollTo(0, 0) }, [])
  const { theme, toggle } = usePageTheme()

  return (
    <div className="aether-cs">
      <ThemeToggle theme={theme} onToggle={toggle} />
      <div className="aether-cs__inner">
        <div className="aether-cs__topbar">
          <Link to="/" className="aether-cs__back">← Back</Link>
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
          <h2 className="aether-cs__h2">The interface</h2>
          <p className="aether-cs__body">
            A three-column shell, drawn to spec. The sidebar holds your
            conversations and collapses out of the way; the middle column is the
            persistent dialog that never leaves; the right column is the
            capability slot — a pluggable bay that houses any kind of widget. The
            seam between them is a drag handle, so you set the balance — or send
            the capability fullscreen. Below 768px the whole assembly folds into
            a mobile shell.
          </p>

          <figure className="aether-cs__bp-fig">
            <InterfaceBlueprint />
          </figure>

          <ul className="aether-cs__points">
            <li><strong>Sidebar</strong> — a fixed 240px rail of conversations that collapses to zero, leaving a floating toggle.</li>
            <li><strong>Conversation</strong> — the persistent dialog: streaming messages, composer, and model picker, always present.</li>
            <li><strong>Capability</strong> — a resizable bay that collapses to zero when empty and can take over fullscreen; tabbed widgets register by <code>type</code>, so the shell never changes.</li>
            <li><strong>Resizable</strong> — a 4px handle rebalances dialog and capability; the split animates and persists across visits.</li>
            <li><strong>Mobile</strong> — under 768px the columns restack: the sidebar becomes an off-canvas drawer and the capability a full-screen overlay.</li>
          </ul>
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
            {LLMS.map(({ provider, models }) => (
              <span className="aether-cs__chip aether-cs__chip--llm" key={provider}>
                <span className="aether-cs__chip-name">{provider}</span>
                <span className="aether-cs__chip-models">{models.join(' · ')}</span>
              </span>
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
