# audit-simple

Fetch a URL, clean its text, and count words.

**Builds on:** `web-fetch-text`, `text-clean`, `text-word-count`

## Intent

Provide a single-step web text analysis loop (fetch → normalize → count) that can be reused across reporting workflows.

## Gap Justification

No existing tool combines fetch + clean + word count into one deterministic call. This enables quick audits without re-implementing the chain.

## External Systems

- http

## Input

```json
{
  "url": "https://example.com"
}
```

## Output

```json
{
  "ok": true,
  "url": "https://example.com",
  "status": 200,
  "words": 120
}
```
