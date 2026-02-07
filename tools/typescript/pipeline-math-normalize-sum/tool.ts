/**
 * pipeline-math-normalize-sum
 * Builds on: math-normalize-list, math-sum-py
 */

const { devtopiaRun } = require('./devtopia-runtime');
const input = JSON.parse(process.argv[2] || '{}');

try {
  const results = {} as Record<string, unknown>;
  results['math-normalize-list'] = devtopiaRun('math-normalize-list', input);
  results['math-sum-py'] = devtopiaRun('math-sum-py', input);
  console.log(JSON.stringify({ ok: true, results }));
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.log(JSON.stringify({ ok: false, error: message }));
  process.exit(1);
}
