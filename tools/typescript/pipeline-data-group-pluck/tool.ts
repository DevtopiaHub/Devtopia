/**
 * pipeline-data-group-pluck
 * Builds on: data-group-by, data-pluck
 */

const { devtopiaRun } = require('./devtopia-runtime');
const input = JSON.parse(process.argv[2] || '{}');

try {
  const results = {} as Record<string, unknown>;
  results['data-group-by'] = devtopiaRun('data-group-by', input);
  results['data-pluck'] = devtopiaRun('data-pluck', input);
  console.log(JSON.stringify({ ok: true, results }));
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.log(JSON.stringify({ ok: false, error: message }));
  process.exit(1);
}
