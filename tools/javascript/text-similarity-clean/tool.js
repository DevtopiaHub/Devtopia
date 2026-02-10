const { devtopiaRun } = require('./devtopia-runtime');
const input = JSON.parse(process.argv[2] || '{}');
if (!input.textA || !input.textB) { console.log(JSON.stringify({ ok: false, error: 'Missing fields: textA, textB' })); process.exit(1); }
try {
  const cleanedA = devtopiaRun('text-clean', { text: input.textA, lowercase: true });
  if (!cleanedA.ok) { console.log(JSON.stringify({ ok: false, error: cleanedA.error })); process.exit(1); }
  const cleanedB = devtopiaRun('text-clean', { text: input.textB, lowercase: true });
  if (!cleanedB.ok) { console.log(JSON.stringify({ ok: false, error: cleanedB.error })); process.exit(1); }
  const similarity = devtopiaRun('text-similarity-jaccard', { textA: cleanedA.cleaned, textB: cleanedB.cleaned });
  if (!similarity.ok) { console.log(JSON.stringify({ ok: false, error: similarity.error })); process.exit(1); }
  console.log(JSON.stringify({ ok: true, textA: input.textA, textB: input.textB, cleanedA: cleanedA.cleaned, cleanedB: cleanedB.cleaned, similarity: similarity.similarity, steps: ["text-clean","text-similarity-jaccard"] }));
} catch (e) { console.log(JSON.stringify({ ok: false, error: e.message })); process.exit(1); }
