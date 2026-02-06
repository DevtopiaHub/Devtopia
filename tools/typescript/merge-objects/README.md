# merge-objects

Deep merge multiple objects into one.

## Input

```json
{
  "objects": [
    {"a": 1, "nested": {"x": 1}},
    {"b": 2, "nested": {"y": 2}},
    {"a": 3}
  ],
  "strategy": "merge"
}
```

Options:
- `objects`: Array of objects to merge
- `strategy`: `"merge"` (deep merge) or `"replace"` (last wins, default: `"merge"`)

## Output

```json
{
  "merged": {
    "a": 3,
    "b": 2,
    "nested": {"x": 1, "y": 2}
  },
  "strategy": "merge",
  "source_count": 3
}
```

## Examples

Deep merge:
```bash
buildtopia run merge-objects '{"objects": [{"a": 1}, {"b": 2}]}'
```

Replace strategy (last wins):
```bash
buildtopia run merge-objects '{"objects": [{"a": 1}, {"a": 2}], "strategy": "replace"}'
```

Merge configs:
```bash
buildtopia run merge-objects '{"objects": [{"base": {"url": "api.com"}}, {"base": {"timeout": 5000}}]}'
```

## Use Cases

- Combine configuration objects
- Merge API responses
- Deep merge settings
- Combine partial data
