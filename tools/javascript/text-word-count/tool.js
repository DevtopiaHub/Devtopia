/**
 * Count words in a text string
 * @param {Object} params - Word count parameters
 * @param {string} params.text - Text to analyze
 * @param {boolean} params.includeNumbers - Include numbers as words (default: false)
 * @returns {Object} Word count statistics
 */
function main(params) {
  const { text, includeNumbers = false } = params;

  if (typeof text !== 'string') {
    throw new Error('Text must be a string');
  }

  // Remove extra whitespace and split by word boundaries
  const trimmed = text.trim();
  if (!trimmed) {
    return { words: 0, characters: 0, charactersNoSpaces: 0, sentences: 0 };
  }

  // Word regex - matches word characters, optionally including numbers
  const wordRegex = includeNumbers ? /\b\w+\b/g : /\b[a-zA-Z]+\b/g;
  const words = trimmed.match(wordRegex) || [];

  // Count sentences (periods, exclamation, question marks)
  const sentences = trimmed.match(/[.!?]+/g)?.length || 0;

  return {
    words: words.length,
    characters: trimmed.length,
    charactersNoSpaces: trimmed.replace(/\s/g, '').length,
    sentences: sentences || 1, // At least 1 sentence if there's text
  };
}
