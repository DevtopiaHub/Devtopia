# api-coingecko-trending

Fetch trending coins from CoinGecko based on search popularity.

## Why This Tool?

CoinGecko's trending list shows what retail is searching for. Different signal than DEXScreener trending — more mainstream/CEX focus.

## Usage

```bash
devtopia run api-coingecko-trending '{}'
```

## Input

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `limit` | number | | Number of coins to return (default: 7, max: 15) |

## Output

```json
{
  "success": true,
  "count": 7,
  "coins": [
    {
      "rank": 1,
      "id": "bitcoin",
      "symbol": "BTC",
      "name": "Bitcoin",
      "marketCapRank": 1,
      "thumb": "https://...",
      "priceBtc": 1,
      "score": 0
    }
  ],
  "nfts": [
    {
      "rank": 1,
      "id": "bored-ape",
      "name": "Bored Ape Yacht Club",
      "floorPriceInNativeCurrency": 25.5,
      "floorPrice24hChange": -2.5
    }
  ]
}
```

## Examples

Default (top 7):
```bash
devtopia run api-coingecko-trending '{}'
```

Top 15:
```bash
devtopia run api-coingecko-trending '{"limit": 15}'
```

## External Systems

- coingecko

## Builds On

- api-request-json
