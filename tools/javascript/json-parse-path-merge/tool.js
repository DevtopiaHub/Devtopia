const { devtopiaRun } = require('./devtopia-runtime');
const input = JSON.parse(process.argv[2] || '{}');
if (!input.json || typeof input.json !== 'string') { console.log(JSON.stringify({ ok: false, error: 'Missing field: json' })); process.exit(1); }
if (!input.path || typeof input.path !== 'string') { console.log(JSON.stringify({ ok: false, error: 'Missing field: path' })); process.exit(1); }
if (!input.source || typeof input.source !== 'object') { console.log(JSON.stringify({ ok: false, error: 'Missing field: source (object)' })); process.exit(1); }
try {
  const parsed = devtopiaRun('json-parse-safe', { text: input.json });
  if (!parsed.ok) { console.log(JSON.stringify({ ok: false, error: parsed.error })); process.exit(1); }
  const value = devtopiaRun('json-path-get', { obj: parsed.data, path: input.path });
  if (!value.ok) { console.log(JSON.stringify({ ok: false, error: value.error })); process.exit(1); }
  const merged = devtopiaRun('json-merge-deep', { target: value.value || {}, source: input.source });
  if (!merged.ok) { console.log(JSON.stringify({ ok: false, error: merged.error })); process.exit(1); }
  console.log(JSON.stringify({ ok: true, parsed: parsed.data, path: input.path, extracted: value.value, merged: merged.result, steps: ["json-parse-safe","json-path-get","json-merge-deep"] }));
} catch (e) { console.log(JSON.stringify({ ok: false, error: e.message })); process.exit(1); }
