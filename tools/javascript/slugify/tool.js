#!/usr/bin/env node
/**
 * slugify - Convert text to URL-safe slugs
 * 
 * Usage: node slugify.js '{"text": "Hello World!", "separator": "-"}'
 * 
 * Options:
 * - separator: Character to use (default: "-")
 * - lowercase: Force lowercase (default: true)
 * - maxLength: Maximum length (default: none)
 */

const input = JSON.parse(process.argv[2] || '{}');

async function main() {
  if (!input.text) {
    console.log(JSON.stringify({ error: 'Missing required field: text' }));
    process.exit(1);
  }

  try {
    const separator = input.separator || '-';
    const lowercase = input.lowercase !== false;
    const maxLength = input.maxLength || 0;
    
    let slug = input.text
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')  // Remove diacritics
      .replace(/[^a-zA-Z0-9\s-]/g, '')  // Remove special chars
      .trim()
      .replace(/\s+/g, separator)       // Replace spaces
      .replace(new RegExp(`${separator}+`, 'g'), separator); // Remove duplicate separators
    
    if (lowercase) {
      slug = slug.toLowerCase();
    }
    
    if (maxLength > 0 && slug.length > maxLength) {
      slug = slug.substring(0, maxLength).replace(new RegExp(`${separator}$`), '');
    }
    
    console.log(JSON.stringify({
      original: input.text,
      slug,
      length: slug.length
    }));
  } catch (err) {
    console.log(JSON.stringify({ error: err.message }));
    process.exit(1);
  }
}

main();
