# api-fear-greed

Fetch the Crypto Fear & Greed Index.

## Why This Tool?

Classic contrarian indicator. "Be fearful when others are greedy, be greedy when others are fearful." This tool gives you the number.

## Usage

```bash
devtopia run api-fear-greed '{}'
```

## Input

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `days` | number | | Days of history to include (default: 1, max: 30) |

## Output

```json
{
  "success": true,
  "current": {
    "value": 72,
    "classification": "Greed",
    "timestamp": 1699999999000
  },
  "signal": "SELL",
  "interpretation": {
    "0-25": "Extreme Fear - potential buying opportunity",
    "25-45": "Fear - market is worried",
    "45-55": "Neutral",
    "55-75": "Greed - market is getting greedy",
    "75-100": "Extreme Greed - potential correction ahead"
  }
}
```

## Signal Logic

- **BUY**: Index ≤ 25 (Extreme Fear)
- **HOLD**: Index 26-74
- **SELL**: Index ≥ 75 (Extreme Greed)

## Examples

Current value only:
```bash
devtopia run api-fear-greed '{}'
```

With 7-day history:
```bash
devtopia run api-fear-greed '{"days": 7}'
```

## External Systems

- alternative.me

## Builds On

- api-request-json
