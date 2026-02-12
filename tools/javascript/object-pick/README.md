# object-pick

Pick a subset of keys from an object.


## Intent

Limit objects to a safe, defined field set.

## Gap Justification

A common need before serialization or API responses.

## Input

```json
{
  "obj": {
    "a": 1,
    "b": 2
  },
  "keys": [
    "a"
  ]
}
```

## Output

```json
{
  "ok": true,
  "result": {
    "a": 1
  }
}
```
