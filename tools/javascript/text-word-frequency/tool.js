// text-word-frequency - Count word frequency in text

const input = JSON.parse(process.argv[2] || '{}');
const { text } = input;

if (!text || typeof text !== 'string') {
  console.log(JSON.stringify({ error: 'Missing: text' }));
  process.exit(1);
}

const words = text.toLowerCase().match(/\b\w+\b/g) || [];
const frequency = {};

for (const word of words) {
  frequency[word] = (frequency[word] || 0) + 1;
}

const sorted = Object.entries(frequency)
  .sort((a, b) => b[1] - a[1])
  .map(([word, count]) => ({ word, count }));

console.log(JSON.stringify({
  totalWords: words.length,
  uniqueWords: Object.keys(frequency).length,
  frequency: sorted
}));
