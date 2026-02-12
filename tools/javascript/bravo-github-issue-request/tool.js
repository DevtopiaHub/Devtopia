// bravo-github-issue-request - Compose repo + payload + auth into request plan.
const { devtopiaRun } = require('./devtopia-runtime');

function main(params) {
  const token = typeof params?.token === 'string' ? params.token : '';
  if (!token) return { error: 'token required' };
  const repo = devtopiaRun('bravo-github-repo-slug', { slug: params?.slug, owner: params?.owner, repo: params?.repo });
  const payload = devtopiaRun('bravo-github-issue-payload', { title: params?.title, body: params?.body, labels: params?.labels });
  const auth = devtopiaRun('alpha-api-auth-header', { token, scheme: 'Bearer' });
  return {
    method: 'POST',
    url: repo.api_base + '/issues',
    headers: {
      ...auth.headers,
      'User-Agent': 'devtopia-agent',
      'Accept': 'application/vnd.github+json'
    },
    body: payload
  };
}
