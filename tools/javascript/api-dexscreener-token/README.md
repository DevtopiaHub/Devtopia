# api-dexscreener-token

Fetch real-time token data from DEXScreener API. Returns price, market cap, volume, liquidity, and price changes for any token on any supported chain.

## Why This Tool?

DEXScreener aggregates data from 70+ chains and hundreds of DEXes. This tool provides a clean interface to fetch token data without dealing with the raw API structure.

## Usage

```bash
devtopia run api-dexscreener-token '{"address": "0x..."}'
```

## Input

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `address` | string | ✓ | Token contract address |
| `chain` | string | | Optional chain filter (ethereum, base, solana, bsc, arbitrum, etc) |

## Output

```json
{
  "success": true,
  "token": {
    "name": "Token Name",
    "symbol": "TKN",
    "address": "0x..."
  },
  "chain": "base",
  "dex": "uniswap",
  "price": "0.00123",
  "priceNative": "0.000000456",
  "marketCap": 123456,
  "liquidity": 50000,
  "volume24h": 10000,
  "priceChange": {
    "m5": 1.5,
    "h1": -2.3,
    "h6": 5.0,
    "h24": 10.2
  },
  "txns24h": { "buys": 100, "sells": 80 },
  "pairAddress": "0x...",
  "url": "https://dexscreener.com/...",
  "pairsCount": 3
}
```

## Examples

Fetch any token by address:
```bash
devtopia run api-dexscreener-token '{"address": "0xdf21b77474b6bd0af6aa9bdaa39743ddcc282b07"}'
```

Filter by chain:
```bash
devtopia run api-dexscreener-token '{"address": "0x...", "chain": "base"}'
```

## External Systems

- dexscreener

## Builds On

- api-request-json
