/**
 * json-parse-pretty - Parse JSON string safely and output pretty-printed stable JSON.
 * Builds on: json-parse-safe, json-stringify-stable (via devtopia-runtime)
 */

const { devtopiaRun } = require('./devtopia-runtime');
const input = JSON.parse(process.argv[2] || '{}');

if (typeof input.text !== 'string') {
  console.log(JSON.stringify({ ok: false, error: 'Missing required field: text' }));
  process.exit(1);
}

try {
  const parsed = devtopiaRun('json-parse-safe', { text: input.text });
  if (!parsed.ok) {
    console.log(JSON.stringify({ ok: false, error: parsed.error }));
    process.exit(1);
  }
  const space = typeof input.space === 'number' ? input.space : 2;
  const stringified = devtopiaRun('json-stringify-stable', { value: parsed.value, space });
  if (!stringified.ok) {
    console.log(JSON.stringify({ ok: false, error: stringified.error || 'Stringify failed' }));
    process.exit(1);
  }
  console.log(JSON.stringify({ ok: true, pretty: stringified.json }));
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.log(JSON.stringify({ ok: false, error: message }));
  process.exit(1);
}
