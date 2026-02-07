# pipeline-text-title-strip

Strip HTML and title-case

**Builds on:** `text-title-case`, `text-strip-html`

## Intent

Provide a single-call pipeline that composes text-title-case, text-strip-html.

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
