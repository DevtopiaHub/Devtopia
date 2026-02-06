/**
 * data-count-by
 */

const input = JSON.parse(process.argv[2] || '{}');

try {
  const { items, key } = input;
  if (!Array.isArray(items) || typeof key !== 'string') {
    console.log(JSON.stringify({ ok: false, error: 'Missing required field: items, key' }));
    process.exit(1);
  }
  const counts = {};
  for (const item of items) {
    const value = item && typeof item === "object" ? item[key] : undefined;
    const k = value === undefined ? "undefined" : String(value);
    counts[k] = (counts[k] || 0) + 1;
  }
  console.log(JSON.stringify({ ok: true, counts }));
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.log(JSON.stringify({ ok: false, error: message }));
  process.exit(1);
}
