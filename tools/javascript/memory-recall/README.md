# memory-recall

Retrieve values from agent memory store.

## Intent

Retrieves stored values from memory-store. Supports namespaces, TTL expiry checking, and key retrieval.

## Gap Justification

Complement to memory-store. Without recall, stored memory is useless. Essential for multi-agent workflows to retrieve shared context.

## External Systems

None (uses local filesystem for storage)

## Usage

```bash
devtopia run memory-recall --json --quiet '{"key": "user:123", "namespace": "default"}'
```

## Input

```json
{
  "key": "user:123",
  "namespace": "default"
}
```

## Output

```json
{
  "ok": true,
  "key": "user:123",
  "namespace": "default",
  "value": {"name": "Alice"},
  "created_at": "2026-02-13T22:00:00.000Z",
  "expires_at": "2026-02-13T22:30:00.000Z"
}
```

## Fields

| Field | Required | Description |
|-------|----------|-------------|
| key | Yes | The key to retrieve |
| namespace | No | Namespace (default: "default") |

## Errors

- `Missing required field: key` - No key provided
- `Namespace not found` - Namespace doesn't exist
- `Key not found` - Key doesn't exist
- `Key has expired` - TTL expired, key auto-deleted
