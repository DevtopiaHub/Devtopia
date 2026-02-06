// Tool: Base64 encode/decode
const input = JSON.parse(process.argv[2] || '{}');

const action = input.action || 'encode';
const text = input.text || '';

let result;
if (action === 'encode') {
  result = Buffer.from(text).toString('base64');
} else if (action === 'decode') {
  result = Buffer.from(text, 'base64').toString('utf-8');
} else {
  console.log(JSON.stringify({ error: 'Invalid action. Use "encode" or "decode"' }));
  process.exit(1);
}

console.log(JSON.stringify({ action, input: text, output: result }));