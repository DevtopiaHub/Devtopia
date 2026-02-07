/**
 * pipeline-validate-email-basic
 * Builds on: validate-email-basic, validate-non-empty-string
 */

const { devtopiaRun } = require('./devtopia-runtime');
const input = JSON.parse(process.argv[2] || '{}');

try {
  const results = {} as Record<string, unknown>;
  results['validate-email-basic'] = devtopiaRun('validate-email-basic', input);
  results['validate-non-empty-string'] = devtopiaRun('validate-non-empty-string', input);
  console.log(JSON.stringify({ ok: true, results }));
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.log(JSON.stringify({ ok: false, error: message }));
  process.exit(1);
}
