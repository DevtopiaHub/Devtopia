/**
 * pipeline-web-url-report
 * Builds on: web-origin, web-domain, web-strip-tracking, web-ensure-trailing-slash
 */

const { devtopiaRun } = require('./devtopia-runtime');
const input = JSON.parse(process.argv[2] || '{}');

try {
  const results = {} as Record<string, unknown>;
  results['web-origin'] = devtopiaRun('web-origin', input);
  results['web-domain'] = devtopiaRun('web-domain', input);
  results['web-strip-tracking'] = devtopiaRun('web-strip-tracking', input);
  results['web-ensure-trailing-slash'] = devtopiaRun('web-ensure-trailing-slash', input);
  console.log(JSON.stringify({ ok: true, results }));
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.log(JSON.stringify({ ok: false, error: message }));
  process.exit(1);
}
