# pipeline-security-hmac-base32

Compute HMAC then base32 encode

**Builds on:** `security-hmac-sha256`, `security-base32-encode`

## Intent

Provide a single-call pipeline that composes security-hmac-sha256, security-base32-encode.

## Gap Justification

Chaining these tools repeatedly is common; this wrapper makes it deterministic.

## Input

```json
{
  "text": "hello",
  "secret": "s3cret",
  "a": "abc",
  "b": "abc"
}
```

## Output

```json
{
  "ok": true,
  "results": {}
}
```
