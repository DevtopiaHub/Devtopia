#!/usr/bin/env node
/**
 * array-operations - Array manipulation operations
 * 
 * Comprehensive array manipulation tool with filtering, mapping, reducing, and more.
 * 
 * Usage: node array-operations.js '{"array": [1,2,3], "action": "filter", "predicate": "x > 1"}'
 */

const input = JSON.parse(process.argv[2] || '{}');

function operateOnArray(array, action, options = {}) {
  switch (action) {
    case 'filter':
      if (options.predicate) {
        // Simple predicate: "x > 1" or function
        const func = typeof options.predicate === 'function' 
          ? options.predicate 
          : new Function('x', `return ${options.predicate}`);
        return array.filter(func);
      }
      return array;
    case 'map':
      if (options.transform) {
        const func = typeof options.transform === 'function'
          ? options.transform
          : new Function('x', `return ${options.transform}`);
        return array.map(func);
      }
      return array;
    case 'reduce':
      const initial = options.initial !== undefined ? options.initial : array[0];
      const reducer = options.reducer 
        ? (typeof options.reducer === 'function' 
            ? options.reducer 
            : new Function('acc', 'x', `return ${options.reducer}`))
        : ((acc, x) => acc + x);
      return array.reduce(reducer, initial);
    case 'sort':
      const desc = options.order === 'desc';
      const sorted = [...array].sort((a, b) => {
        if (typeof a === 'number' && typeof b === 'number') {
          return desc ? b - a : a - b;
        }
        return desc ? String(b).localeCompare(String(a)) : String(a).localeCompare(String(b));
      });
      return sorted;
    case 'unique':
      return [...new Set(array)];
    case 'reverse':
      return [...array].reverse();
    case 'slice':
      return array.slice(options.start || 0, options.end);
    default:
      throw new Error(`Unknown action: ${action}`);
  }
}

async function main() {
  if (!input.array || !Array.isArray(input.array)) {
    console.log(JSON.stringify({ error: 'Missing or invalid field: array' }));
    process.exit(1);
  }
  
  if (!input.action) {
    console.log(JSON.stringify({ error: 'Missing required field: action' }));
    process.exit(1);
  }
  
  try {
    const result = operateOnArray(input.array, input.action, input.options || {});
    console.log(JSON.stringify({
      success: true,
      original: input.array,
      action: input.action,
      result,
      count: Array.isArray(result) ? result.length : undefined
    }));
  } catch (err) {
    console.log(JSON.stringify({ error: err.message }));
    process.exit(1);
  }
}

main();
