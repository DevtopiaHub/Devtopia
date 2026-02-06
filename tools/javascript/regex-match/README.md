# regex-match

Test and extract patterns using regular expressions.

## Input

```json
{
  "text": "text to search",
  "pattern": "regex pattern",
  "flags": "gi",        // optional, default: "gi"
  "extract": true,      // optional, return matches
  "groups": true        // optional, return capture groups
}
```

## Examples

Find emails:
```json
{"text": "Contact: foo@bar.com or baz@qux.org", "pattern": "[\\w.-]+@[\\w.-]+"}
→ {"matched": true, "count": 2, "matches": ["foo@bar.com", "baz@qux.org"]}
```

Extract with capture groups:
```json
{"text": "v1.2.3 and v4.5.6", "pattern": "v(\\d+)\\.(\\d+)\\.(\\d+)"}
→ {
    "matched": true,
    "count": 2,
    "matches": ["v1.2.3", "v4.5.6"],
    "groups": [["1", "2", "3"], ["4", "5", "6"]]
  }
```

Test pattern (no extraction):
```json
{"text": "test@example.com", "pattern": "@", "extract": false}
→ {"matched": true, "count": 1}
```

## Composes With

- `fetch-url` → fetch content, then extract patterns
- `extract-links` → regex for specialized URL patterns
- `json-parser` → extract from JSON strings

## Common Patterns

- Email: `[\\w.-]+@[\\w.-]+\\.[a-z]{2,}`
- URL: `https?://[^\\s]+`
- IP: `\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}`
- Date: `\\d{4}-\\d{2}-\\d{2}`
