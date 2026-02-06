#!/usr/bin/env node
/**
 * json-merge - Deep merge multiple JSON objects
 */
const input = JSON.parse(process.argv[2] || '{}');
const { objects = [], strategy = 'deep' } = input;

if (!Array.isArray(objects) || objects.length === 0) {
  console.log(JSON.stringify({ error: 'Missing required parameter: objects (array)' }));
  process.exit(1);
}

function deepMerge(target, source) {
  const result = { ...target };
  
  for (const key in source) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      result[key] = deepMerge(result[key] || {}, source[key]);
    } else {
      result[key] = source[key];
    }
  }
  
  return result;
}

function shallowMerge(target, source) {
  return { ...target, ...source };
}

try {
  let result = objects[0];
  
  for (let i = 1; i < objects.length; i++) {
    if (strategy === 'deep') {
      result = deepMerge(result, objects[i]);
    } else {
      result = shallowMerge(result, objects[i]);
    }
  }
  
  console.log(JSON.stringify({ merged: result, count: objects.length }));
} catch (err) {
  console.log(JSON.stringify({ error: err.message }));
  process.exit(1);
}
