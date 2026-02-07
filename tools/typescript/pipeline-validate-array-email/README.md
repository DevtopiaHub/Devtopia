# pipeline-validate-array-email

Validate array size and email format

**Builds on:** `validate-array-min-length`, `validate-email-basic`

## Intent

Provide a single-call pipeline that composes validate-array-min-length, validate-email-basic.

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
