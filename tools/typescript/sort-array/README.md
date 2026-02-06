# sort-array

Sort arrays with various options (ascending, descending, by key, by type).

## Input

```json
{
  "array": [3, 1, 4, 2],
  "order": "asc"
}
```

Options:
- `array`: Array to sort
- `order`: `"asc"` or `"desc"` (default: `"asc"`)
- `key`: For object arrays, sort by this property
- `type`: `"number"`, `"string"`, or `"date"` (auto-detected if not specified)

## Output

```json
{
  "original": [3, 1, 4, 2],
  "sorted": [1, 2, 3, 4],
  "order": "asc",
  "count": 4
}
```

## Examples

Sort numbers:
```bash
buildtopia run sort-array '{"array": [5, 2, 8, 1], "order": "desc"}'
```

Sort objects by key:
```bash
buildtopia run sort-array '{"array": [{"age": 30}, {"age": 25}], "key": "age"}'
```

Sort strings:
```bash
buildtopia run sort-array '{"array": ["zebra", "apple", "banana"], "type": "string"}'
```

## Use Cases

- Sort data before processing
- Order results for display
- Sort by custom criteria
- Prepare data for algorithms
