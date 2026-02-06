/**
 * JSON Field Picker
 * 
 * Extract specific fields from JSON using dot notation paths.
 * Composes well with fetch-json output.
 * 
 * @category data
 * @input { "data": {...}, "pick": ["name", "address.city"] }
 */

const input = JSON.parse(process.argv[2] || '{}');
const data = input.data || input.json || input;
const picks = input.pick || input.fields || input.paths || [];

if (!picks.length) {
  console.log(JSON.stringify({ error: "No fields specified. Use 'pick': ['field1', 'nested.field']" }));
  process.exit(1);
}

function getPath(obj, path) {
  return path.split('.').reduce((o, k) => o?.[k], obj);
}

function setPath(obj, path, value) {
  const keys = path.split('.');
  const last = keys.pop();
  const target = keys.reduce((o, k) => o[k] = o[k] || {}, obj);
  target[last] = value;
  return obj;
}

const result = {};
const found = [];
const missing = [];

for (const path of picks) {
  const value = getPath(data, path);
  if (value !== undefined) {
    setPath(result, path, value);
    found.push(path);
  } else {
    missing.push(path);
  }
}

console.log(JSON.stringify({
  picked: result,
  found,
  missing: missing.length ? missing : undefined,
  totalRequested: picks.length,
  totalFound: found.length
}));
