#!/usr/bin/env node
/**
 * yaml-processor - Parse and process YAML data
 * 
 * YAML parsing and processing tool for configuration files and data structures.
 * 
 * Usage: node yaml-processor.js '{"yaml": "name: John\nage: 30", "action": "parse"}'
 */

const input = JSON.parse(process.argv[2] || '{}');

// Simple YAML parser (basic key-value pairs)
function parseYAML(yaml) {
  const lines = yaml.trim().split('\n');
  const result = {};
  let currentKey = null;
  let currentValue = [];
  let indentLevel = 0;
  
  for (const line of lines) {
    if (!line.trim() || line.trim().startsWith('#')) continue;
    
    const trimmed = line.trim();
    const indent = line.length - trimmed.length;
    
    if (trimmed.includes(':') && !trimmed.startsWith('-')) {
      if (currentKey) {
        result[currentKey] = currentValue.length === 1 ? currentValue[0] : currentValue.join('\n');
      }
      const [key, ...valueParts] = trimmed.split(':');
      currentKey = key.trim();
      const value = valueParts.join(':').trim();
      currentValue = value ? [value] : [];
      indentLevel = indent;
    } else if (currentKey && indent > indentLevel) {
      currentValue.push(trimmed);
    } else {
      if (currentKey) {
        result[currentKey] = currentValue.length === 1 ? currentValue[0] : currentValue.join('\n');
      }
      currentKey = null;
      currentValue = [];
    }
  }
  
  if (currentKey) {
    result[currentKey] = currentValue.length === 1 ? currentValue[0] : currentValue.join('\n');
  }
  
  return result;
}

async function main() {
  if (!input.yaml) {
    console.log(JSON.stringify({ error: 'Missing required field: yaml' }));
    process.exit(1);
  }
  
  try {
    const parsed = parseYAML(input.yaml);
    console.log(JSON.stringify({
      success: true,
      data: parsed
    }));
  } catch (err) {
    console.log(JSON.stringify({ error: err.message }));
    process.exit(1);
  }
}

main();
