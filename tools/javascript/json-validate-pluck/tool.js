const { devtopiaRun } = require('./devtopia-runtime');

const input = JSON.parse(process.argv[2] || '{}');

if (!input || (!input.text && !input.json)) {
  console.log(JSON.stringify({ ok: false, error: 'Missing required field: text or json' }));
  process.exit(0);
}

const keys = Array.isArray(input.keys) ? input.keys : [];

const validated = devtopiaRun('json-validate-format', {
  text: input.text,
  json: input.json,
  space: input.space ?? 0,
});

if (!validated || !validated.ok || validated.valid !== true) {
  const err = validated?.error || 'Invalid JSON';
  console.log(JSON.stringify({ ok: false, error: err }));
  process.exit(0);
}

const plucked = devtopiaRun('json-pluck', {
  object: validated.parsed,
  keys,
});

console.log(JSON.stringify({
  ok: true,
  formatted: validated.formatted,
  object: plucked.object,
}));
