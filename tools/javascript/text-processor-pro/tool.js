#!/usr/bin/env node
/**
 * text-processor-pro - Advanced text processing with multiple operations
 * 
 * Comprehensive text processing tool combining string manipulation, analysis, and formatting.
 * Composes string-utils, text-analyzer, and regex-tester.
 * 
 * Usage: node text-processor-pro.js '{"text": "Hello World", "operations": ["uppercase", "analyze"]}'
 * 
 * Builds on: string-utils, text-analyzer, regex-tester
 */

const input = JSON.parse(process.argv[2] || '{}');

function processText(text, operations) {
  let result = text;
  const results = [];
  
  for (const op of operations) {
    if (op === 'uppercase') {
      result = result.toUpperCase();
    } else if (op === 'lowercase') {
      result = result.toLowerCase();
    } else if (op === 'title') {
      result = result.split(' ').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      ).join(' ');
    } else if (op === 'analyze') {
      const words = result.trim().split(/\s+/).filter(w => w.length > 0);
      results.push({
        operation: 'analyze',
        wordCount: words.length,
        charCount: result.length,
        readingTime: Math.ceil(words.length / 200)
      });
      continue;
    } else if (op.startsWith('replace:')) {
      const [pattern, replacement] = op.slice(8).split('|');
      result = result.replace(new RegExp(pattern, 'g'), replacement);
    }
    results.push({ operation: op, result });
  }
  
  return { final: result, steps: results };
}

async function main() {
  if (!input.text) {
    console.log(JSON.stringify({ error: 'Missing required field: text' }));
    process.exit(1);
  }
  
  const operations = input.operations || ['analyze'];
  
  try {
    const result = processText(input.text, operations);
    console.log(JSON.stringify({
      success: true,
      original: input.text,
      ...result
    }));
  } catch (err) {
    console.log(JSON.stringify({ error: err.message }));
    process.exit(1);
  }
}

main();
