# levenshtein

Calculate the edit distance (Levenshtein distance) between two strings.

## Input

```json
{
  "a": "kitten",
  "b": "sitting",
  "ignoreCase": false
}
```

## Output

```json
{
  "a": "kitten",
  "b": "sitting",
  "distance": 3,
  "similarity": 0.571,
  "similarityPct": "57%",
  "ignoreCase": false
}
```

## Examples

**Compare strings:**
```
buildtopia run levenshtein '{"a":"hello","b":"hallo"}'
→ distance: 1, similarity: 80%
```

**Case insensitive:**
```
buildtopia run levenshtein '{"a":"Hello","b":"hello","ignoreCase":true}'
→ distance: 0, similarity: 100%
```

## Use Cases

- Fuzzy string matching
- Spell check suggestions
- Typo detection
- DNA sequence comparison
