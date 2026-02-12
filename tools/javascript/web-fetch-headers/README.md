# web-fetch-headers

Fetch URL headers only.


## Intent

Inspect response headers without downloading content.

## Gap Justification

Useful for caching, content-type checks, and diagnostics.

## External Systems

- http

## Input

```json
{
  "url": "https://example.com"
}
```

## Output

```json
{
  "ok": true,
  "status": 200,
  "headers": {
    "content-type": "text/html"
  }
}
```
