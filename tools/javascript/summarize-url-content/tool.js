/**
 * summarize-url-content - summarize url content
 *
 * Intent:
 * summarize url content
 *
 * Gap Justification:
 * Need a primitive that summarizes fetched URL content for reports.
 *
 * @param {Object} params
 * @returns {Object}
 */

const input = JSON.parse(process.argv[2] || '{}');

if (typeof input.text !== 'string') {
  console.log(JSON.stringify({ ok: false, error: 'Missing required field: text' }));
  process.exit(1);
}

try {
  const { text, maxSentences = 2 } = input;
  const sentences = text
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
  const count = Math.max(1, Number(maxSentences) || 1);
  const summary = sentences.slice(0, count).join(' ');
  console.log(JSON.stringify({
    ok: true,
    summary,
    sentences: sentences.length,
  }));
} catch (error) {
  console.log(JSON.stringify({ ok: false, error: error.message }));
  process.exit(1);
}
