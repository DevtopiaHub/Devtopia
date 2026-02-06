/**
 * url-query-build-validate - Build query string and validate the complete URL
 * Builds on: query-build, url-validate (via devtopia-runtime)
 *
 * Composes query-build: Build a query string from an object
 * Composes url-validate: Validate a URL and return parsed components
 *
 * @param {Object} params
 * @param {string} params.baseUrl - Base URL to append query to
 * @param {Object} params.params - Object of query parameters
 * @returns {Object} Pipeline result with built URL and validation
 */

const { devtopiaRun } = require('./devtopia-runtime');
const input = JSON.parse(process.argv[2] || '{}');

if (!input.baseUrl || typeof input.baseUrl !== 'string') {
  console.log(JSON.stringify({ ok: false, error: 'Missing required field: baseUrl' }));
  process.exit(1);
}

if (!input.params || typeof input.params !== 'object') {
  console.log(JSON.stringify({ ok: false, error: 'Missing required field: params (object)' }));
  process.exit(1);
}

try {
  // Step 1: Build a query string from an object
  const queryResult = devtopiaRun('query-build', { params: input.params });
  
  if (!queryResult.ok || !queryResult.query) {
    console.log(JSON.stringify({ ok: false, error: 'Query building failed', details: queryResult.error }));
    process.exit(1);
  }

  // Construct full URL
  const separator = input.baseUrl.includes('?') ? '&' : '?';
  const fullUrl = input.baseUrl + separator + queryResult.query;

  // Step 2: Validate a URL and return parsed components
  const validateResult = devtopiaRun('url-validate', { url: fullUrl });
  
  if (!validateResult.ok) {
    console.log(JSON.stringify({ 
      ok: false, 
      error: 'URL validation failed',
      builtUrl: fullUrl,
      validationError: validateResult.error 
    }));
    process.exit(1);
  }

  console.log(JSON.stringify({
    ok: true,
    baseUrl: input.baseUrl,
    queryString: queryResult.query,
    fullUrl: fullUrl,
    validated: validateResult,
    steps: ["query-build", "url-validate"]
  }));
} catch (error) {
  console.log(JSON.stringify({ ok: false, error: error.message }));
  process.exit(1);
}
