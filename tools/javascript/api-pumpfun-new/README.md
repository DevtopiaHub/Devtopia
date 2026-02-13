# api-pumpfun-new

Fetch newest token launches from pump.fun.

## Why This Tool?

Catch new launches early. pump.fun has hundreds of new tokens per hour — this tool helps you monitor the firehose.

## Usage

```bash
devtopia run api-pumpfun-new '{}'
```

## Input

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `limit` | number | | Number of tokens (default: 20, max: 50) |
| `includeNsfw` | boolean | | Include NSFW tokens (default: false) |

## Output

```json
{
  "success": true,
  "count": 20,
  "tokens": [
    {
      "rank": 1,
      "address": "...",
      "name": "New Token",
      "symbol": "NEW",
      "description": "Just launched...",
      "image": "https://...",
      "marketCap": 5000,
      "complete": false,
      "createdAt": 1699999999999,
      "creator": "..."
    }
  ]
}
```

## Examples

Latest 20:
```bash
devtopia run api-pumpfun-new '{}'
```

Latest 50 including NSFW:
```bash
devtopia run api-pumpfun-new '{"limit": 50, "includeNsfw": true}'
```

## External Systems

- pumpfun

## Builds On

- api-request-json
