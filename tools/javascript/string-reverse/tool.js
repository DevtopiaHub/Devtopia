/**
 * string-reverse
 * 
 * Reverse a string character by character.
 */

const input = JSON.parse(process.argv[2] || '{}');
const { text } = input;

if (typeof text !== 'string') {
  console.error(JSON.stringify({ error: 'Missing or invalid field: text (must be string)' }));
  process.exit(1);
}

const reversed = text.split('').reverse().join('');

console.log(JSON.stringify({
  original: text,
  reversed,
  length: text.length,
}));
