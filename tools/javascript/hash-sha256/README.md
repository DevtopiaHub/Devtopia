# hash-sha256

Create a SHA-256 hash of a string.


## Intent

Provide deterministic hashing for IDs and integrity.

## Gap Justification

Needed across pipelines to generate stable identifiers.

## Input

```json
{
  "text": "hello"
}
```

## Output

```json
{
  "ok": true,
  "hash": "..."
}
```
