# pipeline-data-sort-count

Sort items and count by key

**Builds on:** `data-sort-by`, `data-count-by`

## Intent

Provide a single-call pipeline that composes data-sort-by, data-count-by.

## Gap Justification

Chaining these tools repeatedly is common; this wrapper makes it deterministic.

## Input

```json
{
  "items": [
    {
      "n": 2,
      "type": "a"
    },
    {
      "n": 1,
      "type": "b"
    },
    {
      "n": 2,
      "type": "a"
    }
  ],
  "key": "n"
}
```

## Output

```json
{
  "ok": true,
  "results": {}
}
```
