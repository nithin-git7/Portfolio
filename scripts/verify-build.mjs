import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { resolve } from 'node:path';

const html = await readFile('dist/index.html', 'utf8');
const stripMarkup = value => value.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
const text = stripMarkup(html);
assert.equal((html.match(/<h1[ >]/g) || []).length, 1, 'One main heading');
const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map(match => match[1]);
const idSet = new Set();
for (const id of ids) {
  assert(!idSet.has(id), `Duplicate id ${id}`);
  idSet.add(id);
}
for (const id of ['main-content', 'work', 'research', 'about', 'contact']) {
  assert(idSet.has(id), `Missing navigation target ${id}`);
}
for (const match of html.matchAll(/\saria-controls="([^"]+)"/g)) {
  for (const id of match[1].trim().split(/\s+/)) {
    assert(idSet.has(id), `aria-controls references a missing target: ${id}`);
  }
}
assert(!html.includes('opacity:0'), 'Static content must be visible without JavaScript');
const interests = [...html.matchAll(/<dt(?:\s[^>]*)?>([\s\S]*?)<\/dt>/g)].map(match => stripMarkup(match[1]));
for (const interest of ['Cricket', 'Books', 'Music', 'Research']) {
  assert(interests.includes(interest), `${interest} is prerendered in the personal shelf`);
}
assert(html.includes('href="mailto:nithinpolavarapu@gmail.com"'), 'Direct email contact is present');
assert(/<button\b[^>]*aria-label="Copy email address"/.test(html), 'Accessible copy-email action is present');
const anchors = [...html.matchAll(/<a\s[^>]*>/g)].map(match => match[0]);
assert(anchors.some(anchor => anchor.includes('href="/Portfolio/Nithin_Polavarapu_JobResume.pdf"') && /\sdownload(?:[\s=>])/.test(anchor)), 'Resume download is present');
assert(/interactive concept,?\s*not a trained model/i.test(text), 'The memory illustration clearly states its concept status');
assert(text.includes('An academic prototype, not a clinical diagnostic tool.'), 'MediAI retains its academic-prototype qualification');
const references = [...html.matchAll(/(?:src|href)="(\/Portfolio\/[^"#?]+)"/g)].map(match => match[1]);
for (const reference of new Set(references)) {
  const file = resolve('dist', reference.replace('/Portfolio/', ''));
  assert((await stat(file)).size > 0, `Empty asset ${reference}`);
}
for (const file of ['profile.webp', 'Nithin_Polavarapu_JobResume.pdf', 'assets/clearpath-home.jpg', 'assets/clearpath-roadmap.jpg', 'assets/manrope-latin.woff2', 'assets/newsreader-latin.woff2', 'assets/dm-mono-400.woff2', 'assets/app.js', 'assets/app.css', 'index.html']) {
  const built = await readFile(resolve('dist', file));
  const published = await readFile(file);
  assert(built.equals(published), `Pages and dist differ: ${file}`);
}
const pdf = await readFile('dist/Nithin_Polavarapu_JobResume.pdf');
assert(pdf.subarray(0, 5).toString() === '%PDF-', 'Resume must be a real PDF');
console.log('PASS: static content, unique IDs, accessible control targets, honest project labels, contact, local assets, resume, and publication parity.');
