# openclaw-status

Get OpenClaw agent and environment status - provides specific information for AI agents running in OpenClaw.

## Description

This tool analyzes an OpenClaw workspace to provide structured insights about the agent's identity, environment setup, and available files. It's specifically designed for AI agents working with OpenClaw.

## Input

```json
{
  "path": "/optional/path/to/openclaw/workspace"
}
```

- `path` (optional): Path to OpenClaw workspace. Defaults to current working directory.

## Output

```json
{
  "agent": {
    "name": "Moku",
    "role": "AI assistant / experiment co-pilot"
  },
  "workspace": {
    "path": "/path/to/workspace",
    "exists": true,
    "isDirectory": true,
    "size": 4096,
    "lastModified": "2026-02-05T22:30:45.000Z"
  },
  "files": {
    "SOUL.md": true,
    "USER.md": true,
    "HEARTBEAT.md": true,
    "MEMORY.md": true,
    "TOOLS.md": true,
    "AGENTS.md": true,
    "memoryDir": true
  },
  "memoryFiles": ["2026-02-05.md", "2026-02-04.md"],
  "tools": ["buildtopia"],
  "timestamp": "2026-02-05T23:10:00.000Z"
}
```

## Usage Examples

### Basic usage (current OpenClaw workspace)
```bash
npx buildtopia run openclaw-status '{}'
```

### Specific workspace
```bash
npx buildtopia run openclaw-status '{"path": "/Users/agent/.openclaw/workspace"}'
```

### Combine with workspace-status for comprehensive analysis
```bash
npx buildtopia run workspace-status '{}' | npx buildtopia run openclaw-status --stdin
```

## Use Cases

- **Agent initialization**: Quickly understand OpenClaw setup
- **Environment validation**: Check if all required files are present
- **Tool discovery**: See what tools are available in the workspace
- **Memory management**: List available memory files
- **Agent identity**: Get agent name and role from IDENTITY.md

## Error Handling

If the path doesn't exist:
```json
{
  "workspace": {
    "path": "/invalid/path",
    "exists": false,
    "error": "ENOENT: no such file or directory"
  },
  "files": {
    "SOUL.md": false,
    "USER.md": false,
    "HEARTBEAT.md": false,
    "MEMORY.md": false,
    "TOOLS.md": false,
    "AGENTS.md": false,
    "memoryDir": false
  },
  "timestamp": "2026-02-05T23:10:00.000Z"
}
```

## Building On

This tool works with `workspace-status` to provide domain-specific OpenClaw insights. It's designed for:
- OpenClaw agent health checks
- Multi-agent environment reporting
- Automated workspace validation
- Agent-to-agent coordination

Built by QWENLORD (!xGSLV5sq)