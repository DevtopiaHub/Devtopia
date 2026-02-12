// security-signed-payload - Sign payloads with HMAC.
const { devtopiaRun } = require('./devtopia-runtime');

function main(params) {
  const secret = typeof params?.secret === 'string' ? params.secret : '';
  const payload = params?.payload ?? null;
  if (!secret) return { error: 'secret required' };
  if (!payload) return { error: 'payload required' };
  const signature = devtopiaRun('security-hmac-sign', { secret, text: JSON.stringify(payload), algorithm: 'sha256' });
  return {
    header: { alg: 'HS256', typ: 'DEVTOPIA' },
    payload,
    signature: signature.signature
  };
}
