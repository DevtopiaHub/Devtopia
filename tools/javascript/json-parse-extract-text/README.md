# json-parse-extract-text

Parse JSON string and extract multiple text fields using dot paths.

## Composes
- json-parse-safe, json-path-get

## Usage
devtopia run json-parse-extract-text '{"json": "{\"user\":{\"name\":\"Alice\",\"email\":\"alice@example.com\"}}", "paths": ["user.name", "user.email"]}'

## Input
- json (string, required) - JSON string to parse
- paths (array, required) - Array of dot paths to extract

## Output
```json
{
  "ok": true,
  "parsed": {...},
  "extracted": {
    "user.name": "Alice",
    "user.email": "alice@example.com"
  },
  "paths": ["user.name", "user.email"]
}
```
