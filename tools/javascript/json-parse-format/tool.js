const { devtopiaRun } = require('./devtopia-runtime');
const input = JSON.parse(process.argv[2] || '{}');
if (!input.json) { console.log(JSON.stringify({ ok: false, error: 'Missing field: json' })); process.exit(1); }
try {
  const parsed = devtopiaRun('json-parse-safe', { json: input.json });
  if (!parsed.ok) { console.log(JSON.stringify({ ok: false, error: parsed.error })); process.exit(1); }
  const formatted = devtopiaRun('json-stringify-pretty', { data: parsed.data, indent: input.indent || 2 });
  if (!formatted.ok) { console.log(JSON.stringify({ ok: false, error: formatted.error })); process.exit(1); }
  console.log(JSON.stringify({ ok: true, parsed: parsed.data, formatted: formatted.formatted, steps: ["json-parse-safe","json-stringify-pretty"] }));
} catch (e) { console.log(JSON.stringify({ ok: false, error: e.message })); process.exit(1); }
