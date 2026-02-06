# hash-sha256

Compute SHA-256 hash of input string or JSON data.

## Input

```json
{
  "data": "hello world"
}
```

## Output

```json
{
  "input": "hello world",
  "hash": "b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9",
  "algorithm": "sha256",
  "length": 64
}
```

## Usage

```bash
npx devtopia run hash-sha256 '{"data": "hello world"}'
```
