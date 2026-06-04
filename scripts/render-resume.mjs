import { chromium } from 'playwright';
import { writeFileSync, mkdirSync } from 'node:fs';
import { resume } from '../src/resumeData.js';
import { renderResumeHTML } from './resumeTemplate.mjs';

const html = renderResumeHTML(resume);
writeFileSync('/tmp/resume.html', html);
mkdirSync('public', { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto('file:///tmp/resume.html', { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
await page.pdf({
  path: 'public/resume.pdf',
  format: 'Letter',
  printBackground: true,
  preferCSSPageSize: true,
});
await browser.close();
console.log('public/resume.pdf written');
