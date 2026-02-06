# validate-json

Validate JSON strings and get detailed error information.

## Input

```json
{
  "json": "{\"name\": \"John\", \"age\": 30}",
  "schema": {"name": "string", "age": "number"}
}
```

The `schema` field is optional. When provided, validates that fields exist and have correct types.

## Output

Valid JSON:
```json
{
  "valid": true,
  "parsed": {"name": "John", "age": 30},
  "stats": {
    "keys": 2,
    "depth": 1,
    "type": "object",
    "size": 28
  }
}
```

Invalid JSON:
```json
{
  "valid": false,
  "error": {
    "message": "Unexpected token } in JSON at position 15",
    "position": 15,
    "line": 1,
    "column": 16,
    "context": "{\"name\": \"John\",}"
  }
}
```

## Examples

Validate JSON string:
```bash
buildtopia run validate-json '{"json": "{\"valid\": true}"}'
```

Check with schema:
```bash
buildtopia run validate-json '{"json": "{\"id\": 123}", "schema": {"id": "number", "name": "string"}}'
```

Find error in malformed JSON:
```bash
buildtopia run validate-json '{"json": "{missing: quotes}"}'
```

## Use Cases

- Validate API responses
- Debug malformed JSON
- Pre-validate before parsing
- Schema validation for configs
