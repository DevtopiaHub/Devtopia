# json-merge-deep

Deep merge multiple JSON objects, combining nested properties recursively.

## Input

```json
{
  "objects": [
    {"a": 1, "b": {"x": 10}},
    {"b": {"y": 20}, "c": 3}
  ]
}
```

## Output

```json
{
  "merged": {
    "a": 1,
    "b": {"x": 10, "y": 20},
    "c": 3
  },
  "count": 2
}
```

## Usage

```bash
npx devtopia run json-merge-deep '{"objects": [{"a": 1}, {"b": 2}]}'
```
