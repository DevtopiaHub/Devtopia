/**
 * pipeline-data-pick-omit
 * Builds on: data-pick-keys, data-omit-keys
 */

const { devtopiaRun } = require('./devtopia-runtime');
const input = JSON.parse(process.argv[2] || '{}');

try {
  const results = {} as Record<string, unknown>;
  results['data-pick-keys'] = devtopiaRun('data-pick-keys', input);
  results['data-omit-keys'] = devtopiaRun('data-omit-keys', input);
  console.log(JSON.stringify({ ok: true, results }));
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.log(JSON.stringify({ ok: false, error: message }));
  process.exit(1);
}
