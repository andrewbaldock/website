import Daisy from './Daisy.jsx'

// The Magic Sticky wordmark — a daisy + "Magic Sticky" set in Julius Sans One (airy, all-caps
// geometric). Used by both the home card and the case study hero, so the brand mark is consistent.
// `size` scales the daisy; the text sizing is controlled by the consuming CSS class.
export default function MagicStickyWordmark({ className, daisySize = 30 }) {
  return (
    <span className={className}>
      <Daisy size={daisySize} className="ms-wordmark__daisy" />
      <span className="ms-wordmark__text">Magic Sticky</span>
    </span>
  )
}
