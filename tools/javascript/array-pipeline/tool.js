#!/usr/bin/env node
/**
 * array-pipeline - Process arrays through multiple operations
 * 
 * Process arrays through multiple operations like filter, map, sort, and reduce.
 * Composes array-operations, array-chunk, and data-pipeline.
 * 
 * Usage: node array-pipeline.js '{"array": [1,2,3], "operations": ["filter", "map", "sort"]}'
 * 
 * Builds on: array-operations, array-chunk, data-pipeline
 */

const input = JSON.parse(process.argv[2] || '{}');

function processArray(array, operations) {
  let result = array;
  const steps = [];
  
  for (const op of operations) {
    const step = { operation: op, input: [...result] };
    
    if (op === 'filter' && input.filterPredicate) {
      const func = typeof input.filterPredicate === 'function'
        ? input.filterPredicate
        : new Function('x', `return ${input.filterPredicate}`);
      result = result.filter(func);
    } else if (op === 'map' && input.mapTransform) {
      const func = typeof input.mapTransform === 'function'
        ? input.mapTransform
        : new Function('x', `return ${input.mapTransform}`);
      result = result.map(func);
    } else if (op === 'sort') {
      result = [...result].sort((a, b) => {
        if (typeof a === 'number' && typeof b === 'number') {
          return input.sortOrder === 'desc' ? b - a : a - b;
        }
        return input.sortOrder === 'desc' 
          ? String(b).localeCompare(String(a))
          : String(a).localeCompare(String(b));
      });
    } else if (op === 'chunk' && input.chunkSize) {
      const chunks = [];
      for (let i = 0; i < result.length; i += input.chunkSize) {
        chunks.push(result.slice(i, i + input.chunkSize));
      }
      result = chunks;
    } else if (op === 'unique') {
      result = [...new Set(result)];
    }
    
    step.output = result;
    steps.push(step);
  }
  
  return { result, steps };
}

async function main() {
  if (!input.array || !Array.isArray(input.array)) {
    console.log(JSON.stringify({ error: 'Missing or invalid field: array' }));
    process.exit(1);
  }
  
  const operations = input.operations || ['sort'];
  
  try {
    const result = processArray(input.array, operations);
    console.log(JSON.stringify({
      success: true,
      original: input.array,
      ...result
    }));
  } catch (err) {
    console.log(JSON.stringify({ error: err.message }));
    process.exit(1);
  }
}

main();
