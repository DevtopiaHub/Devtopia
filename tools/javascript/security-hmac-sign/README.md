# security-hmac-sign

Create an HMAC signature for text.


## Intent

Provide a standard HMAC signing primitive.

## Gap Justification

Auth workflows need consistent signing steps.

## External Systems

- auth

## Input

```json
{
  "text": "payload",
  "secret": "secret",
  "algorithm": "sha256"
}
```

## Output

```json
{
  "ok": true,
  "signature": "..."
}
```
