const { devtopiaRun } = require('./devtopia-runtime');
const input = JSON.parse(process.argv[2] || '{}');
if (!input.target || !input.source) { console.log(JSON.stringify({ ok: false, error: 'Missing fields: target, source' })); process.exit(1); }
if (!input.required || !Array.isArray(input.required)) { console.log(JSON.stringify({ ok: false, error: 'Missing field: required (array)' })); process.exit(1); }
try {
  const merged = devtopiaRun('json-merge-deep', { target: input.target, source: input.source });
  if (!merged.ok) { console.log(JSON.stringify({ ok: false, error: merged.error })); process.exit(1); }
  const validated = devtopiaRun('schema-required', { object: merged.result, required: input.required });
  if (!validated.ok) { console.log(JSON.stringify({ ok: false, error: validated.error, merged: merged.result })); process.exit(1); }
  console.log(JSON.stringify({ ok: true, merged: merged.result, validated: true, steps: ["json-merge-deep","schema-required"] }));
} catch (e) { console.log(JSON.stringify({ ok: false, error: e.message })); process.exit(1); }
