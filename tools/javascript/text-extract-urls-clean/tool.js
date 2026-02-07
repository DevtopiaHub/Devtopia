/**
 * text-extract-urls-clean - [TODO: describe what this pipeline does]
 * Builds on: text-extract-urls, text-clean (via devtopia-runtime)
 *
 * Composes text-extract-urls: Extract URLs from text
 * Composes text-clean: Normalize text: trim, collapse whitespace, optional lowercase
 *
 * @param {Object} params
 * @returns {Object} Pipeline result
 */

const { devtopiaRun } = require('./devtopia-runtime');
const input = JSON.parse(process.argv[2] || '{}');

// TODO: validate required input fields
// if (!input.someField) {
//   console.log(JSON.stringify({ error: 'Missing required field: someField' }));
//   process.exit(1);
// }

try {
  // Step 1: Extract URLs from text
  const text_extract_urls_result = devtopiaRun('text-extract-urls', { /* TODO: pass input */ });

  // Step 2: Normalize text: trim, collapse whitespace, optional lowercase
  const text_clean_result = devtopiaRun('text-clean', { /* TODO: pass input */ });

  // TODO: combine results and produce final output
  console.log(JSON.stringify({
    success: true,
    // result: ...,
    steps: ["text-extract-urls","text-clean"],
  }));
} catch (error) {
  console.log(JSON.stringify({ error: error.message }));
  process.exit(1);
}
