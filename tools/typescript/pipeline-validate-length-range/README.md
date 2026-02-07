# pipeline-validate-length-range

Validate string length and numeric range

**Builds on:** `validate-string-length`, `validate-between`

## Intent

Provide a single-call pipeline that composes validate-string-length, validate-between.

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
