const { devtopiaRun } = require('./devtopia-runtime');
const input = JSON.parse(process.argv[2] || '{}');
if (!input.array || !Array.isArray(input.array)) { console.log(JSON.stringify({ ok: false, error: 'Missing field: array' })); process.exit(1); }
if (!input.key || typeof input.key !== 'string') { console.log(JSON.stringify({ ok: false, error: 'Missing field: key' })); process.exit(1); }
if (!input.required || !Array.isArray(input.required)) { console.log(JSON.stringify({ ok: false, error: 'Missing field: required (array)' })); process.exit(1); }
try {
  const grouped = devtopiaRun('array-group-by', { array: input.array, key: input.key });
  if (!grouped.ok) { console.log(JSON.stringify({ ok: false, error: grouped.error })); process.exit(1); }
  const invalid = [];
  for (const [groupKey, items] of Object.entries(grouped.grouped || {})) {
    for (const item of items) {
      const validated = devtopiaRun('schema-required', { object: item, required: input.required });
      if (!validated.ok) invalid.push({ group: groupKey, item, error: validated.error });
    }
  }
  console.log(JSON.stringify({ ok: true, grouped: grouped.grouped, invalid: invalid.length, invalidItems: invalid, steps: ["array-group-by","schema-required"] }));
} catch (e) { console.log(JSON.stringify({ ok: false, error: e.message })); process.exit(1); }
