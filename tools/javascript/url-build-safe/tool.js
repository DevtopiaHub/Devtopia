/**
 * url-build-safe
 * 
 * Build a URL from components with validation.
 * Builds on: url-validate
 */

const { execSync } = require('child_process');
const path = require('path');

const input = JSON.parse(process.argv[2] || '{}');
const { protocol = 'https', hostname, pathname = '/', query = {}, hash = '' } = input;

if (!hostname) {
  console.error(JSON.stringify({ error: 'Missing required field: hostname' }));
  process.exit(1);
}

// Build query string
const queryString = Object.entries(query)
  .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`)
  .join('&');

const url = `${protocol}://${hostname}${pathname}${queryString ? '?' + queryString : ''}${hash ? '#' + hash : ''}`;

// Validate the built URL
const validation = JSON.parse(
  execSync(`node ${__dirname}/url-validate.js '${JSON.stringify({ url })}'`, { encoding: 'utf-8' })
);

if (!validation.isValid) {
  console.error(JSON.stringify({ error: 'Built URL is invalid', url, validation }));
  process.exit(1);
}

console.log(JSON.stringify({
  url,
  isValid: true,
  components: {
    protocol,
    hostname,
    pathname,
    query,
    hash,
  },
}));
