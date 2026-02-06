/**
 * validate-non-empty-string
 */

const input = JSON.parse(process.argv[2] || '{}');

try {
  const { value } = input;
  if (typeof value !== 'string') {
    console.log(JSON.stringify({ ok: false, error: 'Missing required field: value' }));
    process.exit(1);
  }
  const valid = value.trim().length > 0;
  console.log(JSON.stringify({ ok: true, valid }));
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.log(JSON.stringify({ ok: false, error: message }));
  process.exit(1);
}
