const { devtopiaRun } = require('./devtopia-runtime');
const input = JSON.parse(process.argv[2] || '{}');
if (!input.text) { console.log(JSON.stringify({ ok: false, error: 'Missing field: text' })); process.exit(1); }
try {
  const slug = devtopiaRun('text-slugify', { text: input.text });
  if (!slug.ok) { console.log(JSON.stringify({ ok: false, error: slug.error })); process.exit(1); }
  const url = `https://example.com/${slug.slug}`;
  const normalized = devtopiaRun('url-normalize', { url });
  if (!normalized.ok) { console.log(JSON.stringify({ ok: false, error: normalized.error })); process.exit(1); }
  console.log(JSON.stringify({ ok: true, text: input.text, slug: slug.slug, normalizedUrl: normalized.url, steps: ["text-slugify","url-normalize"] }));
} catch (e) { console.log(JSON.stringify({ ok: false, error: e.message })); process.exit(1); }
