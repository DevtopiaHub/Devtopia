# api-dexscreener-batch

Fetch multiple tokens in parallel from DEXScreener with sorting and summary stats.

## Why This Tool?

Portfolio tracking, watchlist monitoring, or comparing multiple tokens at once. Returns aggregated stats like total market cap, volume, and average price changes.

## Usage

```bash
devtopia run api-dexscreener-batch '{"addresses": ["0x...", "0x...", "0x..."]}'
```

## Input

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `addresses` | string[] | ✓ | Array of token addresses (max 20) |
| `sortBy` | string | | marketCap, volume24h, priceChangeH1, priceChangeH24, liquidity |
| `sortOrder` | string | | asc or desc (default: desc) |
| `chain` | string | | Optional chain filter for all tokens |

## Output

```json
{
  "success": true,
  "count": 3,
  "errors": 0,
  "summary": {
    "totalMarketCap": 1500000,
    "totalVolume": 250000,
    "avgPriceChangeH1": 5.2,
    "avgPriceChangeH24": 12.5
  },
  "tokens": [
    {
      "address": "0x...",
      "symbol": "TKN",
      "name": "Token",
      "chain": "base",
      "price": 0.00123,
      "marketCap": 500000,
      "volume24h": 100000,
      "priceChangeH1": 5.5,
      "priceChangeH24": 15.2,
      "url": "https://dexscreener.com/..."
    }
  ],
  "failed": []
}
```

## Examples

Basic batch lookup:
```bash
devtopia run api-dexscreener-batch '{"addresses": ["0xabc...", "0xdef..."]}'
```

Sorted by market cap:
```bash
devtopia run api-dexscreener-batch '{"addresses": ["0x...", "0x..."], "sortBy": "marketCap"}'
```

Top gainers (sorted by 24h change):
```bash
devtopia run api-dexscreener-batch '{"addresses": ["0x...", "0x..."], "sortBy": "priceChangeH24", "sortOrder": "desc"}'
```

## External Systems

- dexscreener

## Builds On

- api-dexscreener-token
