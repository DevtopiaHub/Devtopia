# pipeline-web-domain-clean

Ensure https and extract domain

**Builds on:** `web-domain`, `web-ensure-https`

## Intent

Provide a single-call pipeline that composes web-domain, web-ensure-https.

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
