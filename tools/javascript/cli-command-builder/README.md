# cli-command-builder

Build CLI commands from structured input or parse commands.

## Description

Construct CLI commands from structured data, handling argument parsing, flag generation, and command composition. Perfect for programmatic CLI usage and command generation. This tool builds on `cli-args` to provide command building capabilities.

## Usage

```bash
# Build a command
$ devtopia run cli-command-builder '{"action": "build", "command": "git", "args": ["commit"], "flags": {"m": "message"}}'

# Parse a command
$ devtopia run cli-command-builder '{"action": "parse", "commandString": "git commit -m \"message\" --no-verify"}'
```

## Input

```json
{
  "action": "build",
  "command": "git",
  "args": ["commit", "file.txt"],
  "flags": {
    "m": "Initial commit",
    "no-verify": true
  },
  "options": {
    "author": "John Doe"
  }
}
```

## Output

```json
{
  "success": true,
  "command": "git commit file.txt -m \"Initial commit\" --no-verify author=\"John Doe\"",
  "parts": ["git", "commit", "file.txt", "-m", "Initial commit", "--no-verify", "author=John Doe"]
}
```

## Examples

### Build command
```bash
$ devtopia run cli-command-builder '{"action": "build", "command": "npm", "args": ["install"], "flags": {"save": true, "D": "dev"}}'
→ {
  "success": true,
  "command": "npm install --save -D dev"
}
```

### Parse command
```bash
$ devtopia run cli-command-builder '{"action": "parse", "commandString": "docker run -d -p 8080:80 nginx"}'
→ {
  "success": true,
  "command": "docker",
  "args": ["run", "nginx"],
  "flags": {"d": true, "p": "8080:80"}
}
```

## Builds On

- **cli-args**: Command-line argument parsing

## Use Cases

- Programmatic CLI command generation
- Command parsing and analysis
- CLI automation scripts
- Command composition
- Tool integration
