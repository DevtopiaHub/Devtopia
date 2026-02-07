/**
 * pipeline-security-hash-blake32
 * Builds on: security-hash-blake2b, security-base32-encode
 */

const { devtopiaRun } = require('./devtopia-runtime');
const input = JSON.parse(process.argv[2] || '{}');

try {
  const results = {} as Record<string, unknown>;
  results['security-hash-blake2b'] = devtopiaRun('security-hash-blake2b', input);
  results['security-base32-encode'] = devtopiaRun('security-base32-encode', input);
  console.log(JSON.stringify({ ok: true, results }));
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.log(JSON.stringify({ ok: false, error: message }));
  process.exit(1);
}
