#!/usr/bin/env node
/**
 * regex-tester - Test and extract patterns using regular expressions
 * 
 * Regular expression testing and pattern matching tool.
 * 
 * Usage: node regex-tester.js '{"text": "Hello 123", "pattern": "\\d+", "action": "match"}'
 */

const input = JSON.parse(process.argv[2] || '{}');

function testRegex(text, pattern, action) {
  try {
    const regex = new RegExp(pattern, input.flags || 'g');
    
    switch (action) {
      case 'test':
        return { matches: regex.test(text) };
      case 'match':
        const matches = text.match(regex);
        return { matches: matches || [], count: matches ? matches.length : 0 };
      case 'matchAll':
        const allMatches = [...text.matchAll(new RegExp(pattern, input.flags || 'g'))];
        return { matches: allMatches.map(m => ({
          match: m[0],
          index: m.index,
          groups: m.slice(1)
        })) };
      case 'replace':
        return { result: text.replace(regex, input.replacement || '') };
      case 'split':
        return { parts: text.split(regex) };
      default:
        throw new Error(`Unknown action: ${action}`);
    }
  } catch (err) {
    throw new Error(`Invalid regex: ${err.message}`);
  }
}

async function main() {
  if (!input.text) {
    console.log(JSON.stringify({ error: 'Missing required field: text' }));
    process.exit(1);
  }
  
  if (!input.pattern) {
    console.log(JSON.stringify({ error: 'Missing required field: pattern' }));
    process.exit(1);
  }
  
  const action = input.action || 'match';
  
  try {
    const result = testRegex(input.text, input.pattern, action);
    console.log(JSON.stringify({
      success: true,
      ...result
    }));
  } catch (err) {
    console.log(JSON.stringify({ error: err.message }));
    process.exit(1);
  }
}

main();
