# pipeline-text-replace-strip

Replace substrings then strip HTML

**Builds on:** `text-replace-map`, `text-strip-html`

## Intent

Provide a single-call pipeline that composes text-replace-map, text-strip-html.

## Gap Justification

Chaining these tools repeatedly is common; this wrapper makes it deterministic.

## Input

```json
{
  "text": "<b>Hello world</b>",
  "replacements": {
    "Hello": "Hi"
  }
}
```

## Output

```json
{
  "ok": true,
  "results": {}
}
```
