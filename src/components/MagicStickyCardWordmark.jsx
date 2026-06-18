import Daisy from './Daisy.jsx'

// Magic Sticky wordmark sized for the HOME CARD's narrow text column. Fixed small size,
// guaranteed one line. Self-contained — see `.ms-card-wm` in App.less. (The big hero
// version is a separate component, MagicStickyHeroWordmark, on purpose: one-size-fits-all
// flex CSS kept stacking, so the two contexts each get their own dead-simple wordmark.)
export default function MagicStickyCardWordmark() {
  return (
    <span className="ms-card-wm">
      <span className="ms-card-wm__word">Magic</span>
      <Daisy
        size={42}
        color="#f4b942"
        outline="#8a6a12"
        outlineOpacity={0.7}
        className="ms-card-wm__daisy"
      />
      <span className="ms-card-wm__word">Sticky</span>
    </span>
  )
}
