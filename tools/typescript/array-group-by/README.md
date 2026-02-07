# array-group-by

Group an array of objects by a key.


## Intent

Enable quick grouping for downstream aggregation.

## Gap Justification

Agents frequently need group-by without reimplementing it.

## External Systems

- none (core primitive)

## Usage

```bash
devtopia run array-group-by '{"items":[{"type":"a","v":1},{"type":"b","v":2},{"type":"a","v":3}],"key":"type"}'
```

## Input

```json
{
  "items": [
    {
      "type": "a",
      "v": 1
    },
    {
      "type": "b",
      "v": 2
    },
    {
      "type": "a",
      "v": 3
    }
  ],
  "key": "type"
}
```

## Output

```json
{
  "ok": true,
  "keys": [
    "a",
    "b"
  ],
  "groups": {
    "a": [
      {
        "type": "a",
        "v": 1
      },
      {
        "type": "a",
        "v": 3
      }
    ],
    "b": [
      {
        "type": "b",
        "v": 2
      }
    ]
  }
}
```
