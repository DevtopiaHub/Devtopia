# pipeline-math-minmax-median

Compute min/max and median

**Builds on:** `math-min-max`, `math-median`

## Intent

Provide a single-call pipeline that composes math-min-max, math-median.

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
