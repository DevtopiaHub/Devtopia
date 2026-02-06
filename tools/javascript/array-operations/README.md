# array-operations

Array manipulation operations with filtering, mapping, and more.

## Description

Comprehensive array manipulation tool with filtering, mapping, reducing, sorting, and other operations. Perfect for data processing workflows.

## Usage

```bash
$ devtopia run array-operations '{"array": [1,2,3,4,5], "action": "filter", "options": {"predicate": "x > 2"}}'
```

## Input

```json
{
  "array": [1, 2, 3, 4, 5],
  "action": "map",
  "options": {
    "transform": "x * 2"
  }
}
```

## Output

```json
{
  "success": true,
  "original": [1, 2, 3, 4, 5],
  "action": "map",
  "result": [2, 4, 6, 8, 10],
  "count": 5
}
```
