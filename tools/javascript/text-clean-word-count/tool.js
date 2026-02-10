const { devtopiaRun } = require('./devtopia-runtime');
const input = JSON.parse(process.argv[2] || '{}');
if (!input.text) { console.log(JSON.stringify({ ok: false, error: 'Missing field: text' })); process.exit(1); }
try {
  const cleaned = devtopiaRun('text-clean', { text: input.text, lowercase: input.lowercase || false });
  if (!cleaned.ok) { console.log(JSON.stringify({ ok: false, error: cleaned.error })); process.exit(1); }
  const counted = devtopiaRun('text-word-count', { text: cleaned.cleaned });
  if (!counted.ok) { console.log(JSON.stringify({ ok: false, error: counted.error })); process.exit(1); }
  console.log(JSON.stringify({ ok: true, original: input.text, cleaned: cleaned.cleaned, wordCount: counted.words || 0, charCount: counted.characters || 0, steps: ["text-clean","text-word-count"] }));
} catch (e) { console.log(JSON.stringify({ ok: false, error: e.message })); process.exit(1); }
