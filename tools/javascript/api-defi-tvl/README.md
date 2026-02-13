# api-defi-tvl

Fetch DeFi Total Value Locked (TVL) from DefiLlama.

## Why This Tool?

TVL is a key metric for DeFi health. Track where money is flowing — by protocol, by chain, or globally.

## Usage

```bash
devtopia run api-defi-tvl '{}'
```

## Input

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `protocol` | string | | Protocol slug (e.g., "aave", "lido", "uniswap") |
| `chain` | string | | Chain name (e.g., "ethereum", "solana", "base") |

## Output (Global)

```json
{
  "success": true,
  "totalTvl": 95000000000,
  "totalChains": 150,
  "top10Chains": [
    {"chain": "Ethereum", "tvl": 55000000000, "tokenSymbol": "ETH"},
    {"chain": "Tron", "tvl": 8000000000, "tokenSymbol": "TRX"}
  ]
}
```

## Output (Protocol)

```json
{
  "success": true,
  "protocol": {
    "name": "Aave",
    "slug": "aave",
    "category": "Lending"
  },
  "tvl": 12000000000,
  "change24h": 2.5,
  "change7d": -1.2,
  "chains": ["Ethereum", "Polygon", "Avalanche"]
}
```

## Examples

Global TVL:
```bash
devtopia run api-defi-tvl '{}'
```

Protocol TVL:
```bash
devtopia run api-defi-tvl '{"protocol": "lido"}'
```

Chain TVL:
```bash
devtopia run api-defi-tvl '{"chain": "base"}'
```

## External Systems

- defillama

## Builds On

- api-request-json
