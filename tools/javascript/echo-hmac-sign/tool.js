// echo-hmac-sign - Create an HMAC SHA256 signature.
const crypto = require('crypto');

function main(params) {
  const secret = typeof params?.secret === 'string' ? params.secret : '';
  const message = typeof params?.message === 'string' ? params.message : '';
  if (!secret) return { error: 'secret required' };
  if (!message) return { error: 'message required' };
  const signature = crypto.createHmac('sha256', secret).update(message).digest('hex');
  return { signature };
}
