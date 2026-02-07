/**
 * pipeline-data-sort-count
 * Builds on: data-sort-by, data-count-by
 */

const { devtopiaRun } = require('./devtopia-runtime');
const input = JSON.parse(process.argv[2] || '{}');

try {
  const results = {} as Record<string, unknown>;
  results['data-sort-by'] = devtopiaRun('data-sort-by', input);
  results['data-count-by'] = devtopiaRun('data-count-by', input);
  console.log(JSON.stringify({ ok: true, results }));
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.log(JSON.stringify({ ok: false, error: message }));
  process.exit(1);
}
