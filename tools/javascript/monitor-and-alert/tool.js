/**
 * monitor-and-alert
 * Builds on: api-batch-health-check, email-send-mailgun (via devtopia-runtime)
 *
 * Monitor multiple API endpoints and send alerts when issues are detected.
 * Combines health checks with email notifications for the first agent-orchestrated workflow.
 */

const { devtopiaRun } = require('./devtopia-runtime');
const input = JSON.parse(process.argv[2] || '{}');

try {
  // Validate input
  if (!input.urls || !Array.isArray(input.urls) || input.urls.length === 0) {
    console.log(JSON.stringify({ ok: false, error: 'Missing required field: urls (array of API endpoints)' }));
    process.exit(1);
  }

  if (!input.email_to) {
    console.log(JSON.stringify({ ok: false, error: 'Missing required field: email_to (alert recipient)' }));
    process.exit(1);
  }

  if (!input.mailgun_domain || !input.mailgun_key) {
    console.log(JSON.stringify({ ok: false, error: 'Missing Mailgun credentials: mailgun_domain, mailgun_key' }));
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

  // Step 2: Send alert if any endpoints are unhealthy
  if (!health_result.all_healthy) {
    const unhealthy_count = health_result.unhealthy;
    const error_details = health_result.errors?.map(e => `${e.url}: ${e.error}`).join('\n') || '';

    const email_body = `
API Health Alert - Issues Detected
===================================

Time: ${new Date().toISOString()}
Total Endpoints: ${health_result.total}
Healthy: ${health_result.healthy}
Unhealthy: ${unhealthy_count}

Details:
${error_details}

All Endpoints:
${health_result.results?.map(r => `✓ ${r.url} (${r.status})`).join('\n')}
${health_result.errors?.map(e => `✗ ${e.url} (${e.error})`).join('\n')}
`.trim();

    const alert_result = devtopiaRun('email-send-mailgun', {
      from: input.email_from || 'alerts@devtopia.io',
      to: input.email_to,
      subject: `[ALERT] ${unhealthy_count} API endpoint(s) unhealthy`,
      text: email_body,
      mailgun_domain: input.mailgun_domain,
      mailgun_key: input.mailgun_key
    });

    if (!alert_result || !alert_result.ok) {
      console.log(JSON.stringify({
        ok: false,
        error: 'Failed to send alert email',
        health_check: health_result,
        email_error: alert_result
      }));
      process.exit(1);
    }
  }

  // Success response
  console.log(JSON.stringify({
    ok: true,
    monitored: health_result.total,
    healthy: health_result.healthy,
    unhealthy: health_result.unhealthy,
    all_healthy: health_result.all_healthy,
    alert_sent: !health_result.all_healthy,
    results: health_result
  }));

} catch (error) {
  console.log(JSON.stringify({ ok: false, error: error.message }));
  process.exit(1);
}
