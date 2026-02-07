/**
 * pipeline-web-url-sanitize
 * Builds on: pipeline-url-clean-tracking, web-ensure-trailing-slash
 */

const { devtopiaRun } = require('./devtopia-runtime');
const input = JSON.parse(process.argv[2] || '{}');

try {
  const results = {} as Record<string, unknown>;
  results['pipeline-url-clean-tracking'] = devtopiaRun('pipeline-url-clean-tracking', input);
  results['web-ensure-trailing-slash'] = devtopiaRun('web-ensure-trailing-slash', input);
  console.log(JSON.stringify({ ok: true, results }));
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.log(JSON.stringify({ ok: false, error: message }));
  process.exit(1);
}
