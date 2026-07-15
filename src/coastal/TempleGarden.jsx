import { useEffect, useRef } from 'react'

// The engraved temple-garden colonnade (ported from motifs.tsx `TempleGarden`):
// a ground line split around a central clearing, a colonnade stepping outward in
// the rhythm cypress · column · topiary · column · amphora · column, and a
// central reflecting basin. Built imperatively — it's a lot of generated paths.
const NS = 'http://www.w3.org/2000/svg'

export default function TempleGarden() {
  const ref = useRef(null)

  useEffect(() => {
    const G = ref.current
    if (!G) return
    G.replaceChildren()

    const W = 1000, H = 240, ground = H - 16, cTop = 92, cw = 8, cx = W / 2, clearHalf = 150, g0 = ground - 2
    const el = (tag, attrs) => { const n = document.createElementNS(NS, tag); for (const k in attrs) n.setAttribute(k, attrs[k]); return n }
    const g = (op) => el('g', { opacity: op })
    const p = (d, op) => { const n = el('path', { class: 'g-stroke', d }); if (op) n.setAttribute('opacity', op); return n }
    const circ = (x, y, r) => el('circle', { class: 'g-stroke', cx: x, cy: y, r })
    const ell = (x, y, rx, ry) => el('ellipse', { class: 'g-stroke', cx: x, cy: y, rx, ry })

    const column = (x) => {
      const q = g('.72')
      q.appendChild(p(`M${x - cw} ${cTop + 6} V${ground} M${x + cw} ${cTop + 6} V${ground}`))
      q.appendChild(p(`M${x} ${cTop + 8} V${ground - 2}`, '.45'))
      q.appendChild(p(`M${x - cw - 4} ${cTop + 2} H${x + cw + 4} M${x - cw - 2} ${cTop - 3} H${x + cw + 2}`))
      q.appendChild(p(`M${x - cw - 4} ${cTop + 2} q-4 -4 1 -7 M${x + cw + 4} ${cTop + 2} q4 -4 -1 -7`))
      q.appendChild(p(`M${x - cw - 4} ${ground} H${x + cw + 4} M${x - cw - 7} ${ground + 5} H${x + cw + 7}`))
      return q
    }
    const cypress = (x) => {
      const top = ground - 64, q = g('.64')
      q.appendChild(p(`M${x} ${ground - 3} C${x - 7} ${ground - 20} ${x - 6} ${top + 12} ${x} ${top} C${x + 6} ${top + 12} ${x + 7} ${ground - 20} ${x} ${ground - 3}`))
      q.appendChild(p(`M${x} ${ground - 9} V${top + 9}`, '.4'))
      q.appendChild(p(`M${x} ${ground - 3} v6`))
      return q
    }
    const topiary = (x) => {
      const q = g('.6')
      q.appendChild(p(`M${x} ${ground - 2} V${ground - 13}`))
      q.appendChild(circ(x, ground - 20, 9.5)); q.appendChild(circ(x, ground - 33, 6))
      q.appendChild(p(`M${x - 5} ${ground - 22} q5 4 11 0`, '.4'))
      return q
    }
    const amphora = (x) => {
      const q = g('.6')
      q.appendChild(p(`M${x} ${g0 - 24} C${x - 7} ${g0 - 22} ${x - 8} ${g0 - 16} ${x - 7} ${g0 - 10} C${x - 6} ${g0 - 3} ${x + 6} ${g0 - 3} ${x + 7} ${g0 - 10} C${x + 8} ${g0 - 16} ${x + 7} ${g0 - 22} ${x} ${g0 - 24} Z`))
      q.appendChild(p(`M${x - 4} ${g0 - 24} H${x + 4}`))
      q.appendChild(p(`M${x - 3} ${g0 - 23} q-6 3 -4 8 M${x + 3} ${g0 - 23} q6 3 4 8`))
      return q
    }
    const draw = { col: column, cypress, topiary, amphora }

    // ground, split around the central clearing
    G.appendChild(p(`M8 ${ground} H${cx - clearHalf} M${cx + clearHalf} ${ground} H${W - 8}`, '.6'))
    G.appendChild(p(`M28 ${ground + 6} H${cx - clearHalf - 6} M${cx + clearHalf + 6} ${ground + 6} H${W - 28}`, '.3'))
    // colonnade rhythm stepping outward both ways
    const rhythm = ['cypress', 'col', 'topiary', 'col', 'amphora', 'col']
    const gap = { col: 54, cypress: 42, topiary: 52, amphora: 52 }
    ;[-1, 1].forEach((dir) => {
      let x = cx + dir * (clearHalf + 12), i = 0
      while (dir > 0 ? x < W - 26 : x > 26) {
        const kind = rhythm[i % rhythm.length]
        G.appendChild(draw[kind](x)); x += dir * gap[kind]; i++
      }
    })
    // central reflecting basin
    const b = g('.5')
    b.appendChild(ell(cx, ground, 22, 5)); b.appendChild(p(`M${cx - 22} ${ground} q22 10 44 0`)); b.appendChild(ell(cx, ground + 6, 12, 2.6))
    G.appendChild(b)
  }, [])

  return (
    <div className="garden" aria-hidden="true">
      <svg ref={ref} viewBox="0 0 1000 240" preserveAspectRatio="xMidYMax meet" xmlns={NS} />
    </div>
  )
}
