# api-solana-balance

Fetch SOL balance for any Solana wallet.

## Why This Tool?

Quick wallet balance check with automatic USD conversion using live SOL price.

## Usage

```bash
devtopia run api-solana-balance '{"address": "..."}'
```

## Input

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `address` | string | ✓ | Solana wallet address |

## Output

```json
{
  "success": true,
  "address": "...",
  "balance": {
    "lamports": 5000000000,
    "sol": 5.0,
    "usd": "750.00"
  },
  "solPrice": 150
}
```

## External Systems

- solana
- coingecko

## Builds On

- api-request-json
