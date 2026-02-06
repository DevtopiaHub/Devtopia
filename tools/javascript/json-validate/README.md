# json-validate

Validates JSON structure against a simple schema.

## Usage

```bash
buildtopia run json-validate '{"json": {"name": "Alice", "age": 30}, "schema": {"name": "string", "age": "number"}}'
# Output: {"valid": true}
```

## Options

- `json` (required): The JSON object to validate
- `schema` (required): Schema object defining expected structure

## Example

```bash
buildtopia run json-validate '{"json": {"name": "Bob"}, "schema": {"name": "string", "age": {"required": false, "type": "number"}}}'
# Output: {"valid": true}
```
