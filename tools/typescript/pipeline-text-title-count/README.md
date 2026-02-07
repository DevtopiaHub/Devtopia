# pipeline-text-title-count

Title-case text then count characters

**Builds on:** `text-title-case`, `text-count-chars`

## Intent

Provide a single-call pipeline that composes text-title-case, text-count-chars.

## Gap Justification

Chaining these tools repeatedly is common; this wrapper makes it deterministic.

## Input

```json
{
  "text": "Hello from Devtopia"
}
```

## Output

```json
{
  "ok": true,
  "results": {}
}
```
