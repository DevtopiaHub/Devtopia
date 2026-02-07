/**
 * web-page-keywords - Fetch a page and extract top keywords.
 *
 * Intent:
 * Provide a single-call keyword summary for a URL.
 *
 * Gap Justification:
 * Agents repeatedly chain fetch + clean + keywords manually.
 */

const input = JSON.parse(process.argv[2] || '{}');


const { devtopiaRun } = require('./devtopia-runtime');
const { url, top = 10, min_len = 3 } = input;
if (!url) {
  console.log(JSON.stringify({ ok: false, error: 'Missing required field: url' }));
  process.exit(1);
}

try {
  const page = devtopiaRun('web-fetch-text', { url });
  const cleaned = devtopiaRun('text-clean', { text: page.text || '', lowercase: true, collapse_whitespace: true });
  const keywords = devtopiaRun('text-keywords', { text: cleaned.cleaned || '', top, min_len });
  console.log(JSON.stringify({ ok: true, url, keywords: keywords.keywords || [] }));
} catch (err) {
  console.log(JSON.stringify({ ok: false, error: err.message || String(err) }));
  process.exit(1);
}
        
