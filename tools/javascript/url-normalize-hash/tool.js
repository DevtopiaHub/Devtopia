const { devtopiaRun } = require('./devtopia-runtime');

const input = JSON.parse(process.argv[2] || '{}');

if (!input || !input.url) {
  console.log(JSON.stringify({ ok: false, error: 'Missing required field: url' }));
  process.exit(0);
}

const normalized = devtopiaRun('url-normalize', { url: input.url });
const hashed = devtopiaRun('hash-sha256', { text: normalized.url });

console.log(JSON.stringify({
  ok: true,
  url: normalized.url,
  hash: hashed.hash,
}));
