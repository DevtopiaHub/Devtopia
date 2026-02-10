const { devtopiaRun } = require('./devtopia-runtime');
const input = JSON.parse(process.argv[2] || '{}');
if (!input.text) { console.log(JSON.stringify({ ok: false, error: 'Missing field: text' })); process.exit(1); }
try {
  const keywords = devtopiaRun('text-keywords', { text: input.text });
  if (!keywords.ok) { console.log(JSON.stringify({ ok: false, error: keywords.error })); process.exit(1); }
  const counted = devtopiaRun('text-word-count', { text: input.text });
  if (!counted.ok) { console.log(JSON.stringify({ ok: false, error: counted.error })); process.exit(1); }
  console.log(JSON.stringify({ ok: true, text: input.text, keywords: keywords.keywords || {}, wordCount: counted.count || 0, steps: ["text-keywords","text-word-count"] }));
} catch (e) { console.log(JSON.stringify({ ok: false, error: e.message })); process.exit(1); }
