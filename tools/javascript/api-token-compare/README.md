# api-token-compare

Compare two tokens side-by-side with a winner verdict.

## Why This Tool?

Choosing between two potential plays? This tool compares them across multiple metrics and tells you which one looks better based on:
- Liquidity ratio (safety)
- Absolute liquidity (depth)
- Trading volume (activity)
- Recent momentum (1h performance)
- Upside potential (MC vs safety)

## Usage

```bash
devtopia run api-token-compare '{"token1": "0x...", "token2": "0x..."}'
```

## Input

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `token1` | string | ✓ | First token address |
| `token2` | string | ✓ | Second token address |
| `chain` | string | | Optional chain filter |

## Output

```json
{
  "success": true,
  "comparison": {
    "token1": {
      "symbol": "DOGE",
      "marketCap": 50000,
      "liquidity": 10000,
      "liquidityRatio": "20%",
      "change1h": 5.5
    },
    "token2": {
      "symbol": "SHIB",
      "marketCap": 75000,
      "liquidity": 8000,
      "liquidityRatio": "10.67%",
      "change1h": -2.1
    }
  },
  "verdicts": [
    {"metric": "Liquidity Ratio", "winner": "DOGE", "reason": "20% vs 10.67%"},
    {"metric": "Momentum (1h)", "winner": "DOGE", "reason": "5.5% vs -2.1%"}
  ],
  "scores": {"DOGE": 4, "SHIB": 1},
  "winner": "DOGE",
  "winnerReason": "DOGE wins 4-1"
}
```

## Scoring System

Tokens earn points for:
- Better liquidity ratio: +2
- Higher absolute liquidity: +2
- Higher volume: +1
- Better 1h momentum: +1
- Better upside potential: +1

Winner needs >1 point lead, otherwise "TOO_CLOSE".

## External Systems

- dexscreener

## Builds On

- api-dexscreener-token
