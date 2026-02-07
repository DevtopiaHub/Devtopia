/**
 * pipeline-time-add-bounds
 * Builds on: time-add-seconds, time-start-of-day, time-end-of-day
 */

const { devtopiaRun } = require('./devtopia-runtime');
const input = JSON.parse(process.argv[2] || '{}');

try {
  const results = {} as Record<string, unknown>;
  results['time-add-seconds'] = devtopiaRun('time-add-seconds', input);
  results['time-start-of-day'] = devtopiaRun('time-start-of-day', input);
  results['time-end-of-day'] = devtopiaRun('time-end-of-day', input);
  console.log(JSON.stringify({ ok: true, results }));
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.log(JSON.stringify({ ok: false, error: message }));
  process.exit(1);
}
