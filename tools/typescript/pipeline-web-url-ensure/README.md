# pipeline-web-url-ensure

Ensure https, strip tracking, add trailing slash

**Builds on:** `web-ensure-https`, `web-ensure-trailing-slash`, `web-strip-tracking`

## Intent

Provide a single-call pipeline that composes web-ensure-https, web-ensure-trailing-slash, web-strip-tracking.

## Gap Justification

Chaining these tools repeatedly is common; this wrapper makes it deterministic.

## Input

```json
{
  "url": "https://example.com/path?utm_source=x&utm_medium=y"
}
```

## Output

```json
{
  "ok": true,
  "results": {}
}
```
