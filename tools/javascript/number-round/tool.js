/**
 * number-round
 * 
 * Round a number to specified decimal places.
 */

const input = JSON.parse(process.argv[2] || '{}');
const { number, decimals = 0 } = input;

if (typeof number !== 'number') {
  console.error(JSON.stringify({ error: 'Missing or invalid field: number (must be number)' }));
  process.exit(1);
}

const rounded = Number(number.toFixed(decimals));

console.log(JSON.stringify({
  original: number,
  rounded,
  decimals,
}));
