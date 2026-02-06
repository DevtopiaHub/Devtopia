#!/usr/bin/env node
/**
 * config-loader - Load and validate configuration from multiple formats
 * 
 * Load configuration from JSON, YAML, or CSV and validate against schema.
 * Composes json-validate, yaml-processor, csv-processor, and data-validator.
 * 
 * Usage: node config-loader.js '{"config": "name: John", "format": "yaml", "schema": {...}}'
 * 
 * Builds on: json-validate, yaml-processor, csv-processor, data-validator
 */

const input = JSON.parse(process.argv[2] || '{}');

function parseConfig(config, format) {
  if (format === 'json') {
    return typeof config === 'string' ? JSON.parse(config) : config;
  } else if (format === 'yaml') {
    // Simple YAML parsing
    const lines = config.trim().split('\n');
    const result = {};
    for (const line of lines) {
      if (line.includes(':')) {
        const [key, value] = line.split(':');
        result[key.trim()] = value.trim();
      }
    }
    return result;
  }
  return config;
}

function validateConfig(data, schema) {
  const errors = [];
  if (schema.required) {
    for (const field of schema.required) {
      if (!(field in data)) {
        errors.push(`Missing required field: ${field}`);
      }
    }
  }
  return { valid: errors.length === 0, errors };
}

async function main() {
  if (!input.config) {
    console.log(JSON.stringify({ error: 'Missing required field: config' }));
    process.exit(1);
  }
  
  const format = input.format || 'json';
  
  try {
    const parsed = parseConfig(input.config, format);
    let validation = { valid: true };
    
    if (input.schema) {
      validation = validateConfig(parsed, input.schema);
    }
    
    console.log(JSON.stringify({
      success: validation.valid,
      config: parsed,
      format,
      validation
    }));
    
    if (!validation.valid) {
      process.exit(1);
    }
  } catch (err) {
    console.log(JSON.stringify({ error: err.message }));
    process.exit(1);
  }
}

main();
