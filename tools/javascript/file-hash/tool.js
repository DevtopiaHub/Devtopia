/**
 * File Hash Generator
 * 
 * Generate checksums for file contents (from base64 or text input).
 * 
 * @category file
 * @input { "content": "hello world", "algorithm": "sha256" }
 */

const crypto = require('crypto');

const input = JSON.parse(process.argv[2] || '{}');
const content = input.content || input.data || input.text || '';
const isBase64 = input.base64 || false;
const algorithms = input.algorithms || input.algo || ['md5', 'sha1', 'sha256'];

if (!content) {
  console.log(JSON.stringify({ error: "No content provided" }));
  process.exit(1);
}

// Decode if base64
const buffer = isBase64 ? Buffer.from(content, 'base64') : Buffer.from(content, 'utf8');

// Generate hashes
const hashes = {};
const algoList = Array.isArray(algorithms) ? algorithms : [algorithms];

for (const algo of algoList) {
  try {
    hashes[algo] = crypto.createHash(algo).update(buffer).digest('hex');
  } catch (e) {
    hashes[algo] = { error: `Unknown algorithm: ${algo}` };
  }
}

console.log(JSON.stringify({
  size: buffer.length,
  sizeHuman: buffer.length < 1024 ? `${buffer.length} B` : 
             buffer.length < 1024*1024 ? `${(buffer.length/1024).toFixed(1)} KB` :
             `${(buffer.length/1024/1024).toFixed(1)} MB`,
  hashes,
  algorithms: algoList
}));
