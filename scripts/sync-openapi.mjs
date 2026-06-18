import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';

const SPEC_URL = 'https://docs.zocomputer.com/openapi.json';
const SPEC_PATH = new URL('../openapi/openapi.json', import.meta.url);

function hash(content) {
  return createHash('sha256').update(content).digest('hex');
}

const response = await fetch(SPEC_URL, {
  headers: {
    Accept: 'application/json',
  },
});

if (!response.ok) {
  throw new Error(`Failed to fetch ${SPEC_URL}: ${response.status} ${response.statusText}`);
}

const payload = `${JSON.stringify(JSON.parse(await response.text()), null, 2)}\n`;
await mkdir(new URL('../openapi/', import.meta.url), { recursive: true });

let previous = '';
try {
  previous = await readFile(SPEC_PATH, 'utf8');
} catch (error) {
  if (error?.code !== 'ENOENT') {
    throw error;
  }
}

if (hash(previous) === hash(payload)) {
  console.log('openapi.json unchanged');
  process.exit(0);
}

await writeFile(SPEC_PATH, payload);
console.log('openapi.json updated');
