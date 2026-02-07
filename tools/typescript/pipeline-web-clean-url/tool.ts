/**
 * pipeline-web-clean-url
 * Builds on: web-ensure-https, web-strip-tracking
 */

const { devtopiaRun } = require('./devtopia-runtime');
const input = JSON.parse(process.argv[2] || '{}');

try {
  const results = {} as Record<string, unknown>;
  results['web-ensure-https'] = devtopiaRun('web-ensure-https', input);
  results['web-strip-tracking'] = devtopiaRun('web-strip-tracking', input);
  console.log(JSON.stringify({ ok: true, results }));
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.log(JSON.stringify({ ok: false, error: message }));
  process.exit(1);
}
