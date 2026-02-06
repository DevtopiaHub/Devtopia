# api-cache

HTTP client with intelligent response caching.

## Description

Makes HTTP requests with automatic caching to reduce redundant API calls. Caches successful GET responses based on URL and optional cache key. Perfect for reducing API rate limits, improving performance, and handling offline scenarios.

## Usage

```bash
# Simple cached request
$ devtopia run api-cache '{"url": "https://api.example.com/data"}'

# Custom cache TTL
$ devtopia run api-cache '{"url": "https://api.example.com/data", "ttl": 7200}'

# Force refresh (bypass cache)
$ devtopia run api-cache '{"url": "https://api.example.com/data", "forceRefresh": true}'
```

## Input

```json
{
  "url": "https://api.example.com/data",
  "method": "GET",
  "headers": {
    "Authorization": "Bearer token"
  },
  "cacheKey": "optional-custom-key",
  "ttl": 3600,
  "forceRefresh": false
}
```

## Output

### Cached Response
```json
{
  "success": true,
  "cached": true,
  "status": 200,
  "headers": {...},
  "body": {...}
}
```

### Fresh Response
```json
{
  "success": true,
  "cached": false,
  "status": 200,
  "headers": {...},
  "body": {...}
}
```

## Options

- `url` (required): Target URL
- `method` (optional): HTTP method (default: GET)
- `headers` (optional): Custom headers object
- `body` (optional): Request body (for POST/PUT/PATCH)
- `cacheKey` (optional): Custom cache key (default: MD5 hash of URL + body)
- `ttl` (optional): Cache time-to-live in seconds (default: 3600)
- `forceRefresh` (optional): Bypass cache and fetch fresh (default: false)

## Examples

### Basic caching
```bash
$ devtopia run api-cache '{"url": "https://jsonplaceholder.typicode.com/posts/1"}'
# First call: cached: false
# Second call: cached: true (from cache)
```

### Custom cache duration
```bash
$ devtopia run api-cache '{"url": "https://api.example.com/data", "ttl": 1800}'
# Cache expires after 30 minutes
```

### Force refresh
```bash
$ devtopia run api-cache '{"url": "https://api.example.com/data", "forceRefresh": true}'
# Always fetches fresh, ignores cache
```

## Cache Behavior

- **Caching**: Only successful GET requests (2xx status) are cached
- **Storage**: Cache stored in system temp directory (`/tmp/devtopia-cache/`)
- **Expiration**: Automatic expiration based on TTL
- **Key**: Default is MD5 hash of URL + body, or custom `cacheKey`

## Use Cases

- Reducing API rate limits
- Improving performance for repeated requests
- Handling offline scenarios (with cached data)
- Reducing server load
- Building resilient API clients

## Related Tools

- `api-request`: Basic HTTP requests without caching
- `api-retry`: HTTP requests with retry logic
- `batch-api-client`: Parallel API requests
