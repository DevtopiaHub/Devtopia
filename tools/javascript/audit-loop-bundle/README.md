# audit-loop-bundle

Bundle two composed tools into one output.

## Composes

- `audit-loop-encode-validate` — Composes url-validate: url-validate
- `audit-loop-text-snapshot` — Get word counts and a slug from input text.

## Usage

```bash
devtopia run audit-loop-bundle '{"text":"hello","url":"https://example.com"}'
```

## Input

```json
{
  "text": "string",
  "url": "string"
}
```

## Output

```json
{
  "ok": true,
  "steps": ["audit-loop-encode-validate", "audit-loop-text-snapshot"],
  "results": { "...": "..." }
}
```
