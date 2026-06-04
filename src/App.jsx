import { Routes, Route } from 'react-router-dom'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Split from './components/Split.jsx'
import AetherCard from './components/AetherCard.jsx'
import Resume from './components/Resume.jsx'
import Contact from './components/Contact.jsx'
import ResumePage from './components/ResumePage.jsx'

function Home() {
  return (
    <>
      <div className="page">
        <Hero />
        <Split />
        <Resume />
        <AetherCard />
        <Contact />
        <footer className="footer">Andrew Baldock &copy; {new Date().getFullYear()}</footer>
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
      </Routes>
    </>
  )
}

export default App
