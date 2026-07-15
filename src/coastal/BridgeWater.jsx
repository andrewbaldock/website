import { useId } from 'react'

// A loose watercolor wash of bay water pooled under the bridge — soft aqua/mint
// shapes roughened by turbulence + blur so the edges bleed like wet pigment.
// Shares the bridge's box (see .bridge-water) so it tracks the bridge; sits
// behind the line-work so the bridge reads as spanning the water.
export default function BridgeWater() {
  const f = 'wc-' + useId().replace(/:/g, '')
  return (
    <svg className="bridge-water" viewBox="0 0 1512 1122" preserveAspectRatio="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id={f} x="-25%" y="-25%" width="150%" height="150%">
          <feTurbulence type="fractalNoise" baseFrequency="0.008 0.014" numOctaves="4" seed="11" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="85" xChannelSelector="R" yChannelSelector="G" />
          <feGaussianBlur stdDeviation="7" />
        </filter>
      </defs>
      <g filter={`url(#${f})`}>
        <ellipse cx="1040" cy="965" rx="540" ry="95" fill="#7fd8d0" opacity="0.5" />
        <ellipse cx="1210" cy="1010" rx="430" ry="72" fill="#1fb6ad" opacity="0.42" />
        <ellipse cx="880" cy="990" rx="320" ry="64" fill="#8ea2e6" opacity="0.22" />
      </g>
    </svg>
  )
}
