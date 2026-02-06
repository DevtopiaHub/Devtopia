/**
 * json-merge-deep
 * 
 * Deep merge multiple JSON objects, combining nested properties.
 * Builds on: json-merge (if exists) or standalone primitive
 */

const input = JSON.parse(process.argv[2] || '{}');
const { objects = [] } = input;

if (!Array.isArray(objects) || objects.length === 0) {
  console.error(JSON.stringify({ error: 'Missing or invalid field: objects (must be array with at least one object)' }));
  process.exit(1);
}

function deepMerge(target, source) {
  const output = { ...target };
  
  for (const key in source) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      output[key] = deepMerge(target[key] || {}, source[key]);
    } else {
      output[key] = source[key];
    }
  }
  
  return output;
}

let result = objects[0];
for (let i = 1; i < objects.length; i++) {
  result = deepMerge(result, objects[i]);
}

console.log(JSON.stringify({
  merged: result,
  count: objects.length,
}));
