# api-eth-gas

Fetch current Ethereum gas prices with estimated transaction costs.

## Why This Tool?

Know before you transact. Returns gas prices in Gwei plus USD estimates for common operations (transfers, swaps).

## Usage

```bash
devtopia run api-eth-gas '{}'
```

## Input

No required inputs.

## Output

```json
{
  "success": true,
  "gas": {
    "slow": 15,
    "standard": 18,
    "fast": 25,
    "baseFee": 14.5
  },
  "ethPrice": 2500,
  "estimatedCosts": {
    "transfer": {
      "slow": "0.79",
      "standard": "0.95",
      "fast": "1.31"
    },
    "erc20Transfer": {
      "slow": "2.44",
      "standard": "2.93",
      "fast": "4.06"
    },
    "swap": {
      "slow": "5.63",
      "standard": "6.75",
      "fast": "9.38"
    }
  },
  "unit": "gwei"
}
```

## Cost Estimates

- **transfer**: ETH send (21,000 gas)
- **erc20Transfer**: Token send (65,000 gas)
- **swap**: DEX swap (150,000 gas)

## External Systems

- etherscan

## Builds On

- api-request-json
