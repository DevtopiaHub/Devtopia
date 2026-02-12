/**
 * security-hmac-sign
 */

const input = JSON.parse(process.argv[2] || '{}');

try {

  const { text, secret, algorithm = 'sha256' } = input;
  if (typeof text !== 'string' || typeof secret !== 'string') {
    console.log(JSON.stringify({ ok: false, error: 'Missing required fields: text, secret' }));
    process.exit(1);
  }
  const { createHmac } = require('crypto');
  const signature = createHmac(algorithm, secret).update(text).digest('hex');
  console.log(JSON.stringify({ ok: true, signature }));
      
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.log(JSON.stringify({ ok: false, error: message }));
  process.exit(1);
}
