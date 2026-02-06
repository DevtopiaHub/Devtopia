/**
 * audit-loop-encode-validate - Encode text to base64 and validate a URL in one call.
 * Builds on: base64, url-validate (via devtopia-runtime)
 *
 * Composes base64: Encode or decode base64 strings
 * Composes url-validate: url-validate
 *
 * @param {Object} params
 * @returns {Object} Pipeline result
 */

const { devtopiaRun } = require('./devtopia-runtime');
const input = JSON.parse(process.argv[2] || '{}');

if (!input.text || !input.url) {
  console.log(JSON.stringify({ ok: false, error: 'Missing required fields: text, url' }));
  process.exit(1);
}

try {
  // Step 1: Encode or decode base64 strings
  const base64_result = devtopiaRun('base64', { action: 'encode', text: input.text });

  // Step 2: url-validate
  const url_validate_result = devtopiaRun('url-validate', { url: input.url });

  console.log(JSON.stringify({
    ok: true,
    steps: ["base64", "url-validate"],
    encoded: base64_result.output || base64_result.encoded || base64_result,
    url: url_validate_result,
  }));
} catch (error) {
  console.log(JSON.stringify({ ok: false, error: error.message }));
  process.exit(1);
}
