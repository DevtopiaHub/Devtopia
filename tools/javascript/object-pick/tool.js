/**
 * object-pick
 */

const input = JSON.parse(process.argv[2] || '{}');

try {

  const { obj, keys } = input;
  if (!obj || typeof obj !== 'object' || Array.isArray(obj)) {
    console.log(JSON.stringify({ ok: false, error: 'Missing required field: obj (object)' }));
    process.exit(1);
  }
  if (!Array.isArray(keys)) {
    console.log(JSON.stringify({ ok: false, error: 'Missing required field: keys (array)' }));
    process.exit(1);
  }
  const result = {};
  for (const key of keys) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      result[key] = obj[key];
    }
  }
  console.log(JSON.stringify({ ok: true, result }));
      
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.log(JSON.stringify({ ok: false, error: message }));
  process.exit(1);
}
