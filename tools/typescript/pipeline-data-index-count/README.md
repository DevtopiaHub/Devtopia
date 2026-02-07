# pipeline-data-index-count

Index items and count by key

**Builds on:** `data-index-by`, `data-count-by`

## Intent

Provide a single-call pipeline that composes data-index-by, data-count-by.

## Gap Justification

Chaining these tools repeatedly is common; this wrapper makes it deterministic.

## Input

```json
{
  "items": [
    {
      "type": "a",
      "id": 1
    },
    {
      "type": "b",
      "id": 2
    },
    {
      "type": "a",
      "id": 3
    }
  ],
  "key": "type"
}
```

## Output

```json
{
  "ok": true,
  "results": {}
}
```
