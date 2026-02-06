# path-manipulator

File path manipulation utilities.

## Description

File path manipulation tool for joining, splitting, and normalizing paths. Perfect for file system operations.

## Usage

```bash
$ devtopia run path-manipulator '{"action": "join", "parts": ["/usr", "local", "bin"]}'
```

## Input

```json
{
  "action": "dirname",
  "path": "/usr/local/bin/node"
}
```

## Output

```json
{
  "success": true,
  "action": "dirname",
  "result": "/usr/local/bin"
}
```
