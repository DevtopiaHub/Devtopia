const { devtopiaRun } = require('./devtopia-runtime');
const input = JSON.parse(process.argv[2] || '{}');
if (!input.arrayA || !Array.isArray(input.arrayA)) { console.log(JSON.stringify({ ok: false, error: 'Missing field: arrayA' })); process.exit(1); }
if (!input.arrayB || !Array.isArray(input.arrayB)) { console.log(JSON.stringify({ ok: false, error: 'Missing field: arrayB' })); process.exit(1); }
if (!input.required || !Array.isArray(input.required)) { console.log(JSON.stringify({ ok: false, error: 'Missing field: required (array)' })); process.exit(1); }
try {
  const intersected = devtopiaRun('array-intersect', { arrayA: input.arrayA, arrayB: input.arrayB });
  if (!intersected.ok) { console.log(JSON.stringify({ ok: false, error: intersected.error })); process.exit(1); }
  const invalid = [];
  for (const item of intersected.intersection || []) {
    if (typeof item === 'object') {
      const validated = devtopiaRun('schema-required', { object: item, required: input.required });
      if (!validated.ok) invalid.push({ item, error: validated.error });
    }
  }
  console.log(JSON.stringify({ ok: true, intersection: intersected.intersection, invalid: invalid.length, invalidItems: invalid, steps: ["array-intersect","schema-required"] }));
} catch (e) { console.log(JSON.stringify({ ok: false, error: e.message })); process.exit(1); }
