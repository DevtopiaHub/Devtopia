/**
 * json-validate-format
 * Builds on: json-parse-safe, json-stringify-stable (via devtopia-runtime)
 *
 * Validates JSON input and formats it with stable key ordering.
 */

const { devtopiaRun } = require('./devtopia-runtime');
const input = JSON.parse(process.argv[2] || '{}');

try {
  const { text, json } = input;
  
  if (!text && !json) {
    console.log(JSON.stringify({ ok: false, error: 'Missing required field: text or json' }));
    process.exit(1);
  }

  // Step 1: Parse JSON safely (validates structure)
  const inputText = text || (typeof json === 'string' ? json : JSON.stringify(json));
  const parsed = devtopiaRun('json-parse-safe', { text: inputText });
  
  if (!parsed || !parsed.ok || !parsed.value) {
    console.log(JSON.stringify({ ok: false, error: parsed?.error || 'Invalid JSON' }));
    process.exit(1);
  }

  // Step 2: Format with stable key ordering
  const formatted = devtopiaRun('json-stringify-stable', { value: parsed.value, space: input.space || 0 });

  console.log(JSON.stringify({
    ok: true,
    valid: true,
    formatted: formatted.json,
    parsed: parsed.value,
  }));
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.log(JSON.stringify({ ok: false, error: message }));
  process.exit(1);
}
