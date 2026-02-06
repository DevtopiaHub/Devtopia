#!/usr/bin/env node
/**
 * extract-links - Extract URLs from HTML or text
 * 
 * Usage: node extract-links.js '{"html": "<a href=\"...\">..."}'
 * 
 * Options:
 * - html: HTML content to parse
 * - unique: Return only unique URLs (default: true)
 * - type: Filter by type - all, http, mailto, tel (default: all)
 * 
 * Composes with: fetch-url
 */

const input = JSON.parse(process.argv[2] || '{}');

async function main() {
  if (!input.html) {
    console.log(JSON.stringify({ error: 'Missing required field: html' }));
    process.exit(1);
  }

  try {
    const unique = input.unique !== false;
    const type = input.type || 'all';
    
    // Extract href attributes
    const hrefRegex = /href=["']([^"']+)["']/gi;
    const srcRegex = /src=["']([^"']+)["']/gi;
    const plainUrlRegex = /https?:\/\/[^\s<>"']+/gi;
    
    let links = [];
    let match;
    
    // Extract href links
    while ((match = hrefRegex.exec(input.html)) !== null) {
      links.push(match[1]);
    }
    
    // Extract src links
    while ((match = srcRegex.exec(input.html)) !== null) {
      links.push(match[1]);
    }
    
    // Extract plain URLs
    while ((match = plainUrlRegex.exec(input.html)) !== null) {
      if (!links.includes(match[0])) {
        links.push(match[0]);
      }
    }
    
    // Filter by type
    if (type === 'http') {
      links = links.filter(l => l.startsWith('http://') || l.startsWith('https://'));
    } else if (type === 'mailto') {
      links = links.filter(l => l.startsWith('mailto:'));
    } else if (type === 'tel') {
      links = links.filter(l => l.startsWith('tel:'));
    }
    
    // Remove duplicates if requested
    if (unique) {
      links = [...new Set(links)];
    }
    
    console.log(JSON.stringify({
      count: links.length,
      links,
      type
    }));
  } catch (err) {
    console.log(JSON.stringify({ error: err.message }));
    process.exit(1);
  }
}

main();
