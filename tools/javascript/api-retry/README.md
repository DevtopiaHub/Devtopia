# api-retry

HTTP client with automatic retry logic and exponential backoff.

## Description

Makes HTTP requests with intelligent retry handling for transient failures. Automatically retries on network errors, 5xx server errors, and rate limiting (429). Uses exponential backoff to avoid overwhelming servers. Perfect for production API calls that need reliability.

## Usage

```bash
# Simple GET with retries
$ devtopia run api-retry '{"url": "https://api.example.com/data"}'

# Custom retry configuration
$ devtopia run api-retry '{"url": "https://api.example.com/data", "maxRetries": 5, "retryDelay": 2000}'

# POST request with retries
$ devtopia run api-retry '{"url": "https://api.example.com/users", "method": "POST", "body": {"name": "John"}}'
```

## Input

```json
{
  "url": "https://api.example.com/data",
  "method": "GET",
  "headers": {
    "Authorization": "Bearer token"
  },
  "body": null,
  "maxRetries": 3,
  "retryDelay": 1000,
  "retryOn": [500, 502, 503, 504, 429],
  "retryOnNetworkError": true
}
```

## Output

### Success
```json
{
  "success": true,
  "status": 200,
  "headers": {
    "content-type": "application/json"
  },
  "body": {
    "data": "result"
  },
  "attempts": 2,
  "retries": 1,
  "retryHistory": [
    {
      "attempt": 1,
      "delay": 1000,
      "reason": "HTTP 503",
      "timestamp": "2024-01-01T12:00:00.000Z"
    }
  ]
}
```

### Failure
```json
{
  "success": false,
  "error": "Request failed after all retries",
  "attempts": 4,
  "retries": 3,
  "retryHistory": [
    {
      "attempt": 1,
      "delay": 1000,
      "reason": "Network error",
      "timestamp": "2024-01-01T12:00:00.000Z"
    },
    {
      "attempt": 2,
      "delay": 2000,
      "reason": "Network error",
      "timestamp": "2024-01-01T12:00:01.000Z"
    }
  ]
}
```

## Options

- `url` (required): Target URL
- `method` (optional): HTTP method - GET, POST, PUT, DELETE, etc. (default: GET)
- `headers` (optional): Custom headers object
- `body` (optional): Request body (for POST/PUT/PATCH)
- `maxRetries` (optional): Maximum retry attempts (default: 3)
- `retryDelay` (optional): Initial delay in milliseconds (default: 1000)
- `retryOn` (optional): Array of HTTP status codes to retry on (default: [500, 502, 503, 504, 429])
- `retryOnNetworkError` (optional): Retry on network errors (default: true)

## Examples

### Retry on server error
```bash
$ devtopia run api-retry '{"url": "https://api.example.com/data"}'
# If server returns 503, automatically retries with exponential backoff
```

### Custom retry configuration
```bash
$ devtopia run api-retry '{
  "url": "https://api.example.com/data",
  "maxRetries": 5,
  "retryDelay": 2000,
  "retryOn": [429, 500, 502, 503, 504]
}'
```

### POST with retries
```bash
$ devtopia run api-retry '{
  "url": "https://api.example.com/users",
  "method": "POST",
  "body": {"name": "Alice", "email": "alice@example.com"},
  "maxRetries": 3
}'
```

## Retry Behavior

- **Exponential backoff**: Delay doubles with each retry (1000ms, 2000ms, 4000ms, ...)
- **Automatic retry on**: 5xx errors, 429 (rate limit), network errors, timeouts
- **Retry history**: Full log of all retry attempts with timestamps
- **Timeout**: 30 second timeout per request

## Use Cases

- Production API calls requiring reliability
- Handling rate-limited APIs
- Dealing with unreliable networks
- Retrying transient server errors
- Building resilient API integrations

## Related Tools

- `api-request`: Basic HTTP requests without retry
- `batch-api-client`: Parallel API requests
- `validated-api-client`: API requests with JSON validation
