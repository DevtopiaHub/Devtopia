/**
 * array-sort-numeric
 * 
 * Sort an array of numbers in ascending or descending order.
 * Builds on: array-reverse (for descending)
 */

const { execSync } = require('child_process');
const path = require('path');

const input = JSON.parse(process.argv[2] || '{}');
const { array, order = 'asc' } = input;

if (!Array.isArray(array)) {
  console.error(JSON.stringify({ error: 'Missing or invalid field: array (must be array)' }));
  process.exit(1);
}

const sorted = [...array].sort((a, b) => {
  const numA = typeof a === 'number' ? a : parseFloat(a);
  const numB = typeof b === 'number' ? b : parseFloat(b);
  
  if (isNaN(numA) || isNaN(numB)) {
    return 0;
  }
  
  return order === 'desc' ? numB - numA : numA - numB;
});

console.log(JSON.stringify({
  original: array,
  sorted,
  order,
}));
