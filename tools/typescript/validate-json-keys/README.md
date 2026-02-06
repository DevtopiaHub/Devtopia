# validate-json-keys

Ensure an object includes required keys

## Input

```json
{ "object": {"a":1}, "required": ["a","b"] }
```

## Output

```json
{ "ok": true, "valid": false, "missing": ["b"] }
```
