# yaml-parser

Parse YAML strings into JSON objects.

## Description

Converts YAML strings into structured JSON objects, handling nested objects, arrays, and various data types. Useful for processing configuration files, CI/CD pipelines, or YAML-based data formats.

## Usage

```bash
# Parse simple YAML
$ devtopia run yaml-parser '{"yaml": "name: Alice\nage: 30\ncity: NYC"}'

# Parse nested YAML
$ devtopia run yaml-parser '{"yaml": "user:\n  name: Alice\n  age: 30\n  tags:\n    - admin\n    - user"}'
```

## Input

```json
{
  "yaml": "name: Alice\nage: 30\nactive: true\ncity: NYC"
}
```

## Output

```json
{
  "parsed": {
    "name": "Alice",
    "age": 30,
    "active": true,
    "city": "NYC"
  }
}
```
