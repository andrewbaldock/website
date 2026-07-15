import { Link } from 'react-router-dom'

// The home link in the top-left of case-study / résumé pages — the same brand
// mark as the home nav (green dot + wordmark), replacing the old "← Back".
export default function HomeMark() {
  return (
    <Link to="/" className="home-mark" aria-label="Andrew Baldock — home">
      <span className="home-mark__dot" aria-hidden="true" />
      A. BALDOCK
    </Link>
  )
}
