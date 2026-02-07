/**
 * pipeline-web-domain-clean
 * Builds on: web-domain, web-ensure-https
 */

const { devtopiaRun } = require('./devtopia-runtime');
const input = JSON.parse(process.argv[2] || '{}');

try {
  const results = {} as Record<string, unknown>;
  results['web-domain'] = devtopiaRun('web-domain', input);
  results['web-ensure-https'] = devtopiaRun('web-ensure-https', input);
  console.log(JSON.stringify({ ok: true, results }));
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.log(JSON.stringify({ ok: false, error: message }));
  process.exit(1);
}
