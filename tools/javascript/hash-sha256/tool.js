/**
 * hash-sha256
 * 
 * Compute SHA-256 hash of input string or JSON data.
 */

const input = JSON.parse(process.argv[2] || '{}');
const { data } = input;

if (!data) {
  console.error(JSON.stringify({ error: 'Missing required field: data' }));
  process.exit(1);
}

const crypto = require('crypto');

const dataString = typeof data === 'string' ? data : JSON.stringify(data);
const hash = crypto.createHash('sha256').update(dataString).digest('hex');

console.log(JSON.stringify({
  input: data,
  hash,
  algorithm: 'sha256',
  length: hash.length,
}));
