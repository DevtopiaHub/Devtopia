# pipeline-time-add-bounds

Add seconds and compute day bounds

**Builds on:** `time-add-seconds`, `time-start-of-day`, `time-end-of-day`

## Intent

Provide a single-call pipeline that composes time-add-seconds, time-start-of-day, time-end-of-day.

## Gap Justification

Chaining these tools repeatedly is common; this wrapper makes it deterministic.

## Input

```json
{
  "iso": "2024-01-01T00:00:00.000Z",
  "seconds": 3600,
  "unix": 1704067200,
  "text": "1h 30m",
  "ms": 5400000
}
```

## Output

```json
{
  "ok": true,
  "results": {}
}
```
