/**
 * data-merge-validate - Merge multiple JSON sources, validate required keys, and pretty-print
 * Builds on: json-parse-safe, validate-json-keys, json-stringify-pretty (via devtopia-runtime)
 *
 * Composes json-parse-safe: Parse JSON string safely with structured errors
 * Composes validate-json-keys: Ensure an object includes required keys
 * Composes json-stringify-pretty: Pretty-print JSON with configurable indentation
 *
 * @param {Object} params
 * @param {string[]} params.sources - Array of JSON strings to parse and merge
 * @param {string[]} params.requiredKeys - Array of required key names after merge
 * @param {number} [params.indent] - Indentation for pretty printing (default: 2)
 * @returns {Object} Pipeline result with merged, validated, and formatted data
 */

const { devtopiaRun } = require('./devtopia-runtime');
const input = JSON.parse(process.argv[2] || '{}');

if (!input.sources || !Array.isArray(input.sources) || input.sources.length === 0) {
  console.log(JSON.stringify({ ok: false, error: 'Missing required field: sources (non-empty array)' }));
  process.exit(1);
}

if (!input.requiredKeys || !Array.isArray(input.requiredKeys)) {
  console.log(JSON.stringify({ ok: false, error: 'Missing required field: requiredKeys (array)' }));
  process.exit(1);
}

try {
  // Step 1: Parse all JSON sources safely
  const parsedSources = [];
  for (let i = 0; i < input.sources.length; i++) {
    const source = input.sources[i];
    if (typeof source !== 'string') {
      console.log(JSON.stringify({ ok: false, error: `Source ${i} must be a JSON string` }));
      process.exit(1);
    }
    
    const parseResult = devtopiaRun('json-parse-safe', { json: source });
    if (!parseResult.ok) {
      console.log(JSON.stringify({ ok: false, error: `Failed to parse source ${i}`, details: parseResult.error }));
      process.exit(1);
    }
    
    parsedSources.push(parseResult.data);
  }

  // Merge all parsed objects (later sources override earlier ones)
  const merged = Object.assign({}, ...parsedSources);

  // Step 2: Validate required keys
  const validateResult = devtopiaRun('validate-json-keys', { 
    data: merged,
    keys: input.requiredKeys
  });
  
  if (!validateResult.ok) {
    console.log(JSON.stringify({ 
      ok: false, 
      error: 'Validation failed',
      merged: merged,
      validationError: validateResult.error,
      missingKeys: validateResult.missing || []
    }));
    process.exit(1);
  }

  // Step 3: Pretty-print the merged and validated result
  const prettyResult = devtopiaRun('json-stringify-pretty', { 
    data: merged,
    indent: input.indent || 2
  });
  
  if (!prettyResult.ok) {
    console.log(JSON.stringify({ ok: false, error: 'Pretty printing failed', details: prettyResult.error }));
    process.exit(1);
  }

  console.log(JSON.stringify({
    ok: true,
    sourceCount: input.sources.length,
    merged: merged,
    pretty: prettyResult.pretty,
    requiredKeys: input.requiredKeys,
    steps: ["json-parse-safe", "validate-json-keys", "json-stringify-pretty"]
  }));
} catch (error) {
  console.log(JSON.stringify({ ok: false, error: error.message }));
  process.exit(1);
}
