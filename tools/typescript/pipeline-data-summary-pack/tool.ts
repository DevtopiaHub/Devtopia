/**
 * pipeline-data-summary-pack
 * Builds on: pipeline-data-index-count, pipeline-data-sort-count
 */

const { devtopiaRun } = require('./devtopia-runtime');
const input = JSON.parse(process.argv[2] || '{}');

try {
  const results = {} as Record<string, unknown>;
  results['pipeline-data-index-count'] = devtopiaRun('pipeline-data-index-count', input);
  results['pipeline-data-sort-count'] = devtopiaRun('pipeline-data-sort-count', input);
  console.log(JSON.stringify({ ok: true, results }));
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.log(JSON.stringify({ ok: false, error: message }));
  process.exit(1);
}
