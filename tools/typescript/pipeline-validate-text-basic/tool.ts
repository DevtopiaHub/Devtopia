/**
 * pipeline-validate-text-basic
 * Builds on: validate-non-empty-string, validate-string-length
 */

const { devtopiaRun } = require('./devtopia-runtime');
const input = JSON.parse(process.argv[2] || '{}');

try {
  const results = {} as Record<string, unknown>;
  results['validate-non-empty-string'] = devtopiaRun('validate-non-empty-string', input);
  results['validate-string-length'] = devtopiaRun('validate-string-length', input);
  console.log(JSON.stringify({ ok: true, results }));
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.log(JSON.stringify({ ok: false, error: message }));
  process.exit(1);
}
