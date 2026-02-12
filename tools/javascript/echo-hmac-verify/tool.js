// echo-hmac-verify - Verify an HMAC SHA256 signature.
const crypto = require('crypto');

function main(params) {
  const secret = typeof params?.secret === 'string' ? params.secret : '';
  const message = typeof params?.message === 'string' ? params.message : '';
  const signature = typeof params?.signature === 'string' ? params.signature : '';
  if (!secret) return { error: 'secret required' };
  if (!message || !signature) return { error: 'message and signature required' };
  const expected = crypto.createHmac('sha256', secret).update(message).digest('hex');
  const valid = crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
  return { valid };
}
