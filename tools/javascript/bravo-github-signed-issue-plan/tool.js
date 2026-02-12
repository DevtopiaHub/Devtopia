// bravo-github-signed-issue-plan - Build a signed GitHub issue request + callback plan.
const { devtopiaRun } = require('./devtopia-runtime');

function main(params) {
  const token = typeof params?.token === 'string' ? params.token : '';
  const secret = typeof params?.secret === 'string' ? params.secret : '';
  const callbackBase = typeof params?.callback_base_url === 'string' ? params.callback_base_url : '';

  if (!token) return { error: 'token required' };
  if (!secret) return { error: 'secret required' };
  if (!callbackBase) return { error: 'callback_base_url required' };

  const issue = devtopiaRun('bravo-github-issue-request', {
    slug: params?.slug,
    owner: params?.owner,
    repo: params?.repo,
    title: params?.title,
    body: params?.body,
    labels: params?.labels,
    token,
  });

  const signaturePayload = JSON.stringify({
    method: issue.method,
    url: issue.url,
    body: issue.body,
  });

  const signature = devtopiaRun('echo-hmac-sign', {
    secret,
    message: signaturePayload,
  });

  const callbackPlan = devtopiaRun('alpha-api-request-plan', {
    base_url: callbackBase,
    params: params?.callback_params || {},
    token,
    method: params?.callback_method || 'POST',
    body: {
      issue: issue.body,
      signature: signature.signature,
    },
  });

  return {
    issue_request: {
      method: issue.method,
      url: issue.url,
      headers: {
        ...issue.headers,
        'X-Devtopia-Signature': signature.signature,
      },
      body: issue.body,
      signature: signature.signature,
    },
    callback_request: callbackPlan,
  };
}
