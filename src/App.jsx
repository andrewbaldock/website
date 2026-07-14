import { Routes, Route } from 'react-router-dom'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Split from './components/Split.jsx'
import AetherCard from './components/AetherCard.jsx'
import JunoCard from './components/JunoCard.jsx'
import MagicStickyCard from './components/MagicStickyCard.jsx'
import Resume from './components/Resume.jsx'
import Contact from './components/Contact.jsx'
import ResumePage from './components/ResumePage.jsx'
import AetherCaseStudy from './components/AetherCaseStudy.jsx'
import MagicStickyCaseStudy from './components/MagicStickyCaseStudy.jsx'

function Home() {
  return (
    <>
      <div className="page">
        <Hero />
        <Split />
        <Resume />
        <AetherCard variant="light" />
        <JunoCard />
        <MagicStickyCard />
        <Contact />
        <footer className="footer">&copy; {new Date().getFullYear()}</footer>
      </div>
    </>
  )
}

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/resume" element={<ResumePage />} />
        <Route path="/aether" element={<AetherCaseStudy />} />
        <Route path="/magicsticky" element={<MagicStickyCaseStudy />} />
      </Routes>
    </>
  )
}

export default App
