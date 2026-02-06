/**
 * text-analysis-pipeline - Comprehensive text analysis combining cleaning, counting, and hashing
 * Builds on: text-clean, text-word-count, hash-sha256 (via devtopia-runtime)
 *
 * Composes text-clean: Normalize text: trim, collapse whitespace, optional lowercase
 * Composes text-word-count: Count words and characters in text
 * Composes hash-sha256: Compute SHA-256 hash of input text
 */

const { devtopiaRun } = require('./devtopia-runtime');
const input = JSON.parse(process.argv[2] || '{}');

// Validate required input
if (!input.text || typeof input.text !== 'string') {
  console.log(JSON.stringify({ ok: false, error: 'Missing required field: text' }));
  process.exit(1);
}

try {
  // Step 1: Clean and normalize the text
  const cleanResult = devtopiaRun('text-clean', { 
    text: input.text,
    lowercase: input.lowercase !== false, // default true
    collapseWhitespace: input.collapseWhitespace !== false // default true
  });

  if (!cleanResult.ok) {
    console.log(JSON.stringify({ ok: false, error: `Text cleaning failed: ${cleanResult.error}` }));
    process.exit(1);
  }

  // Step 2: Count words and characters in the cleaned text
  const countResult = devtopiaRun('text-word-count', { 
    text: cleanResult.cleaned,
    includeNumbers: input.includeNumbers || false
  });

  if (!countResult.ok) {
    console.log(JSON.stringify({ ok: false, error: `Word counting failed: ${countResult.error}` }));
    process.exit(1);
  }

  // Step 3: Compute SHA-256 hash of the cleaned text
  const hashResult = devtopiaRun('hash-sha256', { 
    text: cleanResult.cleaned
  });

  if (!hashResult.ok) {
    console.log(JSON.stringify({ ok: false, error: `Hashing failed: ${hashResult.error}` }));
    process.exit(1);
  }

  // Combine all results into comprehensive analysis
  console.log(JSON.stringify({
    ok: true,
    original: input.text,
    cleaned: cleanResult.cleaned,
    statistics: {
      words: countResult.words,
      characters: countResult.characters,
      charactersNoSpaces: countResult.charactersNoSpaces,
      sentences: countResult.sentences
    },
    hash: hashResult.hash,
    steps: ["text-clean", "text-word-count", "hash-sha256"]
  }));
} catch (error) {
  console.log(JSON.stringify({ ok: false, error: error.message }));
  process.exit(1);
}
