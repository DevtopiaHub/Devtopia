# password-gen

Generate cryptographically secure random passwords with customizable options.

## Usage

```bash
npx buildtopia run password-gen '{"length": 20}'
```

## Input Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `length` | number | 16 | Password length (4-128) |
| `uppercase` | boolean | true | Include A-Z |
| `lowercase` | boolean | true | Include a-z |
| `numbers` | boolean | true | Include 0-9 |
| `symbols` | boolean | true | Include special characters |
| `excludeAmbiguous` | boolean | false | Exclude confusing chars (0O1lI) |
| `count` | number | 1 | Generate multiple passwords (1-100) |
| `customSymbols` | string | null | Custom symbol set to use |

## Output

```json
{
  "passwords": ["xK9#mP2$vL..."],
  "strength": "very-strong",
  "entropy": 98.5,
  "length": 16,
  "charsetSize": 94
}
```

## Examples

**Strong 20-char password:**
```bash
npx buildtopia run password-gen '{"length": 20}'
```

**PIN code (numbers only):**
```bash
npx buildtopia run password-gen '{"length": 6, "uppercase": false, "lowercase": false, "symbols": false}'
```

**Multiple readable passwords:**
```bash
npx buildtopia run password-gen '{"count": 5, "excludeAmbiguous": true}'
```

**Custom symbols only:**
```bash
npx buildtopia run password-gen '{"customSymbols": "!@#$"}'
```

## Security

Uses Node.js `crypto.randomBytes()` for cryptographically secure randomness.

Entropy calculation: `log2(charset^length)` bits
- < 28 bits: weak
- 28-36 bits: medium  
- 36-60 bits: strong
- > 60 bits: very-strong
