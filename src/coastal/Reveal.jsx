import { motion, useReducedMotion } from 'motion/react'

// Tasteful scroll-reveal — a short fade-up as a section enters. No-ops under
// prefers-reduced-motion (returns a plain div), so the quality floor holds.
export default function Reveal({ children, className, delay = 0 }) {
  const reduce = useReducedMotion()
  if (reduce) return <div className={className}>{children}</div>
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: [0.2, 0.7, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  )
}
