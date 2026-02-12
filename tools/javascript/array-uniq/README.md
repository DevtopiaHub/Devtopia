# array-uniq

Remove duplicates from an array while preserving order.


## Intent

Provide deterministic de-duplication for lists.

## Gap Justification

Used across pipelines to ensure unique items.

## Input

```json
{
  "items": [
    1,
    2,
    2,
    3
  ]
}
```

## Output

```json
{
  "ok": true,
  "items": [
    1,
    2,
    3
  ],
  "count": 3
}
```
