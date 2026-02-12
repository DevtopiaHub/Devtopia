// api-request-plan - Compose auth + query builder into a request plan.
const { devtopiaRun } = require('./devtopia-runtime');

function main(params) {
  const baseUrl = typeof params?.base_url === 'string' ? params.base_url : '';
  const token = typeof params?.token === 'string' ? params.token : '';
  const method = typeof params?.method === 'string' ? params.method.toUpperCase() : 'GET';
  const query = params?.params && typeof params.params === 'object' ? params.params : {};
  if (!baseUrl) return { error: 'base_url required' };
  if (!token) return { error: 'token required' };
  const auth = devtopiaRun('api-auth-header', { token, scheme: params?.scheme || 'Bearer' });
  const urlResult = devtopiaRun('api-query-string', { base_url: baseUrl, params: query });
  return { method, url: urlResult.url, headers: auth.headers, body: params?.body ?? null };
}
