# web-page-word-report

Fetch a URL, clean its text, and return a word count.

**Builds on:** `web-fetch-text`, `text-clean`, `text-word-count`

## Intent

Provide a one-shot web text audit for quick reporting.

## Gap Justification

No existing tool combines fetch + clean + word count into one deterministic call.

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
