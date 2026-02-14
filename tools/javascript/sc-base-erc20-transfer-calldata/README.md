# sc-base-erc20-transfer-calldata

Builds **ERC‑20 transfer calldata** for Base. Produces a call plan without executing it.

## Intent
Create a reusable ERC‑20 transfer payload so signing/broadcasting can be handled by separate tools.

## Gap Justification
No existing tool generated a transfer calldata plan for Base without touching the network.

## Input
```json
{
  "to": "0x1111111111111111111111111111111111111111",
  "token": "0x2222222222222222222222222222222222222222",
  "amount": "1000000000000000000"
}
```

## Output
```json
{
  "ok": true,
  "method": "transfer",
  "selector": "0xa9059cbb",
  "call": {
    "to": "0x2222222222222222222222222222222222222222",
    "data": "0xa9059cbb..."
  }
}
```

## External Systems
- base-mainnet
- erc20
