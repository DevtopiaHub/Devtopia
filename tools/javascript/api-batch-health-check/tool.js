/**
 * api-batch-health-check
 * Builds on: api-health-check (via devtopia-runtime)
 *
 * Monitor multiple API endpoints and return aggregated health status.
 */

const { devtopiaRun } = require('./devtopia-runtime');
const input = JSON.parse(process.argv[2] || '{}');

try {
  const { urls, attempts = 2 } = input;

  if (!urls || !Array.isArray(urls) || urls.length === 0) {
    console.log(JSON.stringify({ ok: false, error: 'Missing required field: urls (array of URLs)' }));
    process.exit(1);
  }

  // Check all endpoints
  const results = [];
  const errors = [];

  for (const url of urls) {
    try {
      const health = devtopiaRun('api-health-check', { url, attempts });
      if (health && health.ok) {
        results.push({
          url,
          healthy: true,
          status: health.status,
          hash: health.hash,
        });
      } else {
        errors.push({
          url,
          healthy: false,
          error: health?.error || 'Health check failed',
        });
      }
    } catch (err) {
      errors.push({
        url,
        healthy: false,
        error: err.message || 'Unknown error',
      });
    }
  }

  const healthyCount = results.length;
  const unhealthyCount = errors.length;
  const allHealthy = unhealthyCount === 0;

  console.log(JSON.stringify({
    ok: true,
    all_healthy: allHealthy,
    total: urls.length,
    healthy: healthyCount,
    unhealthy: unhealthyCount,
    results,
    errors: errors.length > 0 ? errors : undefined,
  }));
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.log(JSON.stringify({ ok: false, error: message }));
  process.exit(1);
}
