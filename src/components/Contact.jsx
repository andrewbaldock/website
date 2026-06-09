import { Link } from 'react-router-dom'

export default function Contact() {
  return (
    <section id="contact" className="section-contact">
      <div className="section">
        <div className="contact">
          <p className="contact__name">Andrew Baldock</p>
          <ul className="contact__list">
            <li><Link to="/aether">Project: Aether</Link></li>
            <li><Link to="/resume">Resume</Link></li>
            <li><a href="https://www.linkedin.com/in/andrewbaldock/" target="_blank" rel="noopener noreferrer">linkedin.com/in/andrewbaldock</a></li>
            <li><a href="https://github.com/andrewbaldock" target="_blank" rel="noopener noreferrer">github.com/andrewbaldock</a></li>
            <li><a href="https://www.youtube.com/@baldockdigital/videos" target="_blank" rel="noopener noreferrer">youtube.com/@baldockdigital/videos</a></li>
          </ul>
        </div>
      </div>
    </section>
  )
}
