#!/usr/bin/env node
/**
 * url-builder - Build and manipulate URLs
 * 
 * URL construction and manipulation tool for building URLs with query parameters.
 * 
 * Usage: node url-builder.js '{"base": "https://api.com", "path": "/users", "params": {"id": 123}}'
 */

const input = JSON.parse(process.argv[2] || '{}');

function buildURL(base, path, params = {}) {
  let url = base;
  if (!url.endsWith('/') && path && !path.startsWith('/')) {
    url += '/';
  }
  if (path) {
    url += path.startsWith('/') ? path.slice(1) : path;
  }
  
  const queryParams = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== null && value !== undefined) {
      queryParams.append(key, String(value));
    }
  }
  
  const queryString = queryParams.toString();
  if (queryString) {
    url += '?' + queryString;
  }
  
  return url;
}

async function main() {
  if (!input.base) {
    console.log(JSON.stringify({ error: 'Missing required field: base' }));
    process.exit(1);
  }
  
  try {
    const url = buildURL(input.base, input.path, input.params || {});
    console.log(JSON.stringify({
      success: true,
      url,
      base: input.base,
      path: input.path || '',
      params: input.params || {}
    }));
  } catch (err) {
    console.log(JSON.stringify({ error: err.message }));
    process.exit(1);
  }
}

main();
