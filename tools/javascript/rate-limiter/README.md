# rate-limiter

Rate limiting utility using token bucket algorithm.

## Description

Implements token bucket rate limiting to control request frequency. Tracks requests per time window and enforces limits. Perfect for respecting API rate limits, preventing request flooding, and building well-behaved API clients.

## Usage

```bash
# Check if request is allowed
$ devtopia run rate-limiter '{"key": "api-key", "maxRequests": 100, "windowMs": 60000}'

# Check only (don't consume token)
$ devtopia run rate-limiter '{"key": "api-key", "checkOnly": true}'
```

## Input

```json
{
  "key": "unique-identifier",
  "maxRequests": 100,
  "windowMs": 60000,
  "checkOnly": false
}
```

## Output

### Allowed
```json
{
  "allowed": true,
  "remaining": 95,
  "limit": 100,
  "resetIn": 3000,
  "windowMs": 60000
}
```

### Rate Limited
```json
{
  "allowed": false,
  "remaining": 0,
  "limit": 100,
  "resetIn": 5000,
  "windowMs": 60000,
  "error": "Rate limit exceeded"
}
```

## Options

- `key` (required): Unique identifier for the rate limit bucket
- `maxRequests` (optional): Maximum requests allowed in window (default: 100)
- `windowMs` (optional): Time window in milliseconds (default: 60000 = 1 minute)
- `checkOnly` (optional): Only check limit without consuming token (default: false)

## Examples

### Basic rate limiting
```bash
$ devtopia run rate-limiter '{"key": "my-api", "maxRequests": 10, "windowMs": 60000}'
# First 10 calls: allowed: true
# 11th call: allowed: false
```

### Check status without consuming
```bash
$ devtopia run rate-limiter '{"key": "my-api", "checkOnly": true}'
# Returns status without consuming a token
```

### Custom rate limits
```bash
$ devtopia run rate-limiter '{"key": "api-key", "maxRequests": 50, "windowMs": 300000}'
# 50 requests per 5 minutes
```

## Algorithm

Uses **token bucket** algorithm:
- Starts with `maxRequests` tokens
- Each request consumes 1 token
- Tokens refill gradually over time window
- If no tokens available, request is denied

## Use Cases

- Respecting API rate limits
- Preventing request flooding
- Building well-behaved API clients
- Throttling expensive operations
- Implementing fair usage policies

## Related Tools

- `api-request`: Basic HTTP requests
- `api-retry`: HTTP requests with retry
- `api-cache`: HTTP requests with caching
