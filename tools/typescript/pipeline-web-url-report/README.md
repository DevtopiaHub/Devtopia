# pipeline-web-url-report

Summarize URL with origin/domain/cleaned

**Builds on:** `web-origin`, `web-domain`, `web-strip-tracking`, `web-ensure-trailing-slash`

## Intent

Provide a single-call pipeline that composes web-origin, web-domain, web-strip-tracking, web-ensure-trailing-slash.

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
