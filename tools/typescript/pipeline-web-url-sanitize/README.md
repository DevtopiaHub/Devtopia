# pipeline-web-url-sanitize

Use URL cleanup pipeline and enforce trailing slash

**Builds on:** `pipeline-url-clean-tracking`, `web-ensure-trailing-slash`

## Intent

Provide a single-call pipeline that composes pipeline-url-clean-tracking, web-ensure-trailing-slash.

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
