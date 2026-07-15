import { Monitor, Sparkles, Layers } from 'lucide-react'

// Coastal hero — the name is dialed down so the sky + tide lead; a quiet
// capabilities trio carries the "what I do".
const CAPS = [
  { Icon: Monitor, title: 'Product UI & design systems', body: 'Polished, production interfaces and the token systems that keep them consistent.' },
  { Icon: Sparkles, title: 'AI-native / LLM apps', body: 'Agent loops, tool use, and MCP — both in the app for the user, and in the code for humans and AIs to reason about immediately.' },
  { Icon: Layers, title: 'More Strategic', body: 'Real-time, data-intensive apps built strategically to stay performant and evolvable at scale.' },
]

export default function Hero() {
  return (
    <section className="hero">
      <div className="wrap">
        <span className="eyebrow mono">React · TypeScript · AI-Native Product Engineering</span>
        <h1>Andrew <span className="amp">Baldock</span></h1>
        <p className="tagline">Frontier-grade product UI.</p>
        <p className="positioning">
          <strong>Senior React &amp; TypeScript engineer and engineering manager</strong> — ten years
          shipping polished product UI and the design systems beneath it, and years leading the team that
          ships it, mentoring multiple engineers to senior. Now building <strong>AI-native products</strong>{' '}
          end to end, from data model to the last pixel. Open to a senior IC or lead role.
        </p>

        <div className="caps">
          {CAPS.map(({ Icon, title, body }) => (
            <div className="cap" key={title}>
              <span className="ci" aria-hidden="true"><Icon strokeWidth={1.5} /></span>
              <h3>{title}</h3>
              <p>{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
