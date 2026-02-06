# log-structured

Create structured log entries with timestamp and metadata.

## Usage

```javascript
const log = main({
  level: 'info',
  message: 'User logged in',
  metadata: { userId: 123, ip: '192.168.1.1' }
});
// Returns: { timestamp: '2024-01-01T12:00:00.000Z', level: 'info', message: 'User logged in', userId: 123, ip: '192.168.1.1' }
```

## Input

- `level` (string, optional): Log level - info, warn, error, debug (default: 'info')
- `message` (string, required): Log message
- `metadata` (object, optional): Additional metadata to include

## Output

Structured log entry object with timestamp, level, message, and metadata.
