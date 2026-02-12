/**
 * api-health-check
 * Builds on: api-request-retry, hash-sha256 (via devtopia-runtime)
 */

const { devtopiaRun } = require('./devtopia-runtime');
const input = JSON.parse(process.argv[2] || '{}');

try {

  const { url, attempts = 2, method = 'GET', headers = {}, body } = input;
  if (!url) {
    console.log(JSON.stringify({ ok: false, error: 'Missing required field: url' }));
    process.exit(1);
  }
  const response = devtopiaRun('api-request-retry', { url, attempts, method, headers, body });
  if (!response || response.ok === false) {
    console.log(JSON.stringify({ ok: false, error: response?.error || 'Request failed' }));
    process.exit(1);
  }
  const text = response.text || '';
  const signature = devtopiaRun('hash-sha256', { text });
  console.log(JSON.stringify({
    ok: true,
    url,
    status: response.status,
    attempts: response.attempt || attempts,
    bytes: text.length,
    hash: signature.hash
  }));
      
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.log(JSON.stringify({ ok: false, error: message }));
  process.exit(1);
}
