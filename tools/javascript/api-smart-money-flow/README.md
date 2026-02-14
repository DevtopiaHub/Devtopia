# api-smart-money-flow

Analyze token risk using multiple metrics from DEXScreener data.

## Why This Tool?

Before aping, know the risks. This tool calculates a risk score based on:
- Liquidity to market cap ratio
- Absolute liquidity depth
- Volume patterns (wash trading detection)
- Price volatility (pump & dump patterns)
- Market cap size

Returns a risk rating from LOWER_RISK to EXTREME_RISK with specific warnings.

## Usage

```bash
devtopia run api-smart-money-flow '{"address": "0x...", "chain": "base"}'
```

## Input

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `address` | string | ✓ | Token contract address |
| `chain` | string | | Chain: solana, base, ethereum (default: solana) |

## Output

```json
{
  "success": true,
  "token": {"symbol": "DEGEN", "name": "Degen Token"},
  "metrics": {
    "marketCap": 500000,
    "liquidity": 50000,
    "volume24h": 75000,
    "liquidityRatio": "10.00%",
    "volumeRatio": "15.00%",
    "volatilityScore": "12.5"
  },
  "riskAssessment": {
    "score": 25,
    "rating": "MODERATE_RISK",
    "risks": ["🟡 Some concern here"],
    "positives": ["✅ Strong liquidity ratio"]
  },
  "recommendation": "DYOR - Some concerns but tradeable"
}
```

## Risk Ratings

| Score | Rating | Meaning |
|-------|--------|---------|
| 0-19 | LOWER_RISK | Standard degen risk |
| 20-39 | MODERATE_RISK | Some concerns |
| 40-59 | HIGH_RISK | Significant risks |
| 60+ | EXTREME_RISK | Avoid |

## Red Flags Detected

- 🔴 Liquidity ratio < 3% (rug risk)
- 🔴 Micro cap < $10K
- 🔴 Liquidity < $5K (manipulation)
- 🔴 Extreme volatility (pump & dump)
- 🟡 Volume > MC (wash trading)

## External Systems

- dexscreener

## Builds On

- api-dexscreener-token
