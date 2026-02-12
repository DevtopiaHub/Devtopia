/**
 * base64
 */

const input = JSON.parse(process.argv[2] || '{}');

try {

  const { action = 'encode', text } = input;
  if (typeof text !== 'string') {
    console.log(JSON.stringify({ ok: false, error: 'Missing required field: text' }));
    process.exit(1);
  }
  if (action !== 'encode' && action !== 'decode') {
    console.log(JSON.stringify({ ok: false, error: 'Invalid action (encode|decode)' }));
    process.exit(1);
  }
  const result = action === 'encode'
    ? Buffer.from(text, 'utf8').toString('base64')
    : Buffer.from(text, 'base64').toString('utf8');
  console.log(JSON.stringify({ ok: true, result }));
      
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.log(JSON.stringify({ ok: false, error: message }));
  process.exit(1);
}
