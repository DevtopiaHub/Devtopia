/**
 * web-extract-clean-text
 * Builds on: web-fetch-text, text-clean (via devtopia-runtime)
 *
 * Fetch a web page and extract clean, normalized text content.
 */

const { devtopiaRun } = require('./devtopia-runtime');
const input = JSON.parse(process.argv[2] || '{}');

try {
  const { url, lowercase, collapse_whitespace } = input;

  if (!url) {
    console.log(JSON.stringify({ ok: false, error: 'Missing required field: url' }));
    process.exit(1);
  }

  // Step 1: Fetch URL content
  const fetched = devtopiaRun('web-fetch-text', { url });
  if (!fetched || !fetched.ok || !fetched.text) {
    console.log(JSON.stringify({ ok: false, error: fetched?.error || 'Failed to fetch URL' }));
    process.exit(1);
  }

  // Step 2: Clean and normalize text
  const cleaned = devtopiaRun('text-clean', {
    text: fetched.text,
    lowercase: lowercase !== false,
    collapse_whitespace: collapse_whitespace !== false,
  });

  console.log(JSON.stringify({
    ok: true,
    url,
    status: fetched.status,
    text: cleaned.cleaned,
    original_length: fetched.text.length,
    cleaned_length: cleaned.cleaned.length,
  }));
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.log(JSON.stringify({ ok: false, error: message }));
  process.exit(1);
}
