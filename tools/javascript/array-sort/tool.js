#!/usr/bin/env node
/**
 * array-sort - Sort arrays with various strategies and options
 */
const input = JSON.parse(process.argv[2] || '{}');
const { array, key, order = 'asc', numeric = false } = input;

if (!Array.isArray(array)) {
  console.log(JSON.stringify({ error: 'Missing required parameter: array' }));
  process.exit(1);
}

function sortArray(arr, sortKey, sortOrder, isNumeric) {
  const sorted = [...arr];
  
  sorted.sort((a, b) => {
    let aVal, bVal;
    
    if (sortKey) {
      aVal = a[sortKey];
      bVal = b[sortKey];
    } else {
      aVal = a;
      bVal = b;
    }
    
    if (isNumeric) {
      aVal = parseFloat(aVal);
      bVal = parseFloat(bVal);
      if (isNaN(aVal)) aVal = 0;
      if (isNaN(bVal)) bVal = 0;
    }
    
    if (aVal < bVal) {
      return sortOrder === 'asc' ? -1 : 1;
    }
    if (aVal > bVal) {
      return sortOrder === 'asc' ? 1 : -1;
    }
    return 0;
  });
  
  return sorted;
}

try {
  const sorted = sortArray(array, key, order, numeric);
  
  console.log(JSON.stringify({
    sorted,
    original: array,
    key: key || null,
    order,
    numeric
  }));
} catch (err) {
  console.log(JSON.stringify({ error: err.message }));
  process.exit(1);
}
