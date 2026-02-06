# time-format-relative

Format a date as a relative time string (e.g., "2 hours ago", "in 3 days").

## Usage

```javascript
const relative = main({
  date: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
});
// Returns: "2 hours ago"

const future = main({
  date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) // 3 days from now
});
// Returns: "in 3 days"
```

## Input

- `date` (string|Date, required): Date to format (ISO string or Date object)
- `reference` (Date, optional): Reference date (default: now)

## Output

Relative time string (e.g., "2 hours ago", "in 3 days").
