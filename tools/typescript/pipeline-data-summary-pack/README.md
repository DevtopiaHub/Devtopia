# pipeline-data-summary-pack

Combine indexing and sorting summaries

**Builds on:** `pipeline-data-index-count`, `pipeline-data-sort-count`

## Intent

Provide a single-call pipeline that composes pipeline-data-index-count, pipeline-data-sort-count.

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
