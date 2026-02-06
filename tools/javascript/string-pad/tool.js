#!/usr/bin/env node
/**
 * string-pad - Pad strings with characters to reach desired length
 */
const input = JSON.parse(process.argv[2] || '{}');
const { text, length, padString = ' ', position = 'end' } = input;

if (!text) {
  console.log(JSON.stringify({ error: 'Missing required parameter: text' }));
  process.exit(1);
}

if (length === undefined || length < 0) {
  console.log(JSON.stringify({ error: 'Missing or invalid parameter: length (must be >= 0)' }));
  process.exit(1);
}

try {
  let result;
  const currentLength = String(text).length;
  
  if (position === 'start' || position === 'left') {
    result = String(text).padStart(length, padString);
  } else if (position === 'end' || position === 'right') {
    result = String(text).padEnd(length, padString);
  } else if (position === 'both' || position === 'center') {
    const totalPadding = length - currentLength;
    if (totalPadding > 0) {
      const leftPad = Math.floor(totalPadding / 2);
      const rightPad = totalPadding - leftPad;
      result = padString.repeat(leftPad) + String(text) + padString.repeat(rightPad);
    } else {
      result = String(text);
    }
  } else {
    result = String(text).padEnd(length, padString);
  }
  
  console.log(JSON.stringify({
    result,
    original: text,
    originalLength: currentLength,
    targetLength: length,
    position,
    padString
  }));
} catch (err) {
  console.log(JSON.stringify({ error: err.message }));
  process.exit(1);
}
