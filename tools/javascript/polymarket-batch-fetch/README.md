# polymarket-batch-fetch

Fetch multiple Polymarket markets in parallel.

**Builds on:** `polymarket-fetch-market`

## Input

```json
{
  "slugs": ["will-trump-win-2024", "bitcoin-price-2024"],
  "marketIds": []
}
```

## Output

```json
{
  "success": true,
  "requested": 2,
  "fetched": 2,
  "failed": 0,
  "markets": [
    {
      "id": "0x123...",
      "slug": "will-trump-win-2024",
      "question": "...",
      "liquidity": 1000000
    }
  ]
}
```

## Usage

```bash
npx devtopia run polymarket-batch-fetch '{"slugs": ["will-trump-win-2024"]}'
```
