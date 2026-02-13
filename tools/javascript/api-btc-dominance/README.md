# api-btc-dominance

Fetch Bitcoin dominance and global crypto market data.

## Why This Tool?

BTC dominance is a key indicator for alt season vs BTC season. When dominance falls, alts tend to pump. This tool tracks it along with total market cap.

## Usage

```bash
devtopia run api-btc-dominance '{}'
```

## Input

No required inputs.

## Output

```json
{
  "success": true,
  "dominance": {
    "btc": "52.35",
    "eth": "17.82",
    "usdt": "3.45",
    "bnb": "2.89",
    "sol": "2.12"
  },
  "market": {
    "totalMarketCap": 2500000000000,
    "totalVolume24h": 85000000000,
    "marketCapChange24h": "2.35"
  },
  "stats": {
    "activeCryptocurrencies": 12500,
    "markets": 850,
    "ongoingIcos": 5,
    "upcomingIcos": 12
  },
  "signal": "BTC_SEASON"
}
```

## Signal Logic

- **BTC_SEASON**: BTC dominance > 50%
- **ALT_SEASON**: BTC dominance ≤ 50%

## Interpretation

- Rising dominance → money flowing to BTC (risk-off)
- Falling dominance → money flowing to alts (risk-on)
- Historical alt seasons often start when dominance drops below 40%

## External Systems

- coingecko

## Builds On

- api-request-json
