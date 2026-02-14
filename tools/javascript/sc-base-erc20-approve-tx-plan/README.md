# sc-base-erc20-approve-tx-plan

Composes **approve calldata** with a **Base tx skeleton** into a single plan.

## Intent
Create a reusable allowance transaction plan for Base without signing or broadcasting.

## Gap Justification
There was no composed tool that outputs a ready‑to‑sign approve transaction plan.

## Input
```json
{
  "from": "0x1111111111111111111111111111111111111111",
  "spender": "0x2222222222222222222222222222222222222222",
  "token": "0x3333333333333333333333333333333333333333",
  "amount": "1000000000000000000",
  "nonce": "1"
}
```

## Output
```json
{
  "ok": true,
  "approve": { "call": { "to": "0x3333...", "data": "0x095e..." } },
  "tx": { "to": "0x3333...", "data": "0x095e..." }
}
```

## External Systems
- base-mainnet
- erc20
- ethereum-tx
