import { copyFile, cp, mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const { render } = await import(pathToFileURL(resolve(root, '.ssr/entry-server.mjs')));
const template = await readFile(resolve(root, 'dist/index.html'), 'utf8');
const token = '<div id="root"></div>';
if (!template.includes(token)) throw new Error('Production template is missing the React root.');
await writeFile(resolve(root, 'dist/index.html'), template.replace(token, `<div id="root">${render()}</div>`));
// Both publishing targets include the same assets and readable static HTML.
await cp(resolve(root, 'public'), root, { recursive: true });
await mkdir(resolve(root, 'assets'), { recursive: true });
await cp(resolve(root, 'dist/assets'), resolve(root, 'assets'), { recursive: true });
await copyFile(resolve(root, 'dist/index.html'), resolve(root, 'index.html'));
console.log('Generated static HTML and synced the complete Pages build.');
