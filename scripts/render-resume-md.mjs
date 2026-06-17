// Generates a nicely formatted public/resume.md from the single-source resume
// data, mirroring scripts/render-resume.mjs (the PDF renderer). Vite copies
// public/resume.md into dist/ on build, so it ships at /resume.md.
//
// The data already uses markdown emphasis (**bold** / *italic*) inside strings,
// so those pass through verbatim — no conversion needed. Like the PDF (and
// unlike the web view), this includes email and phone.

import { writeFileSync, mkdirSync } from 'node:fs';
import { resume } from '../src/resumeData.js';

const lines = [];
const push = (...l) => lines.push(...l);

// --- Header ---------------------------------------------------------------
push(`# ${resume.name}`, '');
push(`**${resume.title}**`, '');
push([resume.location, resume.email, resume.phone].filter(Boolean).join(' · '), '');

const { website, linkedin, github } = resume.links;
push(
  [
    `[${website}](https://${website})`,
    `[LinkedIn](https://${linkedin})`,
    `[GitHub](https://${github})`,
  ].join(' · '),
  '',
);

// --- Summary --------------------------------------------------------------
push('## Summary', '', resume.summary, '');

// --- Core Stack -----------------------------------------------------------
push('## Core Stack', '', resume.stack, '');

// --- Experience -----------------------------------------------------------
push('## Experience', '');
for (const job of resume.experience) {
  push(`### ${job.company} — ${job.role}`, '');
  push(`*${[job.dates, job.place].filter(Boolean).join(' · ')}*`, '');
  if (job.blurb) push(job.blurb, '');
  for (const bullet of job.bullets ?? []) push(`- ${bullet}`);
  if (job.bullets?.length) push('');
  if (job.tech) push(`**Tech:** ${job.tech}`, '');
}

// --- Projects -------------------------------------------------------------
if (resume.projects?.length) {
  push('## Projects', '');
  for (const project of resume.projects) {
    push(`### ${project.name}`, '');
    if (project.meta) push(`*${project.meta}*`, '');
    if (project.blurb) push(project.blurb, '');
    for (const bullet of project.bullets ?? []) push(`- ${bullet}`);
    if (project.bullets?.length) push('');
  }
}

// --- Education ------------------------------------------------------------
if (resume.education?.length) {
  push('## Education', '');
  for (const item of resume.education) push(`- ${item}`);
  push('');
}

// --- Certifications -------------------------------------------------------
if (resume.certifications?.length) {
  push('## Certifications', '');
  for (const item of resume.certifications) push(`- ${item}`);
  push('');
}

// Collapse any accidental 3+ blank lines, trim trailing whitespace per line,
// and end on a single newline.
const md =
  lines
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/[ \t]+$/gm, '')
    .trimEnd() + '\n';

mkdirSync('public', { recursive: true });
writeFileSync('public/resume.md', md);
console.log('public/resume.md written');
