# web-batch-fetch

Fetch multiple URLs in parallel and return aggregated results.

**Builds on:** `web-fetch-text`

## Intent

Provide batch URL fetching capability for processing multiple web resources in a single operation.

## Gap Justification

No existing tool handles batch URL fetching. This enables efficient processing of multiple web resources for aggregation, monitoring, or analysis workflows.

## External Systems

- http

## Input

```json
{
  "urls": [
    "https://example.com",
    "https://httpbin.org/json",
    "https://api.github.com"
  ]
}
```

**Required:**
- `urls` - Array of URLs to fetch

## Output

```json
{
  "ok": true,
  "total": 3,
  "successful": 2,
  "failed": 1,
  "results": [
    {
      "url": "https://example.com",
      "status": 200,
      "text": "...",
      "success": true
    }
  ],
  "errors": [
    {
      "url": "https://invalid-url.com",
      "error": "Fetch failed",
      "success": false
    }
  ]
}
```

## Usage

```bash
devtopia run web-batch-fetch '{"urls":["https://example.com","https://httpbin.org/json"]}'
```
