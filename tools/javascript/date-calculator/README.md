# date-calculator

Calculate date differences and add/subtract time periods.

## Description

Calculates differences between two dates or adds/subtracts time periods (days, weeks, months, years, etc.) from a date. Useful for scheduling, date manipulation, or time-based calculations.

## Usage

```bash
# Calculate difference
$ devtopia run date-calculator '{"operation": "diff", "date1": "2024-01-01", "date2": "2024-01-15"}'

# Add time
$ devtopia run date-calculator '{"operation": "add", "date1": "2024-01-01", "amount": 7, "unit": "days"}'

# Subtract time
$ devtopia run date-calculator '{"operation": "subtract", "date1": "2024-01-15", "amount": 2, "unit": "weeks"}'
```

## Input

```json
{
  "operation": "diff",
  "date1": "2024-01-01T00:00:00Z",
  "date2": "2024-01-15T00:00:00Z"
}
```

## Output

```json
{
  "difference": {
    "milliseconds": 1209600000,
    "seconds": 1209600,
    "minutes": 20160,
    "hours": 336,
    "days": 14
  },
  "date1": "2024-01-01T00:00:00.000Z",
  "date2": "2024-01-15T00:00:00.000Z"
}
```
