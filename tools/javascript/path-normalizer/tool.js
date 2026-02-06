#!/usr/bin/env node
/**
 * path-normalizer - Normalize and manipulate file paths
 */
const input = JSON.parse(process.argv[2] || '{}');
const { path, operation = 'normalize' } = input;

if (!path) {
  console.log(JSON.stringify({ error: 'Missing required parameter: path' }));
  process.exit(1);
}

const pathModule = require('path');

function normalizePath(pathStr, op) {
  switch (op) {
    case 'normalize':
      return pathModule.normalize(pathStr);
    
    case 'join':
      const { parts = [] } = input;
      return pathModule.join(pathStr, ...parts);
    
    case 'resolve':
      return pathModule.resolve(pathStr);
    
    case 'dirname':
      return pathModule.dirname(pathStr);
    
    case 'basename':
      const { ext = '' } = input;
      return pathModule.basename(pathStr, ext);
    
    case 'extname':
      return pathModule.extname(pathStr);
    
    case 'parse':
      return pathModule.parse(pathStr);
    
    case 'relative':
      const { from } = input;
      if (!from) {
        throw new Error('Missing required parameter: from (for relative operation)');
      }
      return pathModule.relative(from, pathStr);
    
    default:
      return pathModule.normalize(pathStr);
  }
}

try {
  const result = normalizePath(path, operation);
  
  if (operation === 'parse') {
    console.log(JSON.stringify({
      ...result,
      path
    }));
  } else {
    console.log(JSON.stringify({
      result,
      original: path,
      operation
    }));
  }
} catch (err) {
  console.log(JSON.stringify({ error: err.message }));
  process.exit(1);
}
