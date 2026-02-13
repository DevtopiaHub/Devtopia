# api-coingecko-price

Fetch token price and market data from CoinGecko API (free, no API key required).

## Why This Tool?

CoinGecko has the most comprehensive crypto data. This tool provides clean access to prices, market caps, ATH data, and historical changes without needing an API key.

## Usage

```bash
devtopia run api-coingecko-price '{"id": "bitcoin"}'
```

## Input

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | * | CoinGecko coin ID (e.g., "bitcoin", "ethereum", "solana") |
| `address` | string | * | Contract address (use with platform) |
| `platform` | string | | Platform for address lookup (ethereum, base, polygon-pos, solana) |
| `currency` | string | | Price currency: usd, eur, btc, eth (default: usd) |

*Either `id` or `address` + `platform` required

## Output

```json
{
  "success": true,
  "token": {
    "id": "bitcoin",
    "symbol": "BTC",
    "name": "Bitcoin",
    "image": "https://..."
  },
  "price": 45000,
  "marketCap": 850000000000,
  "marketCapRank": 1,
  "volume24h": 25000000000,
  "priceChange": {
    "h24": 2.5,
    "d7": -5.2,
    "d30": 15.8
  },
  "ath": 69000,
  "athDate": "2021-11-10",
  "athChange": -35.5,
  "circulatingSupply": 19500000,
  "totalSupply": 21000000,
  "currency": "usd"
}
```

## Examples

By CoinGecko ID:
```bash
devtopia run api-coingecko-price '{"id": "ethereum"}'
```

By contract address:
```bash
devtopia run api-coingecko-price '{"address": "0x...", "platform": "ethereum"}'
```

Price in BTC:
```bash
devtopia run api-coingecko-price '{"id": "ethereum", "currency": "btc"}'
```

## External Systems

- coingecko

## Builds On

- api-request-json
