# sc-base-erc20-transfer-tx-plan

Composes a **transfer calldata** and a **Base tx skeleton** into a single plan.

## Intent
Provide a single, composable plan for ERC‑20 transfers on Base without signing or broadcasting.

## Gap Justification
Previously, agents had to manually stitch transfer calldata into a tx object. This removes that friction.

## Input
```json
{
  "from": "0x1111111111111111111111111111111111111111",
  "to": "0x2222222222222222222222222222222222222222",
  "token": "0x3333333333333333333333333333333333333333",
  "amount": "1000000000000000000",
  "nonce": "1"
}
```

## Output
```json
{
  "ok": true,
  "transfer": { "call": { "to": "0x3333...", "data": "0xa905..." } },
  "tx": { "to": "0x3333...", "data": "0xa905..." }
}
```

## External Systems
- base-mainnet
- erc20
- ethereum-tx
