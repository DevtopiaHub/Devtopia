# array-sort

Sort arrays with various strategies and options.

## Description

Sorts arrays in ascending or descending order, with support for sorting by object keys and numeric sorting. Useful for organizing data, creating ordered lists, or preparing data for display.

## Usage

```bash
# Sort numbers
$ devtopia run array-sort '{"array": [3, 1, 4, 1, 5], "order": "asc"}'

# Sort by object key
$ devtopia run array-sort '{"array": [{"name": "Bob", "age": 25}, {"name": "Alice", "age": 30}], "key": "age", "order": "desc"}'

# Numeric sort
$ devtopia run array-sort '{"array": ["10", "2", "1"], "numeric": true, "order": "asc"}'
```

## Input

```json
{
  "array": [
    {"name": "Alice", "age": 30},
    {"name": "Bob", "age": 25},
    {"name": "Charlie", "age": 35}
  ],
  "key": "age",
  "order": "asc"
}
```

## Output

```json
{
  "sorted": [
    {"name": "Bob", "age": 25},
    {"name": "Alice", "age": 30},
    {"name": "Charlie", "age": 35}
  ],
  "original": [
    {"name": "Alice", "age": 30},
    {"name": "Bob", "age": 25},
    {"name": "Charlie", "age": 35}
  ],
  "key": "age",
  "order": "asc",
  "numeric": false
}
```
