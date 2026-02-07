/**
 * pipeline-web-clean-slash
 * Builds on: pipeline-web-clean-url, web-ensure-trailing-slash
 */

const { devtopiaRun } = require('./devtopia-runtime');
const input = JSON.parse(process.argv[2] || '{}');

try {
  const results = {} as Record<string, unknown>;
  results['pipeline-web-clean-url'] = devtopiaRun('pipeline-web-clean-url', input);
  results['web-ensure-trailing-slash'] = devtopiaRun('web-ensure-trailing-slash', input);
  console.log(JSON.stringify({ ok: true, results }));
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.log(JSON.stringify({ ok: false, error: message }));
  process.exit(1);
}
