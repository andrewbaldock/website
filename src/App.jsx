import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Split from './components/Split.jsx'
import AetherCard from './components/AetherCard.jsx'
import Resume from './components/Resume.jsx'
import Contact from './components/Contact.jsx'

function App() {
  return (
    <>
      <Nav />
      <div className="page">
      <Hero />
      <Split />
      <AetherCard />
      <Resume />
      <Contact />
      <footer className="footer">Andrew Baldock &copy; {new Date().getFullYear()}</footer>
    </div>
    </>
  )
}

export default App
