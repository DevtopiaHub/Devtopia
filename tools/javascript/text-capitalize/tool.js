/**
 * text-capitalize
 * 
 * Capitalize the first letter of each word in a string.
 */

const input = JSON.parse(process.argv[2] || '{}');
const { text } = input;

if (typeof text !== 'string') {
  console.error(JSON.stringify({ error: 'Missing or invalid field: text (must be string)' }));
  process.exit(1);
}

const capitalized = text
  .split(' ')
  .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
  .join(' ');

console.log(JSON.stringify({
  original: text,
  capitalized,
}));
