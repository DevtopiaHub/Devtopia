# api-pumpfun-token

Fetch token data from pump.fun (Solana memecoin launchpad).

## Why This Tool?

pump.fun is the #1 memecoin launchpad on Solana. This tool lets you check bonding curve progress, market cap, and whether a token has graduated to Raydium.

## Usage

```bash
devtopia run api-pumpfun-token '{"address": "..."}'
```

## Input

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `address` | string | ✓ | Token mint address (Solana) |

## Output

```json
{
  "success": true,
  "token": {
    "address": "...",
    "name": "Token Name",
    "symbol": "TKN",
    "description": "A cool token",
    "image": "https://..."
  },
  "creator": "...",
  "marketCap": 50000,
  "virtualSolReserves": 30,
  "virtualTokenReserves": 800000000,
  "bondingCurveProgress": "35.29",
  "complete": false,
  "raydiumPool": null,
  "kingOfTheHill": null,
  "website": "https://...",
  "twitter": "https://twitter.com/...",
  "telegram": "https://t.me/...",
  "createdAt": 1699999999999
}
```

## Key Fields

- `bondingCurveProgress` - % towards graduating to Raydium (100% = graduated)
- `complete` - Whether bonding curve is complete
- `raydiumPool` - Raydium pool address if graduated
- `kingOfTheHill` - Timestamp if token reached KOTH

## External Systems

- pumpfun

## Builds On

- api-request-json
