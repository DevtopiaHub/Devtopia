# pipeline-data-entries-pick

Build object from entries and pick keys

**Builds on:** `data-object-from-entries`, `data-pick-keys`

## Intent

Provide a single-call pipeline that composes data-object-from-entries, data-pick-keys.

## Gap Justification

Chaining these tools repeatedly is common; this wrapper makes it deterministic.

## Input

```json
{
  "entries": [
    [
      "a",
      1
    ],
    [
      "b",
      2
    ]
  ],
  "object": {
    "a": 1,
    "b": 2
  },
  "keys": [
    "a"
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
