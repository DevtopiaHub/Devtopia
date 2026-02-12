# text-clean-report

Normalize text and return line/word counts.

**Builds on:** `text-clean`, `text-lines`, `text-word-count`

## Intent

Provide a deterministic text summary pipeline for downstream tools.

## Gap Justification

No existing core tool combines normalization + line/word counts in one call.

## Input

```json
{
  "text": "Hello\nWorld",
  "lowercase": true
}
```

## Output

```json
{
  "ok": true,
  "cleaned": "hello world",
  "line_count": 2,
  "word_count": 2
}
```
