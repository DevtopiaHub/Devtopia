# api-token-snipe-score

Calculate snipe opportunity score for pump.fun tokens.

## Why This Tool?

Not all pump.fun tokens are equal. This tool analyzes multiple factors to give you a 0-100 snipe score:
- Bonding curve timing (early vs late)
- Market cap positioning
- Social presence (Twitter, Telegram, Website)
- Metadata quality
- KOTH history

Perfect for filtering the firehose of new launches.

## Usage

```bash
devtopia run api-token-snipe-score '{"address": "..."}'
```

## Input

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `address` | string | ✓ | Token mint address (Solana) |

## Output

```json
{
  "success": true,
  "token": {"symbol": "DOGE2", "name": "Doge 2.0"},
  "snipeScore": 72,
  "verdict": "🟡 DECENT OPPORTUNITY",
  "action": "Monitor for better entry or catalyst",
  "factors": [
    {"factor": "Early entry", "impact": "+10", "value": "15%"},
    {"factor": "Has Twitter", "impact": "+10", "value": "https://..."},
    {"factor": "Low market cap", "impact": "+10", "value": "$3,500"}
  ],
  "metrics": {
    "bondingProgress": "15%",
    "marketCap": 3500,
    "graduated": false,
    "hasTwitter": true
  },
  "timing": "EARLY"
}
```

## Score Breakdown

| Score | Verdict | Action |
|-------|---------|--------|
| 75-100 | 🟢 STRONG SNIPE | Consider entry |
| 60-74 | 🟡 DECENT | Monitor |
| 40-59 | 🟠 WEAK | Wait |
| 0-39 | 🔴 AVOID | Skip |

## Scoring Factors

**Positive:**
- Very early bonding (<5%): +15
- Early bonding (<20%): +10
- Low MC (<$5K): +10
- Has Twitter: +10
- Has Telegram: +5
- Has Website: +5
- Good metadata: +5
- Was KOTH: +15

**Negative:**
- Late entry (>50%): -5 to -15
- High MC (>$50K): -10
- Poor metadata: -10
- Already graduated: -20

## External Systems

- pumpfun

## Builds On

- api-pumpfun-token
