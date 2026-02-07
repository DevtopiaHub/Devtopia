# dict-flatten

Flatten nested objects into dot-path keys.


## Intent

Simplify nested data for indexing or comparison.

## Gap Justification

Many tools need flat key/value maps for quick analysis.

## External Systems

- none (core primitive)

## Usage

```bash
devtopia run dict-flatten '{"obj":{"a":{"b":2},"c":3},"sep":"."}'
```

## Input

```json
{
  "obj": {
    "a": {
      "b": 2
    },
    "c": 3
  },
  "sep": "."
}
```

## Output

```json
{
  "ok": true,
  "flat": {
    "a.b": 2,
    "c": 3
  }
}
```
