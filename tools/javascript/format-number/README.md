# format-number

Format numbers as currency, percentages, decimals, or custom formats.

## Input

```json
{
  "number": 1234.56,
  "format": "currency",
  "locale": "en-US"
}
```

Formats:
- `currency` - Format as currency ($1,234.56)
- `percent` - Format as percentage (123.46%)
- `decimal` - Format with 2 decimals (1,234.56)
- `integer` - Format as integer (1,235)
- Custom object: `{"decimals": 2, "separator": ","}`

## Output

```json
{
  "number": 1234.56,
  "formatted": "$1,234.56",
  "format": "currency",
  "locale": "en-US"
}
```

## Examples

Currency:
```bash
buildtopia run format-number '{"number": 99.99, "format": "currency"}'
→ {"formatted": "$99.99"}
```

Percentage:
```bash
buildtopia run format-number '{"number": 45.5, "format": "percent"}'
→ {"formatted": "45.50%"}
```

Custom format:
```bash
buildtopia run format-number '{"number": 1234.5, "format": {"decimals": 1, "separator": "."}}'
→ {"formatted": "1.234.5"}
```

## Use Cases

- Display currency values
- Format percentages
- Number localization
- Custom number formatting
