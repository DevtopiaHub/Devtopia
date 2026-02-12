/**
 * github-issue-from-detection
 * Builds on: api-batch-health-check, github-create-issue
 *
 * Detect API failures and automatically create GitHub issues.
 * Agent workflow: Monitor → Alert → Escalate
 */

const { devtopiaRun } = require('./devtopia-runtime');
const input = JSON.parse(process.argv[2] || '{}');

try {
  if (!input.urls || !Array.isArray(input.urls) || input.urls.length === 0) {
    console.log(JSON.stringify({ ok: false, error: 'Missing required field: urls (array)' }));
    process.exit(1);
  }

  if (!input.repo) {
    console.log(JSON.stringify({ ok: false, error: 'Missing required field: repo (owner/repo format)' }));
    process.exit(1);
  }

  if (!input.github_token) {
    console.log(JSON.stringify({ ok: false, error: 'Missing required field: github_token' }));
    process.exit(1);
  }

  // Step 1: Check health of all endpoints
  const health_result = devtopiaRun('api-batch-health-check', {
    urls: input.urls,
    attempts: input.attempts || 2
  });

  if (!health_result || !health_result.ok) {
    console.log(JSON.stringify({ ok: false, error: 'Health check failed', details: health_result }));
    process.exit(1);
  }

  // Step 2: Create issue if any endpoints failed
  let issue_created = false;
  let issue_result = null;

  if (!health_result.all_healthy) {
    const unhealthy_endpoints = health_result.errors || [];
    const issue_title = `[AUTO] API Health Alert: ${health_result.unhealthy} endpoint(s) down`;
    const issue_body = `## Detection Summary
- **Time**: ${new Date().toISOString()}
- **Healthy**: ${health_result.healthy}/${health_result.total}
- **Unhealthy**: ${health_result.unhealthy}

## Failed Endpoints
${unhealthy_endpoints.map(e => `- ❌ \`${e.url}\` - ${e.error}`).join('\n')}

## Healthy Endpoints
${health_result.results?.map(r => `- ✅ \`${r.url}\` (${r.status})`).join('\n')}

---
*Auto-created by devtopia agent workflow*
`;

    issue_result = devtopiaRun('github-create-issue', {
      repo: input.repo,
      title: issue_title,
      body: issue_body,
      labels: input.labels || ['bug', 'automated'],
      github_token: input.github_token
    });

    if (issue_result && issue_result.ok) {
      issue_created = true;
    }
  }

  console.log(JSON.stringify({
    ok: true,
    monitored: health_result.total,
    healthy: health_result.healthy,
    unhealthy: health_result.unhealthy,
    all_healthy: health_result.all_healthy,
    issue_created: issue_created,
    issue: issue_result,
    health_check: health_result
  }));

} catch (error) {
  console.log(JSON.stringify({ ok: false, error: error.message }));
  process.exit(1);
}
