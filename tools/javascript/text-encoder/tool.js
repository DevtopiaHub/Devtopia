#!/usr/bin/env node
/**
 * text-encoder - Encode/decode text using various encoding schemes
 */
const input = JSON.parse(process.argv[2] || '{}');
const { text, operation = 'encode', encoding = 'base64' } = input;

if (!text) {
  console.log(JSON.stringify({ error: 'Missing required parameter: text' }));
  process.exit(1);
}

function encodeBase64(str) {
  return Buffer.from(str, 'utf8').toString('base64');
}

function decodeBase64(str) {
  return Buffer.from(str, 'base64').toString('utf8');
}

function encodeHex(str) {
  return Buffer.from(str, 'utf8').toString('hex');
}

function decodeHex(str) {
  return Buffer.from(str, 'hex').toString('utf8');
}

function encodeURI(str) {
  return encodeURIComponent(str);
}

function decodeURI(str) {
  return decodeURIComponent(str);
}

try {
  let result;
  
  if (operation === 'encode') {
    switch (encoding) {
      case 'base64':
        result = encodeBase64(text);
        break;
      case 'hex':
        result = encodeHex(text);
        break;
      case 'uri':
        result = encodeURI(text);
        break;
      default:
        result = encodeBase64(text);
    }
  } else {
    switch (encoding) {
      case 'base64':
        result = decodeBase64(text);
        break;
      case 'hex':
        result = decodeHex(text);
        break;
      case 'uri':
        result = decodeURI(text);
        break;
      default:
        result = decodeBase64(text);
    }
  }
  
  console.log(JSON.stringify({
    result,
    operation,
    encoding,
    original: text
  }));
} catch (err) {
  console.log(JSON.stringify({ error: err.message }));
  process.exit(1);
}
