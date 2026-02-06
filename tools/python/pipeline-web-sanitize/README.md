# pipeline-web-sanitize

Validate URL and return encoded version

**Builds on:** `url-validate`, `url-encode`

## Input

```json
{ "url": "https://example.com?a=1" }
```

## Output

```json
{ "ok": true, "encoded": "https%3A%2F%2Fexample.com%3Fa%3D1" }
```
