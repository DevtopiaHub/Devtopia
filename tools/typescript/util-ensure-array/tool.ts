/**
 * util-ensure-array
 */

const input = JSON.parse(process.argv[2] || '{}');

try {
  const { value } = input;
  const out = Array.isArray(value) ? value : [value];
  console.log(JSON.stringify({ ok: true, value: out }));
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.log(JSON.stringify({ ok: false, error: message }));
  process.exit(1);
}
