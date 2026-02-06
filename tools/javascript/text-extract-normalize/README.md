# text-extract-normalize

Extract URLs from text and normalize the text content in parallel. Perfect for processing user input, comments, or any text that may contain URLs and needs cleaning.

## Composes

- `text-extract-urls` — Extract URLs from text
- `text-normalize-clean` — Comprehensive text normalization pipeline that cleans, trims lines, and removes duplicates

## Usage

```bash
devtopia run text-extract-normalize '{"text": "Visit https://example.com and http://test.com for more info.  Visit https://example.com again.", "lowercase": false}'
```

## Input

- `text` (string, required) - Text to process
- `lowercase` (boolean, optional) - Whether to lowercase during normalization (default: false)

## Output

```json
{
  "ok": true,
  "original": "Visit https://example.com and http://test.com for more info.  Visit https://example.com again.",
  "urls": ["https://example.com", "http://test.com"],
  "urlCount": 2,
  "normalized": "Visit https://example.com and http://test.com for more info. Visit https://example.com again.",
  "steps": ["text-extract-urls", "text-normalize-clean"]
}
```
