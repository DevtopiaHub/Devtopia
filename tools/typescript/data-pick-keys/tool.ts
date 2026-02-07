/**
 * data-pick-keys
 */

const input = JSON.parse(process.argv[2] || '{}');

try {
  const { object, keys } = input;
  if (!object || typeof object !== 'object' || Array.isArray(object) || !Array.isArray(keys)) {
    console.log(JSON.stringify({ ok: false, error: 'Missing required field: object, keys' }));
    process.exit(1);
  }
  const out = {};
  for (const key of keys) {
    if (Object.prototype.hasOwnProperty.call(object, key)) {
      out[key] = object[key];
    }
  }
  console.log(JSON.stringify({ ok: true, object: out }));
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.log(JSON.stringify({ ok: false, error: message }));
  process.exit(1);
}
