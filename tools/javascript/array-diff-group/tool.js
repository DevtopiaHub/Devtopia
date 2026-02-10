const { devtopiaRun } = require('./devtopia-runtime');
const input = JSON.parse(process.argv[2] || '{}');
if (!input.arrayA || !Array.isArray(input.arrayA)) { console.log(JSON.stringify({ ok: false, error: 'Missing field: arrayA' })); process.exit(1); }
if (!input.arrayB || !Array.isArray(input.arrayB)) { console.log(JSON.stringify({ ok: false, error: 'Missing field: arrayB' })); process.exit(1); }
if (!input.key || typeof input.key !== 'string') { console.log(JSON.stringify({ ok: false, error: 'Missing field: key' })); process.exit(1); }
try {
  const diffed = devtopiaRun('array-diff', { arrayA: input.arrayA, arrayB: input.arrayB });
  if (!diffed.ok) { console.log(JSON.stringify({ ok: false, error: diffed.error })); process.exit(1); }
  const grouped = devtopiaRun('array-group-by', { array: diffed.diff || [], key: input.key });
  if (!grouped.ok) { console.log(JSON.stringify({ ok: false, error: grouped.error })); process.exit(1); }
  console.log(JSON.stringify({ ok: true, diff: diffed.diff, grouped: grouped.grouped, steps: ["array-diff","array-group-by"] }));
} catch (e) { console.log(JSON.stringify({ ok: false, error: e.message })); process.exit(1); }
