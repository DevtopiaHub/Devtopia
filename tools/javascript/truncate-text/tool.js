#!/usr/bin/env node
/**
 * truncate-text - Truncate text with ellipsis
 * 
 * Input: {"text": "Very long text here", "length": 10}
 * Output: {"truncated": "Very long..."}
 */

const input = JSON.parse(process.argv[2] || '{}');

if (!input.text) {
  console.log(JSON.stringify({ error: 'Missing required field: text' }));
  process.exit(1);
}

const length = input.length || 50;
const suffix = input.suffix || '...';
const preserveWords = input.preserve_words !== false; // Default true

function truncate(text, maxLength, suffix, preserveWords) {
  if (text.length <= maxLength) {
    return text;
  }
  
  if (preserveWords) {
    // Truncate at word boundary
    const truncated = text.substring(0, maxLength - suffix.length);
    const lastSpace = truncated.lastIndexOf(' ');
    if (lastSpace > 0) {
      return truncated.substring(0, lastSpace) + suffix;
    }
  }
  
  return text.substring(0, maxLength - suffix.length) + suffix;
}

const truncated = truncate(input.text, length, suffix, preserveWords);

console.log(JSON.stringify({
  original: input.text,
  truncated,
  original_length: input.text.length,
  truncated_length: truncated.length
}));
