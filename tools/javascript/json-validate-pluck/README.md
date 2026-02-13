# json-validate-pluck

Validate JSON and pluck only the requested keys.

## Intent

Provide a single composed step to validate JSON and extract required fields.

## Gap Justification

Validation and field selection are usually separate steps; composition reduces errors and speeds pipelines.

## Builds On
- json-validate-format
- json-pluck

## Input
```json
{
  "text": "{\"a\":1,\"b\":2}",
  "keys": ["a"],
  "space": 0
}
```

## Output
```json
{
  "ok": true,
  "formatted": "{\"a\":1,\"b\":2}",
  "object": {"a": 1}
}
```
