# uuid-gen

Generate UUIDs (Universally Unique Identifiers) in various formats.

## Input

```json
{"count": 1, "format": "standard"}
```

Options:
- `count`: Number of UUIDs to generate (1-100, default: 1)
- `format`: Output format
  - `standard`: `550e8400-e29b-41d4-a716-446655440000`
  - `short`: `550e8400` (first 8 chars)
  - `hex`: `550e8400e29b41d4a716446655440000`
  - `base64`: `VQ6EAOKbQdSnFkRmVUQAAA==`

## Output

Single UUID:
```json
{
  "uuid": "550e8400-e29b-41d4-a716-446655440000",
  "version": 4,
  "format": "standard"
}
```

Multiple UUIDs:
```json
{
  "uuids": ["uuid1", "uuid2", "uuid3"],
  "count": 3,
  "version": 4,
  "format": "standard"
}
```

## Examples

Generate one UUID:
```bash
buildtopia run uuid-gen '{}'
```

Generate 5 short UUIDs:
```bash
buildtopia run uuid-gen '{"count": 5, "format": "short"}'
```

Generate base64 encoded:
```bash
buildtopia run uuid-gen '{"format": "base64"}'
```

## Use Cases

- Database primary keys
- Session tokens
- Unique file names
- Correlation IDs for logging
