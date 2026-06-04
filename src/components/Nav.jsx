import Tippy from '@tippyjs/react'
import { FileText, Rocket } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { GitHubIcon, LinkedInIcon, YouTubeIcon } from './BrandIcons.jsx'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/animations/shift-away.css'

const links = [
  { icon: Rocket,       label: 'Live Project',  href: '#', /* TODO: Aether URL once hosted */              external: true   },
  { icon: GitHubIcon,   label: 'GitHub',        href: 'https://github.com/andrewbaldock',                  external: true   },
  { icon: FileText,     label: 'Resume',        to: '/resume',                                             internal: true   },
  { icon: LinkedInIcon, label: 'LinkedIn',      href: 'https://www.linkedin.com/in/andrewbaldock/',         external: true   },
  { icon: YouTubeIcon,  label: 'YouTube',       href: 'https://www.youtube.com/@baldockdigital/videos',     external: true   },
]

export default function Nav() {
  const { pathname } = useLocation()

  return (
    <nav className="nav">
      {links.map(({ icon: Icon, label, href, to, external, internal }) => {
        const isActive = internal && pathname === to
        const className = `nav__icon-link${isActive ? ' is-active' : ''}`
        const inner = <Icon size={18} strokeWidth={1.5} />

        const el = internal ? (
          <Link to={to} className={className} aria-label={label} aria-current={isActive ? 'page' : undefined}>
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
    </nav>
  )
}
