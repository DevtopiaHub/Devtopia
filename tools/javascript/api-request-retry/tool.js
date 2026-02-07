/**
 * api-request-retry
 * Builds on: api-request (via devtopia-runtime)
 */

const { devtopiaRun } = require('./devtopia-runtime');
const input = JSON.parse(process.argv[2] || '{}');

try {

  const { url, attempts = 3, method = 'GET', headers = {}, body } = input;
  if (!url) {
    console.log(JSON.stringify({ ok: false, error: 'Missing required field: url' }));
    process.exit(1);
  }
  let last = null;
  for (let i = 0; i < attempts; i++) {
    const result = devtopiaRun('api-request', { url, method, headers, body });
    if (result && result.ok) {
      console.log(JSON.stringify({ ok: true, attempt: i + 1, status: result.status, text: result.text }));
      return;
    }
    last = result;
  }
  console.log(JSON.stringify({ ok: false, error: last?.error || 'Request failed', attempts }));
  process.exit(1);
      
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.log(JSON.stringify({ ok: false, error: message }));
  process.exit(1);
}
