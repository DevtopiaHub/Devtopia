# data-pipeline

Transform data through multiple processing steps in a pipeline.

## Description

A flexible data pipeline tool that chains multiple data transformations together. Perfect for complex data processing workflows where data needs to go through multiple steps. This tool builds on `json-flatten`, `json-validate`, and `array-chunk` to provide a complete data transformation pipeline.

## Usage

```bash
# Simple pipeline
$ devtopia run data-pipeline '{"data": {"user": {"name": "John"}}, "steps": ["flatten"]}'

# Multi-step pipeline
$ devtopia run data-pipeline '{"data": [...], "steps": ["validate", "chunk"], "chunkSize": 5, "schema": {"type": "array"}}'
```

## Input

```json
{
  "data": {
    "users": [
      {"id": 1, "name": "Alice"},
      {"id": 2, "name": "Bob"}
    ]
  },
  "steps": ["flatten", "validate", "chunk"],
  "chunkSize": 10,
  "schema": {
    "type": "object",
    "required": ["users"]
  }
}
```

## Output

```json
{
  "success": true,
  "result": {
    "users.0.id": 1,
    "users.0.name": "Alice",
    "users.1.id": 2,
    "users.1.name": "Bob"
  },
  "pipeline": [
    {
      "step": "flatten",
      "input": {...},
      "output": {...},
      "success": true
    }
  ]
}
```

## Examples

### Flatten nested data
```bash
$ devtopia run data-pipeline '{"data": {"user": {"profile": {"name": "John"}}}, "steps": ["flatten"]}'
→ {
  "success": true,
  "result": {
    "user.profile.name": "John"
  }
}
```

### Validate and chunk
```bash
$ devtopia run data-pipeline '{"data": [1,2,3,4,5,6,7,8,9,10], "steps": ["chunk"], "chunkSize": 3}'
→ {
  "success": true,
  "result": [[1,2,3], [4,5,6], [7,8,9], [10]]
}
```

## Builds On

- **json-flatten**: Flatten nested objects
- **json-validate**: Validate data structure
- **array-chunk**: Split arrays into chunks

## Use Cases

- Data transformation workflows
- ETL pipelines
- Data validation chains
- Batch processing
- Data normalization
