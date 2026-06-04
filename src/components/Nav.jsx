import Tippy from '@tippyjs/react'
import { FileText, Rocket } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { GitHubIcon, LinkedInIcon, YouTubeIcon } from './BrandIcons.jsx'
import { AETHER_URL } from '../config.js'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/animations/shift-away.css'

const links = [
  { glyph: '\u{1104D}',  label: 'Aether',        to: '/aether',                                             internal: true   },
  { icon: Rocket,       label: 'Live Project',  href: AETHER_URL,                                          external: true   },
  { icon: FileText,     label: 'Resume',        to: '/resume',                                             internal: true   },
  { icon: LinkedInIcon, label: 'LinkedIn',      href: 'https://www.linkedin.com/in/andrewbaldock/',         external: true   },
  { icon: GitHubIcon,   label: 'GitHub',        href: 'https://github.com/andrewbaldock',                  external: true   },
  { icon: YouTubeIcon,  label: 'YouTube',       href: 'https://www.youtube.com/@baldockdigital/videos',     external: true   },
]

export default function Nav() {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  return (
    <nav className="nav">
      <div className="nav__icons">
        {links.map(({ icon: Icon, glyph, label, href, to, external, internal }) => {
          const isActive = internal && pathname === to
          const className = `nav__icon-link${isActive ? ' is-active' : ''}`
          const inner = glyph
            ? <span className="nav__glyph" aria-hidden="true">{glyph}</span>
            : <Icon size={18} strokeWidth={1.5} />

          // Resume icon acts as a toggle: when already on /resume, clicking it
          // again navigates back home.
          const handleClick = isActive
            ? (e) => { e.preventDefault(); navigate('/') }
            : undefined

          const el = internal ? (
            <Link to={to} className={className} aria-label={label} aria-current={isActive ? 'page' : undefined} onClick={handleClick}>
              {inner}
            </Link>
          ) : (
            <a
              href={href}
              className={className}
              {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
              aria-label={label}
            >
              {inner}
            </a>
          )

          return (
            <Tippy key={label} content={label} animation="shift-away" placement="bottom">
              {el}
            </Tippy>
          )
        })}
      </div>
    </nav>
  )
}
