# data-json-parse-validate

Parse a JSON string safely and validate that it contains all required keys. Returns parsed data only if both parsing and validation succeed.

## Composes

- `json-parse-safe` — Parse JSON string safely with structured errors
- `validate-json-keys` — Ensure an object includes required keys

## Usage

```bash
devtopia run data-json-parse-validate '{"json": "{\"name\":\"test\",\"age\":30}", "requiredKeys": ["name", "age"]}'
```

## Input

- `json` (string, required) - JSON string to parse
- `requiredKeys` (array, required) - Array of key names that must be present in the parsed object

## Output

```json
{
  "ok": true,
  "data": {
    "name": "test",
    "age": 30
  },
  "validated": true,
  "requiredKeys": ["name", "age"]
}
```

If validation fails:
```json
{
  "ok": false,
  "error": "Validation failed",
  "parsed": {...},
  "validationError": "...",
  "missingKeys": ["age"]
}
```
