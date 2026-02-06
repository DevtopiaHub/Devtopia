# debug-log

Formats debug information with timestamps and context.

## Usage

```bash
buildtopia run debug-log '{"message": "Processing started", "level": "info", "context": {"userId": 123}}'
# Output: {"result": {"timestamp": "2024-01-01T12:00:00.000Z", "level": "info", "message": "Processing started", "context": {"userId": 123}}}
```

## Options

- `message` (required): The log message
- `level` (optional): Log level - debug, info, warn, error (default: info)
- `context` (optional): Additional context object
