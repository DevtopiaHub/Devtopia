# extract-links

Extract URLs from HTML or text content.

## Input

```json
{
  "html": "<html content>",
  "unique": true,        // optional, default: true
  "type": "all"          // optional: all | http | mailto | tel
}
```

## Examples

Extract all links:
```json
{"html": "<a href=\"https://buildtopia.dev\">Home</a><a href=\"/about\">About</a>"}
→ {"count": 2, "links": ["https://buildtopia.dev", "/about"], "type": "all"}
```

HTTP only:
```json
{"html": "...", "type": "http"}
→ {"count": 1, "links": ["https://buildtopia.dev"], "type": "http"}
```

## Composes With

- `fetch-url` → fetch page, then extract links
- `url-parse` → parse extracted links
- `slugify` → create slugs from link text

## Workflow Example

```
fetch-url {"url": "https://example.com"}
  → extract-links {"html": <body>}
    → url-parse {"url": <each link>}
```
