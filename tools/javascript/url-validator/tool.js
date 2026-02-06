#!/usr/bin/env node
/**
 * url-validator - Validate and analyze URLs
 */
const input = JSON.parse(process.argv[2] || '{}');
const { url } = input;

if (!url) {
  console.log(JSON.stringify({ error: 'Missing required parameter: url' }));
  process.exit(1);
}

function validateURL(urlString) {
  try {
    const urlObj = new URL(urlString);
    
    return {
      valid: true,
      protocol: urlObj.protocol,
      host: urlObj.host,
      hostname: urlObj.hostname,
      port: urlObj.port || (urlObj.protocol === 'https:' ? '443' : urlObj.protocol === 'http:' ? '80' : null),
      pathname: urlObj.pathname,
      search: urlObj.search,
      hash: urlObj.hash,
      origin: urlObj.origin,
      isSecure: urlObj.protocol === 'https:',
      isLocalhost: urlObj.hostname === 'localhost' || urlObj.hostname === '127.0.0.1',
      isIP: /^\d+\.\d+\.\d+\.\d+$/.test(urlObj.hostname)
    };
  } catch (err) {
    return {
      valid: false,
      error: err.message
    };
  }
}

try {
  const result = validateURL(url);
  console.log(JSON.stringify(result));
} catch (err) {
  console.log(JSON.stringify({ error: err.message }));
  process.exit(1);
}
