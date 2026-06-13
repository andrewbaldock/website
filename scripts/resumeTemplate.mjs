// Standalone ATS-clean HTML for the PDF résumé.
// Single column, real selectable text, monochrome (NO pink), Open Sans.
// The lotus is an inline SVG vector (never the Unicode glyph), muted purple-gray.
// CSS validated to render 2 pages on Letter.

const esc = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

// Escape, then turn **…** into <b> and remaining *…* into <i>.
const rich = (s) =>
  esc(s)
    .replace(/\*\*(.+?)\*\*/g, '<b>$1</b>')
    .replace(/\*(.+?)\*/g, '<i>$1</i>');

// Muted 8-petal lotus as inline SVG — monochrome-ish, never a font glyph.
const lotusSVG = () => {
  const petals = [0, 45, 90, 135, 180, 225, 270, 315];
  const paths = petals
    .map(
      (deg) =>
        `<path transform="rotate(${deg})" d="M0,0 C6,-10 6,-22 0,-30 C-6,-22 -6,-10 0,0 Z"/>`
    )
    .join('');
  return `<svg class="lotus" viewBox="0 0 100 100" aria-hidden="true"><g transform="translate(50,50)" fill="#6a4a8a">${paths}<circle r="7" fill="#8a6aa8" opacity="0.85"/></g></svg>`;
};

const section = (title, inner) =>
  `<div class="sec"><h2>${lotusSVG()}${esc(title)}</h2><div class="rule"></div></div>${inner}`;

const job = (j) => `
  <div class="job">
    <div class="job-head">
      <span class="job-role">${esc(j.company)} — ${esc(j.role)}</span>
      <span class="job-meta">${esc(j.dates)} · ${esc(j.place)}</span>
    </div>
    <div class="job-blurb">${rich(j.blurb)}</div>
    ${
      j.bullets.length
        ? `<ul>${j.bullets.map((b) => `<li>${rich(b)}</li>`).join('')}</ul>`
        : ''
    }
    ${j.tech ? `<div class="tech">${esc(j.tech)}</div>` : ''}
  </div>`;

const project = (p) => `
  <div class="job">
    <div class="job-head">
      <span class="job-role">${esc(p.name)}</span>
      <span class="job-meta">${esc(p.meta)}</span>
    </div>
    <div class="job-blurb">${rich(p.blurb)}</div>
    ${
      p.bullets.length
        ? `<ul>${p.bullets.map((b) => `<li>${rich(b)}</li>`).join('')}</ul>`
        : ''
    }
  </div>`;

export function renderResumeHTML(data) {
  const { name, title, location, email, phone, links } = data;
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;1,400;1,600&display=swap" rel="stylesheet">
<style>
@page { size: letter; margin: 0.55in 0.6in; }
* { margin: 0; padding: 0; box-sizing: border-box; }
html { font-family: 'Open Sans', sans-serif; color: #1c1c22; }
body { font-size: 9.6pt; line-height: 1.42; }
.name { font-size: 23pt; font-weight: 700; letter-spacing: .01em; color: #15151a; }
.title { font-size: 10.5pt; font-weight: 600; color: #444452; margin-top: 2px; letter-spacing: .02em; }
.contact { font-size: 8.6pt; color: #55555f; margin-top: 7px; line-height: 1.5; }
.contact a { color: #55555f; text-decoration: none; }
.contact .sep { color: #b9b9c4; padding: 0 5px; }
.sec { display: flex; align-items: center; gap: 9px; margin-top: 15px; margin-bottom: 7px; }
.sec h2 { display: flex; align-items: center; gap: 9px; font-size: 10pt; font-weight: 700; text-transform: uppercase; letter-spacing: .12em; color: #2a2a32; white-space: nowrap; }
.sec .rule { flex: 1; height: 1px; background: #d7d7df; }
.lotus { width: 13px; height: 13px; flex-shrink: 0; opacity: .78; }
.summary { color: #33333c; }
.stack { margin-top: 6px; font-size: 8.7pt; color: #4a4a55; }
.stack b { color: #2a2a32; font-weight: 600; }
.job { margin-bottom: 10px; }
.job-head { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; }
.job-role { font-size: 10pt; font-weight: 700; color: #1c1c22; }
.job-meta { font-size: 8.4pt; color: #6a6a76; font-style: italic; white-space: nowrap; flex-shrink: 0; }
.job-blurb { margin-top: 2px; color: #3a3a44; }
ul { list-style: none; margin-top: 4px; }
li { position: relative; padding-left: 13px; margin-bottom: 2.5px; color: #33333c; }
li::before { content: ''; position: absolute; left: 2px; top: .5em; width: 3px; height: 3px; border-radius: 50%; background: #8a8a96; }
li b, .job-blurb b { font-weight: 700; color: #1c1c22; }
li i, .job-blurb i { font-style: italic; font-weight: 400; color: #70707c; }
.tech { margin-top: 4px; font-size: 8.3pt; font-style: italic; color: #70707c; }
.edu-line { color: #33333c; margin-bottom: 2px; }
.edu-line b { font-weight: 700; color: #1c1c22; }
/* Pagination. We deliberately do NOT use page-break-inside: avoid on .job —
   Chromium's print engine, when it shifts an "avoid" block to the next page,
   still writes that block's text to the PDF content stream at its ORIGINAL
   position, scrambling the selectable-text / ATS reading order (bullets detach
   from their job). Since this résumé must stay ATS-clean (real, in-order text),
   we let jobs flow naturally and only prevent an *orphaned heading* — a job/
   section title stranded at the foot of a page — which Chromium handles via
   break-after:avoid without reordering text. */
.sec h2, .job-head { break-after: avoid; }
.sec { break-after: avoid; }
</style>
</head>
<body>
  <div class="name">${esc(name)}</div>
  <div class="title">${esc(title)}</div>
  <div class="contact">
    ${esc(location)}<span class="sep">·</span><a href="mailto:${esc(email)}">${esc(email)}</a><span class="sep">·</span>${esc(phone)}<br>
    <a href="https://${esc(links.website)}">${esc(links.website)}</a><span class="sep">·</span><a href="https://${esc(links.linkedin)}">${esc(links.linkedin)}</a><span class="sep">·</span><a href="https://${esc(links.github)}">${esc(links.github)}</a>
  </div>

  ${section('Summary', `<div class="summary">${esc(data.summary)}</div><div class="stack"><b>Core stack:</b> ${esc(data.stack)}</div>`)}

  ${section('Experience', data.experience.map(job).join(''))}

  ${section('Projects', data.projects.map(project).join(''))}

  ${section('Education', data.education.map((l) => `<div class="edu-line">${rich(l)}</div>`).join(''))}

  ${section('Certifications', data.certifications.map((l) => `<div class="edu-line">${rich(l)}</div>`).join(''))}
</body>
</html>`;
}
