# text-url-extract-validate

Extract URLs from text and validate each one, returning parsed components for valid URLs and error details for invalid ones.

## Composes

- `text-extract-urls` — Extract URLs from text
- `url-validate` — Validate a URL and return parsed components

## Usage

```bash
devtopia run text-url-extract-validate '{"text": "Visit https://example.com and http://invalid..url"}'
```

## Input

- `text` (string, required) - Text containing URLs to extract and validate

## Output

```json
{
  "ok": true,
  "total": 2,
  "valid": 1,
  "invalid": 1,
  "validated": [
    {
      "url": "https://example.com",
      "valid": true,
      "parsed": {
        "ok": true,
        "protocol": "https:",
        "hostname": "example.com",
        "pathname": "/"
      }
    }
  ],
  "invalid": [
    {
      "url": "http://invalid..url",
      "valid": false,
      "error": "Invalid URL"
    }
  ]
}
```
