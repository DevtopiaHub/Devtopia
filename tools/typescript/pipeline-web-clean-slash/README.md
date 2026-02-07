# pipeline-web-clean-slash

Clean URL and ensure trailing slash

**Builds on:** `pipeline-web-clean-url`, `web-ensure-trailing-slash`

## Intent

Provide a single-call pipeline that composes pipeline-web-clean-url, web-ensure-trailing-slash.

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
