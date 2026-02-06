// url-encode - URL encodes/decodes strings

const input = JSON.parse(process.argv[2] || '{}');
const { text, action = 'encode' } = input;

if (!text) {
  console.log(JSON.stringify({ error: 'Missing required field: text' }));
  process.exit(1);
}

let result;
if (action === 'encode') {
  result = encodeURIComponent(text);
} else if (action === 'decode') {
  try {
    result = decodeURIComponent(text);
  } catch (e) {
    console.log(JSON.stringify({ error: 'Invalid URL encoded string' }));
    process.exit(1);
  }
} else {
  console.log(JSON.stringify({ error: 'Invalid action. Use "encode" or "decode"' }));
  process.exit(1);
}

console.log(JSON.stringify({ result }));
