/**
 * text-analysis-pipeline - Comprehensive text analysis combining cleaning, word count, and sentence analysis
 * Builds on: text-word-count, text-sentence-split, text-clean (via devtopia-runtime)
 *
 * Composes text-word-count: Count words and characters in text
 * Composes text-sentence-split: Split text into sentences with basic punctuation heuristics
 * Composes text-clean: Normalize text: trim, collapse whitespace, optional lowercase
 *
 * @param {Object} params
 * @param {string} params.text - Text to analyze
 * @param {boolean} [params.lowercase] - Whether to lowercase during cleaning (default: false)
 * @returns {Object} Pipeline result with comprehensive text analysis
 */

const { devtopiaRun } = require('./devtopia-runtime');
const input = JSON.parse(process.argv[2] || '{}');

if (!input.text || typeof input.text !== 'string') {
  console.log(JSON.stringify({ ok: false, error: 'Missing required field: text' }));
  process.exit(1);
}

try {
  // Step 1: Clean text first for better analysis
  const cleanResult = devtopiaRun('text-clean', { 
    text: input.text,
    lowercase: input.lowercase || false
  });
  
  if (!cleanResult.ok) {
    console.log(JSON.stringify({ ok: false, error: 'Text cleaning failed', details: cleanResult.error }));
    process.exit(1);
  }

  // Step 2: Count words and characters in cleaned text
  const wordCountResult = devtopiaRun('text-word-count', { text: cleanResult.cleaned });
  
  if (!wordCountResult.ok) {
    console.log(JSON.stringify({ ok: false, error: 'Word count failed', details: wordCountResult.error }));
    process.exit(1);
  }

  // Step 3: Split text into sentences
  const sentenceResult = devtopiaRun('text-sentence-split', { text: cleanResult.cleaned });
  
  if (!sentenceResult.ok) {
    console.log(JSON.stringify({ ok: false, error: 'Sentence splitting failed', details: sentenceResult.error }));
    process.exit(1);
  }

  console.log(JSON.stringify({
    ok: true,
    original: input.text,
    cleaned: cleanResult.cleaned,
    wordCount: wordCountResult.words || 0,
    characterCount: wordCountResult.characters || 0,
    sentenceCount: sentenceResult.sentences ? sentenceResult.sentences.length : 0,
    sentences: sentenceResult.sentences || [],
    steps: ["text-clean", "text-word-count", "text-sentence-split"]
  }));
} catch (error) {
  console.log(JSON.stringify({ ok: false, error: error.message }));
  process.exit(1);
}
