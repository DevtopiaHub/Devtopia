/**
 * pipeline-text-title-strip
 * Builds on: text-title-case, text-strip-html
 */

const { devtopiaRun } = require('./devtopia-runtime');
const input = JSON.parse(process.argv[2] || '{}');

try {
  const results = {} as Record<string, unknown>;
  results['text-title-case'] = devtopiaRun('text-title-case', input);
  results['text-strip-html'] = devtopiaRun('text-strip-html', input);
  console.log(JSON.stringify({ ok: true, results }));
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.log(JSON.stringify({ ok: false, error: message }));
  process.exit(1);
}
