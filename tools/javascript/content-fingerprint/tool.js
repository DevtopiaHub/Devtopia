/**
 * Content Fingerprint
 * 
 * Generate a unique fingerprint for content using multiple signals.
 * Composes: sha256 + word-freq + text-stats concepts
 * 
 * @category data
 * @input { "content": "Some text content..." }
 */

const crypto = require('crypto');

const input = JSON.parse(process.argv[2] || '{}');
const content = input.content || input.text || '';

if (!content) {
  console.log(JSON.stringify({ error: "No content provided" }));
  process.exit(1);
}

// Hash the content
const sha256 = crypto.createHash('sha256').update(content).digest('hex');
const shortHash = sha256.slice(0, 12);

// Text stats
const words = content.toLowerCase().match(/\b[a-z]+\b/g) || [];
const chars = content.length;
const lines = content.split('\n').length;
const uniqueWords = new Set(words).size;

// Top words (excluding common ones)
const stopWords = new Set(['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'is', 'it']);
const wordCounts = {};
words.filter(w => !stopWords.has(w) && w.length > 2).forEach(w => wordCounts[w] = (wordCounts[w] || 0) + 1);
const topWords = Object.entries(wordCounts)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 5)
  .map(([w]) => w);

// Generate semantic fingerprint
const semanticId = topWords.slice(0, 3).join('-') || 'empty';

// Timestamp
const timestamp = Date.now();

console.log(JSON.stringify({
  fingerprint: `${shortHash}-${words.length}w`,
  hash: sha256,
  shortHash,
  semanticId,
  stats: {
    chars,
    words: words.length,
    uniqueWords,
    lines
  },
  topWords,
  generated: new Date(timestamp).toISOString()
}));
