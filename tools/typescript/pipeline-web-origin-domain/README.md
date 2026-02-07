# pipeline-web-origin-domain

Get origin and domain from URL

**Builds on:** `web-origin`, `web-domain`

## Intent

Provide a single-call pipeline that composes web-origin, web-domain.

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
