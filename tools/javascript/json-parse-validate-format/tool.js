/**
 * json-parse-validate-format - Parse JSON, validate structure, and pretty-print
 * Builds on: json-parse-safe, validate-json-keys, json-stringify-pretty (via devtopia-runtime)
 *
 * Composes json-parse-safe: Parse JSON string safely with structured errors
 * Composes validate-json-keys: Ensure an object includes required keys
 * Composes json-stringify-pretty: Pretty-print JSON with configurable indentation
 *
 * @param {Object} params
 * @param {string} params.json - JSON string to parse
 * @param {string[]} params.requiredKeys - Array of required key names
 * @param {number} [params.indent] - Indentation for formatting (default: 2)
 * @returns {Object} Pipeline result with parsed, validated, and formatted JSON
 */

const { devtopiaRun } = require('./devtopia-runtime');
const input = JSON.parse(process.argv[2] || '{}');

if (!input.json || typeof input.json !== 'string') {
  console.log(JSON.stringify({ ok: false, error: 'Missing required field: json (string)' }));
  process.exit(1);
}

if (!input.requiredKeys || !Array.isArray(input.requiredKeys)) {
  console.log(JSON.stringify({ ok: false, error: 'Missing required field: requiredKeys (array)' }));
  process.exit(1);
}

try {
  // Step 1: Parse JSON string safely
  const parseResult = devtopiaRun('json-parse-safe', { json: input.json });
  
  if (!parseResult.ok) {
    console.log(JSON.stringify({ ok: false, error: 'JSON parse failed', details: parseResult.error }));
    process.exit(1);
  }

  // Ensure parsed data is an object (not array or primitive)
  if (typeof parseResult.data !== 'object' || Array.isArray(parseResult.data) || parseResult.data === null) {
    console.log(JSON.stringify({ ok: false, error: 'Parsed data must be an object' }));
    process.exit(1);
  }

  // Step 2: Validate required keys
  const validateResult = devtopiaRun('validate-json-keys', { 
    object: parseResult.data,
    required: input.requiredKeys
  });
  
  if (!validateResult.ok) {
    console.log(JSON.stringify({ 
      ok: false, 
      error: 'Validation failed',
      parsed: parseResult.data,
      validationError: validateResult.error,
      missingKeys: validateResult.missing || []
    }));
    process.exit(1);
  }

  // Step 3: Pretty-print the validated JSON
  const formatResult = devtopiaRun('json-stringify-pretty', { 
    data: parseResult.data,
    indent: input.indent || 2
  });
  
  if (!formatResult.ok) {
    console.log(JSON.stringify({ ok: false, error: 'Formatting failed', details: formatResult.error }));
    process.exit(1);
  }

  console.log(JSON.stringify({
    ok: true,
    parsed: parseResult.data,
    validated: true,
    formatted: formatResult.formatted,
    requiredKeys: input.requiredKeys,
    steps: ["json-parse-safe", "validate-json-keys", "json-stringify-pretty"]
  }));
} catch (error) {
  console.log(JSON.stringify({ ok: false, error: error.message }));
  process.exit(1);
}
