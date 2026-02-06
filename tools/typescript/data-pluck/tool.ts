/**
 * data-pluck
 */

const input = JSON.parse(process.argv[2] || '{}');

try {
  const { items, key } = input;
  if (!Array.isArray(items) || typeof key !== 'string') {
    console.log(JSON.stringify({ ok: false, error: 'Missing required field: items, key' }));
    process.exit(1);
  }
  const values = items.map(item => (item && typeof item === 'object') ? item[key] : undefined);
  console.log(JSON.stringify({ ok: true, values }));
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.log(JSON.stringify({ ok: false, error: message }));
  process.exit(1);
}
