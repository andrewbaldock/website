import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Download } from 'lucide-react'
import HomeMark from './HomeMark.jsx'
import { resume } from '../resumeData.js'
import { useTimeOfDay } from '../coastal/useTimeOfDay'
import Sky from '../coastal/Sky.jsx'
import Tide from '../coastal/Tide.jsx'
import TodToggle from '../coastal/TodToggle.jsx'

// Wrap **…** as <strong> and *…* as <em>. Split on bold first, then italics.
function italicize(text, keyPrefix) {
  return text.split('*').map((seg, i) =>
    i % 2 === 1 ? <em key={`${keyPrefix}-${i}`}>{seg}</em> : seg
  )
}
function RichText({ children }) {
  const parts = String(children).split('**')
  return parts.map((part, i) =>
    i % 2 === 1 ? <strong key={i}>{part}</strong> : italicize(part, i)
  )
}

// NOTE: the web résumé deliberately omits email/phone (only website/LinkedIn/
// GitHub). The PDF + Markdown renderers keep them — do not add them here.
function DownloadPdf() {
  return (
    <a className="r-dl" href="/resume.pdf" download>
      <Download size={15} strokeWidth={1.7} /> Download PDF
    </a>
  )
}

export default function ResumePage() {
  useEffect(() => { window.scrollTo(0, 0) }, [])
  const tod = useTimeOfDay()
  const { hour } = tod
  const { name, title, links } = resume

  return (
    <div className="coastal">
      <Sky hour={hour} />

      <header>
        <div className="r-wrap">
          <div className="topbar">
            <HomeMark />
            <div className="r-actions">
              <DownloadPdf />
              <TodToggle {...tod} />
            </div>
          </div>
        </div>
      </header>

      <main className="r-main">
        <div className="r-wrap">
          <header className="r-head">
            <h1 className="r-name">{name}</h1>
            <p className="r-title">{title}</p>
            <p className="r-contact">San Francisco Bay Area</p>
            <p className="r-contact">
              <a href={`https://${links.website}`} target="_blank" rel="noopener noreferrer">{links.website}</a>
              <span className="r-sep">·</span>
              <a href={`https://${links.linkedin}`} target="_blank" rel="noopener noreferrer">{links.linkedin}</a>
              <span className="r-sep">·</span>
              <a href={`https://${links.github}`} target="_blank" rel="noopener noreferrer">{links.github}</a>
            </p>
          </header>

          <section className="r-section">
            <h2 className="r-section-title">Summary</h2>
            <p className="r-summary">{resume.summary}</p>
            <p className="r-stack"><strong>Core stack:</strong> {resume.stack}</p>
          </section>

          <section className="r-section">
            <h2 className="r-section-title">Experience</h2>
            {resume.experience.map((job, i) => (
              <div className="r-job" key={i}>
                <div className="r-job-head">
                  <span className="r-role">{job.company} — {job.role}</span>
                  <span className="r-meta">{job.dates} · {job.place}</span>
                </div>
                <p className="r-blurb"><RichText>{job.blurb}</RichText></p>
                {job.bullets.length > 0 && (
                  <ul className="r-bullets">
                    {job.bullets.map((b, j) => <li key={j}><RichText>{b}</RichText></li>)}
                  </ul>
                )}
                {job.tech && <p className="r-tech">{job.tech}</p>}
              </div>
            ))}
          </section>

          <section className="r-section">
            <h2 className="r-section-title">Projects</h2>
            {resume.projects.map((proj, i) => (
              <div className="r-job" key={i}>
                <div className="r-job-head">
                  <span className="r-role">{proj.name}</span>
                  <span className="r-meta">{proj.meta}</span>
                </div>
                <p className="r-blurb"><RichText>{proj.blurb}</RichText></p>
                {proj.bullets.length > 0 && (
                  <ul className="r-bullets">
                    {proj.bullets.map((b, j) => <li key={j}><RichText>{b}</RichText></li>)}
                  </ul>
                )}
              </div>
            ))}
          </section>

          <section className="r-section">
            <h2 className="r-section-title">Education</h2>
            {resume.education.map((line, i) => (
              <p className="r-edu" key={i}><RichText>{line}</RichText></p>
            ))}
          </section>

          <section className="r-section">
            <h2 className="r-section-title">Certifications</h2>
            {resume.certifications.map((line, i) => (
              <p className="r-edu" key={i}><RichText>{line}</RichText></p>
            ))}
          </section>

          <div className="r-footer">
            <Link to="/" className="back">← Back to home</Link>
            <DownloadPdf />
          </div>
        </div>
      </main>

      <Tide hour={hour} />
    </div>
  )
}
