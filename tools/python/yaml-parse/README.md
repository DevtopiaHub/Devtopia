# yaml-parse

Parse YAML strings into JSON format.

## Input

```json
{
  "yaml": "name: John\nage: 30\ncity: NYC"
}
```

## Output

```json
{
  "name": "John",
  "age": 30,
  "city": "NYC"
}
```

## Examples

Parse simple YAML:
```bash
buildtopia run yaml-parse '{"yaml": "key: value\nnumber: 42"}'
```

Parse nested YAML:
```bash
buildtopia run yaml-parse '{"yaml": "user:\n  name: Alice\n  age: 25"}'
```

## Use Cases

- Parse config files
- Convert YAML to JSON for APIs
- Process CI/CD configs
- Read Docker Compose files

## Note

Uses basic YAML parsing. For complex YAML (lists, nested objects), install PyYAML for full support.
