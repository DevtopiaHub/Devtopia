/**
 * data-transform-pipeline - Transform JSON data: parse, pluck fields, and pretty-print
 * Builds on: json-parse-safe, data-pluck, json-stringify-pretty (via devtopia-runtime)
 *
 * Composes json-parse-safe: Parse JSON string safely with structured errors
 * Composes data-pluck: Pluck a field from an array of objects
 * Composes json-stringify-pretty: Pretty-print JSON with configurable indentation
 *
 * @param {Object} params
 * @param {string} params.json - JSON string to parse
 * @param {string} params.field - Field name to pluck from array of objects
 * @param {number} [params.indent] - Indentation for pretty printing (default: 2)
 * @returns {Object} Pipeline result with transformed data
 */

const { devtopiaRun } = require('./devtopia-runtime');
const input = JSON.parse(process.argv[2] || '{}');

if (!input.json || typeof input.json !== 'string') {
  console.log(JSON.stringify({ ok: false, error: 'Missing required field: json' }));
  process.exit(1);
}

if (!input.field || typeof input.field !== 'string') {
  console.log(JSON.stringify({ ok: false, error: 'Missing required field: field' }));
  process.exit(1);
}

try {
  // Step 1: Parse JSON string safely with structured errors
  const parseResult = devtopiaRun('json-parse-safe', { json: input.json });
  
  if (!parseResult.ok) {
    console.log(JSON.stringify({ ok: false, error: 'JSON parse failed', details: parseResult.error }));
    process.exit(1);
  }

  // Ensure parsed data is an array
  if (!Array.isArray(parseResult.data)) {
    console.log(JSON.stringify({ ok: false, error: 'Parsed data must be an array' }));
    process.exit(1);
  }

  // Step 2: Pluck a field from an array of objects
  const pluckResult = devtopiaRun('data-pluck', { 
    array: parseResult.data,
    field: input.field
  });
  
  if (!pluckResult.ok) {
    console.log(JSON.stringify({ ok: false, error: 'Field plucking failed', details: pluckResult.error }));
    process.exit(1);
  }

  // Step 3: Pretty-print JSON with configurable indentation
  const prettyResult = devtopiaRun('json-stringify-pretty', { 
    data: pluckResult.plucked,
    indent: input.indent || 2
  });
  
  if (!prettyResult.ok) {
    console.log(JSON.stringify({ ok: false, error: 'Pretty printing failed', details: prettyResult.error }));
    process.exit(1);
  }

  console.log(JSON.stringify({
    ok: true,
    originalCount: parseResult.data.length,
    pluckedCount: pluckResult.plucked ? pluckResult.plucked.length : 0,
    plucked: pluckResult.plucked,
    pretty: prettyResult.pretty,
    steps: ["json-parse-safe", "data-pluck", "json-stringify-pretty"]
  }));
} catch (error) {
  console.log(JSON.stringify({ ok: false, error: error.message }));
  process.exit(1);
}
