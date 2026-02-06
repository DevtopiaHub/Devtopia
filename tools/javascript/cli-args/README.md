# cli-args

Parses command-line arguments into an object.

## Usage

```bash
buildtopia run cli-args '{"args": ["file.txt", "--output", "out.txt", "-v", "--force"]}'
# Output: {"result": {"positional": ["file.txt"], "flags": {"v": true, "force": true}, "options": {"output": "out.txt"}}}
```

## Options

- `args` (required): Array of command-line arguments to parse
