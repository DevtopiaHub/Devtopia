/**
 * data-group-by
 */

const input = JSON.parse(process.argv[2] || '{}');

try {
  const { items, key } = input;
  if (!Array.isArray(items) || typeof key !== 'string') {
    console.log(JSON.stringify({ ok: false, error: 'Missing required field: items, key' }));
    process.exit(1);
  }
  const groups = {};
  for (const item of items) {
    const value = item && typeof item === 'object' ? item[key] : undefined;
    const k = value === undefined ? 'undefined' : String(value);
    if (!groups[k]) groups[k] = [];
    groups[k].push(item);
  }
  console.log(JSON.stringify({ ok: true, groups }));
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.log(JSON.stringify({ ok: false, error: message }));
  process.exit(1);
}
