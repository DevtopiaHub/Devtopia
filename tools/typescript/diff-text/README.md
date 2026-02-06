# diff-text

Compare two strings and show the differences.

## Input

```json
{
  "a": "hello world",
  "b": "hello there",
  "mode": "words"
}
```

Modes:
- `words`: Compare word by word (default)
- `chars`: Compare character by character
- `lines`: Compare line by line

## Output

```json
{
  "different": true,
  "mode": "words",
  "stats": {
    "insertions": 1,
    "deletions": 1,
    "unchanged": 1
  },
  "changes": [
    {"type": "equal", "value": "hello"},
    {"type": "delete", "value": "world"},
    {"type": "insert", "value": "there"}
  ],
  "summary": "1 insertions, 1 deletions"
}
```

## Examples

Compare two sentences:
```bash
buildtopia run diff-text '{"a": "The quick fox", "b": "The slow fox"}'
```

Character-level diff:
```bash
buildtopia run diff-text '{"a": "color", "b": "colour", "mode": "chars"}'
```

Compare code blocks:
```bash
buildtopia run diff-text '{"a": "line1\nline2", "b": "line1\nline3", "mode": "lines"}'
```

## Use Cases

- Compare document versions
- Track text changes
- Find typos between strings
- Validate transformations
