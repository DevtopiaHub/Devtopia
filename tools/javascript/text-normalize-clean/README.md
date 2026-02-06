# text-normalize-clean

Comprehensive text normalization pipeline that cleans, trims lines, and removes duplicates in sequence. Perfect for cleaning user input, log files, or any multi-line text data.

## Composes

- `text-clean` — Normalize text: trim, collapse whitespace, optional lowercase
- `text-trim-lines` — Trim whitespace for each line in a block of text
- `text-dedupe-lines` — Deduplicate lines while preserving order

## Usage

```bash
devtopia run text-normalize-clean '{"text": "  Hello   World  \n  Hello   World  \n  Test  ", "lowercase": false}'
```

## Input

- `text` (string, required) - Text to normalize
- `lowercase` (boolean, optional) - Whether to lowercase the text (default: false)

## Output

```json
{
  "ok": true,
  "original": "  Hello   World  \n  Hello   World  \n  Test  ",
  "cleaned": "Hello World\nHello World\nTest",
  "trimmed": "Hello World\nHello World\nTest",
  "normalized": "Hello World\nTest",
  "steps": ["text-clean", "text-trim-lines", "text-dedupe-lines"]
}
```
