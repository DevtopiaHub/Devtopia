# pipeline-math-summary-core

Compute min/max, median, and variance

**Builds on:** `math-min-max`, `math-median`, `math-variance`

## Intent

Provide a single-call pipeline that composes math-min-max, math-median, math-variance.

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
