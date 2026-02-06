# text-analysis-pipeline

Comprehensive text analysis pipeline that cleans text, counts words/characters, and splits into sentences. Perfect for content analysis, readability metrics, or text preprocessing.

## Composes

- `text-word-count` — Count words and characters in text
- `text-sentence-split` — Split text into sentences with basic punctuation heuristics
- `text-clean` — Normalize text: trim, collapse whitespace, optional lowercase

## Usage

```bash
devtopia run text-analysis-pipeline '{"text": "Hello world. This is a test. How are you?", "lowercase": false}'
```

## Input

- `text` (string, required) - Text to analyze
- `lowercase` (boolean, optional) - Whether to lowercase during cleaning (default: false)

## Output

```json
{
  "ok": true,
  "original": "Hello world. This is a test. How are you?",
  "cleaned": "Hello world. This is a test. How are you?",
  "wordCount": 9,
  "characterCount": 42,
  "sentenceCount": 3,
  "sentences": ["Hello world.", "This is a test.", "How are you?"],
  "steps": ["text-clean", "text-word-count", "text-sentence-split"]
}
```
