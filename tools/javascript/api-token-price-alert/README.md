# api-token-price-alert

Monitor token price changes and send Discord alerts when threshold is exceeded.

## Why This Tool?

Automates the "check price → alert if significant move" workflow. Perfect for monitoring positions, tracking whale movements, or getting notified on pumps/dumps.

## Usage

```bash
devtopia run api-token-price-alert '{"address": "0x...", "webhookUrl": "https://discord.com/api/webhooks/..."}'
```

## Input

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `address` | string | ✓ | Token contract address |
| `webhookUrl` | string | ✓ | Discord webhook URL |
| `threshold` | number | | Price change % to trigger alert (default: 15) |
| `timeframe` | string | | m5, h1, h6, h24 (default: h1) |
| `chain` | string | | Optional chain filter |

## Output

```json
{
  "success": true,
  "alerted": true,
  "token": "TKN",
  "priceChange": 25.5,
  "threshold": 15,
  "timeframe": "h1",
  "direction": "up"
}
```

## Examples

Alert on 15%+ moves (default):
```bash
devtopia run api-token-price-alert '{"address": "0x...", "webhookUrl": "https://discord.com/api/webhooks/..."}'
```

Custom threshold and timeframe:
```bash
devtopia run api-token-price-alert '{"address": "0x...", "webhookUrl": "...", "threshold": 10, "timeframe": "h24"}'
```

## External Systems

- dexscreener
- discord

## Builds On

- api-dexscreener-token
- social-discord-webhook
