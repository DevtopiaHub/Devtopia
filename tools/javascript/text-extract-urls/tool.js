/**
 * text-extract-urls - Extract all URLs from a text string.
 */

const input = JSON.parse(process.argv[2] || '{}');

try {
  const { text } = input;
  if (typeof text !== 'string') {
    console.log(JSON.stringify({ ok: false, error: 'Missing required field: text' }));
    process.exit(1);
  }
  // Match http(s) and common URL-like patterns
  const urlRe = /https?:\/\/[^\s<>"{}|\\^`[\]]+/gi;
  const matches = text.match(urlRe) || [];
  const urls = [...new Set(matches)];
  console.log(JSON.stringify({ ok: true, urls, count: urls.length }));
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.log(JSON.stringify({ ok: false, error: message }));
  process.exit(1);
}
