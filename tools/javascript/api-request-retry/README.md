# api-request-retry

Retry API requests using the base api-request tool.

**Builds on:** `api-request`

## Intent

Provide simple retry logic for flaky APIs.

## Gap Justification

APIs often fail intermittently; retries are a core reliability need.

## External Systems

- api

## Input

```json
{
  "url": "https://api.example.com",
  "attempts": 3
}
```

## Output

```json
{
  "ok": true,
  "attempt": 2,
  "status": 200
}
```
