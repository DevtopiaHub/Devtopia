#!/usr/bin/env node
/**
 * path-manipulator - File path manipulation utilities
 * 
 * File path manipulation tool for joining, splitting, and normalizing paths.
 * 
 * Usage: node path-manipulator.js '{"action": "join", "parts": ["/usr", "local", "bin"]}'
 */

const input = JSON.parse(process.argv[2] || '{}');

function manipulatePath(action, path, parts = []) {
  switch (action) {
    case 'join':
      return parts.join('/').replace(/\/+/g, '/');
    case 'split':
      return path.split('/').filter(p => p);
    case 'dirname':
      const lastSlash = path.lastIndexOf('/');
      return lastSlash === -1 ? '.' : path.slice(0, lastSlash);
    case 'basename':
      const lastSlash2 = path.lastIndexOf('/');
      return lastSlash2 === -1 ? path : path.slice(lastSlash2 + 1);
    case 'extname':
      const lastDot = path.lastIndexOf('.');
      const lastSlash3 = path.lastIndexOf('/');
      return lastDot > lastSlash3 ? path.slice(lastDot) : '';
    case 'normalize':
      return path.split('/').filter(p => p && p !== '.').join('/');
    default:
      throw new Error(`Unknown action: ${action}`);
  }
}

async function main() {
  if (!input.action) {
    console.log(JSON.stringify({ error: 'Missing required field: action' }));
    process.exit(1);
  }
  
  try {
    let result;
    if (input.action === 'join') {
      if (!input.parts || !Array.isArray(input.parts)) {
        console.log(JSON.stringify({ error: 'Missing or invalid field: parts' }));
        process.exit(1);
      }
      result = manipulatePath('join', '', input.parts);
    } else {
      if (!input.path) {
        console.log(JSON.stringify({ error: 'Missing required field: path' }));
        process.exit(1);
      }
      result = manipulatePath(input.action, input.path);
    }
    
    console.log(JSON.stringify({
      success: true,
      action: input.action,
      result
    }));
  } catch (err) {
    console.log(JSON.stringify({ error: err.message }));
    process.exit(1);
  }
}

main();
