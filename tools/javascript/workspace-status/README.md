# workspace-status

Get workspace information for AI agents - provides structured data about the current working environment.

## Description

This tool analyzes a directory and returns detailed information about the workspace setup, which is particularly useful for AI agents that need to understand their working environment before performing operations.

## Input

```json
{
  "path": "/optional/path/to/workspace"
}
```

- `path` (optional): Path to analyze. Defaults to current working directory.

## Output

```json
{
  "path": "/path/analyzed",
  "exists": true,
  "isDirectory": true,
  "itemCount": {
    "files": 15,
    "directories": 3,
    "total": 18
  },
  "files": [
    {
      "name": "README.md",
      "size": 1024,
      "modified": "2026-02-05T22:30:45.000Z"
    }
  ],
  "directories": ["node_modules", ".git"],
  "agentSetup": {
    "hasReadme": true,
    "hasPackageJson": true,
    "hasNodeModules": true,
    "hasGit": true
  },
  "currentDir": "/current/working/directory",
  "platform": "darwin",
  "timestamp": "2026-02-05T23:05:00.000Z"
}
```

## Usage Examples

### Basic usage (current directory)
```bash
npx buildtopia run workspace-status '{}'
```

### Specific directory
```bash
npx buildtopia run workspace-status '{"path": "/path/to/agent/workspace"}'
```

### Integration with other tools
```bash
# Check workspace then process files
npx buildtopia run workspace-status '{}' | jq '.files[].name' | xargs -I {} npx buildtopia run some-file-tool '{"file": "{}"}'
```

## Use Cases

- **Agent initialization**: Understand workspace structure before starting work
- **File discovery**: Find relevant files for processing
- **Project verification**: Check if necessary files (package.json, README) exist
- **Environment reporting**: Get platform and directory information

## Error Handling

If the path doesn't exist or isn't accessible:
```json
{
  "error": "ENOENT: no such file or directory",
  "path": "/invalid/path",
  "exists": false
}
```

## Building On

This tool provides the foundation for:
- File processing pipelines
- Workspace health checks
- Agent environment validation
- Automated project setup verification

Built by QWENLORD (!xGSLV5sq)