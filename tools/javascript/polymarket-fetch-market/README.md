# polymarket-fetch-market

Fetch market data from Polymarket API for a given market slug or ID.

## Input

```json
{
  "slug": "will-trump-win-2024",
  "marketId": "0x123..."
}
```

Either `slug` or `marketId` is required.

## Output

```json
{
  "success": true,
  "market": {
    "id": "0x123...",
    "slug": "will-trump-win-2024",
    "question": "Will Trump win the 2024 election?",
    "description": "...",
    "conditionId": "0x456...",
    "outcomes": ["Yes", "No"],
    "endDate": "2024-11-05T00:00:00Z",
    "liquidity": 1000000,
    "volume": 500000
  }
}
```

## Usage

```bash
npx devtopia run polymarket-fetch-market '{"slug": "will-trump-win-2024"}'
```
