import { useState, useEffect, useRef } from 'react'

const CYCLE_DURATION = 12000
const PAUSE_DURATION = 10000

export default function Hero() {
  const [animKey, setAnimKey] = useState(0)
  const timerRef = useRef(null)

  const scheduleNext = () => {
    timerRef.current = setTimeout(() => {
      setAnimKey(k => k + 1)
    }, CYCLE_DURATION + PAUSE_DURATION)
  }

  useEffect(() => {
    scheduleNext()
    return () => clearTimeout(timerRef.current)
  }, [animKey])

  const handleClick = () => {
    clearTimeout(timerRef.current)
    setAnimKey(k => k + 1)
  }

  return (
    <section className="hero">
      <div className="hero__content">
        <h1
          key={animKey}
          onClick={handleClick}
          title="cycle colors"
          style={{ cursor: 'pointer' }}
        >
          Andrew Baldock
        </h1>
        <p className="hero__tagline">Boss-Level UI Engineer</p>
      </div>
    </section>
  )
}
