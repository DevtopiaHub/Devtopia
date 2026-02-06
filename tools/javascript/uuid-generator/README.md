# uuid-generator

Generate UUIDs (v4) and other unique identifiers.

## Description

Generates unique identifiers in various formats: UUID v4, short alphanumeric IDs, or numeric IDs. Useful for creating unique keys, session IDs, or tracking identifiers.

## Usage

```bash
# Generate a single UUID
$ devtopia run uuid-generator '{}'

# Generate multiple UUIDs
$ devtopia run uuid-generator '{"count": 5}'

# Generate short IDs
$ devtopia run uuid-generator '{"format": "short", "count": 3}'

# Generate numeric IDs
$ devtopia run uuid-generator '{"format": "numeric", "count": 2}'
```

## Input

```json
{
  "count": 1,
  "format": "uuid"
}
```

## Output

```json
{
  "ids": ["550e8400-e29b-41d4-a716-446655440000"],
  "count": 1,
  "format": "uuid"
}
```
