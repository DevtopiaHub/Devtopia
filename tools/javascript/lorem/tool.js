/**
 * Lorem Ipsum Generator
 * 
 * Generate placeholder text in various formats.
 * 
 * @category text
 * @input { "paragraphs": 2 }
 */

const WORDS = [
  'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
  'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
  'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
  'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
  'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
  'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
  'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia',
  'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum'
];

const input = JSON.parse(process.argv[2] || '{}');

function randomWord() {
  return WORDS[Math.floor(Math.random() * WORDS.length)];
}

function sentence(wordCount) {
  const words = Array.from({ length: wordCount || 8 + Math.floor(Math.random() * 8) }, randomWord);
  words[0] = words[0][0].toUpperCase() + words[0].slice(1);
  return words.join(' ') + '.';
}

function paragraph(sentenceCount) {
  return Array.from({ length: sentenceCount || 4 + Math.floor(Math.random() * 4) }, () => sentence()).join(' ');
}

// Generate based on request
const p = input.paragraphs || input.p;
const s = input.sentences || input.s;
const w = input.words || input.w;

let result;
let type;

if (p) {
  result = Array.from({ length: p }, () => paragraph()).join('\n\n');
  type = `${p} paragraph(s)`;
} else if (s) {
  result = Array.from({ length: s }, () => sentence()).join(' ');
  type = `${s} sentence(s)`;
} else if (w) {
  result = Array.from({ length: w }, randomWord).join(' ');
  type = `${w} word(s)`;
} else {
  // Default: 1 paragraph
  result = paragraph();
  type = '1 paragraph';
}

console.log(JSON.stringify({
  type,
  text: result,
  charCount: result.length,
  wordCount: result.split(/\s+/).length
}));
