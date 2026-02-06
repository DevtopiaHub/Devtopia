/**
 * hash-compare
 * 
 * Compute hash of two inputs and compare them.
 * Builds on: hash-sha256
 */

const { execSync } = require('child_process');
const path = require('path');

const input = JSON.parse(process.argv[2] || '{}');
const { data1, data2 } = input;

if (!data1 || !data2) {
  console.error(JSON.stringify({ error: 'Missing required fields: data1, data2' }));
  process.exit(1);
}

const hash1Result = JSON.parse(
  execSync(`node ${__dirname}/hash-sha256.js '${JSON.stringify({ data: data1 })}'`, { encoding: 'utf-8' })
);

const hash2Result = JSON.parse(
  execSync(`node ${__dirname}/hash-sha256.js '${JSON.stringify({ data: data2 })}'`, { encoding: 'utf-8' })
);

const hash1 = hash1Result.hash;
const hash2 = hash2Result.hash;
const match = hash1 === hash2;

console.log(JSON.stringify({
  match,
  hash1,
  hash2,
  inputs: {
    data1,
    data2,
  },
}));
