/**
 * security-hmac-verify
 */

const input = JSON.parse(process.argv[2] || '{}');

try {

  const { text, secret, signature, algorithm = 'sha256' } = input;
  if (typeof text !== 'string' || typeof secret !== 'string' || typeof signature !== 'string') {
    console.log(JSON.stringify({ ok: false, error: 'Missing required fields: text, secret, signature' }));
    process.exit(1);
  }
  const { createHmac, timingSafeEqual } = require('crypto');
  const expected = createHmac(algorithm, secret).update(text).digest('hex');
  const valid = expected.length === signature.length && timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
  console.log(JSON.stringify({ ok: true, valid }));
      
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.log(JSON.stringify({ ok: false, error: message }));
  process.exit(1);
}
