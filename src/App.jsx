import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Nav from './components/Nav.jsx'
import CoastalHome from './components/CoastalHome.jsx'
import ResumePage from './components/ResumePage.jsx'
import AetherCaseStudy from './components/AetherCaseStudy.jsx'
import JunoCaseStudy from './components/JunoCaseStudy.jsx'
import MagicStickyCaseStudy from './components/MagicStickyCaseStudy.jsx'

// Reset scroll to the top on every route change — otherwise navigating from a
// scrolled home into a case study lands you mid-page.
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function App() {
  return (
    <>
      <ScrollToTop />
      <Nav />
      <Routes>
        <Route path="/" element={<CoastalHome />} />
        <Route path="/resume" element={<ResumePage />} />
        <Route path="/aether" element={<AetherCaseStudy />} />
        <Route path="/juno" element={<JunoCaseStudy />} />
        <Route path="/magicsticky" element={<MagicStickyCaseStudy />} />
      </Routes>
    </>
  )
}

export default App
