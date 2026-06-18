// Magic Sticky's brand mark — a daisy, rendered as an inline SVG vector (like Lotus.jsx,
// never a Unicode glyph). Eight rounded white-ish petals around a warm yellow center, on a
// pastel-officey palette. `color` = center disc; `petalColor` = petal fill; `outline` = the
// petal-edge stroke (defaults to `color`); `outlineOpacity` controls how dark that edge reads.
export default function Daisy({
  size = 16,
  color = '#f4b942',
  petalColor = '#fff7e6',
  outline,
  outlineOpacity = 0.35,
  className,
}) {
  const edge = outline ?? color;
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
            stroke={edge}
            strokeWidth="1.5"
            strokeOpacity={outlineOpacity}
          />
        ))}
        {/* center disc */}
        <circle r="13" fill={color} />
        <circle r="13" fill="none" stroke={edge} strokeOpacity={Math.min(1, outlineOpacity + 0.15)} strokeWidth="2" />
      </g>
    </svg>
  );
}
