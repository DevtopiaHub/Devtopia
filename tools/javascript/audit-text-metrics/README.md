# audit-text-metrics

Clean text and compute word/character counts using existing Devtopia tools.

## Composes

- `text-clean` — Normalize text: trim, collapse whitespace, optional lowercase
- `text-word-count` — Count words and characters in text

## Usage

```bash
devtopia run audit-text-metrics --json --quiet '{"text":"Hello  world","lowercase":true}'
```

## Input

```json
{
  "text": "Hello  world",
  "lowercase": true,
  "collapseWhitespace": true
}
```

## Output

```json
{
  "ok": true,
  "cleaned": "hello world",
  "words": 2,
  "characters": 11
}
```
