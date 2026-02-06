#!/usr/bin/env node
/**
 * data-pipeline - Transform data through multiple processing steps
 * 
 * A flexible data pipeline tool that chains multiple data transformations.
 * Composes json-flatten, json-validate, array-chunk, and other data tools.
 * 
 * Usage: node data-pipeline.js '{"data": {...}, "steps": ["flatten", "validate", "chunk"]}'
 * 
 * Options:
 * - data: Input data (required)
 * - steps: Array of transformation steps (required)
 * - chunkSize: Size for chunking arrays (default: 10)
 * - schema: Schema for validation step
 * 
 * Builds on: json-flatten, json-validate, array-chunk
 */

const input = JSON.parse(process.argv[2] || '{}');

// Flatten nested objects (composing json-flatten)
function flatten(obj, prefix = '', result = {}) {
  for (const key in obj) {
    const newKey = prefix ? `${prefix}.${key}` : key;
    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      flatten(obj[key], newKey, result);
    } else {
      result[newKey] = obj[key];
    }
  }
  return result;
}

// Validate JSON structure (composing json-validate)
function validate(data, schema) {
  if (!schema) return { valid: true };
  
  const errors = [];
  
  if (schema.type) {
    const actualType = Array.isArray(data) ? 'array' : typeof data;
    if (actualType !== schema.type) {
      errors.push(`Expected type ${schema.type}, got ${actualType}`);
    }
  }
  
  if (schema.required && Array.isArray(schema.required)) {
    for (const field of schema.required) {
      if (!(field in data)) {
        errors.push(`Missing required field: ${field}`);
      }
    }
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}

// Chunk array (composing array-chunk)
function chunkArray(arr, size) {
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

async function main() {
  if (!input.data) {
    console.log(JSON.stringify({ error: 'Missing required field: data' }));
    process.exit(1);
  }
  
  if (!input.steps || !Array.isArray(input.steps)) {
    console.log(JSON.stringify({ error: 'Missing or invalid "steps" array' }));
    process.exit(1);
  }
  
  let result = input.data;
  const pipeline = [];
  
  for (const step of input.steps) {
    const stepResult = { step, input: JSON.parse(JSON.stringify(result)) };
    
    switch (step) {
      case 'flatten':
        if (typeof result === 'object' && !Array.isArray(result)) {
          result = flatten(result);
          stepResult.output = result;
          stepResult.success = true;
        } else {
          stepResult.error = 'Flatten requires an object';
          stepResult.success = false;
        }
        break;
        
      case 'validate':
        const validation = validate(result, input.schema);
        stepResult.validation = validation;
        stepResult.success = validation.valid;
        if (!validation.valid) {
          console.log(JSON.stringify({
            error: 'Validation failed',
            pipeline,
            stepResult
          }));
          process.exit(1);
        }
        break;
        
      case 'chunk':
        if (Array.isArray(result)) {
          const chunkSize = input.chunkSize || 10;
          result = chunkArray(result, chunkSize);
          stepResult.output = result;
          stepResult.success = true;
        } else {
          stepResult.error = 'Chunk requires an array';
          stepResult.success = false;
        }
        break;
        
      default:
        stepResult.error = `Unknown step: ${step}`;
        stepResult.success = false;
    }
    
    pipeline.push(stepResult);
    
    if (!stepResult.success) {
      console.log(JSON.stringify({
        error: `Pipeline failed at step: ${step}`,
        pipeline
      }));
      process.exit(1);
    }
  }
  
  console.log(JSON.stringify({
    success: true,
    result,
    pipeline
  }));
}

main();
