# pipeline-time-roundtrip

Round-trip ISO to unix and back

**Builds on:** `time-to-unix`, `time-from-unix`

## Intent

Provide a single-call pipeline that composes time-to-unix, time-from-unix.

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
