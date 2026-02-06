#!/usr/bin/env node
/**
 * yaml-parser - Parse YAML strings into JSON objects
 */
const input = JSON.parse(process.argv[2] || '{}');
const { yaml } = input;

if (!yaml) {
  console.log(JSON.stringify({ error: 'Missing required parameter: yaml' }));
  process.exit(1);
}

function parseYAML(yamlString) {
  const lines = yamlString.split('\n');
  const result = {};
  const stack = [{ obj: result, indent: -1 }];
  
  for (const line of lines) {
    if (!line.trim() || line.trim().startsWith('#')) continue;
    
    const indent = line.match(/^(\s*)/)[1].length;
    const trimmed = line.trim();
    
    // Remove comments
    const content = trimmed.split('#')[0].trim();
    if (!content) continue;
    
    if (content.includes(':')) {
      const [key, ...valueParts] = content.split(':');
      const keyName = key.trim();
      const value = valueParts.join(':').trim();
      
      // Find parent at correct indent level
      while (stack.length > 1 && stack[stack.length - 1].indent >= indent) {
        stack.pop();
      }
      
      const parent = stack[stack.length - 1].obj;
      
      if (value) {
        // Simple key-value
        let parsedValue = value;
        if (value === 'true') parsedValue = true;
        else if (value === 'false') parsedValue = false;
        else if (value === 'null' || value === '~') parsedValue = null;
        else if (!isNaN(value) && value !== '') parsedValue = Number(value);
        else if (value.startsWith('"') && value.endsWith('"')) parsedValue = value.slice(1, -1);
        else if (value.startsWith("'") && value.endsWith("'")) parsedValue = value.slice(1, -1);
        
        parent[keyName] = parsedValue;
      } else {
        // Nested object
        parent[keyName] = {};
        stack.push({ obj: parent[keyName], indent });
      }
    } else if (trimmed.startsWith('-')) {
      // Array item
      const value = trimmed.substring(1).trim();
      while (stack.length > 1 && stack[stack.length - 1].indent >= indent) {
        stack.pop();
      }
      const parent = stack[stack.length - 1].obj;
      
      if (!Array.isArray(parent)) {
        const lastKey = Object.keys(parent).pop();
        if (lastKey && !Array.isArray(parent[lastKey])) {
          parent[lastKey] = [];
        }
      }
      
      let parsedValue = value;
      if (value === 'true') parsedValue = true;
      else if (value === 'false') parsedValue = false;
      else if (value === 'null' || value === '~') parsedValue = null;
      else if (!isNaN(value) && value !== '') parsedValue = Number(value);
      else if (value.startsWith('"') && value.endsWith('"')) parsedValue = value.slice(1, -1);
      else if (value.startsWith("'") && value.endsWith("'")) parsedValue = value.slice(1, -1);
      
      const target = Array.isArray(parent) ? parent : parent[Object.keys(parent).pop()];
      target.push(parsedValue);
    }
  }
  
  return result;
}

try {
  const parsed = parseYAML(yaml);
  console.log(JSON.stringify({ parsed }));
} catch (err) {
  console.log(JSON.stringify({ error: err.message }));
  process.exit(1);
}
