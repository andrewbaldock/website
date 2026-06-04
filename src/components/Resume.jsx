import { Link } from 'react-router-dom'

export default function Resume() {
  return (
    <section id="resume" className="section-resume">
      <div className="section">
        <div className="resume-buttons">
          <Link className="primary" to="/resume">View Resume</Link>
        </div>
      </div>
    </section>
  )
}
