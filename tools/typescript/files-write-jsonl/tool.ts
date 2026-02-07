/**
 * files-write-jsonl - Write an array of objects to a JSONL file.
 *
 * Intent:
 * Persist JSONL data to disk.
 *
 * Gap Justification:
 * Agents need a simple JSONL writer for local pipelines.
 */

const input = JSON.parse(process.argv[2] || '{}');


import { writeFileSync } from 'fs';

const { path, items } = input;
if (!path || !Array.isArray(items)) {
  console.log(JSON.stringify({ ok: false, error: 'Missing required fields: path, items' }));
  process.exit(1);
}
try {
  const text = items.map((row) => JSON.stringify(row)).join('\n');
  writeFileSync(path, text, 'utf-8');
  console.log(JSON.stringify({ ok: true, lines: items.length }));
} catch (err) {
  console.log(JSON.stringify({ ok: false, error: err.message || String(err) }));
  process.exit(1);
}
        
