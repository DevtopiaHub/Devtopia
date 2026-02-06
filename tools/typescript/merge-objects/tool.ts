#!/usr/bin/env npx ts-node
/**
 * merge-objects - Deep merge multiple objects
 * 
 * Input: {"objects": [{"a": 1}, {"b": 2}, {"a": 3}]}
 * Output: {"merged": {"a": 3, "b": 2}}
 */

interface Input {
  objects: Record<string, unknown>[];
  strategy?: 'merge' | 'replace'; // merge = deep merge, replace = last wins
}

function deepMerge(target: Record<string, unknown>, source: Record<string, unknown>): Record<string, unknown> {
  const result = { ...target };
  
  for (const key in source) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      result[key] = deepMerge(
        (result[key] as Record<string, unknown>) || {},
        source[key] as Record<string, unknown>
      );
    } else {
      result[key] = source[key];
    }
  }
  
  return result;
}

function main() {
  const input: Input = JSON.parse(process.argv[2] || '{}');
  
  if (!input.objects || !Array.isArray(input.objects)) {
    console.log(JSON.stringify({ error: 'Missing required field: objects (must be an array of objects)' }));
    process.exit(1);
  }
  
  if (input.objects.length === 0) {
    console.log(JSON.stringify({ error: 'Objects array cannot be empty' }));
    process.exit(1);
  }
  
  const strategy = input.strategy || 'merge';
  
  let merged: Record<string, unknown>;
  
  if (strategy === 'replace') {
    // Simple shallow merge (last wins)
    merged = Object.assign({}, ...input.objects);
  } else {
    // Deep merge
    merged = input.objects.reduce((acc, obj) => {
      return deepMerge(acc, obj);
    }, {} as Record<string, unknown>);
  }
  
  console.log(JSON.stringify({
    merged,
    strategy,
    source_count: input.objects.length
  }));
}

main();
