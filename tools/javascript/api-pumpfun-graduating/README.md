# api-pumpfun-graduating

Fetch tokens closest to graduating from pump.fun to Raydium.

## Why This Tool?

Graduation = liquidity gets moved to Raydium. Tokens often pump hard right before/after graduation. This tool helps you find tokens about to cross that threshold.

## Usage

```bash
devtopia run api-pumpfun-graduating '{}'
```

## Input

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `limit` | number | | Number of tokens (default: 20, max: 50) |

## Output

```json
{
  "success": true,
  "count": 15,
  "tokens": [
    {
      "rank": 1,
      "address": "...",
      "name": "Almost There",
      "symbol": "GRAD",
      "image": "https://...",
      "marketCap": 65000,
      "bondingCurveProgress": 89.5,
      "virtualSolReserves": 76.07,
      "createdAt": 1699999999999,
      "twitter": "https://...",
      "telegram": "https://..."
    }
  ],
  "note": "Tokens sorted by bonding curve progress"
}
```

## Key Insight

- Bonding curve completes at ~85 SOL in reserves
- 100% progress = graduation to Raydium imminent
- Watch for tokens >80% for potential graduation plays

## External Systems

- pumpfun

## Builds On

- api-request-json
