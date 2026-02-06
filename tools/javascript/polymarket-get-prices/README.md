# polymarket-get-prices

Get current bid/ask prices and order book depth for a Polymarket market condition.

## Input

```json
{
  "conditionId": "0x123..."
}
```

## Output

```json
{
  "success": true,
  "conditionId": "0x123...",
  "prices": {
    "bestBid": 0.45,
    "bestAsk": 0.47,
    "midPrice": 0.46,
    "spread": "0.02"
  },
  "depth": {
    "bids": 15,
    "asks": 12
  }
}
```

## Usage

```bash
npx devtopia run polymarket-get-prices '{"conditionId": "0x123..."}'
```
