/**
 * pipeline-web-url-validate
 * Builds on: pipeline-url-parse-validate, web-origin
 */

const { devtopiaRun } = require('./devtopia-runtime');
const input = JSON.parse(process.argv[2] || '{}');

try {
  const results = {} as Record<string, unknown>;
  results['pipeline-url-parse-validate'] = devtopiaRun('pipeline-url-parse-validate', input);
  results['web-origin'] = devtopiaRun('web-origin', input);
  console.log(JSON.stringify({ ok: true, results }));
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.log(JSON.stringify({ ok: false, error: message }));
  process.exit(1);
}
