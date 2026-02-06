/**
 * object-merge
 */

const input = JSON.parse(process.argv[2] || '{}');

try {

  const { a, b } = input;
  if (!a || typeof a !== 'object' || Array.isArray(a)) {
    console.log(JSON.stringify({ ok: false, error: 'Missing required field: a' }));
    process.exit(1);
  }
  if (!b || typeof b !== 'object' || Array.isArray(b)) {
    console.log(JSON.stringify({ ok: false, error: 'Missing required field: b' }));
    process.exit(1);
  }
  const merged = { ...a, ...b };
  console.log(JSON.stringify({ ok: true, merged }));
      
} catch (error) {
  console.log(JSON.stringify({ ok: false, error: error.message }));
  process.exit(1);
}
