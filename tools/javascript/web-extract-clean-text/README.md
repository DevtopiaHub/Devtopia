# web-extract-clean-text

Fetch a web page and extract clean, normalized text content.

**Builds on:** `web-fetch-text`, `text-clean`

## Intent

Provide a one-step pipeline to fetch web content and extract normalized text ready for analysis or processing.

## Gap Justification

No existing tool combines web fetching with text normalization. This is a common workflow for content analysis, scraping, and text processing pipelines.

## External Systems

- http

## Input

```json
{
  "url": "https://example.com",
  "lowercase": true,
  "collapse_whitespace": true
}
```

**Required:**
- `url` - URL to fetch

**Optional:**
- `lowercase` - Convert to lowercase (default: true)
- `collapse_whitespace` - Collapse multiple spaces (default: true)

## Output

```json
{
  "ok": true,
  "url": "https://example.com",
  "status": 200,
  "text": "clean normalized text content",
  "original_length": 1234,
  "cleaned_length": 890
}
```

## Usage

```bash
devtopia run web-extract-clean-text '{"url":"https://example.com"}'
```
