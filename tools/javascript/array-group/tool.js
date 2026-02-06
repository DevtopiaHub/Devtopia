#!/usr/bin/env node
/**
 * array-group - Group array elements by key or custom function
 */
const input = JSON.parse(process.argv[2] || '{}');
const { array, key, transform } = input;

if (!Array.isArray(array)) {
  console.log(JSON.stringify({ error: 'Missing required parameter: array' }));
  process.exit(1);
}

if (!key && !transform) {
  console.log(JSON.stringify({ error: 'Missing required parameter: key or transform' }));
  process.exit(1);
}

function groupByKey(arr, keyName) {
  const groups = {};
  
  for (const item of arr) {
    if (typeof item !== 'object' || item === null) {
      const groupKey = String(item);
      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }
      groups[groupKey].push(item);
    } else {
      const groupKey = item[keyName];
      if (groupKey === undefined) {
        const defaultKey = '__undefined__';
        if (!groups[defaultKey]) {
          groups[defaultKey] = [];
        }
        groups[defaultKey].push(item);
      } else {
        if (!groups[groupKey]) {
          groups[groupKey] = [];
        }
        groups[groupKey].push(item);
      }
    }
  }
  
  return groups;
}

function groupByTransform(arr, transformFn) {
  const groups = {};
  const fn = new Function('item', `return ${transformFn}`);
  
  for (const item of arr) {
    const groupKey = String(fn(item));
    if (!groups[groupKey]) {
      groups[groupKey] = [];
    }
    groups[groupKey].push(item);
  }
  
  return groups;
}

try {
  let groups;
  
  if (key) {
    groups = groupByKey(array, key);
  } else {
    groups = groupByTransform(array, transform);
  }
  
  const groupKeys = Object.keys(groups);
  
  console.log(JSON.stringify({
    groups,
    groupKeys,
    groupCount: groupKeys.length,
    totalItems: array.length
  }));
} catch (err) {
  console.log(JSON.stringify({ error: err.message }));
  process.exit(1);
}
