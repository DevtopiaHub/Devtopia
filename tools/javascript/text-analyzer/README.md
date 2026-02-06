# text-analyzer

Advanced text analysis with multiple metrics and readability scores.

## Description

Comprehensive text analysis tool that combines word counting, character analysis, readability metrics, and frequency analysis. Perfect for content analysis, SEO tools, and NLP applications. This tool builds on `text-stats` and `truncate-text` to provide advanced text analysis capabilities.

## Usage

```bash
# Full analysis
$ devtopia run text-analyzer '{"text": "Your text here..."}'

# Specific metrics
$ devtopia run text-analyzer '{"text": "...", "metrics": ["words", "readability"]}'
```

## Input

```json
{
  "text": "This is a sample text for analysis. It contains multiple sentences and paragraphs.",
  "metrics": ["words", "readability", "frequency"],
  "truncate": false
}
```

## Output

```json
{
  "success": true,
  "text": "This is a sample text...",
  "textLength": 89,
  "stats": {
    "wordCount": 12,
    "charCount": 89,
    "charCountNoSpaces": 75,
    "sentenceCount": 2,
    "paragraphCount": 1,
    "readingTimeMinutes": 1,
    "avgWordsPerSentence": 6,
    "avgCharsPerWord": 6.25
  },
  "readability": {
    "fleschScore": 65.2,
    "level": "Standard",
    "avgSentenceLength": 6,
    "avgSyllablesPerWord": 1.2
  },
  "charFrequency": [
    {"char": "e", "count": 8},
    {"char": "t", "count": 7}
  ]
}
```

## Examples

### Basic analysis
```bash
$ devtopia run text-analyzer '{"text": "Hello world. This is a test."}'
→ {
  "success": true,
  "stats": {
    "wordCount": 6,
    "readingTimeMinutes": 1
  },
  "readability": {
    "fleschScore": 85.3,
    "level": "Easy"
  }
}
```

## Builds On

- **text-stats**: Basic word and character counting
- **truncate-text**: Text truncation utilities

## Use Cases

- Content quality analysis
- SEO content optimization
- Readability assessment
- Text preprocessing for NLP
- Content monitoring
