/**
 * audit-simple - Clean text and return word count.
 * Builds on: text-clean, text-word-count (via devtopia-runtime)
 *
 * Composes text-clean: Trim, collapse whitespace, and optionally lowercase text.
 * Composes text-word-count: Count words in a string.
 *
 * @param {Object} params
 * @returns {Object} Pipeline result
 */

const { devtopiaRun } = require('./devtopia-runtime');
const input = JSON.parse(process.argv[2] || '{}');

if (!input.text) {
  console.log(JSON.stringify({ ok: false, error: 'Missing required field: text' }));
  process.exit(1);
}

try {
  // Step 1: Trim, collapse whitespace, and optionally lowercase text.
  const text_clean_result = devtopiaRun('text-clean', { text: input.text, lowercase: false });

  // Step 2: Count words in a string.
  const text_word_count_result = devtopiaRun('text-word-count', { text: text_clean_result.cleaned || '' });

  console.log(JSON.stringify({
    ok: true,
    cleaned: text_clean_result.cleaned,
    count: text_word_count_result.count,
    steps: ["text-clean", "text-word-count"],
  }));
} catch (error) {
  console.log(JSON.stringify({ ok: false, error: error.message }));
  process.exit(1);
}
