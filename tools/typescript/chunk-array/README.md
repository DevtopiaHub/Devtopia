# chunk-array

Split arrays into chunks of specified size.

## Input

```json
{
  "array": [1, 2, 3, 4, 5, 6],
  "size": 2
}
```

## Output

```json
{
  "original": [1, 2, 3, 4, 5, 6],
  "chunks": [[1, 2], [3, 4], [5, 6]],
  "chunk_size": 2,
  "total_chunks": 3,
  "total_items": 6
}
```

## Examples

Split into chunks of 3:
```bash
buildtopia run chunk-array '{"array": [1, 2, 3, 4, 5], "size": 3}'
→ {"chunks": [[1, 2, 3], [4, 5]]}
```

Process in batches:
```bash
buildtopia run chunk-array '{"array": ["a", "b", "c", "d"], "size": 2}'
```

## Use Cases

- Batch processing
- Pagination
- Rate limiting (process N items at a time)
- Parallel processing preparation
