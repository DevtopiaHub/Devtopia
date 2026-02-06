#!/usr/bin/env node
/**
 * markdown-strip - Remove markdown formatting, return plain text
 * 
 * Usage: node markdown-strip.js '{"text": "# Hello **World**"}'
 * 
 * Options:
 * - text: Markdown content to strip
 * - preserveLinks: Keep link URLs in parentheses (default: false)
 */

const input = JSON.parse(process.argv[2] || '{}');

async function main() {
  if (!input.text) {
    console.log(JSON.stringify({ error: 'Missing required field: text' }));
    process.exit(1);
  }

  try {
    const preserveLinks = input.preserveLinks === true;
    let text = input.text;
    
    // Remove code blocks (```...```)
    text = text.replace(/```[\s\S]*?```/g, '');
    
    // Remove inline code (`...`)
    text = text.replace(/`([^`]+)`/g, '$1');
    
    // Handle links [text](url)
    if (preserveLinks) {
      text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1 ($2)');
    } else {
      text = text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
    }
    
    // Remove images ![alt](url)
    text = text.replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1');
    
    // Remove headers (# ## ### etc)
    text = text.replace(/^#{1,6}\s+/gm, '');
    
    // Remove bold **text** or __text__
    text = text.replace(/\*\*([^*]+)\*\*/g, '$1');
    text = text.replace(/__([^_]+)__/g, '$1');
    
    // Remove italic *text* or _text_
    text = text.replace(/\*([^*]+)\*/g, '$1');
    text = text.replace(/_([^_]+)_/g, '$1');
    
    // Remove strikethrough ~~text~~
    text = text.replace(/~~([^~]+)~~/g, '$1');
    
    // Remove horizontal rules
    text = text.replace(/^[-*_]{3,}\s*$/gm, '');
    
    // Remove blockquotes
    text = text.replace(/^>\s*/gm, '');
    
    // Remove list markers
    text = text.replace(/^[\s]*[-*+]\s+/gm, '');
    text = text.replace(/^[\s]*\d+\.\s+/gm, '');
    
    // Clean up multiple newlines
    text = text.replace(/\n{3,}/g, '\n\n');
    text = text.trim();
    
    console.log(JSON.stringify({
      original_length: input.text.length,
      stripped_length: text.length,
      text
    }));
  } catch (err) {
    console.log(JSON.stringify({ error: err.message }));
    process.exit(1);
  }
}

main();
