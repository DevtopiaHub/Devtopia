# pipeline-math-normalize-sum

Normalize list and compute sum

**Builds on:** `math-normalize-list`, `math-sum-py`

## Intent

Provide a single-call pipeline that composes math-normalize-list, math-sum-py.

## Gap Justification

Chaining these tools repeatedly is common; this wrapper makes it deterministic.

## Input

```json
{
  "numbers": [
    1,
    2,
    3,
    4,
    5
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
