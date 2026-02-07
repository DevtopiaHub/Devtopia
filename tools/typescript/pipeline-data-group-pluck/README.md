# pipeline-data-group-pluck

Group items and pluck key values

**Builds on:** `data-group-by`, `data-pluck`

## Intent

Provide a single-call pipeline that composes data-group-by, data-pluck.

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
