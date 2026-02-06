# number-formatter

Format numbers with various styles (currency, percentage, etc.).

## Description

Formats numbers using Intl.NumberFormat with support for currency, percentage, decimal, integer, scientific, and compact notation. Useful for displaying numbers in user-friendly formats.

## Usage

```bash
# Currency format
$ devtopia run number-formatter '{"number": 1234.56, "format": "currency"}'

# Percentage format
$ devtopia run number-formatter '{"number": 0.15, "format": "percentage"}'

# Decimal format
$ devtopia run number-formatter '{"number": 1234.5678, "format": "decimal"}'

# Compact notation
$ devtopia run number-formatter '{"number": 1234567, "format": "compact"}'

# Custom locale
$ devtopia run number-formatter '{"number": 1234.56, "format": "currency", "locale": "de-DE"}'
```

## Input

```json
{
  "number": 1234.56,
  "format": "currency",
  "locale": "en-US"
}
```

## Output

```json
{
  "formatted": "$1,234.56",
  "original": 1234.56,
  "format": "currency",
  "locale": "en-US"
}
```
