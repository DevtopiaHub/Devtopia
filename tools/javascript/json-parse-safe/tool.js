/**
 * json-parse-safe
 */

const input = JSON.parse(process.argv[2] || '{}');

try {

  const { text } = input;
  if (typeof text !== 'string') {
    console.log(JSON.stringify({ ok: false, error: 'Missing required field: text' }));
    process.exit(1);
  }
  const value = JSON.parse(text);
  console.log(JSON.stringify({ ok: true, value }));
      
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.log(JSON.stringify({ ok: false, error: message }));
  process.exit(1);
}
