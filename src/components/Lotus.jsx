// Brahmi Punctuation Lotus (U+1104D) rendered as an inline SVG vector — never
// the Unicode glyph (font support is essentially nonexistent + ATS risk).
// Used as a recurring section mark. Web: neon palette. PDF: muted purple-gray.
export default function Lotus({ size = 14, color = '#7c4dff', className }) {
  const petals = [0, 45, 90, 135, 180, 225, 270, 315];
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      aria-hidden="true"
    >
      <g transform="translate(50,50)" fill={color}>
        {petals.map((deg) => (
          <path
            key={deg}
            transform={`rotate(${deg})`}
            d="M0,0 C6,-10 6,-22 0,-30 C-6,-22 -6,-10 0,0 Z"
          />
        ))}
        <circle r="7" fill={color} opacity="0.85" />
      </g>
    </svg>
  );
}
