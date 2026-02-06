#!/usr/bin/env node
/**
 * string-utils - String manipulation utilities
 * 
 * Comprehensive string manipulation tool with case conversion, padding, trimming, and more.
 * 
 * Usage: node string-utils.js '{"text": "hello world", "action": "uppercase"}'
 */

const input = JSON.parse(process.argv[2] || '{}');

function transformString(text, action, options = {}) {
  switch (action) {
    case 'uppercase':
      return text.toUpperCase();
    case 'lowercase':
      return text.toLowerCase();
    case 'capitalize':
      return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    case 'title':
      return text.split(' ').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      ).join(' ');
    case 'reverse':
      return text.split('').reverse().join('');
    case 'trim':
      return text.trim();
    case 'pad':
      const width = options.width || 10;
      const padChar = options.char || ' ';
      const side = options.side || 'right';
      if (side === 'left') {
        return text.padStart(width, padChar);
      } else if (side === 'both') {
        const totalPad = width - text.length;
        const leftPad = Math.floor(totalPad / 2);
        return padChar.repeat(leftPad) + text + padChar.repeat(totalPad - leftPad);
      }
      return text.padEnd(width, padChar);
    case 'replace':
      return text.replace(new RegExp(options.pattern || '', 'g'), options.replacement || '');
    case 'repeat':
      return text.repeat(options.times || 1);
    default:
      throw new Error(`Unknown action: ${action}`);
  }
}

async function main() {
  if (!input.text) {
    console.log(JSON.stringify({ error: 'Missing required field: text' }));
    process.exit(1);
  }
  
  if (!input.action) {
    console.log(JSON.stringify({ error: 'Missing required field: action' }));
    process.exit(1);
  }
  
  try {
    const result = transformString(input.text, input.action, input.options || {});
    console.log(JSON.stringify({
      success: true,
      original: input.text,
      action: input.action,
      result
    }));
  } catch (err) {
    console.log(JSON.stringify({ error: err.message }));
    process.exit(1);
  }
}

main();
