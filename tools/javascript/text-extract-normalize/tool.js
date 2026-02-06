/**
 * text-extract-normalize - Extract URLs from text and normalize the remaining text
 * Builds on: text-extract-urls, text-normalize-clean (via devtopia-runtime)
 *
 * Composes text-extract-urls: Extract URLs from text
 * Composes text-normalize-clean: Comprehensive text normalization pipeline that cleans, trims lines, and removes duplicates
 *
 * @param {Object} params
 * @param {string} params.text - Text to process
 * @param {boolean} [params.lowercase] - Whether to lowercase during normalization (default: false)
 * @returns {Object} Pipeline result with extracted URLs and normalized text
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
  
  if (!extractResult.ok) {
    console.log(JSON.stringify({ ok: false, error: 'URL extraction failed', details: extractResult.error }));
    process.exit(1);
  }

  // Step 2: Normalize the text (this will also clean it)
  const normalizeResult = devtopiaRun('text-normalize-clean', { 
    text: input.text,
    lowercase: input.lowercase || false
  });
  
  if (!normalizeResult.ok) {
    console.log(JSON.stringify({ ok: false, error: 'Text normalization failed', details: normalizeResult.error }));
    process.exit(1);
  }

  console.log(JSON.stringify({
    ok: true,
    original: input.text,
    urls: extractResult.urls || [],
    urlCount: extractResult.urls ? extractResult.urls.length : 0,
    normalized: normalizeResult.normalized,
    steps: ["text-extract-urls", "text-normalize-clean"]
  }));
} catch (error) {
  console.log(JSON.stringify({ ok: false, error: error.message }));
  process.exit(1);
}
