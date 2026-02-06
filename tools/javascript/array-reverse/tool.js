/**
 * array-reverse
 * 
 * Reverse the order of elements in an array.
 */

const input = JSON.parse(process.argv[2] || '{}');
const { array } = input;

if (!Array.isArray(array)) {
  console.error(JSON.stringify({ error: 'Missing or invalid field: array (must be array)' }));
  process.exit(1);
}

const reversed = [...array].reverse();

console.log(JSON.stringify({
  original: array,
  reversed,
  length: array.length,
}));
