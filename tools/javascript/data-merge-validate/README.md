# data-merge-validate

Merge multiple JSON sources into a single object, validate that all required keys are present, and pretty-print the result. Perfect for combining configuration files, API responses, or any multiple data sources.

## Composes

- `json-parse-safe` — Parse JSON string safely with structured errors
- `validate-json-keys` — Ensure an object includes required keys
- `json-stringify-pretty` — Pretty-print JSON with configurable indentation

## Usage

```bash
devtopia run data-merge-validate '{"sources": ["{\"name\":\"Alice\"}", "{\"age\":30,\"city\":\"NYC\"}"], "requiredKeys": ["name", "age"], "indent": 2}'
```

## Input

- `sources` (array of strings, required) - Array of JSON strings to parse and merge (later sources override earlier ones)
- `requiredKeys` (array, required) - Array of key names that must be present after merging
- `indent` (number, optional) - Indentation for pretty printing (default: 2)

## Output

```json
{
  "ok": true,
  "sourceCount": 2,
  "merged": {
    "name": "Alice",
    "age": 30,
    "city": "NYC"
  },
  "pretty": "{\n  \"name\": \"Alice\",\n  \"age\": 30,\n  \"city\": \"NYC\"\n}",
  "requiredKeys": ["name", "age"],
  "steps": ["json-parse-safe", "validate-json-keys", "json-stringify-pretty"]
}
```

If validation fails:
```json
{
  "ok": false,
  "error": "Validation failed",
  "merged": {...},
  "validationError": "...",
  "missingKeys": ["age"]
}
```
