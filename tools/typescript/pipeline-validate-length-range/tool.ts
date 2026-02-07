/**
 * pipeline-validate-length-range
 * Builds on: validate-string-length, validate-between
 */

const { devtopiaRun } = require('./devtopia-runtime');
const input = JSON.parse(process.argv[2] || '{}');

try {
  const results = {} as Record<string, unknown>;
  results['validate-string-length'] = devtopiaRun('validate-string-length', input);
  results['validate-between'] = devtopiaRun('validate-between', input);
  console.log(JSON.stringify({ ok: true, results }));
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.log(JSON.stringify({ ok: false, error: message }));
  process.exit(1);
}
