# pipeline-math-stats-pack

Compute standard deviation and variance

**Builds on:** `math-standard-deviation`, `math-variance`

## Intent

Provide a single-call pipeline that composes math-standard-deviation, math-variance.

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
