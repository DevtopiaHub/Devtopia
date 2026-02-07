/**
 * pipeline-time-pack
 * Builds on: time-to-epoch-seconds, time-add-seconds
 */

const { devtopiaRun } = require('./devtopia-runtime');
const input = JSON.parse(process.argv[2] || '{}');

try {
  const results = {} as Record<string, unknown>;
  results['time-to-epoch-seconds'] = devtopiaRun('time-to-epoch-seconds', input);
  results['time-add-seconds'] = devtopiaRun('time-add-seconds', input);
  console.log(JSON.stringify({ ok: true, results }));
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.log(JSON.stringify({ ok: false, error: message }));
  process.exit(1);
}
