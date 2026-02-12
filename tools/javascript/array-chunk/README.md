# array-chunk

Split an array into fixed-size chunks.


## Intent

Batch items for pagination or rate-limited APIs.

## Gap Justification

Chunking is common in API workflows and batching.

## Input

```json
{
  "items": [
    1,
    2,
    3,
    4,
    5
  ],
  "size": 2
}
```

## Output

```json
{
  "ok": true,
  "chunks": [
    [
      1,
      2
    ],
    [
      3,
      4
    ],
    [
      5
    ]
  ]
}
```
