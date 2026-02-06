/**
 * data-json-parse-validate - Parse JSON string and validate required keys
 * Builds on: json-parse-safe, validate-json-keys (via devtopia-runtime)
 *
 * Composes json-parse-safe: Parse JSON string safely with structured errors
 * Composes validate-json-keys: Ensure an object includes required keys
 *
 * @param {Object} params
 * @param {string} params.json - JSON string to parse
 * @param {string[]} params.requiredKeys - Array of required key names
 * @returns {Object} Pipeline result with parsed data and validation status
 */

const { devtopiaRun } = require('./devtopia-runtime');
const input = JSON.parse(process.argv[2] || '{}');

if (!input.json || typeof input.json !== 'string') {
  console.log(JSON.stringify({ ok: false, error: 'Missing required field: json' }));
  process.exit(1);
}

if (!input.requiredKeys || !Array.isArray(input.requiredKeys)) {
  console.log(JSON.stringify({ ok: false, error: 'Missing required field: requiredKeys (array)' }));
  process.exit(1);
}

try {
  // Step 1: Parse JSON string safely with structured errors
  const parseResult = devtopiaRun('json-parse-safe', { json: input.json });
  
  if (!parseResult.ok) {
    console.log(JSON.stringify({ 
      ok: false, 
      error: 'JSON parse failed',
      parseError: parseResult.error 
    }));
    process.exit(1);
  }

  // Step 2: Ensure an object includes required keys
  const validateResult = devtopiaRun('validate-json-keys', { 
    data: parseResult.data,
    keys: input.requiredKeys
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

  console.log(JSON.stringify({
    ok: true,
    data: parseResult.data,
    validated: true,
    requiredKeys: input.requiredKeys
  }));
} catch (error) {
  console.log(JSON.stringify({ ok: false, error: error.message }));
  process.exit(1);
}
