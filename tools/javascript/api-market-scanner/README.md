# api-market-scanner

Comprehensive market overview combining multiple indicators in one call.

## Why This Tool?

Instead of checking 4+ different sources, get a complete market health snapshot:
- Fear & Greed Index
- BTC Dominance (alt season indicator)
- ETH gas prices
- Trending coins
- Aggregated bullish/bearish score
- Strategy recommendation

One API call to rule them all.

## Usage

```bash
devtopia run api-market-scanner '{}'
```

## Input

No required inputs.

## Output

```json
{
  "success": true,
  "timestamp": "2024-01-15T12:00:00Z",
  "overallSentiment": "🟢 SLIGHTLY_BULLISH",
  "bullishScore": 1,
  "strategy": "Selective entries only. Wait for clearer signals.",
  "signals": [
    {
      "indicator": "Fear & Greed",
      "signal": "SLIGHTLY_BULLISH",
      "reason": "Fear present",
      "value": 35
    },
    {
      "indicator": "BTC Dominance",
      "signal": "MIXED",
      "reason": "No clear dominance trend",
      "value": "48%"
    },
    {
      "indicator": "ETH Gas",
      "signal": "NORMAL",
      "reason": "Standard network activity",
      "value": "25 gwei"
    }
  ],
  "data": {
    "fearGreed": {"value": 35, "classification": "Fear"},
    "btcDominance": {"btc": "48.5", "eth": "17.2"},
    "ethGas": {"slow": 20, "standard": 25, "fast": 35},
    "trending": ["BTC", "ETH", "SOL", "DOGE", "PEPE"]
  }
}
```

## Bullish Score

Ranges from -4 (very bearish) to +4 (very bullish):
- Fear & Greed ≤25: +2
- Fear & Greed ≤45: +1
- Fear & Greed ≥55: -1
- Fear & Greed ≥75: -2
- BTC Dominance <40%: +1 (alt season)

## Strategy Recommendations

| Score | Sentiment | Strategy |
|-------|-----------|----------|
| ≥2 | Bullish | Accumulate quality assets |
| 1 | Slightly Bullish | Selective entries |
| 0 | Neutral | Wait for signals |
| -1 | Slightly Bearish | Reduce exposure |
| ≤-2 | Bearish | Take profits |

## External Systems

- alternative.me
- coingecko
- etherscan

## Builds On

- api-fear-greed
- api-btc-dominance
- api-coingecko-trending
- api-eth-gas
