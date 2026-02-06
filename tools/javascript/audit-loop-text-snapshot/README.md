# audit-loop-text-snapshot

Get word counts and a slug from input text.

## Composes

- `text-word-count` — Count words in a text string
- `slugify` — Convert text to URL-safe slugs

## Usage

```bash
devtopia run audit-loop-text-snapshot '{"text":"Hello world"}'
```

## Input

```json
{
  "text": "string"
}
```

## Output

```json
{
  "ok": true,
  "steps": ["text-word-count", "slugify"],
  "counts": { "words": 2 },
  "slug": "hello-world"
}
```
