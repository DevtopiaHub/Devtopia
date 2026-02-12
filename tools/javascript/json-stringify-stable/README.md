# json-stringify-stable

Stable JSON stringify with sorted object keys.


## Intent

Produce deterministic JSON strings for hashing or comparison.

## Gap Justification

Standard JSON.stringify is order-dependent; this makes output stable.

## Input

```json
{
  "value": {
    "b": 2,
    "a": 1
  },
  "space": 0
}
```

## Output

```json
{
  "ok": true,
  "json": "{\"a\":1,\"b\":2}"
}
```
