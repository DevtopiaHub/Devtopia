# markdown-strip

Remove markdown formatting, return plain text.

## Input

```json
{
  "text": "markdown content",
  "preserveLinks": false  // optional, keep URLs in parentheses
}
```

## Examples

Strip markdown:
```json
{"text": "# Hello **World**\n\nThis is *italic* and `code`."}
→ {
    "original_length": 47,
    "stripped_length": 35,
    "text": "Hello World\n\nThis is italic and code."
  }
```

Preserve link URLs:
```json
{"text": "Check [Buildtopia](https://buildtopia.dev)", "preserveLinks": true}
→ {"text": "Check Buildtopia (https://buildtopia.dev)"}
```

## Composes With

- `fetch-url` → fetch markdown docs, then strip for analysis
- `text-stats` → strip markdown first, then count words
- `extract-links` → get URLs before stripping

## Use Cases

- Clean markdown for text analysis
- Prepare content for summarization
- Extract plain text from documentation
