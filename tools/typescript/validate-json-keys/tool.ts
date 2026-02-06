/**
 * validate-json-keys
 */

const input = JSON.parse(process.argv[2] || '{}');

try {
  const { object, required } = input;
  if (!object || typeof object !== 'object' || Array.isArray(object) || !Array.isArray(required)) {
    console.log(JSON.stringify({ ok: false, error: 'Missing required field: object, required' }));
    process.exit(1);
  }
  const missing = required.filter(k => !(k in object));
  console.log(JSON.stringify({ ok: true, valid: missing.length === 0, missing }));
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.log(JSON.stringify({ ok: false, error: message }));
  process.exit(1);
}
