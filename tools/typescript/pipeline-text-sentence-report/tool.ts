/**
 * pipeline-text-sentence-report
 * Builds on: text-sentence-split, text-word-count (via devtopia-runtime)
 */

const { devtopiaRun } = require('./devtopia-runtime');
const input = JSON.parse(process.argv[2] || '{}');

try {
  const { text } = input;
  if (typeof text !== 'string') {
    console.log(JSON.stringify({ ok: false, error: 'Missing required field: text' }));
    process.exit(1);
  }
  const sentences = devtopiaRun('text-sentence-split', { text });
  const stats = devtopiaRun('text-word-count', { text });
  console.log(JSON.stringify({ ok: true, sentenceCount: sentences.count, wordCount: stats.words, sentences: sentences.sentences }));
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.log(JSON.stringify({ ok: false, error: message }));
  process.exit(1);
}
