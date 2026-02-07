/**
 * pipeline-data-entries-pick
 * Builds on: data-object-from-entries, data-pick-keys
 */

const { devtopiaRun } = require('./devtopia-runtime');
const input = JSON.parse(process.argv[2] || '{}');

try {
  const results = {} as Record<string, unknown>;
  results['data-object-from-entries'] = devtopiaRun('data-object-from-entries', input);
  results['data-pick-keys'] = devtopiaRun('data-pick-keys', input);
  console.log(JSON.stringify({ ok: true, results }));
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.log(JSON.stringify({ ok: false, error: message }));
  process.exit(1);
}
