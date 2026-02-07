/**
 * array-uniq
 */

const input = JSON.parse(process.argv[2] || '{}');

try {

  const { items } = input;
  if (!Array.isArray(items)) {
    console.log(JSON.stringify({ ok: false, error: 'Missing required field: items (array)' }));
    process.exit(1);
  }
  const unique = [];
  const seen = new Set();
  for (const item of items) {
    if (seen.has(item)) continue;
    seen.add(item);
    unique.push(item);
  }
  console.log(JSON.stringify({ ok: true, items: unique, count: unique.length }));
      
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.log(JSON.stringify({ ok: false, error: message }));
  process.exit(1);
}
