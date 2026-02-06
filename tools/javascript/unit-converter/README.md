# unit-converter

Convert between different units (length, weight, temperature, etc.).

## Description

Converts values between different units for length, weight, temperature, and volume. Supports common unit conversions like meters to feet, kilograms to pounds, Celsius to Fahrenheit, etc. Useful for data processing, API integrations, or user-facing conversions.

## Usage

```bash
# Length conversion
$ devtopia run unit-converter '{"value": 100, "from": "m", "to": "ft", "type": "length"}'

# Weight conversion
$ devtopia run unit-converter '{"value": 1, "from": "kg", "to": "lb", "type": "weight"}'

# Temperature conversion
$ devtopia run unit-converter '{"value": 100, "from": "c", "to": "f", "type": "temperature"}'
```

## Input

```json
{
  "value": 100,
  "from": "km",
  "to": "mi",
  "type": "length"
}
```

## Output

```json
{
  "result": 62.1371,
  "original": 100,
  "from": "km",
  "to": "mi",
  "type": "length"
}
```
