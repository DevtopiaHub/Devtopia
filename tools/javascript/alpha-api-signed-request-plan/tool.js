// alpha-api-signed-request-plan - Build a signed API request plan.
const { devtopiaRun } = require('./devtopia-runtime');

function main(params) {
  const baseUrl = typeof params?.base_url === 'string' ? params.base_url : '';
  const token = typeof params?.token === 'string' ? params.token : '';
  const secret = typeof params?.secret === 'string' ? params.secret : '';
  const method = typeof params?.method === 'string' ? params.method.toUpperCase() : 'GET';
  const query = params?.params && typeof params.params === 'object' ? params.params : {};
  const body = params?.body ?? null;

  if (!baseUrl) return { error: 'base_url required' };
  if (!token) return { error: 'token required' };
  if (!secret) return { error: 'secret required' };

  const plan = devtopiaRun('alpha-api-request-plan', {
    base_url: baseUrl,
    params: query,
    token,
    method,
    body,
  });

  const signaturePayload = JSON.stringify({
    method: plan.method,
    url: plan.url,
    body: plan.body,
  });

  const signature = devtopiaRun('echo-hmac-sign', {
    secret,
    message: signaturePayload,
  });

  return {
    method: plan.method,
    url: plan.url,
    headers: {
      ...plan.headers,
      'X-Devtopia-Signature': signature.signature,
    },
    body: plan.body,
    signature: signature.signature,
  };
}
