const { devtopiaRun } = require('./devtopia-runtime');
const input = JSON.parse(process.argv[2] || '{}');
if (!input.url) { console.log(JSON.stringify({ ok: false, error: 'Missing field: url' })); process.exit(1); }
try {
  const fetched = devtopiaRun('web-fetch-title', { url: input.url });
  if (!fetched.ok) { console.log(JSON.stringify({ ok: false, error: fetched.error })); process.exit(1); }
  const cleaned = devtopiaRun('text-clean', { text: fetched.title || '', lowercase: input.lowercase || false });
  if (!cleaned.ok) { console.log(JSON.stringify({ ok: false, error: cleaned.error })); process.exit(1); }
  console.log(JSON.stringify({ ok: true, url: input.url, title: fetched.title, cleaned: cleaned.cleaned, steps: ["web-fetch-title","text-clean"] }));
} catch (e) { console.log(JSON.stringify({ ok: false, error: e.message })); process.exit(1); }
