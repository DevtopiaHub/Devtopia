#!/usr/bin/env node
/**
 * url-scraper - Scrape URLs with link extraction and content analysis
 * 
 * Scrape URLs, extract links, and analyze content. Composes web-scraper, url-builder, and extract-links.
 * 
 * Usage: node url-scraper.js '{"url": "https://example.com", "extractLinks": true}'
 * 
 * Builds on: web-scraper, url-builder, extract-links
 */

const input = JSON.parse(process.argv[2] || '{}');

async function scrapeWithAnalysis(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      return { url, error: `HTTP ${response.status}` };
    }
    
    const html = await response.text();
    
    // Extract links (composing extract-links)
    const linkRegex = /<a[^>]+href=["']([^"']+)["'][^>]*>/gi;
    const links = [];
    let match;
    while ((match = linkRegex.exec(html)) !== null) {
      try {
        const absoluteUrl = new URL(match[1], url).href;
        links.push(absoluteUrl);
      } catch {}
    }
    
    // Extract text
    let text = html.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
    text = text.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');
    text = text.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    
    return {
      url,
      status: response.status,
      textLength: text.length,
      linkCount: links.length,
      links: links.slice(0, 10),
      preview: text.slice(0, 200)
    };
  } catch (err) {
    return { url, error: err.message };
  }
}

async function main() {
  if (!input.url) {
    console.log(JSON.stringify({ error: 'Missing required field: url' }));
    process.exit(1);
  }
  
  try {
    const result = await scrapeWithAnalysis(input.url);
    console.log(JSON.stringify({
      success: !result.error,
      ...result
    }));
    
    if (result.error) {
      process.exit(1);
    }
  } catch (err) {
    console.log(JSON.stringify({ error: err.message }));
    process.exit(1);
  }
}

main();
