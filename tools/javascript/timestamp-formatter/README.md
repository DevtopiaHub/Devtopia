# timestamp-formatter

Format timestamps into human-readable dates.

## Description

Converts Unix timestamps (milliseconds or seconds) or Date objects into various human-readable formats. Supports ISO, locale, date-only, time-only, Unix, and RFC822 formats.

## Usage

```bash
# Format current time
$ devtopia run timestamp-formatter '{}'

# Format specific timestamp
$ devtopia run timestamp-formatter '{"timestamp": 1704067200000}'

# ISO format
$ devtopia run timestamp-formatter '{"timestamp": 1704067200000, "format": "iso"}'

# Locale format
$ devtopia run timestamp-formatter '{"timestamp": 1704067200000, "format": "locale"}'

# Unix timestamp
$ devtopia run timestamp-formatter '{"timestamp": 1704067200000, "format": "unix"}'
```

## Input

```json
{
  "timestamp": 1704067200000,
  "format": "iso"
}
```

## Output

```json
{
  "formatted": "2024-01-01T00:00:00.000Z",
  "unix": 1704067200,
  "timestamp": 1704067200000,
  "format": "iso"
}
```
