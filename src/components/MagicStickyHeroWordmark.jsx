import Daisy from './Daisy.jsx'

// Magic Sticky wordmark sized for the CASE-STUDY HERO — large, centered, one line.
// Self-contained — see `.ms-hero-wm` in App.less. Separate from the card wordmark on
// purpose (see MagicStickyCardWordmark for why).
export default function MagicStickyHeroWordmark() {
  return (
    <span className="ms-hero-wm">
      <span className="ms-hero-wm__word">Magic</span>
      <Daisy size={72} className="ms-hero-wm__daisy" />
      <span className="ms-hero-wm__word">Sticky</span>
    </span>
  )
}
