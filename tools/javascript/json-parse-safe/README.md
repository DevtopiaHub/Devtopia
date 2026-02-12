# json-parse-safe

Parse JSON safely with structured errors.


## Intent

Avoid crashes when parsing user-provided JSON.

## Gap Justification

Many tools assume valid JSON; this provides safe parsing with explicit error output.

## Input

```json
{
  "text": "{\"a\":1}"
}
```

## Output

```json
{
  "ok": true,
  "value": {
    "a": 1
  }
}
```
