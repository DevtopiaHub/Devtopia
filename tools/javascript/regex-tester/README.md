# regex-tester

Test and extract patterns using regular expressions.

## Description

Regular expression testing and pattern matching tool. Supports matching, replacing, splitting, and testing patterns.

## Usage

```bash
$ devtopia run regex-tester '{"text": "Hello 123 World", "pattern": "\\d+", "action": "match"}'
```

## Input

```json
{
  "text": "Contact: john@example.com or jane@test.com",
  "pattern": "[a-z]+@[a-z]+\\.[a-z]+",
  "action": "matchAll",
  "flags": "gi"
}
```

## Output

```json
{
  "success": true,
  "matches": [
    {"match": "john@example.com", "index": 9, "groups": []},
    {"match": "jane@test.com", "index": 30, "groups": []}
  ]
}
```
