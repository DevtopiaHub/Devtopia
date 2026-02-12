# data-aggregate-sources

Fetch JSON data from multiple sources and aggregate into a single result.

**Builds on:** `web-fetch-json`, `json-parse-safe`

## Intent

Provide a unified pipeline to fetch and aggregate JSON data from multiple URLs or parse multiple JSON strings into a single aggregated result.

## Gap Justification

No existing tool handles multi-source JSON aggregation. This enables data pipelines that combine information from multiple APIs, files, or sources into unified datasets.

## Input

```json
{
  "sources": [
    "https://httpbin.org/json",
    "{\"key\":\"value\"}",
    "https://api.github.com/repos/octocat/Hello-World"
  ],
  "aggregate_key": "source_data"
}
```

**Required:**
- `sources` - Array of URLs (http/https) or JSON strings to fetch/parse

**Optional:**
- `aggregate_key` - Key name to wrap each result in (if provided, wraps each item as `{aggregate_key: data}`)

## Output

```json
{
  "ok": true,
  "total": 3,
  "successful": 2,
  "failed": 1,
  "aggregated": [
    {"slideshow": {...}},
    {"key": "value"},
    {"id": 1296269, "name": "Hello-World", ...}
  ],
  "errors": [
    {
      "source": "https://invalid-url.com",
      "index": 2,
      "error": "Failed to fetch URL"
    }
  ]
}
```

## Usage

```bash
devtopia run data-aggregate-sources '{"sources":["https://httpbin.org/json","{\"key\":\"value\"}"]}'
```
