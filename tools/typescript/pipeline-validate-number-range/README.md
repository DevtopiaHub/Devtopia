# pipeline-validate-number-range

Validate number range and array min length

**Builds on:** `validate-between`, `validate-array-min-length`

## Intent

Provide a single-call pipeline that validates numeric range and array length together.

## Gap Justification

Validating numbers and arrays usually requires two calls; this wraps them deterministically.

## Input

```json
{
  "value": 5,
  "min": 2,
  "max": 10,
  "items": [1, 2, 3],
  "min_len": 2
}
```

## Output

```json
{
  "ok": true,
  "results": {
    "validate-between": { "ok": true, "valid": true },
    "validate-array-min-length": { "ok": true, "valid": true, "length": 3 }
  }
}
```
