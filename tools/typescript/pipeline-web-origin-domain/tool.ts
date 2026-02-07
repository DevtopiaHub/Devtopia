/**
 * pipeline-web-origin-domain
 * Builds on: web-origin, web-domain
 */

const { devtopiaRun } = require('./devtopia-runtime');
const input = JSON.parse(process.argv[2] || '{}');

try {
  const results = {} as Record<string, unknown>;
  results['web-origin'] = devtopiaRun('web-origin', input);
  results['web-domain'] = devtopiaRun('web-domain', input);
  console.log(JSON.stringify({ ok: true, results }));
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.log(JSON.stringify({ ok: false, error: message }));
  process.exit(1);
}
