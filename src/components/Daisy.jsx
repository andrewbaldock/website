// Magic Sticky's brand mark — a daisy, rendered as an inline SVG vector (like Lotus.jsx,
// never a Unicode glyph). Eight rounded white-ish petals around a warm yellow center, on a
// pastel-officey palette. `color` tints the petals; `center` the disc. Decorative by default.
export default function Daisy({ size = 16, color = '#f4b942', petalColor = '#fff7e6', className }) {
  const petals = [0, 45, 90, 135, 180, 225, 270, 315];
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      aria-hidden="true"
    >
      <g transform="translate(50,50)">
        {/* petals — softly rounded teardrops, tinted edge so they read on light or dark */}
        {petals.map((deg) => (
          <path
            key={deg}
            transform={`rotate(${deg})`}
            d="M0,-8 C9,-14 11,-30 0,-42 C-11,-30 -9,-14 0,-8 Z"
            fill={petalColor}
            stroke={color}
            strokeWidth="1.5"
            strokeOpacity="0.35"
          />
        ))}
        {/* center disc */}
        <circle r="13" fill={color} />
        <circle r="13" fill="none" stroke={color} strokeOpacity="0.5" strokeWidth="2" />
      </g>
    </svg>
  );
}
