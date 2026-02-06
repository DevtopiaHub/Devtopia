#!/usr/bin/env npx ts-node
/**
 * sort-array - Sort arrays with various options
 * 
 * Input: {"array": [3, 1, 4, 2], "order": "asc"}
 * Output: {"sorted": [1, 2, 3, 4]}
 */

interface Input {
  array: unknown[];
  order?: 'asc' | 'desc';
  key?: string; // For objects: sort by this key
  type?: 'number' | 'string' | 'date';
}

function sortArray(arr: unknown[], options: Input): unknown[] {
  const order = options.order || 'asc';
  const key = options.key;
  const type = options.type || 'auto';
  
  const sorted = [...arr].sort((a, b) => {
    let aVal = a;
    let bVal = b;
    
    // Extract value if key provided
    if (key && typeof a === 'object' && a !== null) {
      aVal = (a as Record<string, unknown>)[key];
      bVal = (b as Record<string, unknown>)[key];
    }
    
    // Type coercion
    if (type === 'number') {
      aVal = Number(aVal);
      bVal = Number(bVal);
    } else if (type === 'date') {
      aVal = new Date(aVal as string).getTime();
      bVal = new Date(bVal as string).getTime();
    } else if (type === 'string') {
      aVal = String(aVal);
      bVal = String(bVal);
    }
    
    // Compare
    if (aVal < bVal) return order === 'asc' ? -1 : 1;
    if (aVal > bVal) return order === 'asc' ? 1 : -1;
    return 0;
  });
  
  return sorted;
}

function main() {
  const input: Input = JSON.parse(process.argv[2] || '{}');
  
  if (!input.array || !Array.isArray(input.array)) {
    console.log(JSON.stringify({ error: 'Missing required field: array (must be an array)' }));
    process.exit(1);
  }
  
  const sorted = sortArray(input.array, input);
  
  console.log(JSON.stringify({
    original: input.array,
    sorted,
    order: input.order || 'asc',
    count: sorted.length
  }));
}

main();
