/**
 * pipeline-security-hash-pack
 * Builds on: security-hash-sha512, security-base64-url
 */

const { devtopiaRun } = require('./devtopia-runtime');
const input = JSON.parse(process.argv[2] || '{}');

try {
  const results = {} as Record<string, unknown>;
  results['security-hash-sha512'] = devtopiaRun('security-hash-sha512', input);
  results['security-base64-url'] = devtopiaRun('security-base64-url', input);
  console.log(JSON.stringify({ ok: true, results }));
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.log(JSON.stringify({ ok: false, error: message }));
  process.exit(1);
}
