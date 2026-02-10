const { devtopiaRun } = require('./devtopia-runtime');
const input = JSON.parse(process.argv[2] || '{}');
if (!input.text) { console.log(JSON.stringify({ ok: false, error: 'Missing field: text' })); process.exit(1); }
if (!input.required || !Array.isArray(input.required)) { console.log(JSON.stringify({ ok: false, error: 'Missing field: required (array)' })); process.exit(1); }
try {
  const parsed = devtopiaRun('csv-parse', { text: input.text });
  if (!parsed.ok) { console.log(JSON.stringify({ ok: false, error: parsed.error })); process.exit(1); }
  const invalid = [];
  for (const row of parsed.rows || []) {
    const validated = devtopiaRun('schema-required', { object: row, required: input.required });
    if (!validated.ok) invalid.push({ row, error: validated.error });
  }
  console.log(JSON.stringify({ ok: true, rows: parsed.rows, total: parsed.rows ? parsed.rows.length : 0, invalid: invalid.length, invalidRows: invalid, steps: ["csv-parse","schema-required"] }));
} catch (e) { console.log(JSON.stringify({ ok: false, error: e.message })); process.exit(1); }
