#!/usr/bin/env node
/**
 * format-text - Text formatting utilities
 * 
 * Format text with indentation, alignment, and styling options.
 * 
 * Usage: node format-text.js '{"text": "Hello", "format": "indent", "options": {"level": 2}}'
 */

const input = JSON.parse(process.argv[2] || '{}');

function formatText(text, format, options = {}) {
  switch (format) {
    case 'indent':
      const indent = ' '.repeat(options.level || 2);
      return text.split('\n').map(line => indent + line).join('\n');
    case 'center':
      const width = options.width || 80;
      return text.split('\n').map(line => {
        const padding = Math.max(0, Math.floor((width - line.length) / 2));
        return ' '.repeat(padding) + line;
      }).join('\n');
    case 'wrap':
      const maxWidth = options.width || 80;
      const words = text.split(' ');
      const lines = [];
      let currentLine = '';
      for (const word of words) {
        if ((currentLine + word).length <= maxWidth) {
          currentLine += (currentLine ? ' ' : '') + word;
        } else {
          if (currentLine) lines.push(currentLine);
          currentLine = word;
        }
      }
      if (currentLine) lines.push(currentLine);
      return lines.join('\n');
    case 'prepend':
      return text.split('\n').map(line => (options.prefix || '') + line).join('\n');
    case 'append':
      return text.split('\n').map(line => line + (options.suffix || '')).join('\n');
    default:
      throw new Error(`Unknown format: ${format}`);
  }
}

async function main() {
  if (!input.text) {
    console.log(JSON.stringify({ error: 'Missing required field: text' }));
    process.exit(1);
  }
  
  if (!input.format) {
    console.log(JSON.stringify({ error: 'Missing required field: format' }));
    process.exit(1);
  }
  
  try {
    const result = formatText(input.text, input.format, input.options || {});
    console.log(JSON.stringify({
      success: true,
      original: input.text,
      format: input.format,
      result
    }));
  } catch (err) {
    console.log(JSON.stringify({ error: err.message }));
    process.exit(1);
  }
}

main();
