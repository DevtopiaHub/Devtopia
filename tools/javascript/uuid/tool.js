// Tool: UUID v4 generator
const crypto = require('crypto');
const input = JSON.parse(process.argv[2] || '{}');

const count = Math.min(input.count || 1, 100);
const uuids = [];

for (let i = 0; i < count; i++) {
  uuids.push(crypto.randomUUID());
}

console.log(JSON.stringify({ uuids, count: uuids.length }));