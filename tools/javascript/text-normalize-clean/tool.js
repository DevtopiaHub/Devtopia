/**
 * text-normalize-clean - Comprehensive text normalization pipeline
 * Builds on: text-clean, text-trim-lines, text-dedupe-lines (via devtopia-runtime)
 *
 * Composes text-clean: Normalize text: trim, collapse whitespace, optional lowercase
 * Composes text-trim-lines: Trim whitespace for each line in a block of text
 * Composes text-dedupe-lines: Deduplicate lines while preserving order
 *
 * @param {Object} params
 * @param {string} params.text - Text to normalize
 * @param {boolean} [params.lowercase] - Whether to lowercase (default: false)
 * @returns {Object} Pipeline result with normalized text
 */

const { devtopiaRun } = require('./devtopia-runtime');
const input = JSON.parse(process.argv[2] || '{}');

if (!input.text || typeof input.text !== 'string') {
  console.log(JSON.stringify({ ok: false, error: 'Missing required field: text' }));
  process.exit(1);
}

try {
  // Step 1: Normalize text: trim, collapse whitespace, optional lowercase
  const cleanResult = devtopiaRun('text-clean', { 
    text: input.text,
    lowercase: input.lowercase || false
  });
  
  if (!cleanResult.ok) {
    console.log(JSON.stringify({ ok: false, error: 'Text cleaning failed', details: cleanResult.error }));
    process.exit(1);
  }

  // Step 2: Trim whitespace for each line in a block of text
  const trimResult = devtopiaRun('text-trim-lines', { text: cleanResult.cleaned });
  
  if (!trimResult.ok) {
    console.log(JSON.stringify({ ok: false, error: 'Line trimming failed', details: trimResult.error }));
    process.exit(1);
  }

  // Step 3: Deduplicate lines while preserving order
  const dedupeResult = devtopiaRun('text-dedupe-lines', { text: trimResult.trimmed });
  
  if (!dedupeResult.ok) {
    console.log(JSON.stringify({ ok: false, error: 'Line deduplication failed', details: dedupeResult.error }));
    process.exit(1);
  }

  console.log(JSON.stringify({
    ok: true,
    original: input.text,
    cleaned: cleanResult.cleaned,
    trimmed: trimResult.trimmed,
    normalized: dedupeResult.deduplicated,
    steps: ["text-clean", "text-trim-lines", "text-dedupe-lines"]
  }));
} catch (error) {
  console.log(JSON.stringify({ ok: false, error: error.message }));
  process.exit(1);
}
