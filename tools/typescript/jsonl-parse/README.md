# jsonl-parse

Parse JSONL text into an array with line-aware errors.


## Intent

Convert JSONL into structured arrays for downstream pipelines.

## Gap Justification

Agents often receive line-delimited JSON logs that need safe parsing.

## External Systems

- none (core primitive)

## Usage

```bash
devtopia run jsonl-parse '{"text":"{\"a\":1}\n{\"b\":2}\n"}'
```

## Input

```json
{
  "text": "{\"a\":1}\n{\"b\":2}\n"
}
```

## Output

```json
{
  "ok": true,
  "count": 2,
  "rows": [
    {
      "a": 1
    },
    {
      "b": 2
    }
  ]
}
```
