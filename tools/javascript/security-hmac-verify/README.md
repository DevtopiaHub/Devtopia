# security-hmac-verify

Verify an HMAC signature.


## Intent

Provide a standard HMAC verification primitive.

## Gap Justification

Auth workflows require validation steps that are consistent.

## External Systems

- auth

## Input

```json
{
  "text": "payload",
  "secret": "secret",
  "signature": "..."
}
```

## Output

```json
{
  "ok": true,
  "valid": true
}
```
