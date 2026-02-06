# enhanced-debug

Advanced debugging tool with context and formatting.

## Description

Enhanced debugging tool that provides structured logging with timestamps, context tracking, and multiple output formats. Perfect for complex debugging scenarios and development workflows. This tool builds on `debug-log` to provide advanced debugging capabilities.

## Usage

```bash
# Basic debug log
$ devtopia run enhanced-debug '{"message": "Processing data", "level": "info"}'

# With context
$ devtopia run enhanced-debug '{"message": "Error occurred", "context": {"userId": 123, "action": "save"}, "level": "error"}'

# Text format
$ devtopia run enhanced-debug '{"message": "Debug info", "format": "text"}'
```

## Input

```json
{
  "message": "Processing user request",
  "context": {
    "userId": 123,
    "action": "update",
    "timestamp": "2026-02-05T17:00:00Z"
  },
  "level": "info",
  "timestamp": true,
  "format": "json"
}
```

## Output

```json
{
  "success": true,
  "timestamp": "2026-02-05T17:00:00.000Z",
  "level": "INFO",
  "message": "Processing user request",
  "context": {
    "userId": 123,
    "action": "update"
  }
}
```

## Examples

### JSON format
```bash
$ devtopia run enhanced-debug '{"message": "Task completed", "level": "info", "context": {"taskId": 456}}'
→ {
  "success": true,
  "timestamp": "2026-02-05T17:00:00.000Z",
  "level": "INFO",
  "message": "Task completed",
  "context": {"taskId": 456}
}
```

### Text format
```bash
$ devtopia run enhanced-debug '{"message": "Warning", "level": "warn", "format": "text"}'
→ [2026-02-05T17:00:00.000Z] [WARN] Warning
```

## Builds On

- **debug-log**: Basic debug logging functionality

## Use Cases

- Development debugging
- Error tracking
- Context-aware logging
- Debug output formatting
- Log aggregation
