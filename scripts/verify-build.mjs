import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { resolve } from 'node:path';

const html = await readFile('dist/index.html', 'utf8');
assert.equal((html.match(/<h1[ >]/g) || []).length, 1, 'One main heading');
for (const id of ['main-content', 'work', 'research', 'about', 'contact']) {
  assert(html.includes(`id="${id}"`), `Missing navigation target ${id}`);
}
assert(!html.includes('opacity:0'), 'Static content must be visible without JavaScript');
assert(html.includes('Cricket') && html.includes('Books &amp; music'), 'Personal interests are prerendered');
const references = [...html.matchAll(/(?:src|href)="(\/Portfolio\/[^"#?]+)"/g)].map(match => match[1]);
for (const reference of new Set(references)) {
  const file = resolve('dist', reference.replace('/Portfolio/', ''));
  assert((await stat(file)).size > 0, `Empty asset ${reference}`);
}
for (const file of ['profile.webp', 'Nithin_Polavarapu_JobResume.pdf', 'assets/clearpath-home.jpg', 'assets/clearpath-roadmap.jpg', 'assets/manrope-latin.woff2', 'assets/newsreader-latin.woff2', 'assets/app.js', 'assets/app.css', 'index.html']) {
  const built = await readFile(resolve('dist', file));
  const published = await readFile(file);
  assert(built.equals(published), `Pages and dist differ: ${file}`);
}
const pdf = await readFile('dist/Nithin_Polavarapu_JobResume.pdf');
assert(pdf.subarray(0, 5).toString() === '%PDF-', 'Resume must be a real PDF');
console.log('PASS: static content, navigation targets, local assets, resume, and publication parity.');
