/**
 * audit-loop-text-snapshot - Get word counts and a slug from input text.
 * Builds on: text-word-count, slugify (via devtopia-runtime)
 *
 * Composes text-word-count: Count words in a text string
 * Composes slugify: Convert text to URL-safe slugs
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
  // Step 1: Count words in a text string
  const text_word_count_result = devtopiaRun('text-word-count', { text: input.text });

  // Step 2: Convert text to URL-safe slugs
  const slugify_result = devtopiaRun('slugify', { text: input.text });

  console.log(JSON.stringify({
    ok: true,
    steps: ["text-word-count", "slugify"],
    counts: text_word_count_result,
    slug: slugify_result.slug || slugify_result,
  }));
} catch (error) {
  console.log(JSON.stringify({ ok: false, error: error.message }));
  process.exit(1);
}
