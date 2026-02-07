/**
 * pipeline-security-hmac-base32
 * Builds on: security-hmac-sha256, security-base32-encode
 */

const { devtopiaRun } = require('./devtopia-runtime');
const input = JSON.parse(process.argv[2] || '{}');

try {
  const results = {} as Record<string, unknown>;
  results['security-hmac-sha256'] = devtopiaRun('security-hmac-sha256', input);
  results['security-base32-encode'] = devtopiaRun('security-base32-encode', input);
  console.log(JSON.stringify({ ok: true, results }));
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.log(JSON.stringify({ ok: false, error: message }));
  process.exit(1);
}
