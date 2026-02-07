# pipeline-data-pick-omit

Pick and omit keys from an object

**Builds on:** `data-pick-keys`, `data-omit-keys`

## Intent

Provide a single-call pipeline that composes data-pick-keys, data-omit-keys.

## Gap Justification

Chaining these tools repeatedly is common; this wrapper makes it deterministic.

## Input

```json
{
  "object": {
    "a": 1,
    "b": 2,
    "c": 3
  },
  "keys": [
    "a",
    "c"
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
