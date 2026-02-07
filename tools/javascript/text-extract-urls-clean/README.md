# text-extract-urls-clean

[TODO: describe what this pipeline does]

## Composes

- `text-extract-urls` — Extract URLs from text
- `text-clean` — Normalize text: trim, collapse whitespace, optional lowercase

## Usage

```bash
devtopia run text-extract-urls-clean '{"TODO": "add input"}'
```

## Input

[TODO: document input fields]

## Output

```json
{
  "success": true,
  "steps": ["text-extract-urls","text-clean"]
}
```
