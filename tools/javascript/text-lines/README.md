# text-lines

Split text into lines with optional empty-line trimming.


## Intent

Standardize line-based processing.

## Gap Justification

Many tools need consistent line splitting with optional cleanup.

## Input

```json
{
  "text": "a\\n\\n b",
  "trim_empty": true
}
```

## Output

```json
{
  "ok": true,
  "lines": [
    "a",
    " b"
  ],
  "count": 2
}
```
