/**
 * web-fetch-process-store
 * Builds on: web-extract-clean-text, text-clean-report, files-write-text
 *
 * Fetch a web page, extract & analyze text, then store to file.
 * Agent workflow: Crawl → Process → Archive
 */

const { devtopiaRun } = require('./devtopia-runtime');
const input = JSON.parse(process.argv[2] || '{}');

try {
  if (!input.url) {
    console.log(JSON.stringify({ ok: false, error: 'Missing required field: url' }));
    process.exit(1);
  }

  if (!input.file_path) {
    console.log(JSON.stringify({ ok: false, error: 'Missing required field: file_path' }));
    process.exit(1);
  }

  // Step 1: Fetch and extract clean text from URL
  const fetch_result = devtopiaRun('web-extract-clean-text', { url: input.url });

  if (!fetch_result || !fetch_result.ok) {
    console.log(JSON.stringify({ ok: false, error: 'Failed to fetch URL', details: fetch_result }));
    process.exit(1);
  }

  const clean_text = fetch_result.text;

  // Step 2: Analyze the text (word count, line count)
  const analysis_result = devtopiaRun('text-clean-report', { text: clean_text });

  if (!analysis_result || !analysis_result.ok) {
    console.log(JSON.stringify({ ok: false, error: 'Failed to analyze text', details: analysis_result }));
    process.exit(1);
  }

  // Step 3: Store to file
  const file_path = input.file_path.replace('{timestamp}', Date.now());
  const store_result = devtopiaRun('files-write-text', {
    path: file_path,
    content: clean_text
  });

  if (!store_result || !store_result.ok) {
    console.log(JSON.stringify({ ok: false, error: 'Failed to write file', details: store_result }));
    process.exit(1);
  }

  // Success
  console.log(JSON.stringify({
    ok: true,
    url: input.url,
    file_path: file_path,
    word_count: analysis_result.word_count,
    line_count: analysis_result.line_count,
    text_length: clean_text.length,
    analysis: analysis_result
  }));

} catch (error) {
  console.log(JSON.stringify({ ok: false, error: error.message }));
  process.exit(1);
}