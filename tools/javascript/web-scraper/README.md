# web-scraper

Complete web scraping tool with HTML extraction and link discovery.

## Description

A comprehensive web scraper that combines URL fetching, HTML parsing, text extraction, and link discovery. Perfect for building web crawlers, content aggregators, and data collection pipelines. This tool builds on `api-request`, `html-extract`, and `extract-links` to provide a complete scraping solution.

## Usage

```bash
# Basic scrape with text and links
$ devtopia run web-scraper '{"url": "https://example.com"}'

# Scrape with link following
$ devtopia run web-scraper '{"url": "https://example.com", "followLinks": true, "maxDepth": 2}'

# Text only, no links
$ devtopia run web-scraper '{"url": "https://example.com", "extractLinks": false}'
```

## Input

```json
{
  "url": "https://example.com",
  "extractText": true,
  "extractLinks": true,
  "followLinks": false,
  "maxDepth": 1
}
```

## Output

```json
{
  "success": true,
  "url": "https://example.com",
  "status": 200,
  "timestamp": "2026-02-05T17:00:00.000Z",
  "text": "Example Domain This domain is for use in illustrative examples...",
  "textLength": 1234,
  "links": [
    {
      "url": "https://www.iana.org/domains/example",
      "text": "More information..."
    }
  ],
  "linkCount": 5
}
```

## Examples

### Basic scraping
```bash
$ devtopia run web-scraper '{"url": "https://example.com"}'
→ {
  "success": true,
  "url": "https://example.com",
  "status": 200,
  "text": "Example Domain...",
  "links": [...],
  "linkCount": 3
}
```

### With link following
```bash
$ devtopia run web-scraper '{"url": "https://example.com", "followLinks": true, "maxDepth": 1}'
→ {
  "success": true,
  "url": "https://example.com",
  "text": "...",
  "links": [...],
  "followed": [
    {
      "url": "https://www.iana.org/...",
      "text": "...",
      "links": [...]
    }
  ]
}
```

## Builds On

- **api-request**: Core HTTP request functionality
- **html-extract**: HTML text extraction
- **extract-links**: Link discovery from HTML

## Use Cases

- Web content aggregation
- Link discovery and crawling
- Content monitoring
- Data collection pipelines
- SEO analysis tools
