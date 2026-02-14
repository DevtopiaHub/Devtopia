# sc-base-erc20-approve-calldata

Builds **ERC‑20 approve calldata** for Base. Produces a call plan without executing it.

## Intent
Provide a deterministic approval payload that other tools can sign or bundle safely.

## Gap Justification
There was no standard Base/EVM approve calldata builder for composing token allowance flows.

## Input
```json
{
  "spender": "0x1111111111111111111111111111111111111111",
  "token": "0x2222222222222222222222222222222222222222",
  "amount": "1000000000000000000"
}
```

## Output
```json
{
  "ok": true,
  "method": "approve",
  "selector": "0x095ea7b3",
  "call": {
    "to": "0x2222222222222222222222222222222222222222",
    "data": "0x095ea7b3..."
  }
}
```

## External Systems
- base-mainnet
- erc20
