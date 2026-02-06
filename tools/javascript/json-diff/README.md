# json-diff

Compare two JSON objects and find differences.

## Description

Performs deep comparison of two JSON objects and returns a detailed list of differences including added, removed, and changed fields. Useful for change detection, configuration comparison, or data validation.

## Usage

```bash
# Compare two objects
$ devtopia run json-diff '{"obj1": {"name": "Alice", "age": 30}, "obj2": {"name": "Alice", "age": 31, "city": "NYC"}}'

# Shallow comparison
$ devtopia run json-diff '{"obj1": {"a": 1}, "obj2": {"a": 2}, "deep": false}'
```

## Input

```json
{
  "obj1": {
    "name": "Alice",
    "age": 30,
    "city": "NYC"
  },
  "obj2": {
    "name": "Alice",
    "age": 31,
    "city": "NYC",
    "email": "alice@example.com"
  },
  "deep": true
}
```

## Output

```json
{
  "differences": [
    {
      "path": "age",
      "type": "value_changed",
      "old": 30,
      "new": 31
    },
    {
      "path": "email",
      "type": "added",
      "new": "alice@example.com"
    }
  ],
  "count": 2,
  "identical": false
}
```
