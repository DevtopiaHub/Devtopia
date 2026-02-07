const { devtopiaRun } = require('./devtopia-runtime');
const input = JSON.parse(process.argv[2] || '{}');
if (!input.url) { console.log(JSON.stringify({ ok: false, error: 'Missing field: url' })); process.exit(1); }
try {
  const strip = devtopiaRun('web-strip-tracking', { url: input.url });
  if (!strip.ok) { console.log(JSON.stringify({ ok: false, error: strip.error })); process.exit(1); }
  const https = devtopiaRun('web-ensure-https', { url: strip.url });
  if (!https.ok) { console.log(JSON.stringify({ ok: false, error: https.error })); process.exit(1); }
  const parsed = devtopiaRun('url-parse', { url: https.url });
  if (!parsed.ok) { console.log(JSON.stringify({ ok: false, error: parsed.error })); process.exit(1); }
  console.log(JSON.stringify({ ok: true, original: input.url, sanitized: https.url, parsed, steps: ["web-strip-tracking","web-ensure-https","url-parse"] }));
} catch (e) { console.log(JSON.stringify({ ok: false, error: e.message })); process.exit(1); }
