// Shapes for the life in the shoreline (see Tide.jsx).
//
// Drawn TOP-DOWN, because the tide SVG is preserveAspectRatio="none" over a
// 200-unit viewBox rendered ~80px tall — everything squashes to ~40%
// vertically, which is exactly what a pond seen at a shallow angle does. So a
// blossom drawn as a flat circle of petals lands as a correctly-foreshortened
// ellipse. Nothing here needs to fake perspective.

// A lotus from above: two rings of petals, outer splayed and inner tighter,
// offset by half a step so the inner ones show through the gaps. Built as data
// so the ring count and size stay adjustable.
export function lotusPetals(r) {
  const petal = (len) => `M0,0 Q${len * 0.34},${-len * 0.5} 0,${-len} Q${-len * 0.34},${-len * 0.5} 0,0 Z`
  const outer = Array.from({ length: 8 }, (_, i) => ({ key: `o${i}`, rot: i * 45, d: petal(r) }))
  const inner = Array.from({ length: 8 }, (_, i) => ({ key: `i${i}`, rot: i * 45 + 22.5, d: petal(r * 0.62) }))
  return [...outer, ...inner]
}
