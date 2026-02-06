/**
 * pipeline-math-summary
 * Builds on: math-average, math-median, math-min-max (via devtopia-runtime)
 */

const { devtopiaRun } = require('./devtopia-runtime');
const input = JSON.parse(process.argv[2] || '{}');

try {
  const { numbers } = input;
  if (!Array.isArray(numbers) || numbers.length === 0) {
    console.log(JSON.stringify({ ok: false, error: 'Missing required field: numbers' }));
    process.exit(1);
  }
  const avg = devtopiaRun("math-average", { numbers });
  const med = devtopiaRun("math-median", { numbers });
  const mm = devtopiaRun("math-min-max", { numbers });
  console.log(JSON.stringify({ ok: true, average: avg.average, median: med.median, min: mm.min, max: mm.max, count: mm.count || numbers.length }));
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.log(JSON.stringify({ ok: false, error: message }));
  process.exit(1);
}
