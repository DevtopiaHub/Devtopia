// md5-hash - Generates MD5 hash of input text

const crypto = require('crypto');

const input = JSON.parse(process.argv[2] || '{}');
const { text } = input;

if (!text) {
  console.log(JSON.stringify({ error: 'Missing required field: text' }));
  process.exit(1);
}

const hash = crypto.createHash('md5').update(String(text)).digest('hex');
console.log(JSON.stringify({ result: hash }));
