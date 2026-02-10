/**
 * json-parse-extract-text - Parse JSON and extract text fields by dot paths
 * Builds on: json-parse-safe, json-path-get (via devtopia-runtime)
 */

const { devtopiaRun } = require('./devtopia-runtime');
const input = JSON.parse(process.argv[2] || '{}');

if (!input.json || typeof input.json !== 'string') {
  console.log(JSON.stringify({ ok: false, error: 'Missing required field: json (string)' }));
  process.exit(1);
}

if (!input.paths || !Array.isArray(input.paths)) {
  console.log(JSON.stringify({ ok: false, error: 'Missing required field: paths (array of strings)' }));
  process.exit(1);
}

try {
  // Step 1: Parse JSON safely
  const parseResult = devtopiaRun('json-parse-safe', { text: input.json });
  
  if (!parseResult.ok) {
    console.log(JSON.stringify({ ok: false, error: 'JSON parse failed', details: parseResult.error }));
    process.exit(1);
  }

  // Step 2: Extract each path
  const extracted = {};
  for (const path of input.paths) {
    if (typeof path !== 'string') continue;
    
    const pathResult = devtopiaRun('json-path-get', { 
      obj: parseResult.data,
      path: path,
      default: null
    });
    
    if (pathResult.ok) {
      extracted[path] = pathResult.value;
    }
  }

  console.log(JSON.stringify({
    ok: true,
    parsed: parseResult.data,
    extracted,
    paths: input.paths,
    steps: ["json-parse-safe", "json-path-get"]
  }));
} catch (error) {
  console.log(JSON.stringify({ ok: false, error: error.message }));
  process.exit(1);
}
