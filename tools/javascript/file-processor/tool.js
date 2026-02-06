#!/usr/bin/env node
/**
 * file-processor - Process file paths and content
 * 
 * Process file paths, extract information, and manipulate file data.
 * Composes path-manipulator, string-utils, and array-operations.
 * 
 * Usage: node file-processor.js '{"path": "/usr/local/bin/node", "action": "analyze"}'
 * 
 * Builds on: path-manipulator, string-utils, array-operations
 */

const input = JSON.parse(process.argv[2] || '{}');

function analyzePath(path) {
  const parts = path.split('/').filter(p => p);
  const lastSlash = path.lastIndexOf('/');
  const lastDot = path.lastIndexOf('.');
  
  return {
    full: path,
    dirname: lastSlash === -1 ? '.' : path.slice(0, lastSlash),
    basename: lastSlash === -1 ? path : path.slice(lastSlash + 1),
    extname: lastDot > lastSlash ? path.slice(lastDot) : '',
    parts,
    depth: parts.length
  };
}

async function main() {
  if (!input.path) {
    console.log(JSON.stringify({ error: 'Missing required field: path' }));
    process.exit(1);
  }
  
  const action = input.action || 'analyze';
  
  try {
    if (action === 'analyze') {
      const result = analyzePath(input.path);
      console.log(JSON.stringify({
        success: true,
        ...result
      }));
    } else {
      console.log(JSON.stringify({ error: `Unknown action: ${action}` }));
      process.exit(1);
    }
  } catch (err) {
    console.log(JSON.stringify({ error: err.message }));
    process.exit(1);
  }
}

main();
