// security-db-api-audit-plan - Sign a DB query + API request plan.
const { devtopiaRun } = require('./devtopia-runtime');

function main(params) {
  const secret = typeof params?.secret === 'string' ? params.secret : '';
  const baseUrl = typeof params?.base_url === 'string' ? params.base_url : '';
  const token = typeof params?.token === 'string' ? params.token : '';
  const table = typeof params?.table === 'string' ? params.table : '';

  if (!secret) return { error: 'secret required' };
  if (!baseUrl) return { error: 'base_url required' };
  if (!token) return { error: 'token required' };
  if (!table) return { error: 'table required' };

  const dbPlan = devtopiaRun('db-select-plan-js', {
    table,
    filters: params?.filters || {},
    fields: params?.fields || [],
    limit: params?.limit,
  });
  if (dbPlan?.error) return { error: dbPlan.error };

  const apiPlan = devtopiaRun('api-request-plan', {
    base_url: baseUrl,
    token,
    method: params?.method || 'POST',
    params: params?.params || {},
    body: {
      query: dbPlan.query,
      params: dbPlan.params,
      meta: params?.meta || {},
    },
  });
  if (apiPlan?.error) return { error: apiPlan.error };

  const signaturePayload = JSON.stringify({
    query: dbPlan.query,
    params: dbPlan.params,
    method: apiPlan.method,
    url: apiPlan.url,
  });

  const signature = devtopiaRun('security-hmac-sign', {
    secret,
    text: signaturePayload,
  });
  if (signature?.error) return { error: signature.error };

  return {
    db_query: dbPlan,
    api_request: {
      ...apiPlan,
      headers: {
        ...apiPlan.headers,
        'X-Devtopia-Signature': signature.signature,
      },
    },
    signature: signature.signature,
  };
}