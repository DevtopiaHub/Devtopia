/**
 * Case Converter
 * 
 * Convert strings between different cases (camel, snake, kebab, etc.)
 * 
 * @category util
 * @input { "text": "hello world", "to": "camel" }
 */

const input = JSON.parse(process.argv[2] || '{}');
const text = input.text || input.s || '';
const targetCase = input.to || input.case || 'all';

if (!text) {
  console.log(JSON.stringify({ error: "No text provided" }));
  process.exit(1);
}

// Normalize: split into words
function toWords(s) {
  return s
    .replace(/([a-z])([A-Z])/g, '$1 $2')  // camelCase
    .replace(/[-_]+/g, ' ')                // snake_case, kebab-case
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);
}

const words = toWords(text);

const converters = {
  lower: () => words.join(' '),
  upper: () => words.join(' ').toUpperCase(),
  title: () => words.map(w => w[0].toUpperCase() + w.slice(1)).join(' '),
  camel: () => words.map((w, i) => i === 0 ? w : w[0].toUpperCase() + w.slice(1)).join(''),
  pascal: () => words.map(w => w[0].toUpperCase() + w.slice(1)).join(''),
  snake: () => words.join('_'),
  screaming: () => words.join('_').toUpperCase(),
  kebab: () => words.join('-'),
  dot: () => words.join('.'),
  path: () => words.join('/'),
  constant: () => words.join('_').toUpperCase(),
};

if (targetCase === 'all') {
  const result = { input: text, words };
  for (const [name, fn] of Object.entries(converters)) {
    result[name] = fn();
  }
  console.log(JSON.stringify(result));
} else if (converters[targetCase]) {
  console.log(JSON.stringify({
    input: text,
    case: targetCase,
    output: converters[targetCase]()
  }));
} else {
  console.log(JSON.stringify({ 
    error: `Unknown case: ${targetCase}`,
    available: Object.keys(converters)
  }));
  process.exit(1);
}
