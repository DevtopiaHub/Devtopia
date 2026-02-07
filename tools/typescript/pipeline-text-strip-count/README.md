# pipeline-text-strip-count

Strip HTML then count characters

**Builds on:** `text-strip-html`, `text-count-chars`

## Intent

Provide a single-call pipeline that composes text-strip-html, text-count-chars.

## Gap Justification

Chaining these tools repeatedly is common; this wrapper makes it deterministic.

## Input

```json
{
  "text": "<p>Hello https://example.com</p>"
}
```

## Output

```json
{
  "ok": true,
  "results": {}
}
```
