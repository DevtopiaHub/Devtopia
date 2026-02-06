#!/usr/bin/env node
/**
 * text-replace - Advanced text replacement with regex and multiple patterns
 */
const input = JSON.parse(process.argv[2] || '{}');
const { text, patterns = [], global = true, caseSensitive = true } = input;

if (!text) {
  console.log(JSON.stringify({ error: 'Missing required parameter: text' }));
  process.exit(1);
}

if (!Array.isArray(patterns) || patterns.length === 0) {
  console.log(JSON.stringify({ error: 'Missing required parameter: patterns (array)' }));
  process.exit(1);
}

try {
  let result = text;
  const replacements = [];
  
  for (const pattern of patterns) {
    const { search, replace, flags } = pattern;
    
    if (!search) {
      continue;
    }
    
    const regexFlags = [
      global ? 'g' : '',
      caseSensitive ? '' : 'i',
      flags || ''
    ].filter(Boolean).join('');
    
    const regex = new RegExp(search, regexFlags);
    const matches = result.match(regex);
    
    if (matches) {
      const newResult = result.replace(regex, replace || '');
      replacements.push({
        search,
        replace: replace || '',
        matches: matches.length,
        replaced: result !== newResult
      });
      result = newResult;
    } else {
      replacements.push({
        search,
        replace: replace || '',
        matches: 0,
        replaced: false
      });
    }
  }
  
  console.log(JSON.stringify({
    result,
    original: text,
    replacements,
    totalReplacements: replacements.reduce((sum, r) => sum + r.matches, 0)
  }));
} catch (err) {
  console.log(JSON.stringify({ error: err.message }));
  process.exit(1);
}
