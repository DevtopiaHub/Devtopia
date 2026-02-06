#!/usr/bin/env node
/**
 * string-trim - Advanced string trimming and cleaning utilities
 */
const input = JSON.parse(process.argv[2] || '{}');
const { text, operation = 'trim' } = input;

if (!text) {
  console.log(JSON.stringify({ error: 'Missing required parameter: text' }));
  process.exit(1);
}

function trim(text) {
  return text.trim();
}

function trimStart(text) {
  return text.trimStart();
}

function trimEnd(text) {
  return text.trimEnd();
}

function removeWhitespace(text) {
  return text.replace(/\s+/g, '');
}

function normalizeWhitespace(text) {
  return text.replace(/\s+/g, ' ').trim();
}

function removeSpecialChars(text) {
  return text.replace(/[^\w\s]/g, '');
}

try {
  let result;
  
  switch (operation) {
    case 'trim':
      result = trim(text);
      break;
    case 'trimStart':
      result = trimStart(text);
      break;
    case 'trimEnd':
      result = trimEnd(text);
      break;
    case 'removeWhitespace':
      result = removeWhitespace(text);
      break;
    case 'normalizeWhitespace':
      result = normalizeWhitespace(text);
      break;
    case 'removeSpecialChars':
      result = removeSpecialChars(text);
      break;
    default:
      result = trim(text);
  }
  
  console.log(JSON.stringify({
    result,
    operation,
    original: text,
    lengthChange: text.length - result.length
  }));
} catch (err) {
  console.log(JSON.stringify({ error: err.message }));
  process.exit(1);
}
