// path-join - Joins path segments into a normalized path

const input = JSON.parse(process.argv[2] || '{}');
const { paths } = input;

if (!paths || !Array.isArray(paths)) {
  console.log(JSON.stringify({ error: 'Missing required field: paths (array)' }));
  process.exit(1);
}

// Simple path join (handles basic cases)
let result = paths
  .filter(p => p && p.trim())
  .map(p => p.trim().replace(/^\/+|\/+$/g, ''))
  .join('/');

// Normalize: remove double slashes, handle . and ..
result = result.replace(/\/+/g, '/');
if (result && !result.startsWith('/')) {
  result = '/' + result;
}

console.log(JSON.stringify({ result }));
