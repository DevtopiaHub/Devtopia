#!/usr/bin/env node
/**
 * regex-match - Test and extract patterns using regular expressions
 * 
 * Usage: node regex-match.js '{"text": "hello@example.com", "pattern": "[a-z]+@[a-z]+\\.[a-z]+"}'
 * 
 * Options:
 * - text: Text to search in
 * - pattern: Regex pattern (as string)
 * - flags: Regex flags (default: "gi")
 * - extract: Return matches array (default: true)
 * - groups: Return capture groups (default: true)
 */

const input = JSON.parse(process.argv[2] || '{}');

async function main() {
  if (!input.text) {
    console.log(JSON.stringify({ error: 'Missing required field: text' }));
    process.exit(1);
  }
  
  if (!input.pattern) {
    console.log(JSON.stringify({ error: 'Missing required field: pattern' }));
    process.exit(1);
  }

  try {
    const flags = input.flags || 'gi';
    const extract = input.extract !== false;
    const groups = input.groups !== false;
    
    const regex = new RegExp(input.pattern, flags);
    const matches = [];
    const allGroups = [];
    let match;
    
    // Reset regex state
    regex.lastIndex = 0;
    
    if (flags.includes('g')) {
      // Global search - find all matches
      while ((match = regex.exec(input.text)) !== null) {
        matches.push(match[0]);
        if (groups && match.length > 1) {
          allGroups.push(match.slice(1));
        }
      }
    } else {
      // Single match
      match = regex.exec(input.text);
      if (match) {
        matches.push(match[0]);
        if (groups && match.length > 1) {
          allGroups.push(match.slice(1));
        }
      }
    }
    
    const result = {
      pattern: input.pattern,
      flags,
      matched: matches.length > 0,
      count: matches.length
    };
    
    if (extract) {
      result.matches = matches;
    }
    
    if (groups && allGroups.length > 0) {
      result.groups = allGroups;
    }
    
    console.log(JSON.stringify(result));
  } catch (err) {
    console.log(JSON.stringify({ error: `Regex error: ${err.message}` }));
    process.exit(1);
  }
}

main();
