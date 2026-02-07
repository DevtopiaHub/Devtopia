# pipeline-validate-text-basic

Check non-empty and string length

**Builds on:** `validate-non-empty-string`, `validate-string-length`

## Intent

Provide a single-call pipeline that composes validate-non-empty-string, validate-string-length.

## Gap Justification

Chaining these tools repeatedly is common; this wrapper makes it deterministic.

## Input

```json
{
  "value": "hello",
  "min": 2,
  "max": 10,
  "email": "hello@example.com",
  "items": [
    1,
    2,
    3
  ]
}
```

## Output

```json
{
  "ok": true,
  "results": {}
}
```
