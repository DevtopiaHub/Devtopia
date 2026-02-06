/**
 * audit-text-metrics - Clean text and compute word/character counts
 * Builds on: text-clean, text-word-count (via devtopia-runtime)
 *
 * Composes text-clean: Normalize text: trim, collapse whitespace, optional lowercase
 * Composes text-word-count: Count words and characters in text
 *
 * @param {Object} params
 * @returns {Object} Cleaned text + metrics
 */

const { devtopiaRun } = require('./devtopia-runtime');
const input = JSON.parse(process.argv[2] || '{}');

if (typeof input.text !== 'string') {
  console.log(JSON.stringify({ ok: false, error: 'Missing required field: text' }));
  process.exit(1);
}

try {
  // Step 1: Normalize text: trim, collapse whitespace, optional lowercase
  const cleaned = devtopiaRun('text-clean', {
    text: input.text,
    lowercase: input.lowercase ?? false,
    collapseWhitespace: input.collapseWhitespace ?? true,
  });

  // Step 2: Count words and characters in text
  const metrics = devtopiaRun('text-word-count', { text: cleaned.cleaned });

  console.log(JSON.stringify({
    ok: true,
    cleaned: cleaned.cleaned,
    words: metrics.words,
    characters: metrics.characters,
  }));
} catch (error) {
  console.log(JSON.stringify({ ok: false, error: error.message }));
  process.exit(1);
}
