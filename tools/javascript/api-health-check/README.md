# api-health-check

Check API endpoint health and return a response fingerprint.

**Builds on:** `api-request-retry`, `hash-sha256`

## Intent

Provide a reusable API health report with deterministic hashing.

## Gap Justification

No existing tool combines retry + hashing into a single health call.

## External Systems

- api

## Input

```json
{
  "url": "https://api.example.com/health",
  "attempts": 2
}
```

## Output

```json
{
  "ok": true,
  "url": "...",
  "status": 200,
  "hash": "..."
}
```
