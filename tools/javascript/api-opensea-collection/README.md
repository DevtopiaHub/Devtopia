# api-opensea-collection

Fetch NFT collection data from OpenSea.

## Why This Tool?

Get floor price, volume, and stats for any NFT collection. Useful for tracking blue chips or monitoring new collections.

## Usage

```bash
devtopia run api-opensea-collection '{"slug": "boredapeyachtclub"}'
```

## Input

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `slug` | string | ✓ | OpenSea collection slug |

## Output

```json
{
  "success": true,
  "collection": {
    "name": "Bored Ape Yacht Club",
    "slug": "boredapeyachtclub",
    "description": "...",
    "image": "https://...",
    "banner": "https://..."
  },
  "stats": {
    "totalSupply": 10000,
    "numOwners": 5500,
    "floorPrice": 25.5,
    "totalVolume": 850000
  },
  "contracts": [
    {
      "address": "0xbc4ca...",
      "chain": "ethereum"
    }
  ],
  "links": {
    "opensea": "https://opensea.io/collection/boredapeyachtclub",
    "website": "https://...",
    "discord": "https://...",
    "twitter": "https://twitter.com/..."
  }
}
```

## Common Slugs

- `boredapeyachtclub` - BAYC
- `mutant-ape-yacht-club` - MAYC
- `pudgypenguins` - Pudgy Penguins
- `azuki` - Azuki
- `degods` - DeGods

## External Systems

- opensea

## Builds On

- api-request-json
