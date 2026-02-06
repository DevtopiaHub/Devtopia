/**
 * Simple Sentiment Analysis
 * 
 * Basic sentiment scoring using word lists (no external API).
 * 
 * @category ai
 * @input { "text": "I love this amazing product" }
 */

// Simple word lists (AFINN-style subset)
const POSITIVE = new Set([
  'good', 'great', 'awesome', 'amazing', 'excellent', 'fantastic', 'wonderful',
  'love', 'like', 'best', 'happy', 'joy', 'beautiful', 'perfect', 'brilliant',
  'superb', 'outstanding', 'positive', 'nice', 'pleasant', 'glad', 'delightful',
  'fun', 'exciting', 'win', 'winner', 'success', 'successful', 'thank', 'thanks',
  'impressive', 'recommended', 'favorite', 'helpful', 'easy', 'fast', 'quick'
]);

const NEGATIVE = new Set([
  'bad', 'terrible', 'awful', 'horrible', 'poor', 'worst', 'hate', 'dislike',
  'sad', 'angry', 'annoying', 'annoyed', 'disappointed', 'disappointing', 'ugly',
  'boring', 'slow', 'difficult', 'hard', 'fail', 'failed', 'failure', 'wrong',
  'broken', 'useless', 'waste', 'problem', 'issue', 'bug', 'error', 'crash',
  'frustrating', 'frustrated', 'confusing', 'confused', 'complicated', 'never'
]);

const INTENSIFIERS = new Set(['very', 'really', 'extremely', 'absolutely', 'totally', 'so']);
const NEGATORS = new Set(['not', "don't", "doesn't", "didn't", "won't", "can't", "never", "no"]);

const input = JSON.parse(process.argv[2] || '{}');
const text = input.text || input.t || '';

if (!text) {
  console.log(JSON.stringify({ error: "No text provided" }));
  process.exit(1);
}

const words = text.toLowerCase().match(/\b[\w']+\b/g) || [];
let score = 0;
let positive = [];
let negative = [];
let negated = false;
let intensified = false;

for (let i = 0; i < words.length; i++) {
  const word = words[i];
  
  if (NEGATORS.has(word)) {
    negated = true;
    continue;
  }
  
  if (INTENSIFIERS.has(word)) {
    intensified = true;
    continue;
  }
  
  let wordScore = 0;
  if (POSITIVE.has(word)) {
    wordScore = 1;
    positive.push(word);
  } else if (NEGATIVE.has(word)) {
    wordScore = -1;
    negative.push(word);
  }
  
  if (wordScore !== 0) {
    if (negated) wordScore *= -1;
    if (intensified) wordScore *= 1.5;
    score += wordScore;
  }
  
  negated = false;
  intensified = false;
}

const normalized = words.length > 0 ? score / Math.sqrt(words.length) : 0;
const sentiment = normalized > 0.2 ? 'positive' : normalized < -0.2 ? 'negative' : 'neutral';

console.log(JSON.stringify({
  text: text.slice(0, 100) + (text.length > 100 ? '...' : ''),
  sentiment,
  score: Math.round(normalized * 100) / 100,
  rawScore: score,
  positive: [...new Set(positive)],
  negative: [...new Set(negative)],
  wordCount: words.length
}));
