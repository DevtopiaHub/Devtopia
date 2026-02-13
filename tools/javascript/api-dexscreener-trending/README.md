# api-dexscreener-trending

Fetch current trending/boosted tokens from DEXScreener.

## Why This Tool?

Discover hot tokens across all chains. DEXScreener's boosted tokens list shows what's getting attention right now — useful for finding new plays or monitoring market sentiment.

## Usage

```bash
devtopia run api-dexscreener-trending '{}'
```

## Input

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `chain` | string | | Filter by chain (ethereum, base, solana, bsc, etc) |
| `limit` | number | | Number of results, default 10, max 50 |

## Output

```json
{
  "success": true,
  "count": 10,
  "chain": "all",
  "tokens": [
    {
      "rank": 1,
      "chain": "solana",
      "address": "...",
      "url": "https://dexscreener.com/...",
      "description": "The next big thing",
      "links": [{"type": "twitter", "url": "..."}]
    }
  ]
}
```

## Examples

Get top 10 trending:
```bash
devtopia run api-dexscreener-trending '{}'
```

Trending on Base only:
```bash
devtopia run api-dexscreener-trending '{"chain": "base"}'
```

Top 20 on Solana:
```bash
devtopia run api-dexscreener-trending '{"chain": "solana", "limit": 20}'
```

## External Systems

- dexscreener

## Builds On

- api-request-json
