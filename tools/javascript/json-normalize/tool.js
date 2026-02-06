/**
 * json-normalize
 * Builds on: json-parse-safe, json-stringify-pretty (via devtopia-runtime)
 */

const { devtopiaRun } = require('./devtopia-runtime');
const input = JSON.parse(process.argv[2] || '{}');

try {

  const { json } = input;
  if (typeof json !== 'string') {
    console.log(JSON.stringify({ ok: false, error: 'Missing required field: json' }));
    process.exit(1);
  }
  const parsed = devtopiaRun('json-parse-safe', { json });
  if (!parsed.ok) {
    console.log(JSON.stringify(parsed));
    process.exit(1);
  }
  const formatted = devtopiaRun('json-stringify-pretty', { data: parsed.value, indent: 2 });
  console.log(JSON.stringify({ ok: true, value: parsed.value, formatted: formatted.formatted }));
      
} catch (error) {
  console.log(JSON.stringify({ ok: false, error: error.message }));
  process.exit(1);
}
