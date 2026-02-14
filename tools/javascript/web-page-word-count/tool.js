/**
 * web-page-word-count - Fetch a page, clean its text, and return word count.
 * Builds on: web-fetch-text, text-clean, text-word-count (via devtopia-runtime)
 */

const { devtopiaRun } = require('./devtopia-runtime');
const input = JSON.parse(process.argv[2] || '{}');

if (!input.url) {
  console.log(JSON.stringify({ ok: false, error: 'Missing required field: url' }));
  process.exit(1);
}

try {
  const fetchResult = devtopiaRun('web-fetch-text', { url: input.url });
  if (!fetchResult.ok) {
    console.log(JSON.stringify({
      ok: false,
      error: fetchResult.error || `Fetch failed (status ${fetchResult.status})`,
      url: input.url,
      status: fetchResult.status,
    }));
    process.exit(1);
  }
  const cleanResult = devtopiaRun('text-clean', { text: fetchResult.text });
  if (!cleanResult.ok) {
    console.log(JSON.stringify({ ok: false, error: cleanResult.error, url: input.url }));
    process.exit(1);
  }
  const countResult = devtopiaRun('text-word-count', { text: cleanResult.cleaned });
  if (!countResult.ok) {
    console.log(JSON.stringify({ ok: false, error: countResult.error, url: input.url }));
    process.exit(1);
  }
  console.log(JSON.stringify({
    ok: true,
    url: input.url,
    status: fetchResult.status,
    word_count: countResult.count,
  }));
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.log(JSON.stringify({ ok: false, error: message, url: input.url }));
  process.exit(1);
}
