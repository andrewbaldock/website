import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { resume } from '../resumeData.js'
import Lotus from './Lotus.jsx'
import DownloadPdfButton from './DownloadPdfButton.jsx'
import ThemeToggle, { usePageTheme } from './ThemeToggle.jsx'

// Wrap **…** as <strong> and *…* as <em>. Split on bold first, then parse
// italics within the non-bold runs.
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

function SectionHeader({ children }) {
  return (
    <h2 className="resume-page__section-title">
      <Lotus size={18} color="#e040fb" className="resume-page__lotus" />
      {children}
    </h2>
  )
}

export default function ResumePage() {
  useEffect(() => { window.scrollTo(0, 0) }, [])
  const { name, title, links } = resume
  const { theme, toggle } = usePageTheme()
  return (
    <div className="resume-page">
      <ThemeToggle theme={theme} onToggle={toggle} />
      <div className="resume-page__inner">
        <div className="resume-page__topbar">
          <Link to="/" className="resume-page__back">← Back</Link>
          <DownloadPdfButton />
        </div>

        <header className="resume-page__head">
          <h1 className="resume-page__name">{name}</h1>
          <p className="resume-page__title">{title}</p>
          <p className="resume-page__contact">
            San Francisco Bay Area
          </p>
          <p className="resume-page__contact">
            <a href={`https://${links.website}`} target="_blank" rel="noopener noreferrer">{links.website}</a>
            <span className="resume-page__sep">·</span>
            <a href={`https://${links.linkedin}`} target="_blank" rel="noopener noreferrer">{links.linkedin}</a>
            <span className="resume-page__sep">·</span>
            <a href={`https://${links.github}`} target="_blank" rel="noopener noreferrer">{links.github}</a>
          </p>
        </header>

        <section className="resume-page__block">
          <SectionHeader>Summary</SectionHeader>
          <p className="resume-page__summary">{resume.summary}</p>
          <p className="resume-page__stack">
            <strong>Core stack:</strong> {resume.stack}
          </p>
        </section>

        <section className="resume-page__block">
          <SectionHeader>Experience</SectionHeader>
          {resume.experience.map((job, i) => (
            <div className="resume-page__job" key={i}>
              <div className="resume-page__job-head">
                <span className="resume-page__job-role">
                  {job.company} — {job.role}
                </span>
                <span className="resume-page__job-meta">
                  {job.dates} · {job.place}
                </span>
              </div>
              <p className="resume-page__job-blurb">
                <RichText>{job.blurb}</RichText>
              </p>
              {job.bullets.length > 0 && (
                <ul className="resume-page__bullets">
                  {job.bullets.map((b, j) => (
                    <li key={j}><RichText>{b}</RichText></li>
                  ))}
                </ul>
              )}
              {job.tech && <p className="resume-page__tech">{job.tech}</p>}
            </div>
          ))}
        </section>

        <section className="resume-page__block">
          <SectionHeader>Projects</SectionHeader>
          {resume.projects.map((proj, i) => (
            <div className="resume-page__job" key={i}>
              <div className="resume-page__job-head">
                <span className="resume-page__job-role">{proj.name}</span>
                <span className="resume-page__job-meta">{proj.meta}</span>
              </div>
              <p className="resume-page__job-blurb">
                <RichText>{proj.blurb}</RichText>
              </p>
              {proj.bullets.length > 0 && (
                <ul className="resume-page__bullets">
                  {proj.bullets.map((b, j) => (
                    <li key={j}><RichText>{b}</RichText></li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>

        <section className="resume-page__block">
          <SectionHeader>Education</SectionHeader>
          {resume.education.map((line, i) => (
            <p className="resume-page__edu-line" key={i}><RichText>{line}</RichText></p>
          ))}
        </section>

        <section className="resume-page__block">
          <SectionHeader>Certifications</SectionHeader>
          {resume.certifications.map((line, i) => (
            <p className="resume-page__edu-line" key={i}><RichText>{line}</RichText></p>
          ))}
        </section>

        <div className="resume-page__footer">
          <DownloadPdfButton />
          <Link to="/" className="resume-page__back">← Back to home</Link>
        </div>
      </div>
    </div>
  )
}
