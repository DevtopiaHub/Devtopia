# pipeline-validate-email-basic

Validate email and non-empty string

**Builds on:** `validate-email-basic`, `validate-non-empty-string`

## Intent

Provide a single-call pipeline that composes validate-email-basic, validate-non-empty-string.

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
