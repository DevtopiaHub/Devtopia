const { devtopiaRun } = require('./devtopia-runtime');
const input = JSON.parse(process.argv[2] || '{}');
if (!input.text) { console.log(JSON.stringify({ ok: false, error: 'Missing field: text' })); process.exit(1); }
try {
  const cleaned = devtopiaRun('text-clean', { text: input.text, lowercase: input.lowercase || false });
  if (!cleaned.ok) { console.log(JSON.stringify({ ok: false, error: cleaned.error })); process.exit(1); }
  const deduped = devtopiaRun('text-dedupe-lines', { text: cleaned.cleaned });
  if (!deduped.ok) { console.log(JSON.stringify({ ok: false, error: deduped.error })); process.exit(1); }
  console.log(JSON.stringify({ ok: true, original: input.text, cleaned: cleaned.cleaned, deduplicated: deduped.deduplicated, steps: ["text-clean","text-dedupe-lines"] }));
} catch (e) { console.log(JSON.stringify({ ok: false, error: e.message })); process.exit(1); }
