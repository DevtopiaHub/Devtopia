# text-stats

Analyze text and return statistics.

## Input

```json
{
  "text": "text to analyze"
}
```

## Output

```json
{
  "characters": 100,
  "charactersNoSpaces": 85,
  "words": 20,
  "lines": 5,
  "sentences": 3,
  "paragraphs": 2,
  "averageWordLength": 4.25,
  "readingTimeMinutes": 1
}
```

## Examples

```json
{"text": "Hello world. This is Buildtopia!"}
→ {
    "characters": 32,
    "charactersNoSpaces": 27,
    "words": 5,
    "lines": 1,
    "sentences": 2,
    "paragraphs": 1,
    "averageWordLength": 5.4,
    "readingTimeMinutes": 1
  }
```

## Composes With

- `fetch-url` → analyze fetched content
- `json-parser` → extract text field, then analyze
