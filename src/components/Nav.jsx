import Tippy from '@tippyjs/react'
import { FileText, ExternalLink } from 'lucide-react'
import { GitHubIcon, LinkedInIcon, YouTubeIcon } from './BrandIcons.jsx'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/animations/shift-away.css'

const links = [
  { icon: GitHubIcon,   label: 'GitHub',       href: 'https://github.com/andrewbaldock',                  external: true  },
  { icon: ExternalLink, label: 'Live Project',  href: '#',                                                  external: true  },
  { icon: FileText,     label: 'Resume',        href: '#resume',                                            external: false },
  { icon: LinkedInIcon, label: 'LinkedIn',      href: 'https://www.linkedin.com/in/andrewbaldock/',         external: true  },
  { icon: YouTubeIcon,  label: 'YouTube',       href: 'https://www.youtube.com/@baldockdigital/videos',     external: true  },
]

export default function Nav() {
  return (
    <nav className="nav">
      {links.map(({ icon: Icon, label, href, external }) => (
        <Tippy key={label} content={label} animation="shift-away" placement="bottom">
          <a
            href={href}
            className="nav__icon-link"
            {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
            aria-label={label}
          >
            <Icon size={18} strokeWidth={1.5} />
          </a>
        </Tippy>
      ))}
    </nav>
  )
}
