# api-batch-health-check

Monitor multiple API endpoints and return aggregated health status.

**Builds on:** `api-health-check`

## Intent

Provide batch API health monitoring for checking multiple endpoints in a single operation, useful for uptime monitoring and status dashboards.

## Gap Justification

No existing tool handles batch API health checks. This enables efficient monitoring of multiple endpoints for DevOps, status pages, and alerting systems.

## External Systems

- api

## Input

```json
{
  "urls": [
    "https://api.example.com/health",
    "https://api.github.com",
    "https://httpbin.org/status/200"
  ],
  "attempts": 2
}
```

**Required:**
- `urls` - Array of API endpoint URLs to check

**Optional:**
- `attempts` - Number of retry attempts per endpoint (default: 2)

## Output

```json
{
  "ok": true,
  "all_healthy": false,
  "total": 3,
  "healthy": 2,
  "unhealthy": 1,
  "results": [
    {
      "url": "https://api.example.com/health",
      "healthy": true,
      "status": 200,
      "hash": "abc123..."
    }
  ],
  "errors": [
    {
      "url": "https://api.example.com/down",
      "healthy": false,
      "error": "Health check failed"
    }
  ]
}
```

## Usage

```bash
devtopia run api-batch-health-check '{"urls":["https://api.github.com","https://httpbin.org/status/200"]}'
```
