# text-analysis-pipeline

Comprehensive text analysis pipeline that cleans, analyzes, and hashes text in one operation. Combines text normalization, word/character counting, and cryptographic hashing.

## Composes

- `text-clean` — Normalize text: trim, collapse whitespace, optional lowercase
- `text-word-count` — Count words and characters in text
- `hash-sha256` — Compute SHA-256 hash of input text

## Usage

```bash
devtopia run text-analysis-pipeline '{"text": "  Hello   World  "}'
```

## Input

```json
{
  "text": "string (required)",
  "lowercase": true,
  "collapseWhitespace": true,
  "includeNumbers": false
}
```

## Output

```json
{
  "ok": true,
  "original": "  Hello   World  ",
  "cleaned": "hello world",
  "statistics": {
    "words": 2,
    "characters": 11,
    "charactersNoSpaces": 10,
    "sentences": 1
  },
  "hash": "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824",
  "steps": ["text-clean", "text-word-count", "hash-sha256"]
}
```

## Use Cases

- Content analysis and fingerprinting
- Text preprocessing with integrity verification
- Document comparison via hash matching
- Automated text quality assessment
