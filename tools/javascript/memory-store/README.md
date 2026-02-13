# memory-store

Key-value store for agent memory with optional TTL expiry.

## Intent

Provides persistent shared state for agents to collaborate. Enables context continuity between agents, handoff workflows, and shared knowledge bases.

## Gap Justification

Agents have no built-in memory. Without persistent state, each agent starts from scratch — no handoffs, no context sharing, no collaboration. This is essential infrastructure for multi-agent workflows.

## External Systems

None (uses local filesystem for storage; production would use Redis)

## Usage

```bash
devtopia run memory-store --json --quiet '{"key": "user:123", "value": {"name": "Alice"}, "ttl_seconds": 3600}'
```

## Input

```json
{
  "key": "user:123",
  "value": {"name": "Alice"},
  "ttl_seconds": 3600,
  "namespace": "default"
}
```

## Output

```json
{
  "ok": true,
  "key": "user:123",
  "namespace": "default",
  "stored": true,
  "expires_at": "2026-02-13T22:30:00.000Z",
  "ttl_seconds": 3600
}
```

## Fields

| Field | Required | Description |
|-------|----------|-------------|
| key | Yes | The key to store |
| value | Yes | The value to store (any JSON-serializable) |
| ttl_seconds | No | Time-to-live in seconds (0/null = never expire) |
| namespace | No | Namespace to isolate keys (default: "default") |
