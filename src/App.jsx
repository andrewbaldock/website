import { Routes, Route } from 'react-router-dom'
import Nav from './components/Nav.jsx'
import CoastalHome from './components/CoastalHome.jsx'
import ResumePage from './components/ResumePage.jsx'
import AetherCaseStudy from './components/AetherCaseStudy.jsx'
import JunoCaseStudy from './components/JunoCaseStudy.jsx'
import MagicStickyCaseStudy from './components/MagicStickyCaseStudy.jsx'

function App() {
  return (
    <>
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
