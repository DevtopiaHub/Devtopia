/**
 * pipeline-text-strip-count
 * Builds on: text-strip-html, text-count-chars
 */

const { devtopiaRun } = require('./devtopia-runtime');
const input = JSON.parse(process.argv[2] || '{}');

try {
  const results = {} as Record<string, unknown>;
  results['text-strip-html'] = devtopiaRun('text-strip-html', input);
  results['text-count-chars'] = devtopiaRun('text-count-chars', input);
  console.log(JSON.stringify({ ok: true, results }));
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.log(JSON.stringify({ ok: false, error: message }));
  process.exit(1);
}
