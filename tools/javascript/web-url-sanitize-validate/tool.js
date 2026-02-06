/**
 * web-url-sanitize-validate - Sanitize and validate URLs for security: strip tracking, ensure HTTPS, validate
 * Builds on: web-strip-tracking, web-ensure-https, url-validate (via devtopia-runtime)
 *
 * Composes web-strip-tracking: Remove tracking params from a URL
 * Composes web-ensure-https: Ensure a URL uses https scheme
 * Composes url-validate: Validate a URL and return parsed components
 *
 * @param {Object} params
 * @param {string} params.url - URL to sanitize and validate
 * @returns {Object} Pipeline result with sanitized and validated URL
 */

const { devtopiaRun } = require('./devtopia-runtime');
const input = JSON.parse(process.argv[2] || '{}');

if (!input.url || typeof input.url !== 'string') {
  console.log(JSON.stringify({ ok: false, error: 'Missing required field: url' }));
  process.exit(1);
}

try {
  // Step 1: Remove tracking params from a URL
  const stripResult = devtopiaRun('web-strip-tracking', { url: input.url });
  
  if (!stripResult.ok) {
    console.log(JSON.stringify({ ok: false, error: 'Tracking strip failed', details: stripResult.error }));
    process.exit(1);
  }

  // Step 2: Ensure a URL uses https scheme
  const httpsResult = devtopiaRun('web-ensure-https', { url: stripResult.url });
  
  if (!httpsResult.ok) {
    console.log(JSON.stringify({ ok: false, error: 'HTTPS enforcement failed', details: httpsResult.error }));
    process.exit(1);
  }

  // Step 3: Validate a URL and return parsed components
  const validateResult = devtopiaRun('url-validate', { url: httpsResult.url });
  
  if (!validateResult.ok) {
    console.log(JSON.stringify({ 
      ok: false, 
      error: 'URL validation failed',
      sanitizedUrl: httpsResult.url,
      validationError: validateResult.error 
    }));
    process.exit(1);
  }

  console.log(JSON.stringify({
    ok: true,
    original: input.url,
    sanitized: httpsResult.url,
    validated: validateResult,
    steps: ["web-strip-tracking", "web-ensure-https", "url-validate"]
  }));
} catch (error) {
  console.log(JSON.stringify({ ok: false, error: error.message }));
  process.exit(1);
}
