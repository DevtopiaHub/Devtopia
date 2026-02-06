/**
 * pipeline-validate-json-keys
 * Builds on: json-parse-safe, validate-required (via devtopia-runtime)
 */

const { devtopiaRun } = require('./devtopia-runtime');
const input = JSON.parse(process.argv[2] || '{}');

try {
  const { json, required } = input;
  if (typeof json !== 'string' || !Array.isArray(required)) {
    console.log(JSON.stringify({ ok: false, error: 'Missing required field: json, required' }));
    process.exit(1);
  }
  const parsed = devtopiaRun("json-parse-safe", { json });
  if (!parsed || parsed.ok === false) {
    console.log(JSON.stringify({ ok: false, error: 'Invalid JSON' }));
    process.exit(1);
  }
  const check = devtopiaRun("validate-required", { data: parsed.value, required });
  console.log(JSON.stringify({ ok: true, valid: check.valid, missing: check.missing || [] }));
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.log(JSON.stringify({ ok: false, error: message }));
  process.exit(1);
}
