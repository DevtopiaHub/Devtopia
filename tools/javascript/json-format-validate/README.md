# json-format-validate

Format JSON and optionally validate its structure against a schema.

**Builds on:** `json-pretty`, `json-validate`

## Input

```json
{
  "data": {"a": 1, "b": 2},
  "schema": {"type": "object"}
}
```

## Output

```json
{
  "formatted": "{\n  \"a\": 1,\n  \"b\": 2\n}",
  "isValid": true,
  "validation": {
    "isValid": true
  }
}
```

## Usage

```bash
npx devtopia run json-format-validate '{"data": {"a": 1}}'
```
