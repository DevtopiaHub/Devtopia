# pipeline-text-urls-dedupe

Extract URLs and dedupe lines

**Builds on:** `text-extract-urls`, `text-dedupe-lines`

## Intent

Provide a single-call pipeline that composes text-extract-urls, text-dedupe-lines.

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
