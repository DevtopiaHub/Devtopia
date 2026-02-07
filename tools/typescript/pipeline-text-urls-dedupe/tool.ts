/**
 * pipeline-text-urls-dedupe
 * Builds on: text-extract-urls, text-dedupe-lines
 */

const { devtopiaRun } = require('./devtopia-runtime');
const input = JSON.parse(process.argv[2] || '{}');

try {
  const results = {} as Record<string, unknown>;
  results['text-extract-urls'] = devtopiaRun('text-extract-urls', input);
  results['text-dedupe-lines'] = devtopiaRun('text-dedupe-lines', input);
  console.log(JSON.stringify({ ok: true, results }));
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.log(JSON.stringify({ ok: false, error: message }));
  process.exit(1);
}
