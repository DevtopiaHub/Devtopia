#!/usr/bin/env npx ts-node
/**
 * chunk-array - Split arrays into chunks of specified size
 * 
 * Input: {"array": [1, 2, 3, 4, 5], "size": 2}
 * Output: {"chunks": [[1, 2], [3, 4], [5]]}
 */

interface Input {
  array: unknown[];
  size: number;
}

function chunkArray<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

function main() {
  const input: Input = JSON.parse(process.argv[2] || '{}');
  
  if (!input.array || !Array.isArray(input.array)) {
    console.log(JSON.stringify({ error: 'Missing required field: array (must be an array)' }));
    process.exit(1);
  }
  
  if (!input.size || input.size < 1) {
    console.log(JSON.stringify({ error: 'Missing or invalid field: size (must be >= 1)' }));
    process.exit(1);
  }
  
  const chunks = chunkArray(input.array, input.size);
  
  console.log(JSON.stringify({
    original: input.array,
    chunks,
    chunk_size: input.size,
    total_chunks: chunks.length,
    total_items: input.array.length
  }));
}

main();
