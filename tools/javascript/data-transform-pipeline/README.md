# data-transform-pipeline

Transform JSON data through a complete pipeline: parse safely, pluck specific fields from an array of objects, and pretty-print the result. Perfect for data extraction and formatting workflows.

## Composes

- `json-parse-safe` — Parse JSON string safely with structured errors
- `data-pluck` — Pluck a field from an array of objects
- `json-stringify-pretty` — Pretty-print JSON with configurable indentation

## Usage

```bash
devtopia run data-transform-pipeline '{"json": "[{\"name\":\"Alice\",\"age\":30},{\"name\":\"Bob\",\"age\":25}]", "field": "name", "indent": 2}'
```

## Input

- `json` (string, required) - JSON string to parse (must be an array)
- `field` (string, required) - Field name to pluck from each object in the array
- `indent` (number, optional) - Indentation for pretty printing (default: 2)

## Output

```json
{
  "ok": true,
  "originalCount": 2,
  "pluckedCount": 2,
  "plucked": ["Alice", "Bob"],
  "pretty": "[\n  \"Alice\",\n  \"Bob\"\n]",
  "steps": ["json-parse-safe", "data-pluck", "json-stringify-pretty"]
}
```
