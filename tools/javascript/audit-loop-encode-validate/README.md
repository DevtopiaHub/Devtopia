# audit-loop-encode-validate

Encode text to base64 and validate a URL in one call.

## Composes

- `base64` — Encode or decode base64 strings
- `url-validate` — url-validate

## Usage

```bash
devtopia run audit-loop-encode-validate '{"text":"hello","url":"https://example.com"}'
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
  "steps": ["base64", "url-validate"],
  "encoded": "aGVsbG8=",
  "url": { "isValid": true }
}
```
