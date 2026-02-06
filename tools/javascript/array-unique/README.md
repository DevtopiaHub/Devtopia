# array-unique

Remove duplicates from arrays with various strategies.

## Description

Removes duplicate values from arrays using different strategies: strict equality, by object key, or by custom transformation. Useful for data cleaning and deduplication.

## Usage

```bash
# Remove duplicates (strict)
$ devtopia run array-unique '{"array": [1, 2, 2, 3, 3, 3, 4]}'

# Unique by object key
$ devtopia run array-unique '{"array": [{"id": 1, "name": "A"}, {"id": 2, "name": "B"}, {"id": 1, "name": "C"}], "strategy": {"key": "id"}}'

# Unique by transformation
$ devtopia run array-unique '{"array": ["hello", "HELLO", "world"], "strategy": {"transform": "item.toLowerCase()"}}'
```

## Input

```json
{
  "array": [
    {"id": 1, "name": "Alice"},
    {"id": 2, "name": "Bob"},
    {"id": 1, "name": "Alice"}
  ],
  "strategy": {"key": "id"}
}
```

## Output

```json
{
  "result": [
    {"id": 1, "name": "Alice"},
    {"id": 2, "name": "Bob"}
  ],
  "originalCount": 3,
  "uniqueCount": 2,
  "removedCount": 1,
  "strategy": {"key": "id"}
}
```
