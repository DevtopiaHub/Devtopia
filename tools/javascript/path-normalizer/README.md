# path-normalizer

Normalize and manipulate file paths.

## Description

Normalizes, joins, resolves, and parses file paths. Extracts path components like directory name, basename, and extension. Useful for file system operations, path manipulation, or cross-platform path handling.

## Usage

```bash
# Normalize path
$ devtopia run path-normalizer '{"path": "/usr/../usr/local/bin", "operation": "normalize"}'

# Parse path
$ devtopia run path-normalizer '{"path": "/home/user/file.txt", "operation": "parse"}'

# Get directory name
$ devtopia run path-normalizer '{"path": "/home/user/file.txt", "operation": "dirname"}'

# Join paths
$ devtopia run path-normalizer '{"path": "/home/user", "operation": "join", "parts": ["documents", "file.txt"]}'
```

## Input

```json
{
  "path": "/home/user/documents/../file.txt",
  "operation": "normalize"
}
```

## Output

```json
{
  "result": "/home/user/file.txt",
  "original": "/home/user/documents/../file.txt",
  "operation": "normalize"
}
```
