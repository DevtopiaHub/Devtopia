/**
 * text-clean-report
 * Builds on: text-clean, text-lines, text-word-count (via devtopia-runtime)
 */

const { devtopiaRun } = require('./devtopia-runtime');
const input = JSON.parse(process.argv[2] || '{}');

try {
  const { text, lowercase = true } = input;
  if (typeof text !== 'string') {
    console.log(JSON.stringify({ ok: false, error: 'Missing required field: text' }));
    process.exit(1);
  }
  const cleaned = devtopiaRun('text-clean', { text, lowercase, collapse_whitespace: true });
  const lines = devtopiaRun('text-lines', { text: cleaned.cleaned, trim_empty: true });
  const words = devtopiaRun('text-word-count', { text: cleaned.cleaned });
  console.log(JSON.stringify({
    ok: true,
    cleaned: cleaned.cleaned,
    line_count: lines.count,
    word_count: words.count,
  }));
} catch (error) {
  console.log(JSON.stringify({ ok: false, error: error.message }));
  process.exit(1);
}
