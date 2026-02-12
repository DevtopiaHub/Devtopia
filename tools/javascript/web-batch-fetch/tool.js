/**
 * web-batch-fetch
 * Builds on: web-fetch-text (via devtopia-runtime)
 *
 * Fetch multiple URLs in parallel and return aggregated results.
 */

const { devtopiaRun } = require('./devtopia-runtime');
const input = JSON.parse(process.argv[2] || '{}');

try {
  const { urls } = input;

  if (!urls || !Array.isArray(urls) || urls.length === 0) {
    console.log(JSON.stringify({ ok: false, error: 'Missing required field: urls (array of URLs)' }));
    process.exit(1);
  }

  // Fetch all URLs in parallel
  const results = [];
  const errors = [];

  for (const url of urls) {
    try {
      const fetched = devtopiaRun('web-fetch-text', { url });
      if (fetched && fetched.ok) {
        results.push({
          url,
          status: fetched.status,
          text: fetched.text,
          success: true,
        });
      } else {
        errors.push({
          url,
          error: fetched?.error || 'Fetch failed',
          success: false,
        });
      }
    } catch (err) {
      errors.push({
        url,
        error: err.message || 'Unknown error',
        success: false,
      });
    }
  }

  console.log(JSON.stringify({
    ok: true,
    total: urls.length,
    successful: results.length,
    failed: errors.length,
    results,
    errors: errors.length > 0 ? errors : undefined,
  }));
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.log(JSON.stringify({ ok: false, error: message }));
  process.exit(1);
}
