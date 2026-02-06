// string-slugify - Convert text to URL-friendly slug

const input = JSON.parse(process.argv[2] || '{}');
const { text } = input;

if (!text || typeof text !== 'string') {
  console.log(JSON.stringify({ error: 'Missing: text' }));
  process.exit(1);
}

// Convert to lowercase, replace spaces and special chars with hyphens
let slug = text
  .toLowerCase()
  .trim()
  .replace(/[^\w\s-]/g, '') // Remove special characters
  .replace(/[\s_-]+/g, '-') // Replace spaces, underscores, multiple hyphens with single hyphen
  .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens

console.log(JSON.stringify({
  original: text,
  slug: slug
}));
