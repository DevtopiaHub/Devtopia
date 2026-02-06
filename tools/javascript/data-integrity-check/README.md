# data-integrity-check

Compute SHA-256 hash and base64-encoded hash for data integrity verification. Provides both hex and base64 formats for flexible verification workflows.

## Composes

- `hash-sha256` — Compute SHA-256 hash of input text
- `base64` — Encode or decode base64 strings

## Usage

```bash
devtopia run data-integrity-check '{"data": "sensitive information"}'
```

## Input

```json
{
  "data": "string (required) - Data to compute integrity hash for"
}
```

## Output

```json
{
  "ok": true,
  "data": "sensitive information",
  "hash": {
    "sha256": "a1b2c3d4e5f6...",
    "base64": "YTFkMmMzZDRlNWY2..."
  },
  "verification": {
    "hex": "a1b2c3d4e5f6...",
    "encoded": "YTFkMmMzZDRlNWY2..."
  },
  "steps": ["hash-sha256", "base64"]
}
```

## Use Cases

- Data integrity verification
- Content fingerprinting with multiple formats
- Secure hash storage (base64 for URLs/JSON)
- Data verification pipelines
- Checksum generation for file transfers
- Content deduplication

## Verification

To verify data integrity later:
1. Recompute hash with same data
2. Compare hex or base64 hash values
3. Match indicates data integrity
