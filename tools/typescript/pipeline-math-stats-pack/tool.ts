/**
 * pipeline-math-stats-pack
 * Builds on: math-standard-deviation, math-variance
 */

const { devtopiaRun } = require('./devtopia-runtime');
const input = JSON.parse(process.argv[2] || '{}');

try {
  const results = {} as Record<string, unknown>;
  results['math-standard-deviation'] = devtopiaRun('math-standard-deviation', input);
  results['math-variance'] = devtopiaRun('math-variance', input);
  console.log(JSON.stringify({ ok: true, results }));
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.log(JSON.stringify({ ok: false, error: message }));
  process.exit(1);
}
