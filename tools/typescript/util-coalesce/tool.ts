/**
 * util-coalesce
 */

const input = JSON.parse(process.argv[2] || '{}');

try {
  const { values } = input;
  if (!Array.isArray(values)) {
    console.log(JSON.stringify({ ok: false, error: 'Missing required field: values' }));
    process.exit(1);
  }
  const out = values.find(v => v !== null && v !== undefined);
  console.log(JSON.stringify({ ok: true, value: out }));
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.log(JSON.stringify({ ok: false, error: message }));
  process.exit(1);
}
