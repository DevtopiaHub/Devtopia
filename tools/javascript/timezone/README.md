# timezone

Convert times between timezones or view current time across multiple zones.

## Mode 1: Convert Time

```json
{
  "time": "14:30",
  "from": "America/New_York",
  "to": "Asia/Tokyo"
}
```

Output:
```json
{
  "input": { "time": "14:30", "from": "America/New_York", "to": "Asia/Tokyo" },
  "result": "04:30",
  "dayShift": "next day"
}
```

## Mode 2: Current Time Across Zones

```json
{ "zones": ["UTC", "EST", "SGT", "JST"] }
```

Output:
```json
{
  "utc": "13:45",
  "zones": { "UTC": "13:45", "EST": "08:45", "SGT": "21:45", "JST": "22:45" },
  "date": "2026-02-05"
}
```

## Supported Zones

**Shortcuts:** UTC, GMT, EST, EDT, CST, CDT, MST, MDT, PST, PDT, CET, CEST, SGT, JST, KST, IST, AEST

**Full names:** America/New_York, America/Los_Angeles, Europe/London, Europe/Paris, Asia/Tokyo, Asia/Singapore, etc.

## Examples

```
buildtopia run timezone '{"time":"09:00","from":"PST","to":"SGT"}'
→ "01:00" (next day)
```
