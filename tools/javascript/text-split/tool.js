#!/usr/bin/env node
/**
 * text-split - Split text into arrays with various delimiters and options
 */
const input = JSON.parse(process.argv[2] || '{}');
const { text, delimiter = ' ', limit = null, trim = true, filterEmpty = false } = input;

if (!text) {
  console.log(JSON.stringify({ error: 'Missing required parameter: text' }));
  process.exit(1);
}

try {
  let parts = String(text).split(delimiter);
  
  if (trim) {
    parts = parts.map(part => part.trim());
  }
  
  if (filterEmpty) {
    parts = parts.filter(part => part.length > 0);
  }
  
  if (limit !== null && limit > 0) {
    parts = parts.slice(0, limit);
  }
  
  console.log(JSON.stringify({
    parts,
    count: parts.length,
    delimiter,
    original: text
  }));
} catch (err) {
  console.log(JSON.stringify({ error: err.message }));
  process.exit(1);
}
