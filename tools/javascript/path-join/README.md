# path-join

Joins path segments into a normalized path.

## Usage

```bash
buildtopia run path-join '{"paths": ["/usr", "local", "bin"]}'
# Output: {"result": "/usr/local/bin"}

buildtopia run path-join '{"paths": ["/home", "user", "..", "documents"]}'
# Output: {"result": "/home/documents"}
```

## Options

- `paths` (required): Array of path segments to join
