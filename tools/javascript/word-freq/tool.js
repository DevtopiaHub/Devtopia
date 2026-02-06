/**
 * Word Frequency Counter
 * 
 * Count word frequencies in text, with optional stop word filtering.
 * 
 * @category text
 * @input { "text": "the quick brown fox jumps over the lazy dog" }
 */

const STOP_WORDS = new Set([
  'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
  'of', 'with', 'by', 'from', 'is', 'are', 'was', 'were', 'be', 'been',
  'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would',
  'could', 'should', 'may', 'might', 'must', 'it', 'its', 'this', 'that'
]);

const input = JSON.parse(process.argv[2] || '{}');
const text = input.text || input.t || '';
const excludeStopWords = input.excludeStopWords ?? input.noStop ?? false;
const topN = input.top || input.n || 10;

if (!text) {
  console.log(JSON.stringify({ error: "No text provided" }));
  process.exit(1);
}

// Tokenize and count
const words = text.toLowerCase().match(/\b[a-z]+\b/g) || [];
const counts = {};

for (const word of words) {
  if (excludeStopWords && STOP_WORDS.has(word)) continue;
  counts[word] = (counts[word] || 0) + 1;
}

// Sort by frequency
const sorted = Object.entries(counts)
  .sort((a, b) => b[1] - a[1])
  .slice(0, topN);

console.log(JSON.stringify({
  totalWords: words.length,
  uniqueWords: Object.keys(counts).length,
  top: sorted.map(([word, count]) => ({ word, count })),
  excludedStopWords: excludeStopWords
}));
