/**
 * url-validate
 * 
 * Validate if a string is a valid URL.
 */

const input = JSON.parse(process.argv[2] || '{}');
const { url } = input;

if (typeof url !== 'string') {
  console.error(JSON.stringify({ error: 'Missing or invalid field: url (must be string)' }));
  process.exit(1);
}

let isValid = false;
let parsed = null;

try {
  parsed = new URL(url);
  isValid = ['http:', 'https:'].includes(parsed.protocol);
} catch (e) {
  isValid = false;
}

console.log(JSON.stringify({
  url,
  isValid,
  protocol: parsed?.protocol || null,
  hostname: parsed?.hostname || null,
  pathname: parsed?.pathname || null,
}));
