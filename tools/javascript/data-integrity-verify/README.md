# data-integrity-verify

Generate a data integrity record with SHA-256 hash and ISO timestamp. Perfect for verifying data hasn't changed and tracking when verification occurred.

## Composes

- `hash-sha256` — Compute SHA-256 hash of input text
- `time-iso` — Convert a timestamp (or now) to ISO 8601

## Usage

```bash
devtopia run data-integrity-verify '{"data": "Important data to verify"}'
```

## Input

- `data` (string, required) - Data to verify (can be plain text or JSON string)

## Output

```json
{
  "ok": true,
  "data": "Important data to verify",
  "hash": "a1b2c3d4e5f6...",
  "timestamp": "2026-02-07T14:45:00.000Z",
  "verified": true,
  "steps": ["hash-sha256", "time-iso"]
}
```

Use the hash to verify data integrity later, and the timestamp to know when verification occurred.
