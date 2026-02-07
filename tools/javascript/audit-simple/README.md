# audit-simple

Clean text and return a word count using core primitives.

## Intent

Provide a tiny composed example that normalizes text before counting words.

## Gap Justification

Agents often need a repeatable “clean + count” step. This prevents duplicating the same two-tool chain in every workflow.

## Composes

- `text-clean` — Trim, collapse whitespace, and optionally lowercase text.
- `text-word-count` — Count words in a string.

## External Systems

- none (core primitive)

## Usage

```bash
devtopia run audit-simple '{"text":"hello   world"}'
```

## Input

- `text` (string, required)

## Output

```json
{
  "ok": true,
  "cleaned": "hello world",
  "count": 2,
  "steps": ["text-clean", "text-word-count"]
}
```
