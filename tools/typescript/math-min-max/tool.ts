/**
 * math-min-max
 */

const input = JSON.parse(process.argv[2] || '{}');

try {
  const { numbers } = input;
  if (!Array.isArray(numbers) || numbers.length === 0) {
    console.log(JSON.stringify({ ok: false, error: 'Missing required field: numbers' }));
    process.exit(1);
  }
  const vals = numbers.map(Number).filter(n => !Number.isNaN(n));
  if (vals.length === 0) {
    console.log(JSON.stringify({ ok: false, error: 'No valid numbers provided' }));
    process.exit(1);
  }
  const min = Math.min(...vals);
  const max = Math.max(...vals);
  console.log(JSON.stringify({ ok: true, min, max, count: vals.length }));
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.log(JSON.stringify({ ok: false, error: message }));
  process.exit(1);
}
