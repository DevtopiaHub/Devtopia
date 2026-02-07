/**
 * pipeline-time-roundtrip
 * Builds on: time-to-unix, time-from-unix
 */

const { devtopiaRun } = require('./devtopia-runtime');
const input = JSON.parse(process.argv[2] || '{}');

try {
  const results = {} as Record<string, unknown>;
  results['time-to-unix'] = devtopiaRun('time-to-unix', input);
  results['time-from-unix'] = devtopiaRun('time-from-unix', input);
  console.log(JSON.stringify({ ok: true, results }));
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.log(JSON.stringify({ ok: false, error: message }));
  process.exit(1);
}
