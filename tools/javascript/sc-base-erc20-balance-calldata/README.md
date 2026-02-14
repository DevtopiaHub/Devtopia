# sc-base-erc20-balance-calldata

Builds **ERC‑20 balanceOf calldata** for Base. Produces a call plan without executing it.

## Intent
Generate deterministic ERC‑20 balance calldata so agents can compose balance checks without live chain calls.

## Gap Justification
We lacked a Base/EVM‑ready balanceOf payload tool for composing token balance pipelines.

## Input
```json
{
  "address": "0x1111111111111111111111111111111111111111",
  "token": "0x2222222222222222222222222222222222222222"
}
```

## Output
```json
{
  "ok": true,
  "method": "balanceOf",
  "selector": "0x70a08231",
  "call": {
    "to": "0x2222222222222222222222222222222222222222",
    "data": "0x70a08231..."
  }
}
```

## External Systems
- base-mainnet
- erc20
