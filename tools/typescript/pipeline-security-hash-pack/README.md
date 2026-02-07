# pipeline-security-hash-pack

Hash text and base64url encode

**Builds on:** `security-hash-sha512`, `security-base64-url`

## Intent

Provide a single-call pipeline that composes security-hash-sha512, security-base64-url.

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
