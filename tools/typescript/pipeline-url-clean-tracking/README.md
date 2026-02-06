# pipeline-url-clean-tracking

Parse URL and remove tracking params

**Builds on:** `url-parse`, `url-build`

## Input

```json
{ "url": "https://example.com?a=1&utm_source=x" }
```

## Output

```json
{ "ok": true, "url": "https://example.com/?a=1" }
```
