#!/usr/bin/env node
/**
 * slug-generator - Convert text to URL-friendly slugs
 */
const input = JSON.parse(process.argv[2] || '{}');
const { text, separator = '-' } = input;

if (!text) {
  console.log(JSON.stringify({ error: 'Missing required parameter: text' }));
  process.exit(1);
}

function generateSlug(text, separator) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, separator) // Replace spaces/underscores with separator
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing separators
}

try {
  const slug = generateSlug(text, separator);
  console.log(JSON.stringify({ slug, original: text }));
} catch (err) {
  console.log(JSON.stringify({ error: err.message }));
  process.exit(1);
}
