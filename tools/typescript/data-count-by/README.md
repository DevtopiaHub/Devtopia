# data-count-by

Count items by a key

## Input

```json
{ "items": [{"type":"a"},{"type":"b"},{"type":"a"}], "key": "type" }
```

## Output

```json
{ "ok": true, "counts": { "a": 2, "b": 1 } }
```
