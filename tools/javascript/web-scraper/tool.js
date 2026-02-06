#!/usr/bin/env node
/**
 * web-scraper - Complete web scraping tool with HTML extraction and link discovery
 * 
 * A comprehensive web scraper that combines URL fetching, HTML parsing,
 * text extraction, and link discovery into a single powerful tool.
 * 
 * Usage: node web-scraper.js '{"url": "https://example.com", "extractLinks": true, "extractText": true}'
 * 
 * Options:
 * - url: URL to scrape (required)
 * - extractText: Extract plain text from HTML (default: true)
 * - extractLinks: Extract all links from page (default: true)
 * - followLinks: Follow and scrape linked pages (default: false)
 * - maxDepth: Maximum link following depth (default: 1)
 * 
 * Builds on: api-request, html-extract, extract-links
 */

const input = JSON.parse(process.argv[2] || '{}');

// Simple HTML text extractor (composing html-extract)
function extractText(html) {
  // Remove script and style tags
  html = html.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
  html = html.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');
  
  // Remove HTML tags
  let text = html.replace(/<[^>]+>/g, ' ');
  
  // Decode HTML entities
  text = text.replace(/&nbsp;/g, ' ');
  text = text.replace(/&amp;/g, '&');
  text = text.replace(/&lt;/g, '<');
  text = text.replace(/&gt;/g, '>');
  text = text.replace(/&quot;/g, '"');
  text = text.replace(/&#39;/g, "'");
  
  // Clean up whitespace
  text = text.replace(/\s+/g, ' ').trim();
  
  return text;
}

// Extract links from HTML (composing extract-links)
function extractLinks(html, baseUrl) {
  const links = [];
  const linkRegex = /<a[^>]+href=["']([^"']+)["'][^>]*>/gi;
  let match;
  
  while ((match = linkRegex.exec(html)) !== null) {
    const href = match[1];
    try {
      const absoluteUrl = new URL(href, baseUrl).href;
      links.push({
        url: absoluteUrl,
        text: match[0].match(/>(.*?)<\/a>/)?.[1]?.trim() || ''
      });
    } catch {
      // Invalid URL, skip
    }
  }
  
  return links;
}

async function scrapeUrl(url, depth = 0, maxDepth = 1, visited = new Set()) {
  if (visited.has(url) || depth > maxDepth) {
    return null;
  }
  visited.add(url);
  
  try {
    // Fetch URL (composing api-request)
    const response = await fetch(url);
    if (!response.ok) {
      return { url, error: `HTTP ${response.status}` };
    }
    
    const html = await response.text();
    
    const result = {
      url,
      status: response.status,
      timestamp: new Date().toISOString()
    };
    
    // Extract text if requested
    if (input.extractText !== false) {
      result.text = extractText(html);
      result.textLength = result.text.length;
    }
    
    // Extract links if requested
    if (input.extractLinks !== false) {
      result.links = extractLinks(html, url);
      result.linkCount = result.links.length;
    }
    
    // Follow links if requested
    if (input.followLinks && depth < maxDepth) {
      result.followed = [];
      const linksToFollow = result.links.slice(0, 5); // Limit to 5 links
      
      for (const link of linksToFollow) {
        const followed = await scrapeUrl(link.url, depth + 1, maxDepth, visited);
        if (followed) {
          result.followed.push(followed);
        }
      }
    }
    
    return result;
  } catch (err) {
    return { url, error: err.message };
  }
}

async function main() {
  if (!input.url) {
    console.log(JSON.stringify({ error: 'Missing required field: url' }));
    process.exit(1);
  }
  
  const maxDepth = input.maxDepth || 1;
  const result = await scrapeUrl(input.url, 0, maxDepth);
  
  console.log(JSON.stringify({
    success: !result.error,
    ...result
  }));
  
  if (result.error) {
    process.exit(1);
  }
}

main();
