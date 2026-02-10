const { devtopiaRun } = require('./devtopia-runtime');
const input = JSON.parse(process.argv[2] || '{}');
if (!input.json || typeof input.json !== 'string') { console.log(JSON.stringify({ ok: false, error: 'Missing field: json' })); process.exit(1); }
if (!input.required || !Array.isArray(input.required)) { console.log(JSON.stringify({ ok: false, error: 'Missing field: required (array)' })); process.exit(1); }
try {
  const parsed = devtopiaRun('json-parse-safe', { text: input.json });
  if (!parsed.ok) { console.log(JSON.stringify({ ok: false, error: parsed.error })); process.exit(1); }
  const validated = devtopiaRun('schema-required', { object: parsed.data, required: input.required });
  if (!validated.ok) { console.log(JSON.stringify({ ok: false, error: validated.error })); process.exit(1); }
  const formatted = devtopiaRun('json-stringify-stable', { data: parsed.data });
  if (!formatted.ok) { console.log(JSON.stringify({ ok: false, error: formatted.error })); process.exit(1); }
  console.log(JSON.stringify({ ok: true, parsed: parsed.data, validated: true, formatted: formatted.json, steps: ["json-parse-safe","schema-required","json-stringify-stable"] }));
} catch (e) { console.log(JSON.stringify({ ok: false, error: e.message })); process.exit(1); }
