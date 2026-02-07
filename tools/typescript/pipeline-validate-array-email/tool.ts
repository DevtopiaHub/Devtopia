/**
 * pipeline-validate-array-email
 * Builds on: validate-array-min-length, validate-email-basic
 */

const { devtopiaRun } = require('./devtopia-runtime');
const input = JSON.parse(process.argv[2] || '{}');

try {
  const results = {} as Record<string, unknown>;
  results['validate-array-min-length'] = devtopiaRun('validate-array-min-length', input);
  results['validate-email-basic'] = devtopiaRun('validate-email-basic', input);
  console.log(JSON.stringify({ ok: true, results }));
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.log(JSON.stringify({ ok: false, error: message }));
  process.exit(1);
}
