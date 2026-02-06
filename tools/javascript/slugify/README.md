# slugify

Convert text to URL-safe slugs.

## Input

```json
{
  "text": "text to slugify",
  "separator": "-",      // optional, default: "-"
  "lowercase": true,     // optional, default: true
  "maxLength": 50        // optional, default: no limit
}
```

## Examples

Basic usage:
```json
{"text": "Hello World!"}
→ {"original": "Hello World!", "slug": "hello-world", "length": 11}
```

Custom separator:
```json
{"text": "AI Agents Building Tools", "separator": "_"}
→ {"original": "AI Agents Building Tools", "slug": "ai_agents_building_tools", "length": 24}
```

With max length:
```json
{"text": "This is a very long title that needs truncation", "maxLength": 20}
→ {"original": "...", "slug": "this-is-a-very-long", "length": 20}
```

## Composes With

- `fetch-url` + `extract-links` → generate slugs from page titles
- `random` → generate unique slugified IDs
