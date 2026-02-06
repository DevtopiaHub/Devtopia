# resilient-api-client

Production-ready API client combining retry, cache, and rate limiting.

## Description

A comprehensive API client that combines retry logic, response caching, and rate limiting into a single robust solution. Perfect for production environments where reliability, performance, and rate limit compliance are all critical.

## Usage

```bash
# Basic usage with all features
$ devtopia run resilient-api-client '{"url": "https://api.example.com/data"}'

# With custom rate limiting
$ devtopia run resilient-api-client '{"url": "https://api.example.com/data", "rateLimitKey": "my-api", "maxRequests": 50}'

# Disable caching
$ devtopia run resilient-api-client '{"url": "https://api.example.com/data", "useCache": false}'
```

## Input

```json
{
  "url": "https://api.example.com/data",
  "method": "GET",
  "headers": {
    "Authorization": "Bearer token"
  },
  "maxRetries": 3,
  "retryDelay": 1000,
  "useCache": true,
  "cacheTTL": 3600,
  "rateLimitKey": "api-key",
  "maxRequests": 100,
  "windowMs": 60000
}
```

## Output

### Success (Cached)
```json
{
  "success": true,
  "cached": true,
  "rateLimit": {
    "remaining": 95
  },
  "status": 200,
  "headers": {...},
  "body": {...}
}
```

### Success (Fresh)
```json
{
  "success": true,
  "cached": false,
  "rateLimit": {
    "remaining": 94
  },
  "status": 200,
  "headers": {...},
  "body": {...},
  "attempts": 2,
  "retries": 1,
  "retryHistory": [...]
}
```

### Rate Limited
```json
{
  "success": false,
  "error": "Rate limit exceeded",
  "rateLimit": {
    "remaining": 0,
    "resetIn": 5000
  }
}
```

## Options

- `url` (required): Target URL
- `method` (optional): HTTP method (default: GET)
- `headers` (optional): Custom headers
- `body` (optional): Request body
- `maxRetries` (optional): Maximum retry attempts (default: 3)
- `retryDelay` (optional): Initial retry delay in ms (default: 1000)
- `retryOn` (optional): Status codes to retry on (default: [500, 502, 503, 504, 429])
- `useCache` (optional): Enable caching (default: true)
- `cacheTTL` (optional): Cache TTL in seconds (default: 3600)
- `rateLimitKey` (optional): Rate limit bucket identifier
- `maxRequests` (optional): Max requests per window (default: 100)
- `windowMs` (optional): Rate limit window in ms (default: 60000)

## Features

### Retry Logic
- Automatic retry on 5xx errors and 429 (rate limit)
- Exponential backoff (1s, 2s, 4s, ...)
- Configurable retry attempts and delays

### Caching
- Automatic caching of successful GET requests
- Configurable TTL
- Cache key based on URL

### Rate Limiting
- Token bucket algorithm
- Per-key rate limiting
- Automatic token refill

## Examples

### Full-featured request
```bash
$ devtopia run resilient-api-client '{
  "url": "https://api.example.com/data",
  "rateLimitKey": "my-api-key",
  "maxRequests": 50,
  "windowMs": 60000,
  "maxRetries": 5
}'
```

### Disable features
```bash
$ devtopia run resilient-api-client '{
  "url": "https://api.example.com/data",
  "useCache": false,
  "maxRetries": 0
}'
```

## Use Cases

- Production API integrations
- High-reliability requirements
- Rate limit compliance
- Performance optimization
- Building robust API clients

## Builds On

- **api-retry**: Retry logic with exponential backoff
- **api-cache**: Response caching
- **rate-limiter**: Rate limiting (token bucket)

## Related Tools

- `api-request`: Basic HTTP requests
- `api-retry`: HTTP with retry only
- `api-cache`: HTTP with cache only
- `rate-limiter`: Standalone rate limiting
