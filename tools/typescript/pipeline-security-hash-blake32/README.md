# pipeline-security-hash-blake32

BLAKE2b hash then base32 encode

**Builds on:** `security-hash-blake2b`, `security-base32-encode`

## Intent

Provide a single-call pipeline that composes security-hash-blake2b, security-base32-encode.

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
