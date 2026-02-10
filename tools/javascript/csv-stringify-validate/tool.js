const { devtopiaRun } = require('./devtopia-runtime');
const input = JSON.parse(process.argv[2] || '{}');
if (!input.array || !Array.isArray(input.array)) { console.log(JSON.stringify({ ok: false, error: 'Missing field: array' })); process.exit(1); }
if (!input.required || !Array.isArray(input.required)) { console.log(JSON.stringify({ ok: false, error: 'Missing field: required (array)' })); process.exit(1); }
try {
  const invalid = [];
  for (const item of input.array) {
    const validated = devtopiaRun('schema-required', { object: item, required: input.required });
    if (!validated.ok) invalid.push({ item, error: validated.error });
  }
  if (invalid.length > 0) { console.log(JSON.stringify({ ok: false, error: 'Validation failed', invalid })); process.exit(1); }
  const stringified = devtopiaRun('csv-stringify', { array: input.array });
  if (!stringified.ok) { console.log(JSON.stringify({ ok: false, error: stringified.error })); process.exit(1); }
  console.log(JSON.stringify({ ok: true, csv: stringified.csv, rows: input.array.length, steps: ["schema-required","csv-stringify"] }));
} catch (e) { console.log(JSON.stringify({ ok: false, error: e.message })); process.exit(1); }
