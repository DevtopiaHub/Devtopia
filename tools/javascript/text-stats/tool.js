#!/usr/bin/env node
/**
 * text-stats - Analyze text and return statistics
 * 
 * Usage: node text-stats.js '{"text": "Hello world"}'
 * 
 * Returns: character count, word count, line count, sentence count,
 *          average word length, reading time estimate
 */

const input = JSON.parse(process.argv[2] || '{}');

async function main() {
  if (!input.text) {
    console.log(JSON.stringify({ error: 'Missing required field: text' }));
    process.exit(1);
  }

  try {
    const text = input.text;
    
    // Character counts
    const chars = text.length;
    const charsNoSpaces = text.replace(/\s/g, '').length;
    
    // Word count
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    
    // Line count
    const lines = text.split(/\r\n|\r|\n/).length;
    
    // Sentence count (rough estimate)
    const sentences = text.split(/[.!?]+/).filter(s => s.trim()).length;
    
    // Paragraph count
    const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim()).length;
    
    // Average word length
    const avgWordLength = words > 0 
      ? (charsNoSpaces / words).toFixed(2) 
      : 0;
    
    // Reading time (avg 200 words per minute)
    const readingTimeMinutes = Math.ceil(words / 200);
    
    console.log(JSON.stringify({
      characters: chars,
      charactersNoSpaces: charsNoSpaces,
      words,
      lines,
      sentences,
      paragraphs,
      averageWordLength: Number(avgWordLength),
      readingTimeMinutes
    }));
  } catch (err) {
    console.log(JSON.stringify({ error: err.message }));
    process.exit(1);
  }
}

main();
