/**
 * text-url-extract-validate - Extract URLs from text and validate each one
 * Builds on: text-extract-urls, url-validate (via devtopia-runtime)
 *
 * Composes text-extract-urls: Extract URLs from text
 * Composes url-validate: Validate a URL and return parsed components
 *
 * @param {Object} params
 * @param {string} params.text - Text to extract URLs from
 * @returns {Object} Pipeline result with extracted and validated URLs
 */

const { devtopiaRun } = require('./devtopia-runtime');
const input = JSON.parse(process.argv[2] || '{}');

if (!input.text || typeof input.text !== 'string') {
  console.log(JSON.stringify({ ok: false, error: 'Missing required field: text' }));
  process.exit(1);
}

try {
  // Step 1: Extract URLs from text
  const extractResult = devtopiaRun('text-extract-urls', { text: input.text });
  
  if (!extractResult.ok || !extractResult.urls || !Array.isArray(extractResult.urls)) {
    console.log(JSON.stringify({ ok: false, error: 'Failed to extract URLs from text' }));
    process.exit(1);
  }

  // Step 2: Validate each extracted URL
  const validated = [];
  const invalid = [];

  for (const url of extractResult.urls) {
    try {
      const validateResult = devtopiaRun('url-validate', { url: url });
      if (validateResult.ok) {
        validated.push({
          url: url,
          valid: true,
          parsed: validateResult
        });
      } else {
        invalid.push({
          url: url,
          valid: false,
          error: validateResult.error || 'Invalid URL'
        });
      }
    } catch (err) {
      invalid.push({
        url: url,
        valid: false,
        error: err.message || 'Validation failed'
      });
    }
  }

  console.log(JSON.stringify({
    ok: true,
    total: extractResult.urls.length,
    valid: validated.length,
    invalid: invalid.length,
    validated: validated,
    invalid: invalid
  }));
} catch (error) {
  console.log(JSON.stringify({ ok: false, error: error.message }));
  process.exit(1);
}
