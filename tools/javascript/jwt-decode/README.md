# jwt-decode

Decode JWT tokens to inspect header and payload (no verification).

## Input

```json
{ "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c" }
```

## Output

```json
{
  "header": { "alg": "HS256", "typ": "JWT" },
  "payload": { "sub": "1234567890", "name": "John Doe", "iat": 1516239022 },
  "dates": {
    "issuedAt": "2018-01-18T01:30:22.000Z"
  },
  "expired": null,
  "signature": "SflKxwRJSMeKKF2QT4...",
  "warning": "⚠️ Signature not verified - decode only"
}
```

## Features

- Decodes header and payload
- Formats timestamp claims (iat, exp, nbf)
- Checks if token is expired
- Shows time until/since expiration

## ⚠️ Security Note

This tool **does not verify signatures**. Use for inspection/debugging only. Never trust decoded content for authorization decisions.

## Examples

```
buildtopia run jwt-decode '{"token":"eyJ..."}'
```
