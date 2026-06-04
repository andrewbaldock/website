import { useState, useEffect } from 'react'
import Tippy from '@tippyjs/react'
import { FileText, Rocket } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { GitHubIcon, LinkedInIcon, YouTubeIcon } from './BrandIcons.jsx'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/animations/shift-away.css'

const links = [
  { icon: Rocket,       label: 'Live Project',  href: 'https://andrewbaldock.com/aether',                  external: true   },
  { icon: FileText,     label: 'Resume',        to: '/resume',                                             internal: true   },
  { icon: LinkedInIcon, label: 'LinkedIn',      href: 'https://www.linkedin.com/in/andrewbaldock/',         external: true   },
  { icon: GitHubIcon,   label: 'GitHub',        href: 'https://github.com/andrewbaldock',                  external: true   },
  { icon: YouTubeIcon,  label: 'YouTube',       href: 'https://www.youtube.com/@baldockdigital/videos',     external: true   },
]

export default function Nav() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const isHome = pathname === '/'
  const [showTitle, setShowTitle] = useState(false)

  // On the home page, reveal the small color-cycling title in the nav once the
  // hero name has scrolled off-screen. Simple scrollY threshold — matches the
  // codebase's no-IntersectionObserver style.
  useEffect(() => {
    if (!isHome) {
      setShowTitle(false)
      return
    }
    const onScroll = () => setShowTitle(window.scrollY > window.innerHeight * 0.4)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isHome])

  return (
    <nav className={`nav${isHome ? ' nav--home' : ''}`}>
      {isHome && (
        <button
          type="button"
          className={`nav__title${showTitle ? ' is-visible' : ''}`}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
          tabIndex={showTitle ? 0 : -1}
        >
          Andrew Baldock
        </button>
      )}

      <div className="nav__icons">
        {links.map(({ icon: Icon, label, href, to, external, internal }) => {
          const isActive = internal && pathname === to
          const className = `nav__icon-link${isActive ? ' is-active' : ''}`
          const inner = <Icon size={18} strokeWidth={1.5} />

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
