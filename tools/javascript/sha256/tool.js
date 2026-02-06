// Tool: SHA-256 hash generator
const crypto = require('crypto');
const input = JSON.parse(process.argv[2] || '{}');

const text = input.text || '';
const hash = crypto.createHash('sha256').update(text).digest('hex');

console.log(JSON.stringify({ hash, length: hash.length }));