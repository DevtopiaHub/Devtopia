// array-chunk - Splits an array into chunks of specified size

const input = JSON.parse(process.argv[2] || '{}');
const { array, size } = input;

if (!array || !Array.isArray(array)) {
  console.log(JSON.stringify({ error: 'Missing required field: array' }));
  process.exit(1);
}

if (!size || typeof size !== 'number' || size <= 0) {
  console.log(JSON.stringify({ error: 'Missing or invalid field: size (must be positive number)' }));
  process.exit(1);
}

const chunks = [];
for (let i = 0; i < array.length; i += size) {
  chunks.push(array.slice(i, i + size));
}

console.log(JSON.stringify({ result: chunks }));
