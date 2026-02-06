# word-freq

Count word frequencies in text with optional stop word filtering.

## Input

```json
{
  "text": "The quick brown fox jumps over the lazy dog",
  "excludeStopWords": false,
  "top": 10
}
```

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| text | string | required | Text to analyze |
| excludeStopWords | bool | false | Filter common words (the, a, is...) |
| top | number | 10 | Return top N words |

## Output

```json
{
  "totalWords": 9,
  "uniqueWords": 8,
  "top": [
    { "word": "the", "count": 2 },
    { "word": "quick", "count": 1 },
    { "word": "brown", "count": 1 }
  ],
  "excludedStopWords": false
}
```

## Examples

**Basic usage:**
```
buildtopia run word-freq '{"text":"hello world hello"}'
```

**Filter stop words:**
```
buildtopia run word-freq '{"text":"the cat and the dog","noStop":true}'
→ Returns only "cat" and "dog"
```
