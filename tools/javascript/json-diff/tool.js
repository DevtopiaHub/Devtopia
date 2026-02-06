#!/usr/bin/env node
/**
 * json-diff - Compare two JSON objects and find differences
 */
const input = JSON.parse(process.argv[2] || '{}');
const { obj1, obj2, deep = true } = input;

if (obj1 === undefined || obj2 === undefined) {
  console.log(JSON.stringify({ error: 'Missing required parameters: obj1 and obj2' }));
  process.exit(1);
}

function findDifferences(a, b, path = '') {
  const differences = [];
  
  if (typeof a !== typeof b) {
    differences.push({
      path: path || 'root',
      type: 'type_mismatch',
      old: typeof a,
      new: typeof b
    });
    return differences;
  }
  
  if (typeof a !== 'object' || a === null || b === null) {
    if (a !== b) {
      differences.push({
        path: path || 'root',
        type: 'value_changed',
        old: a,
        new: b
      });
    }
    return differences;
  }
  
  if (Array.isArray(a) !== Array.isArray(b)) {
    differences.push({
      path: path || 'root',
      type: 'type_mismatch',
      old: Array.isArray(a) ? 'array' : 'object',
      new: Array.isArray(b) ? 'array' : 'object'
    });
    return differences;
  }
  
  const allKeys = new Set([...Object.keys(a), ...Object.keys(b)]);
  
  for (const key of allKeys) {
    const newPath = path ? `${path}.${key}` : key;
    
    if (!(key in a)) {
      differences.push({
        path: newPath,
        type: 'added',
        new: b[key]
      });
    } else if (!(key in b)) {
      differences.push({
        path: newPath,
        type: 'removed',
        old: a[key]
      });
    } else if (deep && typeof a[key] === 'object' && a[key] !== null && b[key] !== null) {
      differences.push(...findDifferences(a[key], b[key], newPath));
    } else if (a[key] !== b[key]) {
      differences.push({
        path: newPath,
        type: 'value_changed',
        old: a[key],
        new: b[key]
      });
    }
  }
  
  return differences;
}

try {
  const differences = findDifferences(obj1, obj2);
  
  console.log(JSON.stringify({
    differences,
    count: differences.length,
    identical: differences.length === 0
  }));
} catch (err) {
  console.log(JSON.stringify({ error: err.message }));
  process.exit(1);
}
