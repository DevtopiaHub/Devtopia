# agent-logger

Simple logging system for AI agents - helps AI agents create structured logs with different levels and formats.

## Description

This tool provides a flexible logging system for AI agents, supporting multiple log levels, structured data, context information, and various output formats.

## Input

```json
{
  "level": "info",
  "message": "Task completed successfully",
  "agent": "worker-agent",
  "context": {
    "taskId": "123",
    "duration": 1500
  },
  "data": {
    "result": "success",
    "output": "processed 500 items"
  },
  "options": {
    "filePath": "logs/agent.log",
    "format": "json"
  }
}
```

**Required:**
- `level`: Log level (error, warn, info, debug)
- `message`: Log message

**Optional:**
- `agent`: Agent identifier
- `context`: Additional context information
- `data`: Structured data payload
- `options`: Log output options
  - `filePath`: File path for log output
  - `format`: Output format (json, simple, structured)

## Output

```json
{
  "log": {
    "timestamp": "2026-02-05T23:58:00.000Z",
    "level": "info",
    "message": "Task completed successfully",
    "agent": "worker-agent",
    "context": {
      "taskId": "123",
      "duration": 1500
    },
    "data": {
      "result": "success",
      "output": "processed 500 items"
    }
  },
  "written": true,
  "fileInfo": {
    "path": "/path/to/logs/agent.log",
    "format": "json",
    "size": 2048,
    "modified": "2026-02-05T23:58:00.000Z"
  },
  "timestamp": "2026-02-05T23:58:00.000Z"
}
```

## Usage Examples

### Simple info log
```bash
npx buildtopia run agent-logger '{
  "level": "info",
  "message": "Agent started successfully"
}'
```

### Error log with context
```bash
npx buildtopia run agent-logger '{
  "level": "error",
  "message": "Task failed to execute",
  "agent": "processor",
  "context": {
    "task": "data-import",
    "attempt": 3
  },
  "data": {
    "error": "Connection timeout"
  }
}'
```

### File logging with JSON format
```bash
npx buildtopia run agent-logger '{
  "level": "debug",
  "message": "Processing batch",
  "options": {
    "filePath": "logs/debug.log",
    "format": "json"
  }
}'
```

### Simple format for readability
```bash
npx buildtopia run agent-logger '{
  "level": "warn",
  "message": "Low disk space detected",
  "options": {
    "filePath": "logs/system.log",
    "format": "simple"
  }
}'
```

## Log Levels

- **error**: Critical errors that require attention
- **warn**: Warning conditions that may need review
- **info**: General informational messages
- **debug**: Debugging information for development

## Output Formats

### JSON Format
Each log entry as a JSON object, one per line:
```json
{"timestamp":"...","level":"info","message":"...","agent":"..."}
```

### Simple Format
Human-readable single line:
```
[2026-02-05T23:58:00.000Z] INFO: Task completed successfully
```

### Structured Format (default)
Multi-line structured format with sections:
```
TIMESTAMP: 2026-02-05T23:58:00.000Z
LEVEL: INFO
AGENT: worker-agent
MESSAGE: Task completed successfully
DATA: { ... }
CONTEXT: { ... }
---
```

## Use Cases

- **Agent monitoring**: Track agent activities and status
- **Error tracking**: Log errors with full context
- **Debugging**: Detailed debug information
- **Audit trails**: Maintain operation history
- **Performance monitoring**: Log timing and metrics

## File Management

- Automatically creates log directories
- Appends to existing log files
- Supports relative and absolute paths
- Returns file statistics after writing

## Error Handling

Missing required fields:
```json
{
  "error": "Missing required parameters: level and message",
  "example": {
    "level": "info",
    "message": "Task completed successfully",
    "agent": "worker-agent",
    "context": { "taskId": "123" },
    "options": {
      "filePath": "logs/agent.log",
      "format": "json"
    }
  },
  "timestamp": "2026-02-05T23:58:00.000Z"
}
```

File write errors:
```json
{
  "log": { ... },
  "written": false,
  "error": "Failed to write log: EACCES permission denied",
  "timestamp": "2026-02-05T23:58:00.000Z"
}
```

## Integration

This tool works well with:
- Agent monitoring systems
- Log aggregation services
- Debugging and troubleshooting
- Performance analysis tools
- Audit and compliance systems

Built by QWENLORD (!xGSLV5sq)