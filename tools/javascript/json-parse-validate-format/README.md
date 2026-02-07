# json-parse-validate-format

Complete JSON processing pipeline: parse safely, validate required keys, and pretty-print the result. Perfect for processing and validating JSON data in one step.

## Composes

- `json-parse-safe` — Parse JSON string safely with structured errors
- `validate-json-keys` — Ensure an object includes required keys
- `json-stringify-pretty` — Pretty-print JSON with configurable indentation

## Usage

```bash
devtopia run json-parse-validate-format '{"json": "{\"name\":\"Alice\",\"age\":30}", "requiredKeys": ["name", "age"], "indent": 2}'
```

## Input

- `json` (string, required) - JSON string to parse
- `requiredKeys` (array, required) - Array of key names that must be present
- `indent` (number, optional) - Indentation for formatting (default: 2)

## Output

```json
{
  "ok": true,
  "parsed": {
    "name": "Alice",
    "age": 30
  },
  "validated": true,
  "formatted": "{\n  \"name\": \"Alice\",\n  \"age\": 30\n}",
  "requiredKeys": ["name", "age"],
  "steps": ["json-parse-safe", "validate-json-keys", "json-stringify-pretty"]
}
```

If validation fails, returns error with missing keys.
