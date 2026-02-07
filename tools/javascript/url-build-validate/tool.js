const { devtopiaRun } = require('./devtopia-runtime');
const input = JSON.parse(process.argv[2] || '{}');
if (!input.base || !input.path) { console.log(JSON.stringify({ ok: false, error: 'Missing fields: base, path' })); process.exit(1); }
try {
  const built = devtopiaRun('url-build', { base: input.base, path: input.path, query: input.query || {} });
  if (!built.ok) { console.log(JSON.stringify({ ok: false, error: built.error })); process.exit(1); }
  const validated = devtopiaRun('url-validate', { url: built.url });
  if (!validated.ok) { console.log(JSON.stringify({ ok: false, error: validated.error, builtUrl: built.url })); process.exit(1); }
  console.log(JSON.stringify({ ok: true, url: built.url, validated, steps: ["url-build","url-validate"] }));
} catch (e) { console.log(JSON.stringify({ ok: false, error: e.message })); process.exit(1); }
