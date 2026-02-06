/**
 * json-parse-safe
 */

const input = JSON.parse(process.argv[2] || '{}');

try {

  const { json } = input;
  if (typeof json !== 'string') {
    console.log(JSON.stringify({ ok: false, error: 'Missing required field: json' }));
    process.exit(1);
  }
  try {
    const value = JSON.parse(json);
    console.log(JSON.stringify({ ok: true, value }));
  } catch (e) {
    console.log(JSON.stringify({ ok: false, error: e.message }));
    process.exit(1);
  }
      
} catch (error) {
  console.log(JSON.stringify({ ok: false, error: error.message }));
  process.exit(1);
}
