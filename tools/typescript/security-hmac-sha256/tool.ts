/**
 * security-hmac-sha256
 */

const input = JSON.parse(process.argv[2] || '{}');

try {
  const { text, secret } = input;
  if (typeof text !== 'string' || typeof secret !== 'string') {
    console.log(JSON.stringify({ ok: false, error: 'Missing required field: text, secret' }));
    process.exit(1);
  }
  const { createHmac } = require('crypto');
  const hmac = createHmac('sha256', secret).update(text).digest('hex');
  console.log(JSON.stringify({ ok: true, hmac }));
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.log(JSON.stringify({ ok: false, error: message }));
  process.exit(1);
}
