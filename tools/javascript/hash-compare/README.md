# hash-compare

Compute hash of two inputs and compare them.

**Builds on:** `hash-sha256`

## Input

```json
{
  "data1": "hello",
  "data2": "hello"
}
```

## Output

```json
{
  "match": true,
  "hash1": "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824",
  "hash2": "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824",
  "inputs": {
    "data1": "hello",
    "data2": "hello"
  }
}
```

## Usage

```bash
npx devtopia run hash-compare '{"data1": "hello", "data2": "hello"}'
```
