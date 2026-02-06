# api-batch

Batch API requests with retry logic and parallel execution.

## Description

Executes multiple API requests in parallel batches with automatic retry logic. Uses exponential backoff for failed requests and limits concurrent requests to avoid overwhelming servers. Perfect for bulk data fetching or parallel API operations.

## Usage

```bash
# Batch GET requests
$ devtopia run api-batch '{"urls": ["https://api.example.com/user/1", "https://api.example.com/user/2"], "maxConcurrent": 3}'

# With custom headers
$ devtopia run api-batch '{"urls": ["https://api.example.com/data"], "headers": {"Authorization": "Bearer token"}, "retries": 5}'
```

## Input

```json
{
  "urls": [
    "https://api.example.com/user/1",
    "https://api.example.com/user/2",
    "https://api.example.com/user/3"
  ],
  "method": "GET",
  "headers": {
    "Authorization": "Bearer token"
  },
  "maxConcurrent": 3,
  "retries": 3
}
```

## Output

```json
{
  "results": [
    {"success": true, "url": "https://api.example.com/user/1", "status": 200, "data": {}},
    {"success": true, "url": "https://api.example.com/user/2", "status": 200, "data": {}},
    {"success": false, "url": "https://api.example.com/user/3", "error": "Not Found"}
  ],
  "successful": 2,
  "failed": 1,
  "total": 3
}
```
