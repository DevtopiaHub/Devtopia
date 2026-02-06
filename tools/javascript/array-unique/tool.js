#!/usr/bin/env node
/**
 * array-unique - Remove duplicates from arrays with various strategies
 */
const input = JSON.parse(process.argv[2] || '{}');
const { array, strategy = 'strict' } = input;

if (!Array.isArray(array)) {
  console.log(JSON.stringify({ error: 'Missing required parameter: array' }));
  process.exit(1);
}

function uniqueStrict(arr) {
  return [...new Set(arr)];
}

function uniqueByKey(arr, key) {
  const seen = new Set();
  return arr.filter(item => {
    const value = item[key];
    if (seen.has(value)) {
      return false;
    }
    seen.add(value);
    return true;
  });
}

function uniqueByTransform(arr, transform) {
  const seen = new Set();
  return arr.filter(item => {
    const transformed = transform(item);
    if (seen.has(transformed)) {
      return false;
    }
    seen.add(transformed);
    return true;
  });
}

try {
  let result;
  let removedCount;
  
  if (strategy === 'strict') {
    result = uniqueStrict(array);
    removedCount = array.length - result.length;
  } else if (strategy.key) {
    result = uniqueByKey(array, strategy.key);
    removedCount = array.length - result.length;
  } else if (strategy.transform) {
    const transformFn = new Function('item', `return ${strategy.transform}`);
    result = uniqueByTransform(array, transformFn);
    removedCount = array.length - result.length;
  } else {
    result = uniqueStrict(array);
    removedCount = array.length - result.length;
  }
  
  console.log(JSON.stringify({
    result,
    originalCount: array.length,
    uniqueCount: result.length,
    removedCount,
    strategy
  }));
} catch (err) {
  console.log(JSON.stringify({ error: err.message }));
  process.exit(1);
}
