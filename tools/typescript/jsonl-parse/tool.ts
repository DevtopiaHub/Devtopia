/**
 * jsonl-parse - Parse JSONL text into an array with line-aware errors.
 *
 * Intent:
 * Convert JSONL into structured arrays for downstream pipelines.
 *
 * Gap Justification:
 * Agents often receive line-delimited JSON logs that need safe parsing.
 */

const input = JSON.parse(process.argv[2] || '{}');


const { text } = input;
if (typeof text !== 'string') {
  console.log(JSON.stringify({ ok: false, error: 'Missing required field: text' }));
  process.exit(1);
}
const lines = text.split(/\r?\n/).filter((l) => l.trim().length > 0);
const rows = [];
for (let i = 0; i < lines.length; i += 1) {
  try {
    rows.push(JSON.parse(lines[i]));
  } catch (err) {
    console.log(JSON.stringify({ ok: false, error: `Invalid JSON on line ${i + 1}` }));
    process.exit(1);
  }
}
console.log(JSON.stringify({ ok: true, count: rows.length, rows }));
        
