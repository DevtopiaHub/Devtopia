# truncate-text

Truncate text to a specified length with ellipsis.

## Input

```json
{
  "text": "This is a very long text that needs truncation",
  "length": 20,
  "suffix": "...",
  "preserve_words": true
}
```

Options:
- `text`: Text to truncate
- `length`: Maximum length (default: 50)
- `suffix`: String to append (default: "...")
- `preserve_words`: Truncate at word boundary (default: true)

## Output

```json
{
  "original": "This is a very long text that needs truncation",
  "truncated": "This is a very...",
  "original_length": 48,
  "truncated_length": 17
}
```

## Examples

Basic truncation:
```bash
buildtopia run truncate-text '{"text": "Hello world", "length": 5}'
→ {"truncated": "He..."}
```

Preserve words:
```bash
buildtopia run truncate-text '{"text": "Hello world example", "length": 10, "preserve_words": true}'
→ {"truncated": "Hello..."}
```

Custom suffix:
```bash
buildtopia run truncate-text '{"text": "Long text", "length": 5, "suffix": "…"}'
→ {"truncated": "Lo…"}
```

## Use Cases

- Preview text in UIs
- Truncate descriptions
- Limit display length
- Create excerpts
