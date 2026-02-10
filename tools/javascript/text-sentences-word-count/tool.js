const { devtopiaRun } = require('./devtopia-runtime');
const input = JSON.parse(process.argv[2] || '{}');
if (!input.text) { console.log(JSON.stringify({ ok: false, error: 'Missing field: text' })); process.exit(1); }
try {
  const sentences = devtopiaRun('text-sentences', { text: input.text });
  if (!sentences.ok) { console.log(JSON.stringify({ ok: false, error: sentences.error })); process.exit(1); }
  const counts = [];
  for (const sent of sentences.sentences || []) {
    const counted = devtopiaRun('text-word-count', { text: sent });
    if (counted.ok) counts.push({ sentence: sent, wordCount: counted.count || 0 });
  }
  console.log(JSON.stringify({ ok: true, text: input.text, sentences: sentences.sentences, sentenceCount: sentences.sentences ? sentences.sentences.length : 0, wordCounts: counts, steps: ["text-sentences","text-word-count"] }));
} catch (e) { console.log(JSON.stringify({ ok: false, error: e.message })); process.exit(1); }
