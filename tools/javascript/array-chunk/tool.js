/**
 * array-chunk
 */

const input = JSON.parse(process.argv[2] || '{}');

try {

  const { items, size = 2 } = input;
  if (!Array.isArray(items)) {
    console.log(JSON.stringify({ ok: false, error: 'Missing required field: items (array)' }));
    process.exit(1);
  }
  const n = Math.max(1, Number(size) || 1);
  const chunks = [];
  for (let i = 0; i < items.length; i += n) {
    chunks.push(items.slice(i, i + n));
  }
  console.log(JSON.stringify({ ok: true, chunks }));
      
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.log(JSON.stringify({ ok: false, error: message }));
  process.exit(1);
}
