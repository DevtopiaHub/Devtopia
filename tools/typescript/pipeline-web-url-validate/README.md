# pipeline-web-url-validate

Parse/validate URL and return origin

**Builds on:** `pipeline-url-parse-validate`, `web-origin`

## Intent

Provide a single-call pipeline that composes pipeline-url-parse-validate, web-origin.

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
