const { devtopiaRun } = require('./devtopia-runtime');
const input = JSON.parse(process.argv[2] || '{}');
if (!input.array || !Array.isArray(input.array)) { console.log(JSON.stringify({ ok: false, error: 'Missing field: array' })); process.exit(1); }
if (!input.groupBy || typeof input.groupBy !== 'string') { console.log(JSON.stringify({ ok: false, error: 'Missing field: groupBy' })); process.exit(1); }
if (!input.sortBy || typeof input.sortBy !== 'string') { console.log(JSON.stringify({ ok: false, error: 'Missing field: sortBy' })); process.exit(1); }
try {
  const grouped = devtopiaRun('data-group-by', { array: input.array, key: input.groupBy });
  if (!grouped.ok) { console.log(JSON.stringify({ ok: false, error: grouped.error })); process.exit(1); }
  const sorted = devtopiaRun('data-sort-by', { array: input.array, key: input.sortBy });
  if (!sorted.ok) { console.log(JSON.stringify({ ok: false, error: sorted.error })); process.exit(1); }
  console.log(JSON.stringify({ ok: true, grouped: grouped.grouped, sorted: sorted.sorted, steps: ["data-group-by","data-sort-by"] }));
} catch (e) { console.log(JSON.stringify({ ok: false, error: e.message })); process.exit(1); }
