/**
 * audit-simple - Fetch a URL, clean its text, and count words.
 * Builds on: web-fetch-text, text-clean, text-word-count (via devtopia-runtime)
 */

const { devtopiaRun } = require('./devtopia-runtime');
const input = JSON.parse(process.argv[2] || '{}');

try {
  const { url } = input;
  if (!url) {
    console.log(JSON.stringify({ ok: false, error: 'Missing required field: url' }));
    process.exit(1);
  }

  const page = devtopiaRun('web-fetch-text', { url });
  if (!page || page.ok === false) {
    console.log(JSON.stringify({ ok: false, error: page?.error || 'Fetch failed' }));
    process.exit(1);
  }

  const cleaned = devtopiaRun('text-clean', { text: page.text, lowercase: true, collapse_whitespace: true });
  const counted = devtopiaRun('text-word-count', { text: cleaned.cleaned || '' });

  console.log(JSON.stringify({
    ok: true,
    url,
    status: page.status,
    words: counted.count,
  }));
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.log(JSON.stringify({ ok: false, error: message }));
  process.exit(1);
}
