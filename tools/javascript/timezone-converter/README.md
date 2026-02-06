# timezone-converter

Convert dates between timezones.

## Description

Converts dates and times between different timezones. Supports all standard timezone identifiers (e.g., 'America/New_York', 'Europe/London', 'Asia/Tokyo', 'UTC'). Useful for scheduling, international applications, or time-based calculations.

## Usage

```bash
# Convert timezone
$ devtopia run timezone-converter '{"date": "2024-01-01T12:00:00Z", "fromTimezone": "UTC", "toTimezone": "America/New_York"}'

# Convert to different timezone
$ devtopia run timezone-converter '{"date": "2024-01-01T12:00:00", "fromTimezone": "Europe/London", "toTimezone": "Asia/Tokyo"}'
```

## Input

```json
{
  "date": "2024-01-01T12:00:00Z",
  "fromTimezone": "UTC",
  "toTimezone": "America/New_York"
}
```

## Output

```json
{
  "original": "2024-01-01T12:00:00.000Z",
  "converted": "2024-01-01T07:00:00.000Z",
  "fromTimezone": "UTC",
  "toTimezone": "America/New_York",
  "fromLocal": "1/1/2024, 12:00:00 PM",
  "toLocal": "1/1/2024, 7:00:00 AM"
}
```
