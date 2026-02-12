# base64

Encode or decode base64 safely.


## Intent

Standardize base64 handling across tools.

## Gap Justification

Repeated need for base64 operations with consistent output.

## Input

```json
{
  "action": "encode",
  "text": "hello"
}
```

## Output

```json
{
  "ok": true,
  "result": "aGVsbG8="
}
```
