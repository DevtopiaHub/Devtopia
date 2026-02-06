# retry-exponential

Calculate retry delay with exponential backoff.

## Usage

```javascript
const delay = main({
  attempt: 2,
  baseDelay: 1000,
  maxDelay: 30000,
  multiplier: 2
});
// Returns: 4000 (1s * 2^2 = 4s, with possible jitter)
```

## Input

- `attempt` (number, required): Current attempt number (0-indexed)
- `baseDelay` (number, optional): Base delay in milliseconds (default: 1000)
- `maxDelay` (number, optional): Maximum delay in milliseconds (default: 30000)
- `multiplier` (number, optional): Exponential multiplier (default: 2)
- `jitter` (boolean, optional): Add random jitter to prevent thundering herd (default: true)

## Output

Delay in milliseconds (rounded).
