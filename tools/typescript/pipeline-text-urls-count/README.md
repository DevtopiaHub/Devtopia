# pipeline-text-urls-count

Extract URLs and count characters

**Builds on:** `text-extract-urls`, `text-count-chars`

## Intent

Provide a single-call pipeline that composes text-extract-urls, text-count-chars.

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
