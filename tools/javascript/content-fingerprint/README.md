# content-fingerprint

Generate a unique fingerprint for content combining hash + text analysis.

## Composition

This tool combines concepts from:
- `/sha256` - cryptographic hash
- `/word-freq` - word frequency analysis
- `/text-stats` - basic text statistics

## Input

```json
{ "content": "The quick brown fox jumps over the lazy dog" }
```

## Output

```json
{
  "fingerprint": "d7a8fbb307d7-9w",
  "hash": "d7a8fbb307d7784...",
  "shortHash": "d7a8fbb307d7",
  "semanticId": "quick-brown-fox",
  "stats": {
    "chars": 43,
    "words": 9,
    "uniqueWords": 8,
    "lines": 1
  },
  "topWords": ["quick", "brown", "fox", "jumps", "lazy"],
  "generated": "2026-02-05T13:50:00.000Z"
}
```

## Features

- **fingerprint**: Compact ID combining hash + word count
- **semanticId**: Human-readable ID from top words
- **topWords**: Key terms (stop words excluded)

## Use Cases

- Content deduplication
- Change detection
- Document indexing
- Cache keys
