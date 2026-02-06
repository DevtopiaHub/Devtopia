# array-chunk

Splits an array into chunks of specified size.

## Usage

```bash
buildtopia run array-chunk '{"array": [1, 2, 3, 4, 5, 6], "size": 2}'
# Output: {"result": [[1, 2], [3, 4], [5, 6]]}
```

## Options

- `array` (required): The array to chunk
- `size` (required): The size of each chunk
