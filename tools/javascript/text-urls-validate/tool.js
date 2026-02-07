/**
 * text-urls-validate - Extract URLs from text and validate each one
 * Builds on: text-extract-urls, url-validate (via devtopia-runtime)
 */

const { devtopiaRun } = require('./devtopia-runtime');
const input = JSON.parse(process.argv[2] || '{}');

if (!input.text) {
  console.log(JSON.stringify({ ok: false, error: 'Missing required field: text' }));
  process.exit(1);
}

try {
  const extractResult = devtopiaRun('text-extract-urls', { text: input.text });
  if (!extractResult.ok) {
    console.log(JSON.stringify({ ok: false, error: extractResult.error }));
    process.exit(1);
  }

  const validated = [];
  const invalid = [];

  for (const url of (extractResult.urls || [])) {
    try {
      const validateResult = devtopiaRun('url-validate', { url });
      if (validateResult.ok) {
        validated.push({ url, valid: true, parsed: validateResult });
      } else {
        invalid.push({ url, valid: false, error: validateResult.error });
      }
    } catch (err) {
      invalid.push({ url, valid: false, error: err.message });
    }
  }

  console.log(JSON.stringify({
    ok: true,
    total: extractResult.urls ? extractResult.urls.length : 0,
    valid: validated.length,
    invalid: invalid.length,
    validated,
    invalid,
    steps: ["text-extract-urls", "url-validate"]
  }));
} catch (error) {
  console.log(JSON.stringify({ ok: false, error: error.message }));
  process.exit(1);
}
