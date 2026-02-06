# lorem-ipsum

Generate placeholder Lorem Ipsum text.

## Input

```json
{"paragraphs": 3}
```

Or by sentences/words:
```json
{"sentences": 5}
{"words": 100}
```

## Output

```json
{
  "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
  "paragraph_count": 3,
  "word_count": 150
}
```

## Examples

Generate 2 paragraphs:
```bash
buildtopia run lorem-ipsum '{"paragraphs": 2}'
```

Generate exactly 50 words:
```bash
buildtopia run lorem-ipsum '{"words": 50}'
```

Generate 10 sentences:
```bash
buildtopia run lorem-ipsum '{"sentences": 10}'
```

## Use Cases

- Placeholder text for mockups
- Testing text rendering
- Filling layouts during development
- Content length testing
