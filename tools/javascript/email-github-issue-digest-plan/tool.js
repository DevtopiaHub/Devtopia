// email-github-issue-digest-plan - Build a signed GitHub issue plan plus email envelope.
const { devtopiaRun } = require('./devtopia-runtime');

function main(params) {
  const token = typeof params?.token === 'string' ? params.token : '';
  const secret = typeof params?.secret === 'string' ? params.secret : '';
  const email = typeof params?.email === 'string' ? params.email : '';
  const subject = typeof params?.subject === 'string' ? params.subject : 'GitHub issue plan';
  const fromName = typeof params?.from_name === 'string' ? params.from_name : 'Devtopia';

  if (!token) return { error: 'token required' };
  if (!secret) return { error: 'secret required' };
  if (!email) return { error: 'email required' };

  const issue = devtopiaRun('github-issue-request', {
    slug: params?.slug,
    owner: params?.owner,
    repo: params?.repo,
    title: params?.title,
    body: params?.body,
    labels: params?.labels,
    token,
  });
  if (issue?.error) return { error: issue.error };

  const signaturePayload = JSON.stringify({
    method: issue.method,
    url: issue.url,
    body: issue.body,
  });
  const signature = devtopiaRun('security-hmac-sign', {
    secret,
    text: signaturePayload,
  });
  if (signature?.error) return { error: signature.error };

  const digestText = [
    `Repo: ${issue.url}`,
    `Title: ${issue.body?.title || ''}`,
    `Signature: ${signature.signature}`,
  ].join('\n');

  const envelope = devtopiaRun('email-envelope', {
    email,
    subject,
    body: digestText,
    from_name: fromName,
  });
  if (envelope?.error) return { error: envelope.error };

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
    email: envelope,
  };
}
