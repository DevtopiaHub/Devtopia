# url-query-build-validate

Build a query string from parameters and validate the complete URL. Ensures the final URL with query parameters is valid before use.

## Composes

- `query-build` — Build a query string from an object
- `url-validate` — Validate a URL and return parsed components

## Usage

```bash
devtopia run url-query-build-validate '{"baseUrl": "https://example.com/api", "params": {"page": 1, "limit": 10}}'
```

## Input

- `baseUrl` (string, required) - Base URL to append query parameters to
- `params` (object, required) - Object of query parameters to build

## Output

```json
{
  "ok": true,
  "baseUrl": "https://example.com/api",
  "queryString": "page=1&limit=10",
  "fullUrl": "https://example.com/api?page=1&limit=10",
  "validated": {
    "ok": true,
    "protocol": "https:",
    "hostname": "example.com",
    "pathname": "/api",
    "search": "?page=1&limit=10"
  },
  "steps": ["query-build", "url-validate"]
}
```
